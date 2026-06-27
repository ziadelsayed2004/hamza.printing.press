const db = require('../../db');

describe('Invoice V2 Database Schema Integration Tests', () => {
  beforeAll(async () => {
    // Clean test records if any
    await db.run('DELETE FROM payment_installments WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoices WHERE invoice_number LIKE "TEST-INV-%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Schema Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Test OT Schema"');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title = "Test Book Schema")');
    await db.run('DELETE FROM products WHERE title = "Test Book Schema"');
  });

  afterAll(async () => {
    // Clean test records
    await db.run('DELETE FROM payment_installments WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE invoice_number LIKE "TEST-INV-%")');
    await db.run('DELETE FROM invoices WHERE invoice_number LIKE "TEST-INV-%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Schema Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Test OT Schema"');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title = "Test Book Schema")');
    await db.run('DELETE FROM products WHERE title = "Test Book Schema"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  it('should verify that all invoice V2 schema tables exist', async () => {
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    const tableNames = tables.map(t => t.name);

    expect(tableNames).toContain('invoices');
    expect(tableNames).toContain('invoice_items');
    expect(tableNames).toContain('invoice_status_history');
    expect(tableNames).toContain('invoice_payments');
    expect(tableNames).toContain('payment_installments');
  });

  it('should verify schema constraints and record insertions successfully', async () => {
    // 1. Always create its own distinct outlet type
    const otRes = await db.run('INSERT INTO outlet_types (name, description, status) VALUES (?, ?, ?)', ['Test OT Schema', 'Test description', 'active']);
    const outletTypeId = otRes.lastID;

    // 2. Always create its own distinct outlet
    const outletRes = await db.run('INSERT INTO outlets (name, outlet_type_id, governorate, address_details, phone, status) VALUES (?, ?, ?, ?, ?, ?)', 
      ['Test Schema Outlet', outletTypeId, 'Cairo', 'Test address', '0123456789', 'active']);
    const outletId = outletRes.lastID;

    // 3. Always create its own distinct product
    const productRes = await db.run('INSERT INTO products (title, code, category, status, stock_policy) VALUES (?, ?, ?, ?, ?)',
      ['Test Book Schema', 'T-BK-SCHEMA', 'Test', 'active', 'track']);
    const productId = productRes.lastID;

    let user = await db.get('SELECT id FROM users LIMIT 1');

    // 4. Insert into invoices table
    const invoiceRes = await db.run(`
      INSERT INTO invoices (
        invoice_number, outlet_id, subtotal, discount, shipping_cost, total_price,
        payment_status, shipping_status, payment_type, notes, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'TEST-INV-001', outletId, 100.0, 10.0, 5.0, 95.0,
      'unpaid', 'pending', 'cash', 'Test notes', user ? user.id : null
    ]);
    const invoiceId = invoiceRes.lastID;
    expect(invoiceId).toBeDefined();

    // 5. Insert into invoice_items table
    const itemRes = await db.run(`
      INSERT INTO invoice_items (
        invoice_id, product_id, quantity, unit_price, total_price
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      invoiceId, productId, 2, 50.0, 100.0
    ]);
    expect(itemRes.lastID).toBeDefined();

    // 6. Insert into invoice_status_history table
    const historyRes = await db.run(`
      INSERT INTO invoice_status_history (
        invoice_id, status_type, old_status, new_status, changed_by, notes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      invoiceId, 'payment', 'unpaid', 'partially_paid', user ? user.id : null, 'Initial payment received'
    ]);
    expect(historyRes.lastID).toBeDefined();

    // 7. Insert into invoice_payments table
    const paymentRes = await db.run(`
      INSERT INTO invoice_payments (
        invoice_id, amount, payment_method, payment_date, reference_number, notes, recorded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      invoiceId, 50.0, 'cash', new Date().toISOString(), 'REF001', 'Deposit payment', user ? user.id : null
    ]);
    expect(paymentRes.lastID).toBeDefined();

    // 8. Insert into payment_installments table
    const installmentRes = await db.run(`
      INSERT INTO payment_installments (
        invoice_id, installment_number, due_date, amount, paid_amount, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      invoiceId, 1, new Date().toISOString(), 45.0, 0.0, 'unpaid', 'First installment'
    ]);
    expect(installmentRes.lastID).toBeDefined();

    // Verify all records were inserted and match
    const invoice = await db.get('SELECT * FROM invoices WHERE id = ?', [invoiceId]);
    expect(invoice.invoice_number).toBe('TEST-INV-001');
    expect(invoice.total_price).toBe(95.0);

    const item = await db.get('SELECT * FROM invoice_items WHERE invoice_id = ?', [invoiceId]);
    expect(item.quantity).toBe(2);
    expect(item.unit_price).toBe(50.0);

    const history = await db.get('SELECT * FROM invoice_status_history WHERE invoice_id = ?', [invoiceId]);
    expect(history.new_status).toBe('partially_paid');

    const payment = await db.get('SELECT * FROM invoice_payments WHERE invoice_id = ?', [invoiceId]);
    expect(payment.amount).toBe(50.0);

    const installment = await db.get('SELECT * FROM payment_installments WHERE invoice_id = ?', [invoiceId]);
    expect(installment.installment_number).toBe(1);
    expect(installment.amount).toBe(45.0);
  });
});
