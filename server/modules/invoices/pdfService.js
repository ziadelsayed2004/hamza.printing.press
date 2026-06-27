const db = require('../../db');
const pdf = require('html-pdf-node');

const { formatEgyptDateTime, formatCurrencyEGP } = require('../../utils/formatters');

/**
 * Format datetime string into readable Arabic format.
 */
function formatDateTime(dateString) {
  const formatted = formatEgyptDateTime(dateString);
  return formatted === '-' ? 'N/A' : formatted;
}

/**
 * Formats numbers into standard currency formatting.
 */
function formatCurrency(val) {
  return formatCurrencyEGP(val);
}

/**
 * Generates dynamic HTML representing selected invoices with RTL support and Arabic language markup.
 */
function buildHtmlContent(invoices) {
  let html = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>تقرير الفواتير</title>
      <style>
        body {
          font-family: 'Arial', 'Microsoft Sans Serif', sans-serif;
          direction: rtl;
          text-align: right;
          background-color: #ffffff;
          color: #333333;
          margin: 0;
          padding: 20px;
          font-size: 14px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .report-header {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #2b3e50;
        }
        .divider {
          border-top: 2px solid #2b3e50;
          margin-bottom: 25px;
        }
        .invoice-card {
          margin-bottom: 40px;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #fafafa;
        }
        .invoice-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e88e5;
          margin-top: 0;
          margin-bottom: 15px;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 8px;
        }
        .info-table, .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .info-table td {
          padding: 6px 12px;
          border: none;
          vertical-align: top;
        }
        .info-table td.label {
          font-weight: bold;
          color: #555555;
          width: 25%;
        }
        .info-table td.value {
          width: 25%;
        }
        .items-table th, .items-table td {
          border: 1px solid #dddddd;
          padding: 8px 12px;
          text-align: right;
        }
        .items-table th {
          background-color: #f2f2f2;
          color: #333333;
          font-weight: bold;
        }
        .items-table tr:nth-child(even) {
          background-color: #ffffff;
        }
        .items-table .number-col {
          text-align: left;
          direction: ltr;
        }
        .page-break {
          page-break-before: always;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="report-header">تقرير الفواتير التفصيلي</div>
        <div class="divider"></div>
  `;

  invoices.forEach((inv, index) => {
    if (index > 0) {
      html += '<div class="page-break"></div>';
    }

    const address = [inv.governorate, inv.address_details].filter(Boolean).join(' - ');

    html += `
      <div class="invoice-card">
        <div class="invoice-title">فاتورة رقم: ${inv.invoice_number}</div>
        <table class="info-table">
          <tr>
            <td class="label">اسم المنفذ:</td>
            <td class="value">${inv.outlet_name}</td>
            <td class="label">تاريخ الفاتورة:</td>
            <td class="value">${formatDateTime(inv.created_at)}</td>
          </tr>
          <tr>
            <td class="label">العنوان:</td>
            <td class="value">${address || 'غير محدد'}</td>
            <td class="label">تاريخ الدفع:</td>
            <td class="value">${formatDateTime(inv.payment_date) || 'N/A'}</td>
          </tr>
          <tr>
            <td class="label">الهاتف:</td>
            <td class="value">${inv.outlet_phone || 'غير محدد'}</td>
            <td class="label">حالة الدفع:</td>
            <td class="value">${inv.payment_status}</td>
          </tr>
          <tr>
            <td class="label">نوع الدفع:</td>
            <td class="value">${inv.payment_type}</td>
            <td class="label">حالة الشحن:</td>
            <td class="value">${inv.shipping_status}</td>
          </tr>
          <tr>
            <td class="label">قيمة الشحن:</td>
            <td class="value">${formatCurrency(inv.shipping_cost)}</td>
            <td class="label">الخصم:</td>
            <td class="value">${formatCurrency(inv.discount)}</td>
          </tr>
          <tr>
            <td class="label" style="color: #2b3e50; font-size: 15px;">الإجمالي الكلي:</td>
            <td class="value" style="font-weight: bold; color: #d32f2f; font-size: 15px;">${formatCurrency(inv.total_price)}</td>
            <td class="label">ملاحظات:</td>
            <td class="value">${inv.notes || 'لا يوجد'}</td>
          </tr>
        </table>

        <div style="font-weight: bold; margin-bottom: 10px; color: #2b3e50;">تفاصيل المواد المباعة:</div>
        <table class="items-table">
          <thead>
            <tr>
              <th style="width: 35%;">اسم الكتاب</th>
              <th style="width: 25%;">المؤلف</th>
              <th style="width: 10%; text-align: center;">الكمية</th>
              <th style="width: 15%; text-align: left;">سعر الوحدة</th>
              <th style="width: 15%; text-align: left;">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
    `;

    inv.items.forEach(item => {
      html += `
        <tr>
          <td>${item.product_title} (${item.product_code})</td>
          <td>${item.authors || 'غير محدد'}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td class="number-col">${formatCurrency(item.unit_price)}</td>
          <td class="number-col">${formatCurrency(item.total_price)}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  html += `
      </div>
    </body>
    </html>
  `;

  return html;
}

/**
 * Main function to generate PDF from invoice IDs.
 */
async function generateInvoicesPdf(invoiceIds) {
  if (!Array.isArray(invoiceIds) || invoiceIds.length === 0) {
    throw new Error('Invoice IDs must be a non-empty array');
  }

  const placeholders = invoiceIds.map(() => '?').join(',');

  // 1. Fetch invoices
  const invoicesSql = `
    SELECT i.*, o.name as outlet_name, o.governorate, o.address_details, o.phone as outlet_phone
    FROM invoices i
    JOIN outlets o ON o.id = i.outlet_id
    WHERE i.id IN (${placeholders})
    ORDER BY i.created_at DESC
  `;
  const invoices = await db.all(invoicesSql, invoiceIds);

  if (invoices.length === 0) {
    throw new Error('No invoices found matching the provided IDs');
  }

  // 2. Fetch associated items
  for (const inv of invoices) {
    const itemsSql = `
      SELECT ii.*, p.title as product_title, p.code as product_code,
             (SELECT GROUP_CONCAT(a.name, ' | ') 
              FROM authors a 
              JOIN product_authors pa ON pa.author_id = a.id 
              WHERE pa.product_id = p.id) as authors
      FROM invoice_items ii
      JOIN products p ON p.id = ii.product_id
      WHERE ii.invoice_id = ?
    `;
    inv.items = await db.all(itemsSql, [inv.id]);
  }

  // 3. Compile HTML layout
  const htmlContent = buildHtmlContent(invoices);

  // 4. Generate PDF buffer using html-pdf-node
  const file = { content: htmlContent };
  const options = { format: 'A4', printBackground: true };

  return await pdf.generatePdf(file, options);
}

module.exports = {
  generateInvoicesPdf
};
