const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { requireAuth, checkPermission } = require('../../middleware/rbac');
const { auditLog } = require('../../middleware/audit');
const config = require('../../config');

// POST /api/admin/backup - Trigger database copy/backup
router.post('/backup', requireAuth, checkPermission('backup.create'), auditLog('create_backup', 'admin'), (req, res) => {
  try {
    const dbFile = config.databasePath;
    const backupDir = config.backupDir;

    if (!fs.existsSync(dbFile)) {
      return res.status(400).json({ error: 'Bad Request', message: 'Source database file does not exist.' });
    }

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup_${timestamp}.sqlite`;
    const backupPath = path.join(backupDir, backupFileName);

    // Copy SQLite database file
    fs.copyFileSync(dbFile, backupPath);

    return res.status(200).json({
      message: 'Database backup successfully created.',
      filename: backupFileName,
      path: backupPath
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

module.exports = router;
