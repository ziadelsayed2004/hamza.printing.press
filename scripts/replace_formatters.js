const fs = require('fs');
const path = require('path');

const clientPagesDir = path.resolve(__dirname, '../client/src/pages');

const fileReplacements = {
  'Dashboard.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDateTime, formatEgyptDate } from '../utils/formatters';",
    replacements: [
      {
        target: "value: financials ? `${financials.totalSales.toLocaleString()} ل.س` : '0 ل.س',",
        replace: "value: financials ? formatCurrencyEGP(financials.totalSales) : '0.00 ج.م',"
      },
      {
        target: "value: financials ? `${financials.totalPaid.toLocaleString()} ل.س` : '0 ل.س',",
        replace: "value: financials ? formatCurrencyEGP(financials.totalPaid) : '0.00 ج.م',"
      },
      {
        target: "value: financials ? `${financials.totalRemaining.toLocaleString()} ل.س` : '0 ل.س',",
        replace: "value: financials ? formatCurrencyEGP(financials.totalRemaining) : '0.00 ج.م',"
      }
    ]
  },
  'Reports.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDateTime, formatEgyptDate } from '../utils/formatters';",
    replacements: [
      {
        target: "{summaryData.totalSales.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(summaryData.totalSales)}"
      },
      {
        target: "{summaryData.totalPaid.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(summaryData.totalPaid)}"
      },
      {
        target: "{summaryData.totalRemaining.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(summaryData.totalRemaining)}"
      },
      {
        target: "{row.creditLimit ? `${row.creditLimit.toLocaleString()} ل.س` : 'مفتوح'}",
        replace: "{row.creditLimit ? formatCurrencyEGP(row.creditLimit) : 'مفتوح'}"
      },
      {
        target: "{row.totalSales.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(row.totalSales)}"
      },
      {
        target: "{row.totalPaid.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(row.totalPaid)}"
      },
      {
        target: "{row.remainingAmount.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(row.remainingAmount)}"
      },
      {
        target: "{row.totalCost.toLocaleString()} ل.س",
        replace: "{formatCurrencyEGP(row.totalCost)}"
      }
    ]
  },
  'Shipments.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDate, formatEgyptDateTime } from '../utils/formatters';",
    replacements: [
      {
        target: "row.shipped_at ? new Date(row.shipped_at).toLocaleDateString('ar-JO') : '—'",
        replace: "row.shipped_at ? formatEgyptDate(row.shipped_at) : '—'"
      },
      {
        target: "row.delivered_at ? new Date(row.delivered_at).toLocaleDateString('ar-JO') : '—'",
        replace: "row.delivered_at ? formatEgyptDate(row.delivered_at) : '—'"
      },
      {
        target: "{parseFloat(item.unit_price).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(item.unit_price)}"
      },
      {
        target: "h.created_at ? new Date(h.created_at).toLocaleString('ar-JO') : '—'",
        replace: "h.created_at ? formatEgyptDateTime(h.created_at) : '—'"
      }
    ]
  },
  'Products.jsx': {
    imports: "import { formatCurrencyEGP } from '../utils/formatters';",
    replacements: [
      {
        target: "{parseFloat(pr.price).toFixed(2)} دينار",
        replace: "{formatCurrencyEGP(pr.price)}"
      }
    ]
  },
  'Payments.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDate } from '../utils/formatters';",
    replacements: [
      {
        target: "{payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0))}"
      },
      {
        target: "? new Date(row.payment_date).toLocaleDateString('ar-JO')",
        replace: "? formatEgyptDate(row.payment_date)"
      },
      {
        target: "{parseFloat(row.amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(row.amount)}"
      },
      {
        target: "{parseFloat(payFormMetrics.totalPrice).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(payFormMetrics.totalPrice)}"
      },
      {
        target: "{parseFloat(payFormMetrics.paidAmount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(payFormMetrics.paidAmount)}"
      },
      {
        target: "المتبقي: {parseFloat(payFormMetrics.remainingAmount).toFixed(2)} د.أ",
        replace: "المتبقي: {formatCurrencyEGP(payFormMetrics.remainingAmount)}"
      },
      {
        target: "`الحد الأقصى المسموح: ${parseFloat(payFormMetrics.remainingAmount).toFixed(2)} د.أ`",
        replace: "`الحد الأقصى المسموح: ${formatCurrencyEGP(payFormMetrics.remainingAmount)}`"
      },
      {
        target: "{parseFloat(reversePaymentTarget.amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(reversePaymentTarget.amount)}"
      },
      {
        target: "{parseFloat(metricsData.totalPrice).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(metricsData.totalPrice)}"
      },
      {
        target: "المسدد: {parseFloat(metricsData.paidAmount).toFixed(2)} د.أ",
        replace: "المسدد: {formatCurrencyEGP(metricsData.paidAmount)}"
      },
      {
        target: "المتبقي: {parseFloat(metricsData.remainingAmount).toFixed(2)} د.أ",
        replace: "المتبقي: {formatCurrencyEGP(metricsData.remainingAmount)}"
      },
      {
        target: "{new Date(inst.due_date).toLocaleDateString('ar-JO')}",
        replace: "{formatEgyptDate(inst.due_date)}"
      },
      {
        target: "{parseFloat(inst.amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(inst.amount)}"
      },
      {
        target: "{parseFloat(inst.paid_amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(inst.paid_amount)}"
      }
    ]
  },
  'Outlets.jsx': {
    imports: "import { formatCurrencyEGP } from '../utils/formatters';",
    replacements: [
      {
        target: "{parseFloat(outlet.credit_limit || 0).toFixed(2)} دينار",
        replace: "{formatCurrencyEGP(outlet.credit_limit || 0)}"
      }
    ]
  },
  'Invoices.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDate, formatEgyptDateTime } from '../utils/formatters';",
    replacements: [
      {
        target: "{new Date(row.created_at).toLocaleDateString('ar-JO')}",
        replace: "{formatEgyptDate(row.created_at)}"
      },
      {
        target: "{parseFloat(row.total_price).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(row.total_price)}"
      },
      {
        target: "{parseFloat(row.paid_amount || 0).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(row.paid_amount || 0)}"
      },
      {
        target: "{parseFloat(row.remaining_amount || 0).toFixed(2)} د.أ متبقي",
        replace: "{formatCurrencyEGP(row.remaining_amount || 0)} متبقي"
      },
      {
        target: "<Typography variant=\"body1\">{new Date(detailsInvoice.created_at).toLocaleString('ar-JO')}</Typography>",
        replace: "<Typography variant=\"body1\">{formatEgyptDateTime(detailsInvoice.created_at)}</Typography>"
      },
      {
        target: "<TableCell align=\"right\">{parseFloat(item.unit_price).toFixed(2)} د.أ</TableCell>",
        replace: "<TableCell align=\"right\">{formatCurrencyEGP(item.unit_price)}</TableCell>"
      },
      {
        target: "<TableCell align=\"right\" sx={{ color: 'error.main' }}>-{parseFloat(item.discount || 0).toFixed(2)} د.أ</TableCell>",
        replace: "<TableCell align=\"right\" sx={{ color: 'error.main' }}>-{formatCurrencyEGP(item.discount || 0)}</TableCell>"
      },
      {
        target: "<TableCell align=\"right\" sx={{ fontWeight: 'bold' }}>{parseFloat(item.total_price).toFixed(2)} د.أ</TableCell>",
        replace: "<TableCell align=\"right\" sx={{ fontWeight: 'bold' }}>{formatCurrencyEGP(item.total_price)}</TableCell>"
      },
      {
        target: "<Typography variant=\"body2\">{parseFloat(detailsInvoice.subtotal || 0).toFixed(2)} د.أ</Typography>",
        replace: "<Typography variant=\"body2\">{formatCurrencyEGP(detailsInvoice.subtotal || 0)}</Typography>"
      },
      {
        target: "<Typography variant=\"body2\">+{parseFloat(detailsInvoice.shipping_cost || 0).toFixed(2)} د.أ</Typography>",
        replace: "<Typography variant=\"body2\">+{formatCurrencyEGP(detailsInvoice.shipping_cost || 0)}</Typography>"
      },
      {
        target: "-{parseFloat(detailsInvoice.discount || 0).toFixed(2)} د.أ",
        replace: "-{formatCurrencyEGP(detailsInvoice.discount || 0)}"
      },
      {
        target: "{parseFloat(detailsInvoice.total_price).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(detailsInvoice.total_price)}"
      },
      {
        target: "{parseFloat(detailsInvoice.paid_amount || 0).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(detailsInvoice.paid_amount || 0)}"
      },
      {
        target: "{parseFloat(detailsInvoice.remaining_amount || 0).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(detailsInvoice.remaining_amount || 0)}"
      },
      {
        target: "<TableCell>{new Date(p.payment_date).toLocaleDateString('ar-JO')}</TableCell>",
        replace: "<TableCell>{formatEgyptDate(p.payment_date)}</TableCell>"
      },
      {
        target: "{parseFloat(p.amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(p.amount)}"
      },
      {
        target: "<TableCell>{new Date(inst.due_date).toLocaleDateString('ar-JO')}</TableCell>",
        replace: "<TableCell>{formatEgyptDate(inst.due_date)}</TableCell>"
      },
      {
        target: "{parseFloat(inst.amount).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(inst.amount)}"
      },
      {
        target: "{inst.paid_date ? new Date(inst.paid_date).toLocaleDateString('ar-JO') : '-'}",
        replace: "{inst.paid_date ? formatEgyptDate(inst.paid_date) : '-'}"
      },
      {
        target: "<TableCell>{new Date(h.created_at).toLocaleString('ar-JO')}</TableCell>",
        replace: "<TableCell>{formatEgyptDateTime(h.created_at)}</TableCell>"
      },
      {
        target: "value={item.price ? `${item.price.toFixed(2)} د.أ` : '0.00 د.أ'}",
        replace: "value={item.price ? formatCurrencyEGP(item.price) : '0.00 ج.م'}"
      },
      {
        target: "{parseFloat(item.quantity * item.price).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(item.quantity * item.price)}"
      },
      {
        target: "<Typography variant=\"body2\">+{parseFloat(formShippingCost || 0).toFixed(2)} د.أ</Typography>",
        replace: "<Typography variant=\"body2\">+{formatCurrencyEGP(formShippingCost || 0)}</Typography>"
      },
      {
        target: "-{parseFloat(formDiscount || 0).toFixed(2)} د.أ",
        replace: "-{formatCurrencyEGP(formDiscount || 0)}"
      }
    ]
  },
  'Inventory.jsx': {
    imports: "import { formatCurrencyEGP, formatEgyptDate } from '../utils/formatters';",
    replacements: [
      {
        target: "row.created_at ? new Date(row.created_at).toLocaleDateString('ar-JO') : '—'",
        replace: "row.created_at ? formatEgyptDate(row.created_at) : '—'"
      },
      {
        target: "row.received_date ? new Date(row.received_date).toLocaleDateString('ar-JO') : '—'",
        replace: "row.received_date ? formatEgyptDate(row.received_date) : '—'"
      },
      {
        target: "receiptDetail.received_date ? new Date(receiptDetail.received_date).toLocaleDateString('ar-JO') : '—'",
        replace: "receiptDetail.received_date ? formatEgyptDate(receiptDetail.received_date) : '—'"
      },
      {
        target: "<TableCell align=\"right\">{parseFloat(item.unit_cost).toFixed(2)} د.أ</TableCell>",
        replace: "<TableCell align=\"right\">{formatCurrencyEGP(item.unit_cost)}</TableCell>"
      },
      {
        target: "{(parseFloat(item.unit_cost) * item.quantity).toFixed(2)} د.أ",
        replace: "{formatCurrencyEGP(parseFloat(item.unit_cost) * item.quantity)}"
      }
    ]
  },
  'Users.jsx': {
    imports: "import { formatEgyptDate } from '../utils/formatters';",
    replacements: [
      {
        target: "{new Date(u.created_at).toLocaleDateString('ar-EG')}",
        replace: "{formatEgyptDate(u.created_at)}"
      }
    ]
  },
  'AuditLogs.jsx': {
    imports: "import { formatEgyptDateTime } from '../utils/formatters';",
    replacements: [
      {
        target: "{new Date(log.created_at).toLocaleString('ar-EG')}",
        replace: "{formatEgyptDateTime(log.created_at)}"
      }
    ]
  }
};

for (const [filename, info] of Object.entries(fileReplacements)) {
  const filePath = path.join(clientPagesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filename} not found at ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Apply replacements
  let modified = false;
  for (const rep of info.replacements) {
    if (content.includes(rep.target)) {
      content = content.split(rep.target).join(rep.replace);
      modified = true;
      console.log(`Replaced in ${filename}: "${rep.target}" -> "${rep.replace}"`);
    } else {
      console.warn(`Could not find in ${filename}: "${rep.target}"`);
    }
  }
  
  // 2. Add import right after React import
  if (modified) {
    if (!content.includes('../utils/formatters')) {
      const reactImport = "import React";
      if (content.includes(reactImport)) {
        // Find index of end of line containing React import
        const lines = content.split('\n');
        const reactIdx = lines.findIndex(l => l.includes(reactImport));
        if (reactIdx !== -1) {
          lines.splice(reactIdx + 1, 0, info.imports);
          content = lines.join('\n');
          console.log(`Added import to ${filename}`);
        }
      } else {
        // Prepended at start of file
        content = info.imports + '\n' + content;
        console.log(`Prepended import to ${filename}`);
      }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Saved ${filename}`);
  }
}

console.log("Replacements execution finished.");
