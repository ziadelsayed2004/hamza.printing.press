const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const categoriesService = require('./categoriesService');

describe('Categories API Integration Tests', () => {
  let adminUser;
  let readerUser; // User with products.view but not create/update/delete
  let unauthorizedUser; // User without categories/products permissions
  
  let adminRole;
  let assistantRole;
  let visitorRole;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    assistantRole = roles.find(r => r.name === 'sales_staff');
    visitorRole = roles.find(r => r.name === 'readonly_viewer' || r.name === 'visitor');

    // 2. Clean test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_cat_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_cat_%"');

    // 3. Clean test categories
    await db.run('DELETE FROM product_categories WHERE category_id IN (SELECT id FROM categories WHERE name LIKE "Test Cat %")');
    await db.run('DELETE FROM categories WHERE name LIKE "Test Cat %"');

    // 4. Create test accounts
    adminUser = await usersService.createUser({
      username: 'test_cat_admin',
      password: 'password123',
      fullName: 'Cat Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    readerUser = await usersService.createUser({
      username: 'test_cat_reader',
      password: 'password123',
      fullName: 'Cat Reader'
    });
    await usersService.assignRole(readerUser.id, assistantRole.id);

    unauthorizedUser = await usersService.createUser({
      username: 'test_cat_unauth',
      password: 'password123',
      fullName: 'Cat Unauth'
    });
    await usersService.assignRole(unauthorizedUser.id, visitorRole.id);
  });

  afterAll(async () => {
    // Clean up test data
    await db.run('DELETE FROM product_categories WHERE category_id IN (SELECT id FROM categories WHERE name LIKE "Test Cat %")');
    await db.run('DELETE FROM categories WHERE name LIKE "Test Cat %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_cat_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_cat_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  beforeEach(async () => {
    // Clean specific categories
    await db.run('DELETE FROM categories WHERE name = "Test Cat Temp"');
  });

  it('should list categories for authorized users', async () => {
    // Create a test category first
    await categoriesService.createCategory({ name: 'Test Cat A', description: 'Desc A' });

    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_cat_reader', password: 'password123' });

    const response = await agent.get('/api/categories');
    expect(response.status).toBe(200);
    const names = response.body.map(c => c.name);
    expect(names).toContain('Test Cat A');
  });

  it('should create a category for admin users', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_cat_admin', password: 'password123' });

    const response = await agent
      .post('/api/categories')
      .send({ name: 'Test Cat Temp', description: 'Temp Desc' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.category.name).toBe('Test Cat Temp');
  });

  it('should block non-admin users from creating categories', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_cat_reader', password: 'password123' });

    const response = await agent
      .post('/api/categories')
      .send({ name: 'Test Cat Blocked', description: 'Blocked' });

    expect(response.status).toBe(403);
  });

  it('should update a category for admin users', async () => {
    const cat = await categoriesService.createCategory({ name: 'Test Cat B', description: 'Before' });

    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_cat_admin', password: 'password123' });

    const response = await agent
      .put(`/api/categories/${cat.id}`)
      .send({ name: 'Test Cat B Updated', description: 'After' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.category.name).toBe('Test Cat B Updated');
    expect(response.body.category.description).toBe('After');
  });

  it('should delete a category for admin users', async () => {
    const cat = await categoriesService.createCategory({ name: 'Test Cat C', description: 'Delete' });

    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_cat_admin', password: 'password123' });

    const response = await agent.delete(`/api/categories/${cat.id}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const check = await categoriesService.getCategoryById(cat.id);
    expect(check).toBeUndefined();
  });
});
