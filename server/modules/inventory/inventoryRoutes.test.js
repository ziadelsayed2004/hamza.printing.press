const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const productsService = require('../products/productsService');
const inventoryService = require('./inventoryService');

describe('Inventory Ledger API Integration Tests', () => {
  let adminUser;
  let staffUser; // sales_staff has inventory.view but not adjustments
  let managerUser; // inventory_manager has both view and adjustments permissions

  let adminRole;
  let staffRole;
  let managerRole;

  let productA;
  let productB;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    staffRole = roles.find(r => r.name === 'sales_staff');
    managerRole = roles.find(r => r.name === 'inventory_manager');

    // Link permissions to test roles
    const invViewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['inventory.view']);
    const invAdjPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['inventory.adjustments.create']);
    
    if (staffRole && invViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [staffRole.id, invViewPerm.id]);
    }
    if (managerRole && invViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [managerRole.id, invViewPerm.id]);
    }
    if (managerRole && invAdjPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [managerRole.id, invAdjPerm.id]);
    }

    // 2. Clean test data
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipts WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_inv_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_inv_admin',
      password: 'password123',
      fullName: 'Inventory Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_inv_staff',
      password: 'password123',
      fullName: 'Inventory Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    managerUser = await usersService.createUser({
      username: 'test_inv_manager',
      password: 'password123',
      fullName: 'Inventory Manager'
    });
    await usersService.assignRole(managerUser.id, managerRole.id);

    // 4. Create products
    productA = await productsService.createProduct({
      title: 'Test Book A',
      code: 'T-INV-BOOK-A'
    });

    productB = await productsService.createProduct({
      title: 'Test Book B',
      code: 'T-INV-BOOK-B'
    });
  });

  afterAll(async () => {
    // Clean up
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipts WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_inv_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_inv_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  beforeEach(async () => {
    // Reset stock transactions for specific test scopes
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (?, ?)', [productA.id, productB.id]);
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (?, ?)', [productA.id, productB.id]);
  });

  it('should return stock summary showing 0 for newly created books', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_staff', password: 'password123' });

    const response = await agent.get('/api/inventory/stock-summary');
    expect(response.status).toBe(200);

    const bookA = response.body.find(b => b.id === productA.id);
    expect(bookA).toBeDefined();
    expect(bookA.stock).toBe(0);
  });

  it('should block staff without adjustments permissions from creating adjustments', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_staff', password: 'password123' });

    const response = await agent
      .post('/api/inventory/adjustments')
      .send({
        reason: 'Manual Correction',
        items: [{ productId: productA.id, quantity: 10 }]
      });

    expect(response.status).toBe(403);
  });

  it('should successfully setup opening balance and block duplicate setups', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_manager', password: 'password123' });

    // 1. Setup opening balance
    let response = await agent
      .post('/api/inventory/opening-balance')
      .send({ productId: productA.id, quantity: 50 });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    // Verify stock summary updated to 50
    let summaryRes = await agent.get('/api/inventory/stock-summary');
    let bookA = summaryRes.body.find(b => b.id === productA.id);
    expect(bookA.stock).toBe(50);

    // 2. Try setting opening balance again -> should fail (400)
    response = await agent
      .post('/api/inventory/opening-balance')
      .send({ productId: productA.id, quantity: 100 });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('prior transactions exist');
  });

  it('should record positive and negative stock adjustments and calculate stock level', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_manager', password: 'password123' });

    // Set opening stock to 20
    await inventoryService.createTransaction({
      productId: productB.id,
      transactionType: 'receipt',
      quantity: 20,
      referenceType: 'receipt',
      referenceId: 1001,
      userId: managerUser.id
    });

    // Subtractive adjustment (reduce stock by 5 due to damage)
    let response = await agent
      .post('/api/inventory/adjustments')
      .send({
        reason: 'Damaged items',
        notes: 'Water damage in warehouse',
        items: [{ productId: productB.id, quantity: -5 }]
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    // Check transaction log
    const txResponse = await agent.get('/api/inventory/transactions?productId=' + productB.id);
    expect(txResponse.status).toBe(200);
    expect(txResponse.body.length).toBe(2);

    // Verify stock is now 15
    const stock = await inventoryService.getRealTimeStock(productB.id);
    expect(stock).toBe(15);
  });

  it('should successfully log a new inventory receipt and increase stock', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_manager', password: 'password123' });

    const response = await agent
      .post('/api/inventory/receipts')
      .send({
        supplierName: 'Test Supplier',
        receivedDate: '2026-06-26T12:00:00Z',
        notes: 'Initial seed shipment',
        items: [
          { productId: productA.id, quantity: 100, unitCost: 12.50 }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.receipt.receiptNumber).toBeDefined();

    // Verify stock of productA increased to 100
    const stock = await inventoryService.getRealTimeStock(productA.id);
    expect(stock).toBe(100);

    // List receipts
    const receiptsRes = await agent.get('/api/inventory/receipts');
    expect(receiptsRes.status).toBe(200);
    expect(receiptsRes.body.length).toBeGreaterThan(0);

    // Fetch details
    const detailRes = await agent.get(`/api/inventory/receipts/${response.body.receipt.id}`);
    expect(detailRes.status).toBe(200);
    expect(detailRes.body.items.length).toBe(1);
    expect(detailRes.body.items[0].quantity).toBe(100);
  });

  it('should block unauthorized users from creating receipts', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_inv_staff', password: 'password123' });

    const response = await agent
      .post('/api/inventory/receipts')
      .send({
        supplierName: 'Test Supplier',
        receivedDate: '2026-06-26T12:00:00Z',
        items: [
          { productId: productA.id, quantity: 100, unitCost: 12.50 }
        ]
      });

    expect(response.status).toBe(403);
  });
});
