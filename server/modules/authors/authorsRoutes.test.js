const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const authorsService = require('./authorsService');

describe('Authors API Integration Tests', () => {
  let adminUser;
  let authorUserA;
  let authorUserB;
  let accountantUser; // For a user without author permissions
  
  let adminRole;
  let authorRole;
  let accountantRole;

  let authorA;
  let authorB;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    authorRole = roles.find(r => r.name === 'author');
    accountantRole = roles.find(r => r.name === 'accountant');

    // Link authors.view permission to the author role for testing
    const viewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['authors.view']);
    if (authorRole && viewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [authorRole.id, viewPerm.id]);
    }

    // 2. Clean test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_author_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_author_%"');

    // 3. Clean test authors
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');

    // 4. Create test accounts
    adminUser = await usersService.createUser({
      username: 'test_author_admin',
      password: 'password123',
      fullName: 'Author Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    authorUserA = await usersService.createUser({
      username: 'test_author_usera',
      password: 'password123',
      fullName: 'Author User A'
    });
    await usersService.assignRole(authorUserA.id, authorRole.id);

    authorUserB = await usersService.createUser({
      username: 'test_author_userb',
      password: 'password123',
      fullName: 'Author User B'
    });
    await usersService.assignRole(authorUserB.id, authorRole.id);

    accountantUser = await usersService.createUser({
      username: 'test_author_accountant',
      password: 'password123',
      fullName: 'Author Accountant'
    });
    await usersService.assignRole(accountantUser.id, accountantRole.id);

    // 5. Create authors linked to users
    authorA = await authorsService.createAuthor({
      name: 'Test Author A',
      phone: '111111111',
      status: 'active',
      userId: authorUserA.id
    });

    authorB = await authorsService.createAuthor({
      name: 'Test Author B',
      phone: '222222222',
      status: 'active',
      userId: authorUserB.id
    });
  });

  afterAll(async () => {
    // Clean up test data
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "Test Author %")');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Author %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_author_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_author_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  beforeEach(async () => {
    // Delete any temporary custom authors created inside specific test blocks
    await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name = "Test Author Custom")');
    await db.run('DELETE FROM authors WHERE name = "Test Author Custom"');
  });

  it('should list all authors for admin users', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_admin', password: 'password123' });

    const response = await agent.get('/api/authors');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(2);

    const names = response.body.map(a => a.name);
    expect(names).toContain('Test Author A');
    expect(names).toContain('Test Author B');
  });

  it('should block authors request for users lacking permission', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_accountant', password: 'password123' });

    const response = await agent.get('/api/authors');
    expect(response.status).toBe(403);
  });

  it('should restrict search/listing to linked author data for non-admin author users', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_usera', password: 'password123' });

    const response = await agent.get('/api/authors');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Test Author A');
    expect(response.body[0].userId).toBe(authorUserA.id);
  });

  it('should block non-admin author users from viewing other authors details', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_usera', password: 'password123' });

    // Try viewing own profile -> should succeed
    const ownRes = await agent.get(`/api/authors/${authorA.id}`);
    expect(ownRes.status).toBe(200);
    expect(ownRes.body.name).toBe('Test Author A');

    // Try viewing other profile -> should return 403 Forbidden
    const otherRes = await agent.get(`/api/authors/${authorB.id}`);
    expect(otherRes.status).toBe(403);
  });

  it('should allow admin to view any author details', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_admin', password: 'password123' });

    const response = await agent.get(`/api/authors/${authorB.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Author B');
  });

  it('should create an author profile successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_admin', password: 'password123' });

    const response = await agent
      .post('/api/authors')
      .send({
        name: 'Test Author Custom',
        phone: '999999999',
        status: 'active',
        userId: accountantUser.id
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.author.name).toBe('Test Author Custom');

    const dbAuthor = await authorsService.findById(response.body.author.id);
    expect(dbAuthor).toBeDefined();
    expect(dbAuthor.phone).toBe('999999999');
    expect(dbAuthor.userId).toBe(accountantUser.id);
  });

  it('should update an author profile successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_admin', password: 'password123' });

    const author = await authorsService.createAuthor({ name: 'Test Author Custom' });

    const response = await agent
      .put(`/api/authors/${author.id}`)
      .send({
        name: 'Test Author Custom',
        phone: '888888888',
        status: 'inactive',
        userId: authorUserB.id
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.author.phone).toBe('888888888');
    expect(response.body.author.status).toBe('inactive');
    expect(response.body.author.userId).toBe(authorUserB.id);
  });

  it('should return books list for authorized user', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_author_admin', password: 'password123' });

    const response = await agent.get(`/api/authors/${authorA.id}/books`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
