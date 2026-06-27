const db = require('../../db');
const inventoryService = require('../inventory/inventoryService');
const notificationsService = require('../notifications/notificationsService');


/**
 * Create a new invoice.
 */
async function createInvoice({ outletId, discount = 0, shippingCost = 0, paymentType = 'cash', notes = '', items = [], userId }) {
  if (!outletId) {
    throw new Error('Outlet ID is required');
  }
  if (!items || items.length === 0) {
    throw new Error('At least one item is required for invoices');
  }

  // 1. Fetch the outlet
  const outlet = await db.get('SELECT * FROM outlets WHERE id = ?', [outletId]);
  if (!outlet) {
    throw new Error(`Outlet with ID ${outletId} does not exist`);
  }
  if (outlet.status !== 'active') {
    throw new Error(`Outlet ${outlet.name} is not active`);
  }

  // 2. Fetch user if provided
  if (userId) {
    const user = await db.get('SELECT id FROM users WHERE id = ?', [userId]);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
  }

  // Generate unique invoice number
  const invoiceNumber = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Begin Transaction
  await db.exec('BEGIN TRANSACTION;');

  try {
    let subtotal = 0;
    const validatedItems = [];

    // Validate pricing and stock policy for all items
    for (const item of items) {
      const { productId, quantity } = item;
      const qty = parseInt(quantity, 10);
      if (!productId || isNaN(qty) || qty <= 0) {
        throw new Error('Valid Product ID and a positive quantity are required for all items');
      }

      const product = await db.get('SELECT * FROM products WHERE id = ?', [productId]);
      if (!product) {
        throw new Error(`Product with ID ${productId} does not exist`);
      }
      if (product.status !== 'active') {
        throw new Error(`Product ${product.title} is not active`);
      }

      // Resolve price
      const priceRow = await db.get(
        'SELECT price FROM product_prices WHERE product_id = ? AND outlet_type_id = ?',
        [productId, outlet.outlet_type_id]
      );
      if (!priceRow || priceRow.price === null) {
        throw new Error(`No price configured for product "${product.title}" and outlet type ID ${outlet.outlet_type_id}`);
      }
      const unitPrice = parseFloat(priceRow.price);

      // Validate stock if policy is track
      if (product.stock_policy === 'track') {
        const currentStock = await inventoryService.getRealTimeStock(productId);
        if (currentStock < qty) {
          throw new Error(`Insufficient stock for product "${product.title}". Available: ${currentStock}, Requested: ${qty}`);
        }
      }

      const itemTotalPrice = qty * unitPrice;
      subtotal += itemTotalPrice;

      validatedItems.push({
        productId,
        quantity: qty,
        unitPrice,
        totalPrice: itemTotalPrice,
        stockPolicy: product.stock_policy
      });
    }

    const sub = parseFloat(subtotal.toFixed(2));
    const disc = parseFloat(parseFloat(discount || 0).toFixed(2));
    const ship = parseFloat(parseFloat(shippingCost || 0).toFixed(2));
    const total = parseFloat((sub + ship - disc).toFixed(2));

    if (total < 0) {
      throw new Error('Total invoice price cannot be negative');
    }

    // Save invoice
    const invoiceSql = `
      INSERT INTO invoices (
        invoice_number, outlet_id, subtotal, discount, shipping_cost, total_price,
        payment_status, shipping_status, payment_type, notes, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const invoiceResult = await db.run(invoiceSql, [
      invoiceNumber,
      outletId,
      sub,
      disc,
      ship,
      total,
      'unpaid',
      'pending',
      paymentType,
      notes.trim(),
      userId
    ]);
    const invoiceId = invoiceResult.lastID;

    // Save items & create stock transactions
    for (const item of validatedItems) {
      const itemSql = `
        INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?)
      `;
      await db.run(itemSql, [invoiceId, item.productId, item.quantity, item.unitPrice, item.totalPrice]);

      if (item.stockPolicy === 'track') {
        await inventoryService.createTransaction({
          productId: item.productId,
          transactionType: 'sale',
          quantity: -item.quantity,
          referenceType: 'invoice',
          referenceId: invoiceId,
          userId
        });
      }
    }

    // Log status history
    const historySql = `
      INSERT INTO invoice_status_history (invoice_id, status_type, old_status, new_status, changed_by, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.run(historySql, [invoiceId, 'payment', 'unpaid', 'unpaid', userId, 'Invoice created.']);
    await db.run(historySql, [invoiceId, 'shipping', 'pending', 'pending', userId, 'Invoice created.']);

    // Record ledger entry
    await db.run(`
      INSERT INTO finance_ledger_entries (
        outlet_id, entry_type, reference_type, reference_id,
        cash_amount, receivable_amount, notes, created_by
      ) VALUES (?, 'invoice_created', 'invoice', ?, 0, ?, ?, ?)
    `, [outletId, invoiceId, total, `Invoice ${invoiceNumber} created.`, userId]);

    await db.exec('COMMIT;');

    // Trigger notification checks after commit
    try {
      await notificationsService.checkOutletCreditLimitNotifications(outletId);
      for (const item of validatedItems) {
        await notificationsService.checkStockNotifications(item.productId);
      }
    } catch (e) {
      console.error('Error running notification checks on invoice creation:', e);
    }

    return await getInvoiceById(invoiceId);
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Update an existing invoice.
 */
async function updateInvoice(invoiceId, { outletId, discount = 0, shippingCost = 0, paymentType = 'cash', notes = '', items = [], userId }) {
  if (!outletId) {
    throw new Error('Outlet ID is required');
  }
  if (!items || items.length === 0) {
    throw new Error('At least one item is required for invoices');
  }

  const existingInvoice = await db.get('SELECT * FROM invoices WHERE id = ?', [invoiceId]);
  if (!existingInvoice) {
    throw new Error(`Invoice with ID ${invoiceId} does not exist`);
  }

  // Get previous item product IDs to run stock checks on them after update
  const oldItems = await db.all('SELECT product_id FROM invoice_items WHERE invoice_id = ?', [invoiceId]);

  // 1. Fetch the outlet
  const outlet = await db.get('SELECT * FROM outlets WHERE id = ?', [outletId]);
  if (!outlet) {
    throw new Error(`Outlet with ID ${outletId} does not exist`);
  }
  if (outlet.status !== 'active') {
    throw new Error(`Outlet ${outlet.name} is not active`);
  }

  // Begin Transaction
  await db.exec('BEGIN TRANSACTION;');

  try {
    // Temporarily delete old invoice items & inventory ledger entries so we can correctly compute stock levels
    await db.run('DELETE FROM inventory_transactions WHERE reference_type = "invoice" AND reference_id = ?', [invoiceId]);
    await db.run('DELETE FROM invoice_items WHERE invoice_id = ?', [invoiceId]);

    let subtotal = 0;
    const validatedItems = [];

    // Validate pricing and stock policy for all items
    for (const item of items) {
      const { productId, quantity } = item;
      const qty = parseInt(quantity, 10);
      if (!productId || isNaN(qty) || qty <= 0) {
        throw new Error('Valid Product ID and a positive quantity are required for all items');
      }

      const product = await db.get('SELECT * FROM products WHERE id = ?', [productId]);
      if (!product) {
        throw new Error(`Product with ID ${productId} does not exist`);
      }
      if (product.status !== 'active') {
        throw new Error(`Product ${product.title} is not active`);
      }

      // Resolve price
      const priceRow = await db.get(
        'SELECT price FROM product_prices WHERE product_id = ? AND outlet_type_id = ?',
        [productId, outlet.outlet_type_id]
      );
      if (!priceRow || priceRow.price === null) {
        throw new Error(`No price configured for product "${product.title}" and outlet type ID ${outlet.outlet_type_id}`);
      }
      const unitPrice = parseFloat(priceRow.price);

      // Validate stock if policy is track
      if (product.stock_policy === 'track') {
        const currentStock = await inventoryService.getRealTimeStock(productId);
        if (currentStock < qty) {
          throw new Error(`Insufficient stock for product "${product.title}". Available: ${currentStock}, Requested: ${qty}`);
        }
      }

      const itemTotalPrice = qty * unitPrice;
      subtotal += itemTotalPrice;

      validatedItems.push({
        productId,
        quantity: qty,
        unitPrice,
        totalPrice: itemTotalPrice,
        stockPolicy: product.stock_policy
      });
    }

    const sub = parseFloat(subtotal.toFixed(2));
    const disc = parseFloat(parseFloat(discount || 0).toFixed(2));
    const ship = parseFloat(parseFloat(shippingCost || 0).toFixed(2));
    const total = parseFloat((sub + ship - disc).toFixed(2));

    if (total < 0) {
      throw new Error('Total invoice price cannot be negative');
    }

    // Update invoice header
    const updateSql = `
      UPDATE invoices
      SET outlet_id = ?, subtotal = ?, discount = ?, shipping_cost = ?, total_price = ?,
          payment_type = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.run(updateSql, [
      outletId,
      sub,
      disc,
      ship,
      total,
      paymentType,
      notes.trim(),
      invoiceId
    ]);

    // Save items & create stock transactions
    for (const item of validatedItems) {
      const itemSql = `
        INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?)
      `;
      await db.run(itemSql, [invoiceId, item.productId, item.quantity, item.unitPrice, item.totalPrice]);

      if (item.stockPolicy === 'track') {
        await inventoryService.createTransaction({
          productId: item.productId,
          transactionType: 'sale',
          quantity: -item.quantity,
          referenceType: 'invoice',
          referenceId: invoiceId,
          userId
        });
      }
    }

    // Reconcile ledger: delete previous invoice_created and insert new one
    await db.run('DELETE FROM finance_ledger_entries WHERE reference_type = "invoice" AND entry_type = "invoice_created" AND reference_id = ?', [invoiceId]);
    await db.run(`
      INSERT INTO finance_ledger_entries (
        outlet_id, entry_type, reference_type, reference_id,
        cash_amount, receivable_amount, notes, created_by
      ) VALUES (?, 'invoice_created', 'invoice', ?, 0, ?, ?, ?)
    `, [outletId, invoiceId, total, `Invoice ${existingInvoice.invoice_number} updated.`, userId]);

    await db.exec('COMMIT;');

    // Trigger notification checks after commit
    try {
      await notificationsService.checkOutletCreditLimitNotifications(outletId);
      if (existingInvoice.outlet_id !== outletId) {
        await notificationsService.checkOutletCreditLimitNotifications(existingInvoice.outlet_id);
      }
      for (const item of validatedItems) {
        await notificationsService.checkStockNotifications(item.productId);
      }
      for (const oldItem of oldItems) {
        // Only check if it's not already in the new items list (to avoid double checks)
        if (!validatedItems.some(item => item.productId === oldItem.product_id)) {
          await notificationsService.checkStockNotifications(oldItem.product_id);
        }
      }
    } catch (e) {
      console.error('Error running notification checks on invoice update:', e);
    }

    return await getInvoiceById(invoiceId);
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Retrieve invoice by ID.
 */
async function getInvoiceById(id) {
  const sql = `
    SELECT i.*, o.name as outlet_name, o.outlet_type_id, u.full_name as user_full_name
    FROM invoices i
    JOIN outlets o ON o.id = i.outlet_id
    LEFT JOIN users u ON u.id = i.created_by
    WHERE i.id = ?
  `;
  const invoice = await db.get(sql, [id]);
  if (!invoice) return null;

  const items = await db.all(`
    SELECT ii.*, p.title as product_title, p.code as product_code
    FROM invoice_items ii
    JOIN products p ON p.id = ii.product_id
    WHERE ii.invoice_id = ?
  `, [id]);

  const history = await db.all(`
    SELECT ish.*, u.full_name as user_full_name
    FROM invoice_status_history ish
    LEFT JOIN users u ON u.id = ish.changed_by
    WHERE ish.invoice_id = ?
    ORDER BY ish.created_at ASC
  `, [id]);

  const payments = await db.all(`
    SELECT ip.*, u.full_name as user_full_name
    FROM invoice_payments ip
    LEFT JOIN users u ON u.id = ip.recorded_by
    WHERE ip.invoice_id = ?
    ORDER BY ip.payment_date ASC
  `, [id]);

  const installments = await db.all(`
    SELECT pi.*
    FROM payment_installments pi
    WHERE pi.invoice_id = ?
    ORDER BY pi.installment_number ASC
  `, [id]);

  invoice.items = items;
  invoice.history = history;
  invoice.payments = payments;
  invoice.installments = installments;

  return invoice;
}

/**
 * List/filter invoices.
 */
async function getInvoices({
  limit = 50,
  offset = 0,
  search = '',
  productId = null,
  authorId = null,
  outletId = null,
  outletTypeId = null,
  governorate = '',
  paymentStatus = '',
  shippingStatus = '',
  startDate = '',
  endDate = '',
  hasRemaining = '', // 'yes' or 'no'
  minRemaining = null,
  maxRemaining = null,
  authorIds = null
} = {}) {
  let sql = `
    SELECT i.*, o.name as outlet_name, o.governorate, o.outlet_type_id,
           COALESCE(p.paid_amount, 0) as paid_amount,
           (i.total_price - COALESCE(p.paid_amount, 0)) as remaining_amount
    FROM invoices i
    JOIN outlets o ON o.id = i.outlet_id
    LEFT JOIN (
      SELECT invoice_id, SUM(amount) as paid_amount
      FROM invoice_payments
      GROUP BY invoice_id
    ) p ON p.invoice_id = i.id
    WHERE 1=1
  `;
  const params = [];

  if (authorIds && authorIds.length > 0) {
    sql += ` AND i.id IN (
      SELECT ii.invoice_id
      FROM invoice_items ii
      JOIN product_authors pa ON pa.product_id = ii.product_id
      WHERE pa.author_id IN (${authorIds.map(() => '?').join(',')})
    )`;
    params.push(...authorIds);
  } else if (authorIds) {
    sql += ` AND 0=1`;
  }

  if (search) {
    sql += ` AND (i.invoice_number LIKE ? OR o.name LIKE ? OR i.notes LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  if (productId) {
    sql += ` AND i.id IN (SELECT invoice_id FROM invoice_items WHERE product_id = ?)`;
    params.push(productId);
  }

  if (authorId) {
    sql += ` AND i.id IN (
      SELECT ii.invoice_id
      FROM invoice_items ii
      JOIN product_authors pa ON pa.product_id = ii.product_id
      WHERE pa.author_id = ?
    )`;
    params.push(authorId);
  }

  if (outletId) {
    sql += ` AND i.outlet_id = ?`;
    params.push(outletId);
  }

  if (outletTypeId) {
    sql += ` AND o.outlet_type_id = ?`;
    params.push(outletTypeId);
  }

  if (governorate) {
    sql += ` AND o.governorate = ?`;
    params.push(governorate);
  }

  if (paymentStatus) {
    sql += ` AND i.payment_status = ?`;
    params.push(paymentStatus);
  }

  if (shippingStatus) {
    sql += ` AND i.shipping_status = ?`;
    params.push(shippingStatus);
  }

  if (startDate) {
    sql += ` AND i.created_at >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    sql += ` AND i.created_at <= ?`;
    params.push(endDate);
  }

  if (hasRemaining === 'yes') {
    sql += ` AND (i.total_price - COALESCE(p.paid_amount, 0)) > 0`;
  } else if (hasRemaining === 'no') {
    sql += ` AND (i.total_price - COALESCE(p.paid_amount, 0)) <= 0`;
  }

  if (minRemaining !== null && minRemaining !== undefined) {
    sql += ` AND (i.total_price - COALESCE(p.paid_amount, 0)) >= ?`;
    params.push(minRemaining);
  }

  if (maxRemaining !== null && maxRemaining !== undefined) {
    sql += ` AND (i.total_price - COALESCE(p.paid_amount, 0)) <= ?`;
    params.push(maxRemaining);
  }

  sql += ` ORDER BY i.created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await db.all(sql, params);
}

/**
 * Cancel an existing invoice.
 */
async function cancelInvoice(invoiceId, userId) {
  const invoice = await db.get('SELECT * FROM invoices WHERE id = ?', [invoiceId]);
  if (!invoice) {
    throw new Error(`Invoice with ID ${invoiceId} does not exist`);
  }
  if (invoice.payment_status === 'cancelled') {
    throw new Error('Invoice is already cancelled');
  }

  // Begin Transaction
  await db.exec('BEGIN TRANSACTION;');

  try {
    // 1. Update payment_status to 'cancelled'
    await db.run('UPDATE invoices SET payment_status = "cancelled", updated_at = CURRENT_TIMESTAMP WHERE id = ?', [invoiceId]);

    // 2. Log status history
    await db.run(`
      INSERT INTO invoice_status_history (invoice_id, status_type, old_status, new_status, changed_by, notes)
      VALUES (?, 'payment', ?, 'cancelled', ?, 'Invoice cancelled.')
    `, [invoiceId, invoice.payment_status, userId]);

    // 3. Return stock to inventory if product stock policy is 'track'
    const items = await db.all('SELECT * FROM invoice_items WHERE invoice_id = ?', [invoiceId]);
    for (const item of items) {
      const product = await db.get('SELECT stock_policy FROM products WHERE id = ?', [item.product_id]);
      if (product && product.stock_policy === 'track') {
        await inventoryService.createTransaction({
          productId: item.product_id,
          transactionType: 'return',
          quantity: item.quantity,
          referenceType: 'invoice',
          referenceId: invoiceId,
          userId
        });
      }
    }

    // 4. Record ledger entry reversing the remaining receivable
    const payments = await db.all('SELECT amount FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const remaining = parseFloat((invoice.total_price - totalPaid).toFixed(2));

    if (remaining > 0) {
      await db.run(`
        INSERT INTO finance_ledger_entries (
          outlet_id, entry_type, reference_type, reference_id,
          cash_amount, receivable_amount, notes, created_by
        ) VALUES (?, 'invoice_cancelled', 'invoice', ?, 0, ?, 'Invoice cancelled.', ?)
      `, [invoice.outlet_id, invoiceId, -remaining, userId]);
    }

    await db.exec('COMMIT;');

    // Trigger notification checks after commit
    try {
      await notificationsService.checkOutletCreditLimitNotifications(invoice.outlet_id);
      for (const item of items) {
        await notificationsService.checkStockNotifications(item.product_id);
      }
      await notificationsService.resolveNotificationByDedupeKey(`invoice_overdue:${invoiceId}`);
    } catch (e) {
      console.error('Error running notification checks on invoice cancellation:', e);
    }

    return await getInvoiceById(invoiceId);
  } catch (err) {
    await db.exec('ROLLBACK;');
    throw err;
  }
}

module.exports = {
  createInvoice,
  updateInvoice,
  getInvoiceById,
  getInvoices,
  cancelInvoice
};
