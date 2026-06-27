const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const authorsService = require('../authors/authorsService');
const productsService = require('./productsService');
const productPricesService = require('./productPricesService');
const outletTypesService = require('../outlet-types/outletTypesService');
const outletsService = require('../outlets/outletsService');

describe('Product Prices API Integration Tests', () => {
  let adminUser;
  let authorUserA;
  let authorUserB;
  let staffUser; // accountant has product_prices.view but not product_prices.update

  let adminRole;
  let authorRole;
  let accountantRole;

  let activeOutletType;
  let inactiveOutletType;
  let testOutlet;

  let authorA;
  let authorB;
  let productA;
  let productB;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    authorRole = roles.find(r => r.name === 'author');
    accountantRole = roles.find(r => r.name === 'accountant');

    // Link permissions to test roles
    const pricesViewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['product_prices.view']);
    const pricesUpdatePerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['product_prices.update']);
    
    if (authorRole && pricesViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [authorRole.id, pricesViewPerm.id]);
    }
    if (accountantRole && pricesViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [accountantRole.id, pricesViewPerm.id]);
    }

    // 2. Clean test data
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test OT %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_prices_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_prices_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_prices_admin',
      password: 'password123',
      fullName: 'Prices Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    authorUserA = await usersService.createUser({
      username: 'test_prices_authora',
      password: 'password123',
      fullName: 'Author User A'
    });
    await usersService.assignRole(authorUserA.id, authorRole.id);

    authorUserB = await usersService.createUser({
      username: 'test_prices_authorb',
      password: 'password123',
      fullName: 'Author User B'
    });
    await usersService.assignRole(authorUserB.id, authorRole.id);

    staffUser = await usersService.createUser({
      username: 'test_prices_staff',
      password: 'password123',
      fullName: 'Prices Staff'
    });
    await usersService.assignRole(staffUser.id, accountantRole.id);

    // 4. Create authors
    authorA = await authorsService.createAuthor({
      name: 'Test Author A',
      userId: authorUserA.id
    });

    authorB = await authorsService.createAuthor({
      name: 'Test Author B',
      userId: authorUserB.id
    });

    // 5. Create books
    productA = await productsService.createProduct({
      title: 'Test Book A By Author A',
      code: 'T-BOOK-A',
      authorIds: [authorA.id]
    });

    productB = await productsService.createProduct({
      title: 'Test Book B By Author B',
      code: 'T-BOOK-B',
      authorIds: [authorB.id]
    });

    // 6. Create outlet types and outlets
    activeOutletType = await outletTypesService.createOutletType({ name: 'Test OT Active', status: 'active' });
    inactiveOutletType = await outletTypesService.createOutletType({ name: 'Test OT Inactive', status: 'disabled' });
    
    testOutlet = await outletsService.createOutlet({
      name: 'Test Outlet Cairo',
      outletTypeId: activeOutletType.id,
      governorate: 'Cairo'
    });
  });  afterAll(async () => {
    // Clean up
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test OT %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_prices_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_prices_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  it('should allow admin to fetch and update pricing matrix', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_prices_admin', password: 'password123' });

    // Fetch initial prices -> should be null for Test OT Active
    let fetchRes = await agent.get(`/api/product-prices/product/${productA.id}`);
    expect(fetchRes.status).toBe(200);
    const activePrice = fetchRes.body.find(p => p.outletTypeName === 'Test OT Active');
    expect(activePrice).toBeDefined();
    expect(activePrice.price).toBeNull();

    // Set price
    const updateRes = await agent
      .put(`/api/product-prices/product/${productA.id}`)
      .send({
        prices: [
          { outletTypeId: activeOutletType.id, price: 150.50 }
        ]
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);

    const savedPrice = updateRes.body.prices.find(p => p.outletTypeId === activeOutletType.id);
    expect(savedPrice.price).toBe(150.50);
  });

  it('should block accountant/staff from updating prices', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_prices_staff', password: 'password123' });

    const response = await agent
      .put(`/api/product-prices/product/${productA.id}`)
      .send({
        prices: [
          { outletTypeId: activeOutletType.id, price: 200 }
        ]
      });

    expect(response.status).toBe(403);
  });

  it('should reject updates for inactive or non-existent outlet types', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_prices_admin', password: 'password123' });

    // Try updating inactive type -> should fail (400)
    let response = await agent
      .put(`/api/product-prices/product/${productA.id}`)
      .send({
        prices: [
          { outletTypeId: inactiveOutletType.id, price: 120 }
        ]
      });
    expect(response.status).toBe(400);

    // Try updating non-existent type -> should fail (400)
    response = await agent
      .put(`/api/product-prices/product/${productA.id}`)
      .send({
        prices: [
          { outletTypeId: 9999, price: 120 }
        ]
      });
    expect(response.status).toBe(400);
  });

  it('should enforce author scoping on fetching prices', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_prices_authora', password: 'password123' });

    // Fetch prices for own book -> success
    let response = await agent.get(`/api/product-prices/product/${productA.id}`);
    expect(response.status).toBe(200);

    // Fetch prices for other author's book -> 403 Forbidden
    response = await agent.get(`/api/product-prices/product/${productB.id}`);
    expect(response.status).toBe(403);
  });

  it('should resolve product price for a specific outlet', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_prices_admin', password: 'password123' });

    // Seed price
    await productPricesService.updatePricesForProduct(productA.id, [
      { outletTypeId: activeOutletType.id, price: 95.00 }
    ]);

    // Query resolution
    const response = await agent.get(`/api/product-prices/resolve?productId=${productA.id}&outletId=${testOutlet.id}`);
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(95.00);
    expect(response.body.outletTypeId).toBe(activeOutletType.id);
  });
});
