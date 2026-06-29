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
 * Converts a list of JSON objects into an Arabic CSV report with UTF-8 BOM, report headers, and totals.
 */
function jsonToCsvArabic({ title, filters = [], arabicHeaders, englishKeys, rows, summaryKeys = [] }) {
  const lines = [];

  // 1. Report Title and Filters
  if (title) {
    lines.push(escapeCsvValue(title));
  }
  if (filters && filters.length > 0) {
    lines.push(escapeCsvValue('الفلاتر المطبقة: ' + filters.join(' | ')));
  }
  if (title || (filters && filters.length > 0)) {
    lines.push(''); // blank row separator
  }

  // 2. Localized Arabic headers
  lines.push(arabicHeaders.map(escapeCsvValue).join(','));

  // 3. Data rows
  rows.forEach(row => {
    const rowCsv = englishKeys.map(key => escapeCsvValue(row[key])).join(',');
    lines.push(rowCsv);
  });

  // 4. Totals Row at the bottom
  if (summaryKeys && summaryKeys.length > 0 && rows.length > 0) {
    lines.push(''); // blank separator row
    const totalRow = englishKeys.map((key, idx) => {
      if (idx === 0) {
        return 'الإجمالي الكلي';
      }
      if (summaryKeys.includes(key)) {
        const sum = rows.reduce((acc, r) => acc + (parseFloat(r[key]) || 0), 0);
        return parseFloat(sum.toFixed(2));
      }
      return '';
    });
    lines.push(totalRow.map(escapeCsvValue).join(','));
  }

  return '\uFEFF' + lines.join('\r\n');
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
  return jsonToCsvArabic({
    title: 'دليل المنتجات والكتب المسجلة',
    arabicHeaders: ['المعرف', 'الاسم/العنوان', 'الرمز/الكود', 'التصنيف', 'الحالة', 'سياسة المخزون', 'المؤلفون', 'الأسعار بمنافذ التوزيع'],
    englishKeys: ['id', 'title', 'code', 'category', 'status', 'stock_policy', 'authors', 'prices'],
    rows
  });
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
  return jsonToCsvArabic({
    title: 'قائمة أسعار المنتجات حسب فئة المنفذ',
    arabicHeaders: ['المعرف', 'اسم الكتاب', 'رمز الكتاب', 'فئة منفذ التوزيع', 'السعر (ج.م)'],
    englishKeys: ['id', 'product_title', 'product_code', 'outlet_type_name', 'price'],
    rows,
    summaryKeys: ['price']
  });
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
  return jsonToCsvArabic({
    title: 'قائمة أسماء وبيانات المؤلفين',
    arabicHeaders: ['المعرف', 'الاسم', 'الهاتف', 'البريد الإلكتروني', 'الحالة', 'معرفات المستخدمين'],
    englishKeys: ['id', 'name', 'phone', 'email', 'status', 'user_ids'],
    rows
  });
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
  return jsonToCsvArabic({
    title: 'دليل منافذ البيع ومراكز التوزيع',
    arabicHeaders: ['المعرف', 'اسم منفذ التوزيع', 'الفئة', 'المحافظة', 'تفاصيل العنوان', 'الهاتف', 'الحد الائتماني (ج.م)', 'الحالة', 'ملاحظات'],
    englishKeys: ['id', 'name', 'outlet_type_name', 'governorate', 'address_details', 'phone', 'credit_limit', 'status', 'notes'],
    rows,
    summaryKeys: ['credit_limit']
  });
}

/**
 * Export invoices list with financial breakdowns.
 */
