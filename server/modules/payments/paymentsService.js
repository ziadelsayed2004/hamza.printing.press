const db = require('../../db');
const notificationsService = require('../notifications/notificationsService');
const auditService = require('../audit/auditService');


/**
 * Recalculate invoice payment status.
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
}

/**
 * Record a payment collection.
 */
async function recordPayment({ invoiceId, amount, paymentMethod, paymentDate, referenceNumber = '', notes = '', supplyStatus = 'not_supplied', userId }) {
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
  if (!['supplied', 'not_supplied'].includes(supplyStatus)) {
    throw new Error('Invalid supply status');
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
    const isSupplied = supplyStatus === 'supplied';
    const suppliedAt = isSupplied ? new Date().toISOString() : null;
    const suppliedBy = isSupplied ? userId : null;

    const sql = `
      INSERT INTO invoice_payments (invoice_id, amount, payment_method, payment_date, reference_number, notes, recorded_by, supply_status, supplied_at, supplied_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await db.run(sql, [
      invoiceId,
      parsedAmount,
      paymentMethod,
      dateStr,
      referenceNumber.trim() || null,
      notes.trim() || null,
      userId,
      supplyStatus,
      suppliedAt,
      suppliedBy
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

    if (supplyStatus === 'supplied') {
      await db.run(`
        INSERT INTO finance_ledger_entries (
          outlet_id, entry_type, reference_type, reference_id,
          cash_amount, receivable_amount, notes, created_by
        ) VALUES (?, 'payment_supplied', 'payment', ?, 0, 0, ?, ?)
      `, [invoice.outlet_id, paymentId, `Payment marked as supplied upon recording.`, userId]);
    }

    await db.exec('COMMIT;');

    // Trigger notification checks after commit
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
      await notificationsService.checkOutletFinanceNotifications(invoice.outlet_id);
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

    // Trigger notification checks
    try {
      if (invoice) {
        await notificationsService.checkOutletCreditLimitNotifications(invoice.outlet_id);
        await notificationsService.checkOutletFinanceNotifications(invoice.outlet_id);
      }
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
 * Supply a list of payments.
 */
async function supplyPayments({ paymentIds, userId }) {
  if (!paymentIds || !Array.isArray(paymentIds) || paymentIds.length === 0) {
    throw new Error('Payment IDs array is required');
  }

  await db.exec('BEGIN TRANSACTION;');

  try {
    const updatedPayments = [];
    const outletIds = new Set();

    for (const paymentId of paymentIds) {
      const payment = await db.get('SELECT p.*, i.outlet_id FROM invoice_payments p JOIN invoices i ON i.id = p.invoice_id WHERE p.id = ?', [paymentId]);
      if (!payment) {
        throw new Error(`Payment record with ID ${paymentId} does not exist`);
      }
      if (payment.supply_status === 'supplied') {
        continue;
      }

      await db.run(
        'UPDATE invoice_payments SET supply_status = "supplied", supplied_at = ?, supplied_by = ? WHERE id = ?',
        [new Date().toISOString(), userId, paymentId]
      );

      await db.run(`
        INSERT INTO finance_ledger_entries (
          outlet_id, entry_type, reference_type, reference_id,
          cash_amount, receivable_amount, notes, created_by
        ) VALUES (?, 'payment_supplied', 'payment', ?, 0, 0, 'Payment marked as supplied.', ?)
      `, [payment.outlet_id, paymentId, userId]);

      await auditService.log({
        userId,
        action: 'supply_payment',
        targetType: 'payments',
        targetId: paymentId.toString(),
        details: { amount: payment.amount }
      });

      if (payment.outlet_id) {
        outletIds.add(payment.outlet_id);
      }
      updatedPayments.push(paymentId);
    }

    await db.exec('COMMIT;');

    for (const oId of outletIds) {
      try {
        await notificationsService.checkOutletFinanceNotifications(oId);
      } catch (e) {
        console.error('Error checking finance notifications after supply:', e);
      }
    }

    return { success: true, suppliedCount: updatedPayments.length, paymentIds: updatedPayments };
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Reverse a payment supply.
 */
async function reversePaymentSupply(paymentId, { notes = '', userId }) {
  const payment = await db.get('SELECT p.*, i.outlet_id FROM invoice_payments p JOIN invoices i ON i.id = p.invoice_id WHERE p.id = ?', [paymentId]);
  if (!payment) {
    throw new Error(`Payment record with ID ${paymentId} does not exist`);
  }
  if (payment.supply_status !== 'supplied') {
    throw new Error('Payment is not supplied');
  }

  await db.exec('BEGIN TRANSACTION;');

  try {
    await db.run('UPDATE invoice_payments SET supply_status = "not_supplied", supplied_at = NULL, supplied_by = NULL WHERE id = ?', [paymentId]);

    await db.run(`
      INSERT INTO finance_ledger_entries (
        outlet_id, entry_type, reference_type, reference_id,
        cash_amount, receivable_amount, notes, created_by
      ) VALUES (?, 'supply_reversed', 'payment', ?, 0, 0, ?, ?)
    `, [payment.outlet_id, paymentId, notes.trim() || 'Payment supply reversed.', userId]);

    await auditService.log({
      userId,
      action: 'reverse_supply_payment',
      targetType: 'payments',
      targetId: paymentId.toString(),
      details: { amount: payment.amount }
    });

    await db.exec('COMMIT;');

    try {
      await notificationsService.checkOutletFinanceNotifications(payment.outlet_id);
    } catch (e) {
      console.error('Error checking finance notifications after supply reversal:', e);
    }

    return { success: true, paymentId };
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Retrieve payments list.
 */
async function getPayments({ limit = 50, offset = 0, invoiceId = null, outletIds = null, supplyStatus = '', startDate = '', endDate = '' } = {}) {
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

  if (supplyStatus) {
    sql += ` AND p.supply_status = ?`;
    params.push(supplyStatus);
  }

  if (startDate) {
    sql += ` AND p.payment_date >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    sql += ` AND p.payment_date <= ?`;
    params.push(endDate);
  }

  if (outletIds && outletIds.length > 0) {
    sql += ` AND i.outlet_id IN (${outletIds.map(() => '?').join(',')})`;
    params.push(...outletIds);
  } else if (outletIds) {
    sql += ` AND 0=1`;
  }

  sql += ` ORDER BY p.payment_date DESC, p.created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await db.all(sql, params);
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

  const payments = await db.all('SELECT amount, supply_status FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
  const paidAmount = parseFloat(payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2));
  const remainingAmount = parseFloat((invoice.total_price - paidAmount).toFixed(2));

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoice_number,
    paymentType: invoice.payment_type,
    totalPrice: invoice.total_price,
    paidAmount,
    remainingAmount,
    paymentStatus: invoice.payment_status,
    installments: []
  };
}

module.exports = {
  recordPayment,
  reversePayment,
  supplyPayments,
  reversePaymentSupply,
  getPayments,
  recalculatePaymentMetrics,
  getPaymentMetrics
};
