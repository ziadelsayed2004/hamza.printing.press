const db = require('../../db');
const reportsService = require('../reports/reportsService');

/**
 * Escapes CSV values and wraps them in double quotes.
 */
function escapeCsvValue(val) {
  if (val === null || val === undefined) return '';
  let stringVal = String(val).trim();
  // Escape double quotes by doubling them
  stringVal = stringVal.replace(/"/g, '""');
  return `"${stringVal}"`;
}

/**
 * Converts a list of JSON objects into a CSV string with a UTF-8 Byte Order Mark (BOM).
 */
function jsonToCsv(headers, rows) {
  const headerRow = headers.map(escapeCsvValue).join(',');
  const dataRows = rows.map(row => 
    headers.map(header => escapeCsvValue(row[header])).join(',')
  );
  return '\uFEFF' + [headerRow, ...dataRows].join('\r\n');
}

const { formatEgyptDateTime, formatEgyptDate } = require('../../utils/formatters');

/**
 * Export products catalog.
 */
async function exportProducts() {
  const sql = `
    SELECT p.id, p.title, p.code, p.category, p.status, p.stock_policy,
           (SELECT GROUP_CONCAT(a.name, ' | ') 
            FROM authors a 
            JOIN product_authors pa ON pa.author_id = a.id 
            WHERE pa.product_id = p.id) as authors,
           (SELECT GROUP_CONCAT(ot.name || ': ' || pp.price, ' | ') 
            FROM product_prices pp 
            JOIN outlet_types ot ON ot.id = pp.outlet_type_id 
            WHERE pp.product_id = p.id) as prices
    FROM products p
    ORDER BY p.title ASC
  `;
  const rows = await db.all(sql);
  return jsonToCsv(['id', 'title', 'code', 'category', 'status', 'stock_policy', 'authors', 'prices'], rows);
}

/**
 * Export product prices matrix.
 */
async function exportPrices() {
  const sql = `
    SELECT pp.id, p.title as product_title, p.code as product_code, ot.name as outlet_type_name, pp.price
    FROM product_prices pp
    JOIN products p ON p.id = pp.product_id
    JOIN outlet_types ot ON ot.id = pp.outlet_type_id
    ORDER BY p.title ASC, ot.name ASC
  `;
  const rows = await db.all(sql);
  return jsonToCsv(['id', 'product_title', 'product_code', 'outlet_type_name', 'price'], rows);
}

/**
 * Export authors list.
 */
async function exportAuthors() {
  const sql = `
    SELECT a.id, a.name, a.phone, a.email, a.status,
           (SELECT GROUP_CONCAT(user_id, ' | ') FROM author_users au WHERE au.author_id = a.id) as user_ids
    FROM authors a
    ORDER BY a.name ASC
  `;
  const rows = await db.all(sql);
  return jsonToCsv(['id', 'name', 'phone', 'email', 'status', 'user_ids'], rows);
}

/**
 * Export outlets listing.
 */
async function exportOutlets() {
  const sql = `
    SELECT o.id, o.name, ot.name as outlet_type_name, o.governorate, o.address_details, o.phone, o.credit_limit, o.status, o.notes
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    ORDER BY o.name ASC
  `;
  const rows = await db.all(sql);
  return jsonToCsv(['id', 'name', 'outlet_type_name', 'governorate', 'address_details', 'phone', 'credit_limit', 'status', 'notes'], rows);
}

/**
 * Export invoices list with financial breakdowns.
 */
async function exportInvoices() {
  const sql = `
    SELECT 
      i.id, i.invoice_number, o.name as outlet_name, i.subtotal, i.discount, i.shipping_cost, i.total_price,
      COALESCE(p.paid_amount, 0) as paid_amount,
      (i.total_price - COALESCE(p.paid_amount, 0)) as remaining_amount,
      i.payment_status, i.shipping_status, i.payment_type, i.notes, i.created_at
    FROM invoices i
    JOIN outlets o ON o.id = i.outlet_id
    LEFT JOIN (
      SELECT invoice_id, SUM(amount) as paid_amount
      FROM invoice_payments
      GROUP BY invoice_id
    ) p ON p.invoice_id = i.id
    ORDER BY i.created_at DESC
  `;
  const rows = await db.all(sql);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));
  return jsonToCsv([
    'id', 'invoice_number', 'outlet_name', 'subtotal', 'discount', 'shipping_cost', 'total_price',
    'paid_amount', 'remaining_amount', 'payment_status', 'shipping_status', 'payment_type', 'notes', 'created_at'
  ], formattedRows);
}

/**
 * Export payment receipts history.
 */
async function exportPayments() {
  const sql = `
    SELECT ip.id, i.invoice_number, ip.amount, ip.payment_method, ip.payment_date, ip.reference_number, ip.notes, u.full_name as recorded_by
    FROM invoice_payments ip
    JOIN invoices i ON i.id = ip.invoice_id
    LEFT JOIN users u ON u.id = ip.recorded_by
    ORDER BY ip.payment_date DESC, ip.created_at DESC
  `;
  const rows = await db.all(sql);
  const formattedRows = rows.map(r => ({
    ...r,
    payment_date: formatEgyptDate(r.payment_date)
  }));
  return jsonToCsv(['id', 'invoice_number', 'amount', 'payment_method', 'payment_date', 'reference_number', 'notes', 'recorded_by'], formattedRows);
}

/**
 * Export inventory ledger transactions.
 */
async function exportInventory() {
  const sql = `
    SELECT t.id, p.title as product_title, p.code as product_code, t.transaction_type, t.quantity, t.reference_type, t.reference_id, u.full_name as created_by, t.created_at
    FROM inventory_transactions t
    JOIN products p ON p.id = t.product_id
    LEFT JOIN users u ON u.id = t.created_by
    ORDER BY t.created_at DESC
  `;
  const rows = await db.all(sql);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));
  return jsonToCsv(['id', 'product_title', 'product_code', 'transaction_type', 'quantity', 'reference_type', 'reference_id', 'created_by', 'created_at'], formattedRows);
}

/**
 * Export dynamic report tables based on type.
 */
async function exportReport(reportType) {
  if (reportType === 'balances') {
    const rows = await reportsService.getBalancesByOutlet();
    return jsonToCsv([
      'outletId', 'outletName', 'outletTypeName', 'governorate', 'creditLimit', 'totalSales', 'totalPaid', 'remainingAmount'
    ], rows);
  } else if (reportType === 'stock') {
    const rows = await reportsService.getStockReport();
    return jsonToCsv([
      'productId', 'productTitle', 'productCode', 'category', 'status', 'stockPolicy', 'totalReceived', 'totalSold', 'totalReturned', 'totalAdjusted', 'currentStock'
    ], rows);
  } else if (reportType === 'authors') {
    const rows = await reportsService.getAuthorReport();
    return jsonToCsv([
      'authorId', 'authorName', 'status', 'totalBooks', 'totalSales', 'totalCopiesSold', 'currentStock'
    ], rows);
  } else if (reportType === 'receipts') {
    const rows = await reportsService.getReceiptReport();
    return jsonToCsv(['supplierName', 'totalReceipts', 'totalQuantity', 'totalCost'], rows);
  } else {
    throw new Error('Unsupported report type');
  }
}

module.exports = {
  exportProducts,
  exportPrices,
  exportAuthors,
  exportOutlets,
  exportInvoices,
  exportPayments,
  exportInventory,
  exportReport
};
