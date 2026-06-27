const db = require('../../db');
const notificationsService = require('../notifications/notificationsService');


/**
 * Create a new outlet.
 */
async function createOutlet({ name, outletTypeId, governorate, addressDetails = '', phone = '', creditLimit = 0, status = 'active', notes = '' }) {
  if (!name || !outletTypeId || !governorate) {
    throw new Error('Name, outlet type ID, and governorate are required');
  }
  const sql = `
    INSERT INTO outlets (name, outlet_type_id, governorate, address_details, phone, credit_limit, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.run(sql, [name.trim(), outletTypeId, governorate.trim(), addressDetails, phone, creditLimit, status, notes]);
  return { id: result.lastID, name, outletTypeId, governorate, addressDetails, phone, creditLimit, status, notes };
}

/**
 * Update an existing outlet.
 */
async function updateOutlet(id, { name, outletTypeId, governorate, addressDetails, phone, creditLimit, status, notes }) {
  if (!name || !outletTypeId || !governorate) {
    throw new Error('Name, outlet type ID, and governorate are required');
  }
  if (!['active', 'disabled'].includes(status)) {
    throw new Error('Invalid status');
  }
  const sql = `
    UPDATE outlets
    SET name = ?, outlet_type_id = ?, governorate = ?, address_details = ?, phone = ?, credit_limit = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const result = await db.run(sql, [name.trim(), outletTypeId, governorate.trim(), addressDetails, phone, creditLimit, status, notes, id]);
  
  // Trigger notification check for the outlet credit limit after update
  try {
    await notificationsService.checkOutletCreditLimitNotifications(id);
  } catch (e) {
    console.error('Error running checkOutletCreditLimitNotifications on outlet update:', e);
  }

  return result.changes > 0;
}

/**
 * Find outlet by ID (joining with outlet_types to return type name).
 */
async function findById(id) {
  const sql = `
    SELECT o.*, ot.name as outlet_type_name
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    WHERE o.id = ?
  `;
  return await db.get(sql, [id]);
}

/**
 * Retrieve all outlets with filters.
 */
async function getAll({ limit = 50, offset = 0, search = '', governorate = '', outletTypeId = null, status = '' } = {}) {
  let sql = `
    SELECT o.*, ot.name as outlet_type_name
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    sql += ` AND (o.name LIKE ? OR o.phone LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term);
  }
  if (governorate) {
    sql += ` AND o.governorate = ?`;
    params.push(governorate);
  }
  if (outletTypeId) {
    sql += ` AND o.outlet_type_id = ?`;
    params.push(outletTypeId);
  }
  if (status) {
    sql += ` AND o.status = ?`;
    params.push(status);
  }

  sql += ` ORDER BY o.name ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await db.all(sql, params);
}

/**
 * Update outlet status.
 */
async function updateStatus(id, status) {
  if (!['active', 'disabled'].includes(status)) {
    throw new Error('Invalid status');
  }
  const sql = `UPDATE outlets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const result = await db.run(sql, [status, id]);
  return result.changes > 0;
}

async function deleteOutlet(id) {
  const result = await db.run('DELETE FROM outlets WHERE id = ?', [id]);
  return result.changes > 0;
}

module.exports = {
  createOutlet,
  updateOutlet,
  findById,
  getAll,
  updateStatus,
  deleteOutlet
};
