const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const authorsService = require('../authors/authorsService');
const productsService = require('./productsService');

describe('Products API Integration Tests', () => {
  let adminUser;
  let authorUserA;
  let authorUserB;
  let staffUser; // inventory_manager has products.view, products.create, products.update

  let adminRole;
  let authorRole;
  let inventoryRole;

  let authorA;
  let authorB;
  let productA;
  let productB;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    authorRole = roles.find(r => r.name === 'author');
    inventoryRole = roles.find(r => r.name === 'inventory_manager');

    // Link authors.view permission to the author role for testing
    const authorsViewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['authors.view']);
    const productsViewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['products.view']);
    if (authorRole && authorsViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [authorRole.id, authorsViewPerm.id]);
    }
    if (authorRole && productsViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [authorRole.id, productsViewPerm.id]);
    }

    // 2. Clean test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_products_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_products_%"');

    // 3. Clean test authors & products
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');

    // 4. Create test users
    adminUser = await usersService.createUser({
      username: 'test_products_admin',
      password: 'password123',
      fullName: 'Products Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    authorUserA = await usersService.createUser({
      username: 'test_products_authora',
      password: 'password123',
      fullName: 'Author User A'
    });
    await usersService.assignRole(authorUserA.id, authorRole.id);

    authorUserB = await usersService.createUser({
      username: 'test_products_authorb',
      password: 'password123',
      fullName: 'Author User B'
    });
    await usersService.assignRole(authorUserB.id, authorRole.id);

    staffUser = await usersService.createUser({
      username: 'test_products_staff',
      password: 'password123',
      fullName: 'Products Staff'
    });
    await usersService.assignRole(staffUser.id, inventoryRole.id);

    // 5. Create authors
    authorA = await authorsService.createAuthor({
      name: 'Test Author A',
      userId: authorUserA.id
    });

    authorB = await authorsService.createAuthor({
      name: 'Test Author B',
      userId: authorUserB.id
    });

    // 6. Create books (products)
    productA = await productsService.createProduct({
      title: 'Test Book A By Author A',
      code: 'T-BOOK-A',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [authorA.id]
    });

    productB = await productsService.createProduct({
      title: 'Test Book B By Author B',
      code: 'T-BOOK-B',
      category: 'History',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [authorB.id]
    });
  });
  afterAll(async () => {
    // Clean up
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Book %")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Book %"');
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_products_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_products_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  beforeEach(async () => {
    // Delete any custom products created inside tests
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE code = "T-BOOK-CUSTOM")');
    await db.run('DELETE FROM products WHERE code = "T-BOOK-CUSTOM"');
  });

  it('should list all products for admin and staff users', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_admin', password: 'password123' });

    const response = await agent.get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const codes = response.body.map(p => p.code);
    expect(codes).toContain('T-BOOK-A');
    expect(codes).toContain('T-BOOK-B');
  });

  it('should restrict search/listing to authored books for author users', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_authora', password: 'password123' });

    const response = await agent.get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].code).toBe('T-BOOK-A');
  });

  it('should block author from viewing details of books they did not write', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_authora', password: 'password123' });

    // View own book -> success
    const ownRes = await agent.get(`/api/products/${productA.id}`);
    expect(ownRes.status).toBe(200);
    expect(ownRes.body.code).toBe('T-BOOK-A');

    // View other book -> 403 Forbidden
    const otherRes = await agent.get(`/api/products/${productB.id}`);
    expect(otherRes.status).toBe(403);
  });

  it('should create a book profile successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_staff', password: 'password123' });

    const response = await agent
      .post('/api/products')
      .send({
        title: 'Test Book Custom',
        code: 'T-BOOK-CUSTOM',
        category: 'Literature',
        status: 'active',
        stockPolicy: 'ignore',
        authorIds: [authorA.id]
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.product.title).toBe('Test Book Custom');
    expect(response.body.product.stockPolicy).toBe('ignore');

    const dbProduct = await productsService.findById(response.body.product.id);
    expect(dbProduct).toBeDefined();
    expect(dbProduct.authors.map(a => a.id)).toContain(authorA.id);
  });

  it('should block creating duplicate product codes', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_staff', password: 'password123' });

    const response = await agent
      .post('/api/products')
      .send({
        title: 'Test Book Duplicate',
        code: 'T-BOOK-A',
        authorIds: []
      });

    expect(response.status).toBe(409);
  });

  it('should update a product successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_staff', password: 'password123' });

    const product = await productsService.createProduct({
      title: 'Test Book Custom',
      code: 'T-BOOK-CUSTOM',
      authorIds: [authorA.id]
    });

    const response = await agent
      .put(`/api/products/${product.id}`)
      .send({
        title: 'Test Book Custom Edited',
        code: 'T-BOOK-CUSTOM',
        category: 'Bio',
        status: 'inactive',
        stockPolicy: 'track',
        authorIds: [authorB.id]
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.product.title).toBe('Test Book Custom Edited');
    expect(response.body.product.status).toBe('inactive');

    const dbProduct = await productsService.findById(product.id);
    expect(dbProduct.authors.map(a => a.id)).toContain(authorB.id);
    expect(dbProduct.authors.map(a => a.id)).not.toContain(authorA.id);
  });

  it('should delete a product successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_products_admin', password: 'password123' });

    const product = await productsService.createProduct({
      title: 'Test Book Custom',
      code: 'T-BOOK-CUSTOM'
    });

    const response = await agent.delete(`/api/products/${product.id}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const deleted = await productsService.findById(product.id);
    expect(deleted).toBeUndefined();
  });
});
