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
const returnsService = require('./returnsService');

describe('Returns API Integration Tests', () => {
  let adminUser;
  let staffUser;
  let viewerUser;

  let wholesaleType;
  let testOutlet;
  let testBook;
  let invoice;
  let invoiceItemId;

  const cleanup = async () => {
    // 1. Delete return-related records
    await db.run(`
      DELETE FROM return_items 
      WHERE return_id IN (
        SELECT id FROM returns 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Return Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM returns 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name = "Test Return Outlet"
      )
    `);

    // 2. Delete invoice-related records
    await db.run(`
      DELETE FROM invoice_payments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Return Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_status_history 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Return Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_items 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Return Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoices 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name = "Test Return Outlet"
      )
    `);

    // 3. Delete finance ledger
    await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Return Outlet")');

    // 4. Delete inventory adjustments and transactions
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Return Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Return Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_ret_api_%")');

    // 5. Delete products, prices, outlets, roles, users
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Return Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Return Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Return Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Return Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_ret_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_ret_api_%"');
  };

  beforeAll(async () => {
    await cleanup();

    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const staffRole = roles.find(r => r.name === 'sales_staff');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    const insertPerm = async (roleId, permName) => {
      const p = await db.get('SELECT id FROM permissions WHERE name = ?', [permName]);
      if (p && roleId) {
        await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [roleId, p.id]);
      }
    };

    if (staffRole) {
      await insertPerm(staffRole.id, 'invoices.view');
      await insertPerm(staffRole.id, 'invoices.update');
    }
    if (viewerRole) {
      await insertPerm(viewerRole.id, 'invoices.view');
    }

    // 2. Create test users
    adminUser = await usersService.createUser({
      username: 'test_ret_api_admin',
      password: 'password123',
      fullName: 'Returns Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_ret_api_staff',
      password: 'password123',
      fullName: 'Returns Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    viewerUser = await usersService.createUser({
      username: 'test_ret_api_viewer',
      password: 'password123',
      fullName: 'Returns Viewer'
    });
    await usersService.assignRole(viewerUser.id, viewerRole.id);

    // 3. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Return Wholesale',
      description: 'Test Type for Returns'
    });

    testOutlet = await outletsService.createOutlet({
      name: 'Test Return Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Return Center',
      phone: '01555555555',
      creditLimit: 20000,
      notes: 'Test Outlet'
    });

    // 4. Create product
    testBook = await productsService.createProduct({
      title: 'Test Return Book A',
      code: 'T-RET-BK-A',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track'
    });

    // 5. Set price
    await productPricesService.updatePricesForProduct(testBook.id, [
      { outletTypeId: wholesaleType.id, price: 150.0 }
    ]);

    // 6. Set stock
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      notes: 'Test stock',
      items: [{ productId: testBook.id, quantity: 20 }],
      userId: adminUser.id
    });

    // 7. Create invoice with 10 books
    invoice = await invoicesService.createInvoice({
      outletId: testOutlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'deferred',
      notes: 'Test invoice',
      items: [{ productId: testBook.id, quantity: 10 }],
      userId: adminUser.id
    });

    invoiceItemId = invoice.items[0].id;
  });

  afterAll(async () => {
    await cleanup();
  });

  describe('POST /api/returns - Create Return', () => {
    it('should reject return creation for unauthorized users', async () => {
      const response = await request(app)
        .post('/api/returns')
        .send({
          invoiceId: invoice.id,
          reason: 'Defective books',
          items: [{ invoiceItemId, quantity: 2 }]
        });
      expect(response.status).toBe(401);
    });

    it('should reject return creation if user does not have invoices.update permission', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_viewer', password: 'password123' });

      const response = await agent
        .post('/api/returns')
        .send({
          invoiceId: invoice.id,
          reason: 'Defective books',
          items: [{ invoiceItemId, quantity: 2 }]
        });
      expect(response.status).toBe(403);
    });

    it('should reject return if requested quantity exceeds invoice item quantity', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_staff', password: 'password123' });

      const response = await agent
        .post('/api/returns')
        .send({
          invoiceId: invoice.id,
          reason: 'Too many books returned',
          items: [{ invoiceItemId, quantity: 15 }]
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('exceeds');
    });

    it('should successfully create a partial return, update inventory, and register ledger entry', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_staff', password: 'password123' });

      // Before return: check stock
      const stockBefore = await inventoryService.getRealTimeStock(testBook.id);
      expect(stockBefore).toBe(10); // 20 initially - 10 invoice

      // Create return of 3 books
      const response = await agent
        .post('/api/returns')
        .send({
          invoiceId: invoice.id,
          reason: 'Defective covers',
          items: [{ invoiceItemId, quantity: 3 }]
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.return).toBeDefined();
      expect(response.body.return.return_value).toBe(450.0); // 3 * 150.0

      // After return: check stock increased
      const stockAfter = await inventoryService.getRealTimeStock(testBook.id);
      expect(stockAfter).toBe(13); // 10 + 3

      // Check finance ledger entry has negative receivable_amount
      const ledgerEntries = await db.all('SELECT * FROM finance_ledger_entries WHERE reference_type = "return" AND reference_id = ?', [response.body.return.id]);
      expect(ledgerEntries).toHaveLength(1);
      expect(ledgerEntries[0].receivable_amount).toBe(-450.0);
    });

    it('should reject further returns exceeding the remaining returnable quantity', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_staff', password: 'password123' });

      // We returned 3, so remaining is 7. Try to return 8.
      const response = await agent
        .post('/api/returns')
        .send({
          invoiceId: invoice.id,
          reason: 'Exceeding remaining',
          items: [{ invoiceItemId, quantity: 8 }]
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('exceeds');
    });
  });

  describe('GET /api/returns - List and Details', () => {
    it('should list returns', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_viewer', password: 'password123' });

      const response = await agent.get('/api/returns').query({ invoiceId: invoice.id });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].return_value).toBe(450.0);
    });

    it('should fetch return details by ID', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_ret_api_viewer', password: 'password123' });

      const list = await returnsService.getReturns({ invoiceId: invoice.id });
      const returnId = list[0].id;

      const response = await agent.get(`/api/returns/${returnId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(returnId);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].quantity).toBe(3);
    });
  });
});