async function exportInvoices(query = {}) {
  const params = [];
  const filtersApplied = [];
  let sql = `
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
    WHERE 1=1
  `;
  if (query.outletId) {
    sql += ` AND i.outlet_id = ?`;
    params.push(query.outletId);
    const outlet = await db.get('SELECT name FROM outlets WHERE id = ?', [query.outletId]);
    filtersApplied.push(`المنفذ: ${outlet ? outlet.name : query.outletId}`);
  }
  if (query.paymentStatus) {
    sql += ` AND i.payment_status = ?`;
    params.push(query.paymentStatus);
    filtersApplied.push(`حالة الدفع: ${query.paymentStatus}`);
  }
  if (query.shippingStatus) {
    sql += ` AND i.shipping_status = ?`;
    params.push(query.shippingStatus);
    filtersApplied.push(`حالة الشحن: ${query.shippingStatus}`);
  }
  if (query.paymentType) {
    sql += ` AND i.payment_type = ?`;
    params.push(query.paymentType);
    filtersApplied.push(`نوع الدفع: ${query.paymentType}`);
  }
  if (query.startDate) {
    sql += ` AND i.created_at >= ?`;
    params.push(query.startDate + 'T00:00:00');
    filtersApplied.push(`من تاريخ: ${query.startDate}`);
  }
  if (query.endDate) {
    sql += ` AND i.created_at <= ?`;
    params.push(query.endDate + 'T23:59:59');
    filtersApplied.push(`إلى تاريخ: ${query.endDate}`);
  }
  sql += ` ORDER BY i.created_at DESC`;

  const rows = await db.all(sql, params);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));

  return jsonToCsvArabic({
    title: 'سجل مبيعات الفواتير والتحليلات المالية',
    filters: filtersApplied,
    arabicHeaders: [
      'المعرف', 'رقم الفاتورة', 'اسم المنفذ', 'المجموع الفرعي (ج.م)', 'الخصم (ج.م)', 'تكلفة الشحن (ج.م)', 'المجموع الكلي (ج.م)',
      'المبلغ المدفوع (ج.م)', 'المبلغ المتبقي (ج.م)', 'حالة الدفع', 'حالة الشحن', 'نوع الدفع', 'الملاحظات', 'تاريخ الإنشاء'
    ],
    englishKeys: [
      'id', 'invoice_number', 'outlet_name', 'subtotal', 'discount', 'shipping_cost', 'total_price',
      'paid_amount', 'remaining_amount', 'payment_status', 'shipping_status', 'payment_type', 'notes', 'created_at'
    ],
    rows: formattedRows,
    summaryKeys: ['subtotal', 'discount', 'shipping_cost', 'total_price', 'paid_amount', 'remaining_amount']
  });
}

/**
 * Export payment receipts history.
 */
async function exportPayments(query = {}) {
  const params = [];
  const filtersApplied = [];
  let sql = `
    SELECT ip.id, i.invoice_number, ip.amount, ip.payment_method, ip.payment_date, ip.reference_number, ip.notes, u.full_name as recorded_by,
           ip.receipt_status, ip.supply_status
    FROM invoice_payments ip
    JOIN invoices i ON i.id = ip.invoice_id
    LEFT JOIN users u ON u.id = ip.recorded_by
    WHERE 1=1
  `;
  if (query.outletId) {
    sql += ` AND i.outlet_id = ?`;
    params.push(query.outletId);
    const outlet = await db.get('SELECT name FROM outlets WHERE id = ?', [query.outletId]);
    filtersApplied.push(`المنفذ: ${outlet ? outlet.name : query.outletId}`);
  }
  if (query.supplyStatus) {
    sql += ` AND ip.supply_status = ?`;
    params.push(query.supplyStatus);
    filtersApplied.push(`حالة التوريد: ${query.supplyStatus}`);
  }
  if (query.startDate) {
    sql += ` AND ip.payment_date >= ?`;
    params.push(query.startDate);
    filtersApplied.push(`من تاريخ: ${query.startDate}`);
  }
  if (query.endDate) {
    sql += ` AND ip.payment_date <= ?`;
    params.push(query.endDate);
    filtersApplied.push(`إلى تاريخ: ${query.endDate}`);
  }
  sql += ` ORDER BY ip.payment_date DESC, ip.created_at DESC`;

  const rows = await db.all(sql, params);
  const formattedRows = rows.map(r => {
    let readableReceiptStatus = 'معتمد';
    if (r.receipt_status === 'pending_review') readableReceiptStatus = 'قيد المراجعة';
    else if (r.receipt_status === 'rejected') readableReceiptStatus = 'مرفوض';

    let readableSupplyStatus = 'معلق لم يتم التوريد';
    if (r.supply_status === 'supplied') readableSupplyStatus = 'تم التوريد للمقر';

    return {
      ...r,
      payment_date: formatEgyptDate(r.payment_date),
      receipt_status_ar: readableReceiptStatus,
      supply_status_ar: readableSupplyStatus
    };
  });

  return jsonToCsvArabic({
    title: 'سجل تحصيل مدفوعات العملاء ومراجعة الإيصالات',
    filters: filtersApplied,
    arabicHeaders: ['المعرف', 'رقم الفاتورة', 'المبلغ المحصل (ج.م)', 'طريقة الدفع', 'تاريخ السداد', 'رقم المرجع', 'حالة مراجعة الإيصال', 'حالة التوريد للمقر', 'الملاحظات', 'سجلت بواسطة'],
    englishKeys: ['id', 'invoice_number', 'amount', 'payment_method', 'payment_date', 'reference_number', 'receipt_status_ar', 'supply_status_ar', 'notes', 'recorded_by'],
    rows: formattedRows,
    summaryKeys: ['amount']
  });
}

