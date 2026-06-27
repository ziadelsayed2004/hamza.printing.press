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

describe('Filters Search API Integration Tests', () => {
  let adminUser;
  let wholesaleType;
  let outletCairo;
  let outletAlex;
  let author1;
  let author2;
  let book1;
  let book2;
  let invoice1;
  let invoice2;

  const cleanup = async () => {
    // 1. Delete payment installments
    await db.run(`
      DELETE FROM payment_installments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name LIKE "Test % Filter Outlet %"
        )
      )
    `);

    // 2. Delete payments
    await db.run(`
      DELETE FROM invoice_payments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name LIKE "Test % Filter Outlet %"
        )
      )
    `);

    // 3. Delete invoice status histories
    await db.run(`
      DELETE FROM invoice_status_history 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name LIKE "Test % Filter Outlet %"
        )
      )
    `);

    // 4. Delete invoice items
    await db.run(`
      DELETE FROM invoice_items 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name LIKE "Test % Filter Outlet %"
        )
      )
    `);

    // 5. Delete invoices
    await db.run(`
      DELETE FROM invoices 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name LIKE "Test % Filter Outlet %"
      )
    `);

    // 6. Delete inventory transactions
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Filter Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Filter Book %")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_flt_api_%")');

    // 7. Delete product authors
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Filter Book %")');

    // 8. Delete product prices
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Filter Book %")');

    // 9. Delete products, authors, outlets, types, roles, users
    await db.run('DELETE FROM products WHERE title LIKE "Test Filter Book %"');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Filter Author %"');
    await db.run('DELETE FROM outlets WHERE name LIKE "Test % Filter Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Filter Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_flt_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_flt_api_%"');
  };

  beforeAll(async () => {
    await cleanup();

    // 1. Fetch super_admin role
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');

    // 2. Create admin user
    adminUser = await usersService.createUser({
      username: 'test_flt_api_admin',
      password: 'password123',
      fullName: 'Filters Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    // 3. Create outlet type
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Filter Wholesale',
      description: 'Wholesale type for filters'
    });

    // 4. Create outlets with distinct governorates
    outletCairo = await outletsService.createOutlet({
      name: 'Test Cairo Filter Outlet 1',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown',
      phone: '01000000001',
      creditLimit: 20000,
      notes: 'Cairo'
    });

    outletAlex = await outletsService.createOutlet({
      name: 'Test Alexandria Filter Outlet 2',
      outletTypeId: wholesaleType.id,
      governorate: 'Alexandria',
      addressDetails: 'Corniche',
      phone: '01000000002',
      creditLimit: 30000,
      notes: 'Alexandria'
    });

    // 5. Create authors
    author1 = await authorsService.createAuthor({ name: 'Test Filter Author 1' });
    author2 = await authorsService.createAuthor({ name: 'Test Filter Author 2' });

    // 6. Create books with distinct categories and link them to authors
    book1 = await productsService.createProduct({
      title: 'Test Filter Book 1',
      code: 'T-FLT-BK1',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author1.id]
    });

    book2 = await productsService.createProduct({
      title: 'Test Filter Book 2',
      code: 'T-FLT-BK2',
      category: 'History',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author2.id]
    });

    // 7. Seed pricing
    await productPricesService.updatePricesForProduct(book1.id, [{ outletTypeId: wholesaleType.id, price: 100.0 }]);
    await productPricesService.updatePricesForProduct(book2.id, [{ outletTypeId: wholesaleType.id, price: 200.0 }]);

    // 8. Seed inventory
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      notes: 'Test stock',
      items: [
        { productId: book1.id, quantity: 15 },
        { productId: book2.id, quantity: 15 }
      ],
      userId: adminUser.id
    });

    // 9. Create invoices
    invoice1 = await invoicesService.createInvoice({
      outletId: outletCairo.id,
      items: [{ productId: book1.id, quantity: 2 }], // subtotal = 200. Total = 200.
      paymentType: 'cash',
      notes: 'Invoice 1',
      userId: adminUser.id
    });

    invoice2 = await invoicesService.createInvoice({
      outletId: outletAlex.id,
      items: [{ productId: book2.id, quantity: 3 }], // subtotal = 600. Total = 600.
      paymentType: 'deferred',
      notes: 'Invoice 2',
      userId: adminUser.id
    });

    // 10. Record payments to create different remaining amounts
    // Invoice 1: Remaining becomes 200 - 50 = 150.
    await paymentsService.recordPayment({
      invoiceId: invoice1.id,
      amount: 50.0,
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString(),
      userId: adminUser.id
    });

    // Invoice 2: Remaining becomes 600 - 500 = 100.
    await paymentsService.recordPayment({
      invoiceId: invoice2.id,
      amount: 500.0,
      paymentMethod: 'bank_transfer',
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

  describe('Outlets Governorate List API', () => {
    it('should retrieve a unique sorted list of governorates', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      const response = await agent.get('/api/outlets/governorates');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toContain('Cairo');
      expect(response.body).toContain('Alexandria');
    });
  });

  describe('Products Category List API', () => {
    it('should retrieve a unique sorted list of product categories', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      const response = await agent.get('/api/products/categories');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toContain('Science');
      expect(response.body).toContain('History');
    });
  });

  describe('GET /api/products - Filter by Author ID', () => {
    it('should filter product listing by Author ID', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      const response = await agent.get('/api/products').query({ authorId: author1.id });
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.every(p => p.authors.some(a => a.id === author1.id))).toBe(true);
    });
  });

  describe('GET /api/authors - Filter by Product ID', () => {
    it('should filter authors by book/product ID', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      const response = await agent.get('/api/authors').query({ productId: book2.id });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Test Filter Author 2');
    });
  });

  describe('GET /api/invoices - Filter by Remaining Amount Range', () => {
    it('should filter invoices by minRemaining', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      // Invoice 1 remaining = 150. Invoice 2 remaining = 100.
      // minRemaining = 120 should return only Invoice 1.
      const response = await agent.get('/api/invoices').query({ minRemaining: 120 });
      expect(response.status).toBe(200);
      const ids = response.body.map(inv => inv.id);
      expect(ids).toContain(invoice1.id);
      expect(ids).not.toContain(invoice2.id);
    });

    it('should filter invoices by maxRemaining', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      // maxRemaining = 120 should return only Invoice 2.
      const response = await agent.get('/api/invoices').query({ maxRemaining: 120 });
      expect(response.status).toBe(200);
      const ids = response.body.map(inv => inv.id);
      expect(ids).toContain(invoice2.id);
      expect(ids).not.toContain(invoice1.id);
    });

    it('should filter invoices by minRemaining and maxRemaining range', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_flt_api_admin', password: 'password123' });

      // minRemaining = 80, maxRemaining = 180 should return both.
      const response = await agent.get('/api/invoices').query({ minRemaining: 80, maxRemaining: 180 });
      expect(response.status).toBe(200);
      const ids = response.body.map(inv => inv.id);
      expect(ids).toContain(invoice1.id);
      expect(ids).toContain(invoice2.id);
    });
  });
});
