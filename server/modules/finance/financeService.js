const db = require('../../db');
const paymentsService = require('../payments/paymentsService');

/**
 * Record a manual financial adjustment (deposit, withdrawal, or receivable credit/debit adjustment).
 */
async function recordManualAdjustment({ outletId, amount, adjustmentType, notes, userId }) {
  if (!outletId) {
    throw new Error('Outlet ID is required');
  }
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Amount must be a positive number');
  }
  if (!adjustmentType || !['deposit', 'withdrawal', 'credit_adjustment', 'debit_adjustment'].includes(adjustmentType)) {
    throw new Error('Invalid adjustment type');
  }
  if (!notes || notes.trim() === '') {
    throw new Error('Notes/Reason is required for manual adjustments');
  }

  const outlet = await db.get('SELECT id FROM outlets WHERE id = ?', [outletId]);
  if (!outlet) {
    throw new Error(`Outlet with ID ${outletId} does not exist`);
  }

  await db.exec('BEGIN TRANSACTION;');

  try {
    let signedAmount = parsedAmount;
    if (adjustmentType === 'withdrawal' || adjustmentType === 'credit_adjustment') {
      signedAmount = -parsedAmount;
    }

    const adjSql = `
      INSERT INTO manual_adjustments (outlet_id, amount, adjustment_type, notes, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;
    const adjResult = await db.run(adjSql, [outletId, signedAmount, adjustmentType, notes.trim(), userId]);
    const adjId = adjResult.lastID;

    let cashImpact = 0;
    let receivableImpact = 0;

    if (adjustmentType === 'deposit') {
      cashImpact = parsedAmount;
    } else if (adjustmentType === 'withdrawal') {
      cashImpact = -parsedAmount;
    } else if (adjustmentType === 'credit_adjustment') {
      receivableImpact = -parsedAmount;
    } else if (adjustmentType === 'debit_adjustment') {
      receivableImpact = parsedAmount;
    }

    await db.run(`
      INSERT INTO finance_ledger_entries (
        outlet_id, entry_type, reference_type, reference_id,
        cash_amount, receivable_amount, notes, created_by
      ) VALUES (?, 'manual_adjustment', 'manual', ?, ?, ?, ?, ?)
    `, [outletId, adjId, cashImpact, receivableImpact, notes.trim(), userId]);

    await db.exec('COMMIT;');
    return {
      id: adjId,
      outletId,
      amount: signedAmount,
      adjustmentType,
      notes: notes.trim(),
      createdBy: userId
    };
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Fetch overview finance metrics.
 */
async function getFinanceSummary() {
  // Sync overdue installments
  await paymentsService.checkOverdueInstallments();

  const totalInvoicesRow = await db.get(`
    SELECT COALESCE(SUM(total_price), 0) as total 
    FROM invoices 
    WHERE payment_status != 'cancelled'
  `);

  const ledgerRow = await db.get(`
    SELECT 
      COALESCE(SUM(cash_amount), 0) as totalCollected,
      COALESCE(SUM(receivable_amount), 0) as totalReceivables
    FROM finance_ledger_entries
  `);

  const overdueRow = await db.get(`
    SELECT COALESCE(SUM(amount - paid_amount), 0) as totalOverdue 
    FROM payment_installments 
    WHERE status = 'overdue' OR (due_date < datetime('now') AND status IN ('unpaid', 'partially_paid'))
  `);

  return {
    totalInvoices: totalInvoicesRow.total,
    totalCollected: ledgerRow.totalCollected,
    totalReceivables: ledgerRow.totalReceivables,
    totalOverdue: overdueRow.totalOverdue
  };
}

/**
 * Retrieve finance ledger entries history.
 */
async function getLedgerHistory({ limit = 50, offset = 0, outletId = null, startDate = '', endDate = '', entryType = '' } = {}) {
  let sql = `
    SELECT fle.*, o.name as outlet_name, u.full_name as user_full_name
    FROM finance_ledger_entries fle
    JOIN outlets o ON o.id = fle.outlet_id
    LEFT JOIN users u ON u.id = fle.created_by
    WHERE 1=1
  `;
  const params = [];

  if (outletId) {
    sql += ` AND fle.outlet_id = ?`;
    params.push(outletId);
  }
  if (startDate) {
    sql += ` AND fle.created_at >= ?`;
    params.push(startDate);
  }
  if (endDate) {
    sql += ` AND fle.created_at <= ?`;
    params.push(endDate);
  }
  if (entryType) {
    sql += ` AND fle.entry_type = ?`;
    params.push(entryType);
  }

  sql += ` ORDER BY fle.created_at DESC, fle.id DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await db.all(sql, params);
}

/**
 * Group balances by outlet.
 */
async function getBalancesByOutlet() {
  const sql = `
    SELECT 
      o.id, 
      o.name, 
      o.governorate, 
      ot.name as outlet_type_name,
      COALESCE(SUM(fle.cash_amount), 0) as collected_balance,
      COALESCE(SUM(fle.receivable_amount), 0) as receivable_balance
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    LEFT JOIN finance_ledger_entries fle ON fle.outlet_id = o.id
    GROUP BY o.id
    ORDER BY o.name ASC
  `;
  return await db.all(sql);
}

/**
 * Group balances by governorate.
 */
async function getBalancesByGovernorate() {
  const sql = `
    SELECT 
      o.governorate,
      COALESCE(SUM(fle.cash_amount), 0) as collected_balance,
      COALESCE(SUM(fle.receivable_amount), 0) as receivable_balance
    FROM outlets o
    LEFT JOIN finance_ledger_entries fle ON fle.outlet_id = o.id
    GROUP BY o.governorate
    ORDER BY o.governorate ASC
  `;
  return await db.all(sql);
}

/**
 * Group balances by outlet type.
 */
async function getBalancesByOutletType() {
  const sql = `
    SELECT 
      ot.id,
      ot.name as outlet_type_name,
      COALESCE(SUM(fle.cash_amount), 0) as collected_balance,
      COALESCE(SUM(fle.receivable_amount), 0) as receivable_balance
    FROM outlet_types ot
    LEFT JOIN outlets o ON o.outlet_type_id = ot.id
    LEFT JOIN finance_ledger_entries fle ON fle.outlet_id = o.id
    GROUP BY ot.id
    ORDER BY ot.name ASC
  `;
  return await db.all(sql);
}

module.exports = {
  recordManualAdjustment,
  getFinanceSummary,
  getLedgerHistory,
  getBalancesByOutlet,
  getBalancesByGovernorate,
  getBalancesByOutletType
};