/**
 * Export inventory ledger transactions.
 */
async function exportInventory(query = {}) {
  const params = [];
  const filtersApplied = [];
  let sql = `
    SELECT t.id, p.title as product_title, p.code as product_code, t.transaction_type, t.quantity, t.reference_type, t.reference_id, u.full_name as created_by, t.created_at
    FROM inventory_transactions t
    JOIN products p ON p.id = t.product_id
    LEFT JOIN users u ON u.id = t.created_by
    WHERE 1=1
  `;
  if (query.productId) {
    sql += ` AND t.product_id = ?`;
    params.push(query.productId);
    const prod = await db.get('SELECT title FROM products WHERE id = ?', [query.productId]);
    filtersApplied.push(`الكتاب/المنتج: ${prod ? prod.title : query.productId}`);
  }
  if (query.transactionType) {
    sql += ` AND t.transaction_type = ?`;
    params.push(query.transactionType);
    filtersApplied.push(`نوع الحركة: ${query.transactionType}`);
  }
  if (query.startDate) {
    sql += ` AND t.created_at >= ?`;
    params.push(query.startDate + 'T00:00:00');
    filtersApplied.push(`من تاريخ: ${query.startDate}`);
  }
  if (query.endDate) {
    sql += ` AND t.created_at <= ?`;
    params.push(query.endDate + 'T23:59:59');
    filtersApplied.push(`إلى تاريخ: ${query.endDate}`);
  }
  sql += ` ORDER BY t.created_at DESC`;

  const rows = await db.all(sql, params);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));

  return jsonToCsvArabic({
    title: 'سجل حركات المخزن التفصيلية',
    filters: filtersApplied,
    arabicHeaders: ['المعرف', 'عنوان الكتاب', 'رمز الكتاب', 'نوع الحركة', 'الكمية', 'نوع المستند المرجعي', 'رقم المستند المرجعي', 'سجلت بواسطة', 'تاريخ الحركة'],
    englishKeys: ['id', 'product_title', 'product_code', 'transaction_type', 'quantity', 'reference_type', 'reference_id', 'created_by', 'created_at'],
    rows: formattedRows,
    summaryKeys: ['quantity']
  });
}

/**
 * Export dynamic report tables based on type.
 */
const usersService = require('../users/usersService');
const outletsService = require('../outlets/outletsService');
const authorsService = require('../authors/authorsService');

/**
 * Export report to CSV.
 */
