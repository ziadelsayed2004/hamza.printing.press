const db = require('../../db');
const notificationsService = require('../notifications/notificationsService');


/**
 * Generate installment schedule for an invoice.
 */
async function generateInstallmentSchedule({ invoiceId, totalAmount, installmentsCount, intervalDays = 30, startDate = new Date(), notes = '' }) {
  const count = parseInt(installmentsCount, 10);
  if (isNaN(count) || count <= 0) {
    throw new Error('Installments count must be a positive integer');
  }

  // Delete any existing unpaid installments first
  await db.run('DELETE FROM payment_installments WHERE invoice_id = ?', [invoiceId]);

  const amountPerInstallment = parseFloat((totalAmount / count).toFixed(2));
  const items = [];

  let dateCursor = new Date(startDate);

  for (let i = 1; i <= count; i++) {
    let amount = amountPerInstallment;
    // Adjust the last installment to absorb rounding errors
    if (i === count) {
      const sumPrior = amountPerInstallment * (count - 1);
      amount = parseFloat((totalAmount - sumPrior).toFixed(2));
    }

    const dueDateStr = dateCursor.toISOString();

    const sql = `
      INSERT INTO payment_installments (invoice_id, installment_number, due_date, amount, paid_amount, status, notes)
      VALUES (?, ?, ?, ?, 0.0, 'unpaid', ?)
    `;
    await db.run(sql, [invoiceId, i, dueDateStr, amount, notes || `Installment #${i} of ${count}`]);

    items.push({
      installmentNumber: i,
      dueDate: dueDateStr,
      amount,
      paidAmount: 0,
      status: 'unpaid'
    });

    // Advance cursor date
    dateCursor.setDate(dateCursor.getDate() + intervalDays);
  }

  return items;
}

/**
 * Recalculate invoice payment status and distribute payments to installments.
 */
