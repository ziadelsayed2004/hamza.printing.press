const express = require('express');
const router = express.Router();
const paymentsService = require('./paymentsService');
const { requireAuth, checkPermission } = require('../../middleware/rbac');
const { auditLog } = require('../../middleware/audit');

// 1. GET /api/payments - List and filter payments
router.get('/', requireAuth, checkPermission('payments.view'), async (req, res) => {
  const limit = parseInt(req.query.limit || '50', 10);
  const offset = parseInt(req.query.offset || '0', 10);
  const invoiceId = req.query.invoiceId ? parseInt(req.query.invoiceId, 10) : null;

  try {
    const list = await paymentsService.getPayments({ limit, offset, invoiceId });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 2. POST /api/payments - Record a payment
router.post('/', requireAuth, checkPermission('payments.create'), auditLog('create_payment', 'payments'), async (req, res) => {
  const { invoiceId, amount, paymentMethod, paymentDate, referenceNumber = '', notes = '' } = req.body;

  if (!invoiceId || amount === undefined || !paymentMethod) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invoice ID, amount, and payment method are required.' });
  }

  try {
    const userId = req.session.user.id;
    const payment = await paymentsService.recordPayment({
      invoiceId,
      amount,
      paymentMethod,
      paymentDate,
      referenceNumber,
      notes,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully.',
      payment
    });
  } catch (err) {
    const msg = (err.message || '').toLowerCase();
    if (msg.includes('does not exist')) {
      return res.status(404).json({ error: 'Not Found', message: err.message });
    }
    if (msg.includes('required') || msg.includes('positive') || msg.includes('exceeds') || msg.includes('fully paid')) {
      return res.status(400).json({ error: 'Bad Request', message: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. POST /api/payments/:id/reverse - Reverse/cancel a payment
router.post('/:id/reverse', requireAuth, checkPermission('payments.reverse'), auditLog('reverse_payment', 'payments'), async (req, res) => {
  const paymentId = parseInt(req.params.id, 10);
  const { notes = '' } = req.body;

  try {
    const userId = req.session.user.id;
    const result = await paymentsService.reversePayment(paymentId, { notes, userId });
    res.status(200).json({
      success: true,
      message: 'Payment reversed successfully.',
      ...result
    });
  } catch (err) {
    const msg = (err.message || '').toLowerCase();
    if (msg.includes('does not exist')) {
      return res.status(404).json({ error: 'Not Found', message: err.message });
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 4. POST /api/payments/check-overdue - Run overdue check on installments
router.post('/check-overdue', requireAuth, checkPermission('payments.create'), auditLog('check_overdue_payments', 'payments'), async (req, res) => {
  try {
    const updatedCount = await paymentsService.checkOverdueInstallments();
    res.status(200).json({
      success: true,
      message: 'Overdue installments checked and updated successfully.',
      updatedCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 5. GET /api/payments/invoice/:invoiceId/metrics - Fetch metrics for a specific invoice
router.get('/invoice/:invoiceId/metrics', requireAuth, checkPermission('payments.view'), async (req, res) => {
  const invoiceId = parseInt(req.params.invoiceId, 10);

  try {
    const metrics = await paymentsService.getPaymentMetrics(invoiceId);
    if (!metrics) {
      return res.status(404).json({ error: 'Not Found', message: 'Invoice not found.' });
    }
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

module.exports = router;