async function exportReport(reportType, _query = {}, sessionUser = null) {
  let filterOutletIds = null;
  let filterAuthorIds = null;

  if (sessionUser) {
    const userId = sessionUser.id;
    const userRoles = await usersService.getUserRoles(userId);
    const isElevated = userRoles.some(r => ['super_admin', 'admin', 'accountant', 'readonly_viewer'].includes(r.name));

    if (!isElevated) {
      filterOutletIds = await outletsService.getLinkedOutletsForUser(userId);
      filterAuthorIds = await authorsService.getLinkedAuthorsForUser(userId);
    }
  }

  if (reportType === 'balances') {
    const rows = await reportsService.getBalancesByOutlet({
      outletIds: filterOutletIds
    });
    return jsonToCsvArabic({
      title: 'تقرير الأرصدة والمبيعات والتحصيلات لمنافذ التوزيع',
      arabicHeaders: ['معرف المنفذ', 'اسم منفذ التوزيع', 'الفئة', 'المحافظة', 'الحد الائتماني (ج.م)', 'إجمالي المبيعات (ج.م)', 'إجمالي المدفوعات (ج.م)', 'الرصيد المتبقي المستحق (ج.م)'],
      englishKeys: ['outletId', 'outletName', 'outletTypeName', 'governorate', 'creditLimit', 'totalSales', 'totalPaid', 'remainingAmount'],
      rows,
      summaryKeys: ['creditLimit', 'totalSales', 'totalPaid', 'remainingAmount']
    });
  } else if (reportType === 'stock') {
    const rows = await reportsService.getStockReport({
      authorIds: filterAuthorIds
    });
    return jsonToCsvArabic({
      title: 'تقرير جرد المخازن وحركة الكتب',
      arabicHeaders: ['معرف الكتاب', 'عنوان الكتاب', 'رمز الكتاب', 'التصنيف', 'الحالة', 'سياسة المخزون', 'إجمالي الوارد', 'إجمالي المنصرف/المبيعات', 'إجمالي المرتجع', 'إجمالي التسويات', 'الرصيد الحالي بالمخزن'],
      englishKeys: ['productId', 'productTitle', 'productCode', 'category', 'status', 'stockPolicy', 'totalReceived', 'totalSold', 'totalReturned', 'totalAdjusted', 'currentStock'],
      rows,
      summaryKeys: ['totalReceived', 'totalSold', 'totalReturned', 'totalAdjusted', 'currentStock']
    });
  } else if (reportType === 'authors') {
    const rows = await reportsService.getAuthorReport({
      authorIds: filterAuthorIds
    });
    return jsonToCsvArabic({
      title: 'تقرير مبيعات وأرصدة كتب المؤلفين',
      arabicHeaders: ['معرف المؤلف', 'اسم المؤلف', 'الحالة', 'إجمالي عدد الكتب', 'إجمالي المبيعات (ج.م)', 'إجمالي النسخ المباعة', 'الرصيد الحالي بالمخزن'],
      englishKeys: ['authorId', 'authorName', 'status', 'totalBooks', 'totalSales', 'totalCopiesSold', 'currentStock'],
      rows,
      summaryKeys: ['totalBooks', 'totalSales', 'totalCopiesSold', 'currentStock']
    });
  } else if (reportType === 'receipts') {
    const rows = await reportsService.getReceiptReport({
      authorIds: filterAuthorIds
    });
    return jsonToCsvArabic({
      title: 'تقرير توريد الكتب وأذونات الاستلام من الموردين',
      arabicHeaders: ['اسم المورد', 'إجمالي أذونات الاستلام', 'إجمالي الكمية الموردة', 'إجمالي التكلفة الكلية (ج.م)'],
      englishKeys: ['supplierName', 'totalReceipts', 'totalQuantity', 'totalCost'],
      rows,
      summaryKeys: ['totalReceipts', 'totalQuantity', 'totalCost']
    });
  } else {
    throw new Error('Unsupported report type');
  }
}

/**
 * Export returns history.
 */