async function recalculatePaymentMetrics(invoiceId) {
  const invoice = await db.get('SELECT total_price, payment_status, payment_type FROM invoices WHERE id = ?', [invoiceId]);
  if (!invoice) return;

  const payments = await db.all('SELECT amount FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
  const totalPaid = parseFloat(payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2));

  // Determine new payment status
  let newStatus = 'unpaid';
  if (totalPaid >= invoice.total_price) {
    newStatus = 'paid';
  } else if (totalPaid > 0) {
    newStatus = 'partially_paid';
  }

  // Update invoice header status
  if (newStatus !== invoice.payment_status) {
    await db.run('UPDATE invoices SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [newStatus, invoiceId]);
    
    // Log in status history
    await db.run(
      'INSERT INTO invoice_status_history (invoice_id, status_type, old_status, new_status, notes) VALUES (?, ?, ?, ?, ?)',
      [invoiceId, 'payment', invoice.payment_status, newStatus, `Payment status updated to ${newStatus}.`]
    );
  }

  // Distribute totalPaid sequentially to installments
  const installments = await db.all('SELECT * FROM payment_installments WHERE invoice_id = ? ORDER BY installment_number ASC', [invoiceId]);
  if (installments.length > 0) {
    let remainingToDistribute = totalPaid;
    const nowStr = new Date().toISOString();

    for (const inst of installments) {
      let paidAmt = 0;
      let status = 'unpaid';

      if (remainingToDistribute >= inst.amount) {
        paidAmt = inst.amount;
        status = 'paid';
        remainingToDistribute = parseFloat((remainingToDistribute - inst.amount).toFixed(2));
      } else if (remainingToDistribute > 0) {
        paidAmt = remainingToDistribute;
        status = 'partially_paid';
        remainingToDistribute = 0;
      } else {
        paidAmt = 0;
        status = (inst.due_date < nowStr) ? 'overdue' : 'unpaid';
      }

      await db.run(
        'UPDATE payment_installments SET paid_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [paidAmt, status, inst.id]
      );
    }
  }
}

/**
 * Record a payment.
 */
async function recordPayment({ invoiceId, amount, paymentMethod, paymentDate, referenceNumber = '', notes = '', userId }) {
  if (!invoiceId) {
    throw new Error('Invoice ID is required');
  }
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Payment amount must be a positive number');
  }
  if (!paymentMethod) {
    throw new Error('Payment method is required');
  }

  const invoice = await db.get('SELECT total_price, payment_status, outlet_id, invoice_number FROM invoices WHERE id = ?', [invoiceId]);
  if (!invoice) {
    throw new Error(`Invoice with ID ${invoiceId} does not exist`);
  }

  const existingPayments = await db.all('SELECT amount FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
  const currentPaid = existingPayments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = parseFloat((invoice.total_price - currentPaid).toFixed(2));

  if (remaining <= 0) {
    throw new Error('Invoice is already fully paid');
  }
  if (parsedAmount > remaining) {
    throw new Error(`Payment amount exceeds invoice remaining balance. Remaining: ${remaining}`);
  }

  const dateStr = paymentDate || new Date().toISOString();

  await db.exec('BEGIN TRANSACTION;');

  try {
    const sql = `
      INSERT INTO invoice_payments (invoice_id, amount, payment_method, payment_date, reference_number, notes, recorded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.run(sql, [
      invoiceId,
      parsedAmount,
      paymentMethod,
      dateStr,
      referenceNumber.trim() || null,
      notes.trim() || null,
      userId
    ]);
    const paymentId = result.lastID;

    // Recalculate metrics
    await recalculatePaymentMetrics(invoiceId);

    // Record ledger entry
    await db.run(`
      INSERT INTO finance_ledger_entries (
        outlet_id, entry_type, reference_type, reference_id,
        cash_amount, receivable_amount, notes, created_by
      ) VALUES (?, 'payment_recorded', 'payment', ?, ?, ?, ?, ?)
    `, [invoice.outlet_id, paymentId, parsedAmount, -parsedAmount, `Payment for invoice ${invoice.invoice_number} recorded.`, userId]);

    await db.exec('COMMIT;');

    // Trigger notification checks and record payment received info
    try {
      await notificationsService.createOrUpdateNotification({
        category: 'payment_received',
        severity: 'info',
        title: 'تم استلام دفعة مالية',
        message: `تم استلام دفعة بقيمة ${parsedAmount} EGP للفاتورة ${invoice.invoice_number}.`,
        source_type: 'payment',
        source_id: paymentId,
        dedupe_key: `payment_received:${paymentId}`,
        action_url: `/finance/invoices/${invoiceId}`
      });

      await notificationsService.checkOutletCreditLimitNotifications(invoice.outlet_id);
      await notificationsService.checkOverdueInstallmentsNotifications();
    } catch (e) {
      console.error('Error running notification checks on payment recording:', e);
    }

    const newPayment = await db.get('SELECT * FROM invoice_payments WHERE id = ?', [paymentId]);
    return newPayment;
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Reverse/cancel a payment.
 */
async function reversePayment(paymentId, { notes = '', userId }) {
  const payment = await db.get('SELECT * FROM invoice_payments WHERE id = ?', [paymentId]);
  if (!payment) {
    throw new Error(`Payment record with ID ${paymentId} does not exist`);
  }

  // Get invoice details for ledger
  const invoice = await db.get('SELECT outlet_id, invoice_number FROM invoices WHERE id = ?', [payment.invoice_id]);

  await db.exec('BEGIN TRANSACTION;');

  try {
    // Delete payment record
    await db.run('DELETE FROM invoice_payments WHERE id = ?', [paymentId]);

    // Recalculate metrics
    await recalculatePaymentMetrics(payment.invoice_id);

    // Record ledger entry for reversal
    if (invoice) {
      await db.run(`
        INSERT INTO finance_ledger_entries (
          outlet_id, entry_type, reference_type, reference_id,
          cash_amount, receivable_amount, notes, created_by
        ) VALUES (?, 'payment_reversed', 'payment', ?, ?, ?, ?, ?)
      `, [invoice.outlet_id, paymentId, -payment.amount, payment.amount, notes.trim() || `Payment for invoice ${invoice.invoice_number} reversed.`, userId]);
    }

    await db.exec('COMMIT;');

    // Trigger notification checks and resolve/cancel payment received notification
    try {
      if (invoice) {
        await notificationsService.checkOutletCreditLimitNotifications(invoice.outlet_id);
      }
      await notificationsService.checkOverdueInstallmentsNotifications();
      await notificationsService.resolveNotificationByDedupeKey(`payment_received:${paymentId}`);
    } catch (e) {
      console.error('Error running notification checks on payment reversal:', e);
    }

    return { success: true, reversedPaymentId: paymentId, invoiceId: payment.invoice_id };
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Retrieve payments list.
 */
async function getPayments({ limit = 50, offset = 0, invoiceId = null } = {}) {
  let sql = `
    SELECT p.*, i.invoice_number, u.full_name as user_full_name
    FROM invoice_payments p
    JOIN invoices i ON i.id = p.invoice_id
    LEFT JOIN users u ON u.id = p.recorded_by
    WHERE 1=1
  `;
  const params = [];

  if (invoiceId) {
    sql += ` AND p.invoice_id = ?`;
    params.push(invoiceId);
  }

  sql += ` ORDER BY p.payment_date DESC, p.created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await db.all(sql, params);
}

/**
 * Run calculations to set installments past their due date to 'overdue'.
 */
async function checkOverdueInstallments() {
  const nowStr = new Date().toISOString();
  const sql = `
    UPDATE payment_installments
    SET status = 'overdue', updated_at = CURRENT_TIMESTAMP
    WHERE due_date < ? AND status IN ('unpaid', 'partially_paid')
  `;
  const result = await db.run(sql, [nowStr]);
  return result.changes;
}

/**
 * Fetch detailed metrics for an invoice.
 */
async function getPaymentMetrics(invoiceId) {
  const invoice = await db.get(`
    SELECT id, invoice_number, total_price, payment_status, payment_type
    FROM invoices
    WHERE id = ?
  `, [invoiceId]);

  if (!invoice) return null;

  const payments = await db.all('SELECT amount FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
  const paidAmount = parseFloat(payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2));
  const remainingAmount = parseFloat((invoice.total_price - paidAmount).toFixed(2));

  const installments = await db.all('SELECT * FROM payment_installments WHERE invoice_id = ? ORDER BY installment_number ASC', [invoiceId]);
  const overdueCount = installments.filter(i => i.status === 'overdue').length;

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoice_number,
    paymentType: invoice.payment_type,
    totalPrice: invoice.total_price,
    paidAmount,
    remainingAmount,
    paymentStatus: invoice.payment_status,
    overdueCount,
    installments
  };
}

module.exports = {
  generateInstallmentSchedule,
  recordPayment,
  reversePayment,
  getPayments,
  recalculatePaymentMetrics,
  checkOverdueInstallments,
  getPaymentMetrics
};
