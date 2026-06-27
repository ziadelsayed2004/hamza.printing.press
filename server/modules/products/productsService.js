const db = require('../../db');
const notificationsService = require('../notifications/notificationsService');

/**
 * Create a new product.
 */
async function createProduct({ title, code, category = '', status = 'active', stockPolicy = 'track', authorIds = [] }) {
  if (!title || !code) {
    throw new Error('Title and product code are required');
  }

  const sql = `
    INSERT INTO products (title, code, category, status, stock_policy)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.run(sql, [title.trim(), code.trim(), category.trim(), status, stockPolicy]);
  const productId = result.lastID;

  if (authorIds && authorIds.length > 0) {
    for (const authorId of authorIds) {
      await db.run('INSERT INTO product_authors (product_id, author_id) VALUES (?, ?)', [productId, authorId]);
    }
  }

  try {
    await notificationsService.checkProductPriceNotifications(productId);
  } catch (e) {
    console.error('Error running checkProductPriceNotifications in createProduct:', e);
  }

  return { id: productId, title, code, category, status, stockPolicy, authorIds };
}

/**
 * Update an existing product.
 */
async function updateProduct(id, { title, code, category = '', status = 'active', stockPolicy = 'track', authorIds = [] }) {
  if (!title || !code) {
    throw new Error('Title and product code are required');
  }
  if (!['active', 'inactive'].includes(status)) {
    throw new Error('Invalid status');
  }
  if (!['track', 'ignore'].includes(stockPolicy)) {
    throw new Error('Invalid stock policy');
  }

  const sql = `
    UPDATE products
    SET title = ?, code = ?, category = ?, status = ?, stock_policy = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const result = await db.run(sql, [title.trim(), code.trim(), category.trim(), status, stockPolicy, id]);

  // Update product authors association
  await db.run('DELETE FROM product_authors WHERE product_id = ?', [id]);
  if (authorIds && authorIds.length > 0) {
    for (const authorId of authorIds) {
      await db.run('INSERT INTO product_authors (product_id, author_id) VALUES (?, ?)', [id, authorId]);
    }
  }

  try {
    await notificationsService.checkProductPriceNotifications(id);
  } catch (e) {
    console.error('Error running checkProductPriceNotifications in updateProduct:', e);
  }

  return result.changes > 0;
}

/**
 * Delete an existing product.
 */
async function deleteProduct(id) {
  const sql = `DELETE FROM products WHERE id = ?`;
  const result = await db.run(sql, [id]);
  return result.changes > 0;
}

/**
 * Find a product by ID (attaching its authors).
 */
async function findById(id) {
  const sql = `SELECT * FROM products WHERE id = ?`;
  const row = await db.get(sql, [id]);
  if (row) {
    row.stockPolicy = row.stock_policy;
    delete row.stock_policy;

    // Fetch associated authors
    const authors = await db.all(`
      SELECT a.id, a.name, a.email, a.phone, a.status
      FROM authors a
      JOIN product_authors pa ON pa.author_id = a.id
      WHERE pa.product_id = ?
    `, [id]);
    row.authors = authors;
  }
  return row;
}

/**
 * Find a product by code (useful for duplicate validation).
 */
async function findByCode(code) {
  const sql = `SELECT * FROM products WHERE code = ?`;
  const row = await db.get(sql, [code.trim()]);
  if (row) {
    row.stockPolicy = row.stock_policy;
    delete row.stock_policy;
  }
  return row;
}

/**
 * Retrieve all products with filters.
 */
async function getAll({ limit = 50, offset = 0, search = '', category = '', status = '', authorIds = null } = {}) {
  let sql = `
    SELECT DISTINCT p.*
    FROM products p
    LEFT JOIN product_authors pa ON pa.product_id = p.id
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    sql += ` AND (p.title LIKE ? OR p.code LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term);
  }
  if (category) {
    sql += ` AND p.category = ?`;
    params.push(category);
  }
  if (status) {
    sql += ` AND p.status = ?`;
    params.push(status);
  }
  if (authorIds && authorIds.length > 0) {
    const placeholders = authorIds.map(() => '?').join(',');
    sql += ` AND pa.author_id IN (${placeholders})`;
    params.push(...authorIds);
  }

  sql += ` ORDER BY p.title ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const rows = await db.all(sql, params);

  // Load full author details for each product
  for (const p of rows) {
    p.stockPolicy = p.stock_policy;
    delete p.stock_policy;

    p.authors = await db.all(`
      SELECT a.id, a.name
      FROM authors a
      JOIN product_authors pa ON pa.author_id = a.id
      WHERE pa.product_id = ?
    `, [p.id]);
  }

  return rows;
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  findById,
  findByCode,
  getAll
};