async function exportReturns(query = {}) {
  const params = [];
  const filtersApplied = [];
  let sql = `
    SELECT 
      r.id, r.return_number, i.invoice_number, o.name as outlet_name,
      r.return_value, r.reason, r.status, r.created_at
    FROM returns r
    JOIN invoices i ON i.id = r.invoice_id
    JOIN outlets o ON o.id = r.outlet_id
    WHERE 1=1
  `;
  if (query.outletId) {
    sql += ` AND r.outlet_id = ?`;
    params.push(query.outletId);
    const outlet = await db.get('SELECT name FROM outlets WHERE id = ?', [query.outletId]);
    filtersApplied.push(`المنفذ: ${outlet ? outlet.name : query.outletId}`);
  }
  if (query.startDate) {
    sql += ` AND r.created_at >= ?`;
    params.push(query.startDate + 'T00:00:00');
    filtersApplied.push(`من تاريخ: ${query.startDate}`);
  }
  if (query.endDate) {
    sql += ` AND r.created_at <= ?`;
    params.push(query.endDate + 'T23:59:59');
    filtersApplied.push(`إلى تاريخ: ${query.endDate}`);
  }
  sql += ` ORDER BY r.created_at DESC`;

  const rows = await db.all(sql, params);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));

  return jsonToCsvArabic({
    title: 'سجل مرتجعات مبيعات الفواتير',
    filters: filtersApplied,
    arabicHeaders: ['المعرف', 'رقم إذن المرتجع', 'رقم الفاتورة', 'اسم المنفذ', 'قيمة المرتجع (ج.م)', 'السبب', 'الحالة', 'تاريخ التسجيل'],
    englishKeys: ['id', 'return_number', 'invoice_number', 'outlet_name', 'return_value', 'reason', 'status', 'created_at'],
    rows: formattedRows,
    summaryKeys: ['return_value']
  });
}

/**
 * Export shipments log.
 */
async function exportShipments(query = {}) {
  const params = [];
  const filtersApplied = [];
  let sql = `
    SELECT 
      s.id, s.shipment_number, i.invoice_number, o.name as outlet_name,
      s.shipping_carrier, s.tracking_number, i.shipping_cost, s.status, s.created_at
    FROM shipments s
    JOIN invoices i ON i.id = s.invoice_id
    JOIN outlets o ON o.id = i.outlet_id
    WHERE 1=1
  `;
  if (query.outletId) {
    sql += ` AND i.outlet_id = ?`;
    params.push(query.outletId);
    const outlet = await db.get('SELECT name FROM outlets WHERE id = ?', [query.outletId]);
    filtersApplied.push(`المنفذ: ${outlet ? outlet.name : query.outletId}`);
  }
  if (query.status) {
    sql += ` AND s.status = ?`;
    params.push(query.status);
    filtersApplied.push(`الحالة: ${query.status}`);
  }
  if (query.startDate) {
    sql += ` AND s.created_at >= ?`;
    params.push(query.startDate + 'T00:00:00');
    filtersApplied.push(`من تاريخ: ${query.startDate}`);
  }
  if (query.endDate) {
    sql += ` AND s.created_at <= ?`;
    params.push(query.endDate + 'T23:59:59');
    filtersApplied.push(`إلى تاريخ: ${query.endDate}`);
  }
  sql += ` ORDER BY s.created_at DESC`;

  const rows = await db.all(sql, params);
  const formattedRows = rows.map(r => ({
    ...r,
    created_at: formatEgyptDateTime(r.created_at)
  }));

  return jsonToCsvArabic({
    title: 'سجل شحنات وطرود الكتب الصادرة للمنافذ',
    filters: filtersApplied,
    arabicHeaders: ['المعرف', 'رقم الشحنة', 'رقم الفاتورة', 'اسم المنفذ', 'شركة الشحن', 'رقم التتبع', 'تكلفة الشحن (ج.م)', 'حالة الشحنة', 'تاريخ الشحن'],
    englishKeys: ['id', 'shipment_number', 'invoice_number', 'outlet_name', 'shipping_carrier', 'tracking_number', 'shipping_cost', 'status', 'created_at'],
    rows: formattedRows,
    summaryKeys: ['shipping_cost']
  });
}

module.exports = {
  exportProducts,
  exportPrices,
  exportAuthors,
  exportOutlets,
  exportInvoices,
  exportPayments,
  exportInventory,
  exportReturns,
  exportShipments,
  exportReport
};
