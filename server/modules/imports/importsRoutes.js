const express = require('express');
const router = express.Router();
const db = require('../../db');
const importsService = require('./importsService');
const { requireAuth, checkPermission } = require('../../middleware/rbac');

// 1. GET /api/imports/templates/:type - Download import template
router.get('/templates/:type', requireAuth, checkPermission('imports.run'), (req, res) => {
  const { type } = req.params;
  try {
    const csv = importsService.getTemplate(type);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${type}_import_template.csv"`);
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

// 2. POST /api/imports/jobs - Upload CSV and create/run validation job
router.post('/jobs', requireAuth, checkPermission('imports.run'), async (req, res) => {
  const { type, filename, csvContent } = req.body;
  if (!type || !filename || csvContent === undefined) {
    return res.status(400).json({ error: 'Bad Request', message: 'type, filename, and csvContent are required' });
  }

  try {
    const job = await importsService.createJob({ type, filename, userId: req.session.user.id });
    await importsService.validateAndQueueRows(job.id, type, csvContent);
    const updatedJob = await db.get('SELECT * FROM import_jobs WHERE id = ?', [job.id]);
    return res.status(201).json(updatedJob);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. GET /api/imports/jobs/:id - Get import job status and details
router.get('/jobs/:id', requireAuth, checkPermission('imports.run'), async (req, res) => {
  const { id } = req.params;
  try {
    const job = await db.get('SELECT * FROM import_jobs WHERE id = ?', [id]);
    if (!job) {
      return res.status(404).json({ error: 'Not Found', message: 'Import job not found' });
    }
    const rows = await db.all('SELECT * FROM import_job_rows WHERE job_id = ? ORDER BY row_index ASC', [id]);
    // Parse JSON values for client convenience
    const parsedRows = rows.map(r => ({
      ...r,
      row_data: JSON.parse(r.row_data),
      errors: JSON.parse(r.errors)
    }));
    return res.status(200).json({ job, rows: parsedRows });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 4. POST /api/imports/jobs/:id/commit - Commit job to active business tables
router.post('/jobs/:id/commit', requireAuth, checkPermission('imports.run'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await importsService.commitJob(id, req.session.user.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

// 5. GET /api/imports/jobs/:id/errors - Download error report CSV sheet
router.get('/jobs/:id/errors', requireAuth, checkPermission('imports.run'), async (req, res) => {
  const { id } = req.params;
  try {
    const csv = await importsService.getErrorCsv(id);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="import_errors.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

module.exports = router;
