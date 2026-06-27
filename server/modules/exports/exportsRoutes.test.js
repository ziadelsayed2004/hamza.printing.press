const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const productsService = require('../products/productsService');
const productPricesService = require('../products/productPricesService');
const outletsService = require('../outlets/outletsService');
const outletTypesService = require('../outlet-types/outletTypesService');
const inventoryService = require('../inventory/inventoryService');
const invoicesService = require('../invoices/invoicesService');
const paymentsService = require('../payments/paymentsService');
const authorsService = require('../authors/authorsService');

describe('Exports API Integration Tests', () => {
  let adminUser;
  let viewerUser;
  let wholesaleType;
  let cairoOutlet;
  let author;
  let book1;
  let invoice;

  const cleanup = async () => {
    // 1. Delete receipts
    await db.run(`
      DELETE FROM inventory_receipt_items 
      WHERE receipt_id IN (
        SELECT id FROM inventory_receipts 
        WHERE supplier_name = "Test Supplier Exp"
      )
    `);
    await db.run('DELETE FROM inventory_receipts WHERE supplier_name = "Test Supplier Exp"');

    // 2. Delete invoice records
    await db.run(`
      DELETE FROM payment_installments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Export Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_payments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Export Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_status_history 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Export Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_items 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Export Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoices 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name = "Test Cairo Export Outlet"
      )
    `);

    // 3. Delete inventory transactions
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Export Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Export Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_exp_api_%")');

    // 4. Delete product authors and prices
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Export Book%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Export Book%")');

    // 5. Delete products, authors, outlets, types, and users
    await db.run('DELETE FROM products WHERE title LIKE "Test Export Book%"');
    await db.run('DELETE FROM authors WHERE name = "Test Export Author"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Export Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Export Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_exp_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_exp_api_%"');
  };

  beforeAll(async () => {
    await cleanup();

    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    // Link exports.run permission to viewer role if not present
    const runPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['exports.run']);
    if (runPerm && viewerRole) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [viewerRole.id, runPerm.id]);
    }

    // 2. Create users
    adminUser = await usersService.createUser({
      username: 'test_exp_api_admin',
      password: 'password123',
      fullName: 'Exports Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    viewerUser = await usersService.createUser({
      username: 'test_exp_api_viewer',
      password: 'password123',
      fullName: 'Exports Viewer'
    });
    await usersService.assignRole(viewerUser.id, viewerRole.id);

    // 3. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Export Wholesale',
      description: 'Test Type'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Cairo Export Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown',
      phone: '01234567890',
      creditLimit: 50000,
      notes: 'Cairo export test'
    });

    // 4. Create author
    author = await authorsService.createAuthor({ name: 'Test Export Author' });

    // 5. Create book
    book1 = await productsService.createProduct({
      title: 'Test Export Book 1',
      code: 'T-EXP-BK1',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author.id]
    });

    // 6. Set prices
    await productPricesService.updatePricesForProduct(book1.id, [{ outletTypeId: wholesaleType.id, price: 120.0 }]);

    // 7. Seed supplier receipt
    await inventoryService.createReceipt({
      supplierName: 'Test Supplier Exp',
      receivedDate: new Date().toISOString(),
      notes: 'Seeding supplier receipt',
      items: [{ productId: book1.id, quantity: 10, unitCost: 60.0 }],
      userId: adminUser.id
    });

    // 8. Create invoice
    invoice = await invoicesService.createInvoice({
      outletId: cairoOutlet.id,
      items: [{ productId: book1.id, quantity: 2 }], // sales = 240
      paymentType: 'cash',
      notes: 'Test export invoice',
      userId: adminUser.id
    });

    // 9. Record payment
    await paymentsService.recordPayment({
      invoiceId: invoice.id,
      amount: 100.0,
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString(),
      userId: adminUser.id
    });
  });

  afterAll(async () => {
    await cleanup();
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('CSV Downloads Format & Content', () => {
    let agent;

    beforeAll(async () => {
      agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_exp_api_viewer', password: 'password123' });
    });

    const verifyCsvHeadersAndContent = (response, requiredHeaders, requiredContentSubstrings = []) => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('attachment; filename=');

      const bodyText = response.text;
      // Should start with UTF-8 BOM
      expect(bodyText.startsWith('\uFEFF')).toBe(true);

      // Clean BOM to check headings
      const cleanText = bodyText.replace(/^\uFEFF/, '');
      const firstLine = cleanText.split('\r\n')[0] || cleanText.split('\n')[0];

      requiredHeaders.forEach(header => {
        expect(firstLine).toContain(header);
      });

      requiredContentSubstrings.forEach(substr => {
        expect(cleanText).toContain(substr);
      });
    };

    it('should export products catalog as CSV', async () => {
      const response = await agent.get('/api/exports/products');
      verifyCsvHeadersAndContent(response, ['id', 'title', 'code', 'category', 'authors', 'prices'], ['Test Export Book 1', 'T-EXP-BK1', 'Test Export Author']);
    });

    it('should export product prices matrix as CSV', async () => {
      const response = await agent.get('/api/exports/prices');
      verifyCsvHeadersAndContent(response, ['id', 'product_title', 'product_code', 'outlet_type_name', 'price'], ['Test Export Book 1', 'T-EXP-BK1', 'Cairo Export Wholesale', '120']);
    });

    it('should export authors list as CSV', async () => {
      const response = await agent.get('/api/exports/authors');
      verifyCsvHeadersAndContent(response, ['id', 'name', 'phone', 'email', 'status', 'user_ids'], ['Test Export Author']);
    });

    it('should export outlets listing as CSV', async () => {
      const response = await agent.get('/api/exports/outlets');
      verifyCsvHeadersAndContent(response, ['id', 'name', 'outlet_type_name', 'governorate', 'credit_limit'], ['Test Cairo Export Outlet', 'Cairo Export Wholesale', 'Cairo', '50000']);
    });

    it('should export invoices list as CSV', async () => {
      const response = await agent.get('/api/exports/invoices');
      verifyCsvHeadersAndContent(response, ['id', 'invoice_number', 'outlet_name', 'total_price', 'paid_amount', 'remaining_amount'], [invoice.invoice_number, 'Test Cairo Export Outlet', '240', '100', '140']);
    });

    it('should export payment receipts as CSV', async () => {
      const response = await agent.get('/api/exports/payments');
      verifyCsvHeadersAndContent(response, ['id', 'invoice_number', 'amount', 'payment_method', 'recorded_by'], [invoice.invoice_number, '100', 'cash']);
    });

    it('should export inventory ledger as CSV', async () => {
      const response = await agent.get('/api/exports/inventory');
      verifyCsvHeadersAndContent(response, ['id', 'product_title', 'product_code', 'transaction_type', 'quantity'], ['Test Export Book 1', 'T-EXP-BK1', 'receipt', '10']);
    });

    it('should export dynamic report balance sheets as CSV', async () => {
      const response = await agent.get('/api/exports/reports').query({ type: 'balances' });
      verifyCsvHeadersAndContent(response, ['outletId', 'outletName', 'outletTypeName', 'governorate', 'creditLimit', 'totalSales', 'totalPaid', 'remainingAmount'], ['Test Cairo Export Outlet', 'Cairo Export Wholesale', '240', '100', '140']);
    });

    it('should fail with 400 for unsupported report types', async () => {
      const response = await agent.get('/api/exports/reports').query({ type: 'unsupported' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('report type');
    });
  });
});
