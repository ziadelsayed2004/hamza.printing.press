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

describe('Reports API Integration Tests', () => {
  let adminUser;
  let viewerUser;
  let wholesaleType;
  let cairoOutlet;
  let author;
  let book1;
  let book2;
  let invoice;

  const cleanup = async () => {
    // 1. Delete receipt items and receipts
    await db.run(`
      DELETE FROM inventory_receipt_items 
      WHERE receipt_id IN (
        SELECT id FROM inventory_receipts 
        WHERE supplier_name = "Test Supplier Rep"
      )
    `);
    await db.run('DELETE FROM inventory_receipts WHERE supplier_name = "Test Supplier Rep"');

    // 2. Delete payment installments, payments, status history, and items for the test invoice
    await db.run(`
      DELETE FROM payment_installments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Report Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_payments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Report Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_status_history 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Report Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_items 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Report Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoices 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name = "Test Cairo Report Outlet"
      )
    `);

    // 3. Delete inventory transactions
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Report Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Report Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_rep_api_%")');

    // 4. Delete product authors and prices
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Report Book%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Report Book%")');

    // 5. Delete products, authors, outlets, types, and users
    await db.run('DELETE FROM products WHERE title LIKE "Test Report Book%"');
    await db.run('DELETE FROM authors WHERE name = "Test Report Author"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Report Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Report Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_rep_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_rep_api_%"');
  };

  beforeAll(async () => {
    await cleanup();

    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    // Link reports.view permission to viewer role if not present
    const viewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['reports.view']);
    if (viewPerm && viewerRole) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [viewerRole.id, viewPerm.id]);
    }

    // 2. Create users
    adminUser = await usersService.createUser({
      username: 'test_rep_api_admin',
      password: 'password123',
      fullName: 'Reports Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    viewerUser = await usersService.createUser({
      username: 'test_rep_api_viewer',
      password: 'password123',
      fullName: 'Reports Viewer'
    });
    await usersService.assignRole(viewerUser.id, viewerRole.id);

    // 3. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Report Wholesale',
      description: 'Test Type'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Cairo Report Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown',
      phone: '01234567890',
      creditLimit: 50000,
      notes: 'Cairo test'
    });

    // 4. Create author
    author = await authorsService.createAuthor({ name: 'Test Report Author' });

    // 5. Create books
    book1 = await productsService.createProduct({
      title: 'Test Report Book 1',
      code: 'T-REP-BK1',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author.id]
    });

    book2 = await productsService.createProduct({
      title: 'Test Report Book 2',
      code: 'T-REP-BK2',
      category: 'History',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author.id]
    });

    // 6. Set prices
    await productPricesService.updatePricesForProduct(book1.id, [{ outletTypeId: wholesaleType.id, price: 100.0 }]);
    await productPricesService.updatePricesForProduct(book2.id, [{ outletTypeId: wholesaleType.id, price: 200.0 }]);

    // 7. Seed supplier receipt for book 1 (qty = 10, unit cost = 50)
    await inventoryService.createReceipt({
      supplierName: 'Test Supplier Rep',
      receivedDate: new Date().toISOString(),
      notes: 'Seeding supplier receipt',
      items: [{ productId: book1.id, quantity: 10, unitCost: 50.0 }],
      userId: adminUser.id
    });

    // 8. Adjust stock for book 2 using adjustments (qty = 10)
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      items: [{ productId: book2.id, quantity: 10 }],
      userId: adminUser.id
    });

    // 9. Create invoice (sold 3 copies of book 1 -> Sales = 300)
    invoice = await invoicesService.createInvoice({
      outletId: cairoOutlet.id,
      items: [{ productId: book1.id, quantity: 3 }],
      paymentType: 'cash',
      notes: 'Test report invoice',
      userId: adminUser.id
    });

    // 10. Record partial payment (paid 100, remaining = 200)
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

  describe('Reports APIs Access Rules', () => {
    it('should block requests without auth', async () => {
      const res = await request(app).get('/api/reports/financials/summary');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/reports/financials/summary', () => {
    it('should calculate sales, payments, and remaining totals correctly', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/financials/summary').query({ outletId: cairoOutlet.id });
      expect(response.status).toBe(200);
      expect(response.body.totalSales).toBe(300);
      expect(response.body.totalPaid).toBe(100);
      expect(response.body.totalRemaining).toBe(200);
      expect(response.body.totalSupplied).toBe(0);
      expect(response.body.totalUnsupplied).toBe(100);
      expect(response.body.countShipped).toBe(0);
      expect(response.body.countPartiallyShipped).toBe(0);
      expect(response.body.countNotShipped).toBe(1);
    });
  });

  describe('GET /api/reports/financials/by-outlet', () => {
    it('should return grouped metrics for the active test outlet', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/financials/by-outlet').query({ governorate: 'Cairo' });
      expect(response.status).toBe(200);
      const row = response.body.find(o => o.outletId === cairoOutlet.id);
      expect(row).toBeDefined();
      expect(row.totalSales).toBe(300);
      expect(row.totalPaid).toBe(100);
      expect(row.remainingAmount).toBe(200);
    });
  });

  describe('GET /api/reports/financials/by-governorate', () => {
    it('should calculate totals per governorate', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/financials/by-governorate');
      expect(response.status).toBe(200);
      const cairoRow = response.body.find(g => g.governorate === 'Cairo');
      expect(cairoRow).toBeDefined();
      expect(cairoRow.totalSales).toBe(300);
    });
  });

  describe('GET /api/reports/financials/by-outlet-type', () => {
    it('should calculate totals per outlet type', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/financials/by-outlet-type');
      expect(response.status).toBe(200);
      const row = response.body.find(ot => ot.outletTypeId === wholesaleType.id);
      expect(row).toBeDefined();
      expect(row.totalSales).toBe(300);
    });
  });

  describe('GET /api/reports/stock', () => {
    it('should summarize transaction ledger details for products', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/stock').query({ search: 'Test Report Book' });
      expect(response.status).toBe(200);
      
      const row1 = response.body.find(p => p.productId === book1.id);
      expect(row1).toBeDefined();
      expect(row1.totalReceived).toBe(10);
      expect(row1.totalSold).toBe(3);
      expect(row1.currentStock).toBe(7); // 10 received - 3 sold = 7

      const row2 = response.body.find(p => p.productId === book2.id);
      expect(row2).toBeDefined();
      expect(row2.totalAdjusted).toBe(10);
      expect(row2.currentStock).toBe(10);
    });
  });

  describe('GET /api/reports/authors', () => {
    it('should list total sales and copy counts for authors', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/authors').query({ search: 'Test Report Author' });
      expect(response.status).toBe(200);
      const row = response.body.find(a => a.authorId === author.id);
      expect(row).toBeDefined();
      expect(row.totalBooks).toBe(2);
      expect(row.totalSales).toBe(300);
      expect(row.totalCopiesSold).toBe(3);
      expect(row.currentStock).toBe(17); // 7 (book 1) + 10 (book 2) = 17
    });
  });

  describe('GET /api/reports/receipts', () => {
    it('should summarize quantity and cost from supplier receipts', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_rep_api_viewer', password: 'password123' });

      const response = await agent.get('/api/reports/receipts').query({ search: 'Test Supplier Rep' });
      expect(response.status).toBe(200);
      const row = response.body.find(r => r.supplierName === 'Test Supplier Rep');
      expect(row).toBeDefined();
      expect(row.totalReceipts).toBe(1);
      expect(row.totalQuantity).toBe(10);
      expect(row.totalCost).toBe(500); // 10 * 50 = 500
    });
  });
});
