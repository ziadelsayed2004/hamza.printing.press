const db = require('../../db');
const notificationsService = require('../notifications/notificationsService');


/**
 * Create a new outlet.
 */
async function createOutlet({ name, outletTypeId, governorate, addressDetails = '', phone = '', creditLimit = 0, status = 'active', notes = '', userId = null }) {
  if (!name || !outletTypeId || !governorate) {
    throw new Error('Name, outlet type ID, and governorate are required');
  }
  const sql = `
    INSERT INTO outlets (name, outlet_type_id, governorate, address_details, phone, credit_limit, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.run(sql, [name.trim(), outletTypeId, governorate.trim(), addressDetails, phone, creditLimit, status, notes]);
  const outletId = result.lastID;
  if (userId) {
    await db.run('INSERT INTO outlet_users (outlet_id, user_id) VALUES (?, ?)', [outletId, userId]);
  }
  return { id: outletId, name, outletTypeId, governorate, addressDetails, phone, creditLimit, status, notes, userId };
}

/**
 * Update an existing outlet.
 */
async function updateOutlet(id, { name, outletTypeId, governorate, addressDetails, phone, creditLimit, status, notes, userId = null }) {
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
  
  await db.run('DELETE FROM outlet_users WHERE outlet_id = ?', [id]);
  if (userId) {
    await db.run('INSERT INTO outlet_users (outlet_id, user_id) VALUES (?, ?)', [id, userId]);
  }

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
    SELECT o.*, ot.name as outlet_type_name, ou.user_id, u.username as linked_username
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    LEFT JOIN outlet_users ou ON ou.outlet_id = o.id
    LEFT JOIN users u ON u.id = ou.user_id
    WHERE o.id = ?
  `;
  const row = await db.get(sql, [id]);
  if (row) {
    row.userId = row.user_id;
    delete row.user_id;
  }
  return row;
}

/**
 * Retrieve all outlets with filters.
 */
async function getAll({ limit = 50, offset = 0, search = '', governorate = '', outletTypeId = null, status = '', userId = null } = {}) {
  let sql = `
    SELECT o.*, ot.name as outlet_type_name, ou.user_id, u.username as linked_username
    FROM outlets o
    JOIN outlet_types ot ON ot.id = o.outlet_type_id
    LEFT JOIN outlet_users ou ON ou.outlet_id = o.id
    LEFT JOIN users u ON u.id = ou.user_id
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
  if (userId) {
    sql += ` AND ou.user_id = ?`;
    params.push(userId);
  }

  sql += ` ORDER BY o.name ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const rows = await db.all(sql, params);
  return rows.map(r => {
    r.userId = r.user_id;
    delete r.user_id;
    return r;
  });
}

/**
 * Get all outlet IDs linked to a specific user.
 */
async function getLinkedOutletsForUser(userId) {
  const rows = await db.all('SELECT outlet_id FROM outlet_users WHERE user_id = ?', [userId]);
  return rows.map(r => r.outlet_id);
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
  await db.run('DELETE FROM outlet_users WHERE outlet_id = ?', [id]);
  const result = await db.run('DELETE FROM outlets WHERE id = ?', [id]);
  return result.changes > 0;
}

module.exports = {
  createOutlet,
  updateOutlet,
  findById,
  getAll,
  getLinkedOutletsForUser,
  updateStatus,
  deleteOutlet
};
