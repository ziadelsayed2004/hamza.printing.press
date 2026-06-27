const express = require('express');
const router = express.Router();
const financeService = require('./financeService');
const { requireAuth, checkPermission } = require('../../middleware/rbac');
const { auditLog } = require('../../middleware/audit');

// 1. GET /api/finance/summary - Fetch general finance overview
router.get('/summary', requireAuth, checkPermission('finance.view'), async (req, res) => {
  try {
    const summary = await financeService.getFinanceSummary();
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 2. GET /api/finance/balances/history - Fetch finance ledger entry logs
router.get('/balances/history', requireAuth, checkPermission('finance.view'), async (req, res) => {
  const limit = parseInt(req.query.limit || '50', 10);
  const offset = parseInt(req.query.offset || '0', 10);
  const outletId = req.query.outletId ? parseInt(req.query.outletId, 10) : null;
  const entryType = req.query.entryType || '';
  const startDate = req.query.startDate || '';
  const endDate = req.query.endDate || '';

  try {
    const history = await financeService.getLedgerHistory({
      limit,
      offset,
      outletId,
      startDate,
      endDate,
      entryType
    });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. POST /api/finance/manual-adjustments - Record a manual cash or receivable adjustment
router.post('/manual-adjustments', requireAuth, checkPermission('finance.adjust'), auditLog('manual_finance_adjustment', 'finance'), async (req, res) => {
  const { outletId, amount, adjustmentType, notes } = req.body;

  if (!outletId || amount === undefined || !adjustmentType || !notes) {
    return res.status(400).json({ error: 'Bad Request', message: 'outletId, amount, adjustmentType, and notes are required.' });
  }

  try {
    const userId = req.session.user.id;
    const adjustment = await financeService.recordManualAdjustment({
      outletId,
      amount,
      adjustmentType,
      notes,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Manual adjustment recorded successfully.',
      adjustment
    });
  } catch (err) {
    const msg = (err.message || '').toLowerCase();
    if (msg.includes('required') || msg.includes('positive') || msg.includes('invalid') || msg.includes('not exist')) {
      return res.status(400).json({ error: 'Bad Request', message: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 4. GET /api/finance/outlets - Get balances by outlet
router.get('/outlets', requireAuth, checkPermission('finance.view'), async (req, res) => {
  try {
    const balances = await financeService.getBalancesByOutlet();
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 5. GET /api/finance/governorates - Get balances by governorate
router.get('/governorates', requireAuth, checkPermission('finance.view'), async (req, res) => {
  try {
    const balances = await financeService.getBalancesByGovernorate();
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 6. GET /api/finance/outlet-types - Get balances by outlet type
router.get('/outlet-types', requireAuth, checkPermission('finance.view'), async (req, res) => {
  try {
    const balances = await financeService.getBalancesByOutletType();
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

module.exports = router;
