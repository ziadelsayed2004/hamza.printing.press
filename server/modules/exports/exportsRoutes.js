const express = require('express');
const router = express.Router();
const exportsService = require('./exportsService');
const { requireAuth, checkPermission } = require('../../middleware/rbac');

// Helper to handle sending CSV downloads
function sendCsvDownload(res, filename, csvContent) {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.status(200).send(csvContent);
}

// 1. GET /api/exports/products - Export products catalog
router.get('/products', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportProducts();
    sendCsvDownload(res, 'products_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 2. GET /api/exports/prices - Export price sheets
router.get('/prices', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportPrices();
    sendCsvDownload(res, 'prices_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. GET /api/exports/authors - Export authors list
router.get('/authors', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportAuthors();
    sendCsvDownload(res, 'authors_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 4. GET /api/exports/outlets - Export outlets listing
router.get('/outlets', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportOutlets();
    sendCsvDownload(res, 'outlets_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 5. GET /api/exports/invoices - Export invoice records
router.get('/invoices', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportInvoices();
    sendCsvDownload(res, 'invoices_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 6. GET /api/exports/payments - Export recorded payments history
router.get('/payments', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportPayments();
    sendCsvDownload(res, 'payments_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 7. GET /api/exports/inventory - Export transaction ledger
router.get('/inventory', requireAuth, checkPermission('exports.run'), async (req, res) => {
  try {
    const csv = await exportsService.exportInventory();
    sendCsvDownload(res, 'inventory_export.csv', csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 8. GET /api/exports/reports - Export dynamic report sheets (balances, stock, authors, receipts)
router.get('/reports', requireAuth, checkPermission('exports.run'), async (req, res) => {
  const { type } = req.query;
  if (!type || !['balances', 'stock', 'authors', 'receipts'].includes(type)) {
    return res.status(400).json({ error: 'Bad Request', message: 'Valid report type is required (balances, stock, authors, receipts).' });
  }

  try {
    const csv = await exportsService.exportReport(type);
    sendCsvDownload(res, `${type}_report_export.csv`, csv);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

module.exports = router;
