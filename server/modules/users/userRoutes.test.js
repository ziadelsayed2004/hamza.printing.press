const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('./usersService');
const rolesService = require('../roles/rolesService');

describe('User Management API Integration Tests', () => {
  let adminUser;
  let accountantUser;
  let adminRole;
  let accountantRole;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    accountantRole = roles.find(r => r.name === 'accountant');

    // 2. Clean up test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_mgt_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_mgt_%"');

    // 3. Create test accounts
    adminUser = await usersService.createUser({
      username: 'test_mgt_admin',
      password: 'password123',
      fullName: 'Manager Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    accountantUser = await usersService.createUser({
      username: 'test_mgt_accountant',
      password: 'password123',
      fullName: 'Manager Accountant'
    });
    await usersService.assignRole(accountantUser.id, accountantRole.id);
  });

  afterAll((done) => {
    db.db.close(done);
  });

  it('should block user list query for unauthenticated requests', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(401);
  });

  it('should list all users for super_admin and allow searches', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

    const res = await agent.get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    const searchRes = await agent.get('/api/users?search=test_mgt_accountant');
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.length).toBe(1);
    expect(searchRes.body[0].username).toBe('test_mgt_accountant');
  });

  it('should deny users list for users lacking users.view permission', async () => {
    // Note: accountant has invoices.view etc. but not users.view
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_mgt_accountant', password: 'password123' });

    const res = await agent.get('/api/users');
    expect(res.status).toBe(403);
  });

  it('should create a new user with specified roles', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

    const createRes = await agent
      .post('/api/users')
      .send({
        username: 'test_mgt_newuser',
        password: 'newUserPass123',
        fullName: 'New Test User',
        roles: ['accountant']
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.user.username).toBe('test_mgt_newuser');
    expect(createRes.body.user.roles).toContain('accountant');
  });

  it('should edit user details and overwrite roles', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

    // 1. Get user we created earlier
    const user = await usersService.findByUsername('test_mgt_newuser');

    // 2. Edit details
    const editRes = await agent
      .put(`/api/users/${user.id}`)
      .send({
        fullName: 'Edited Full Name',
        roles: ['sales_staff']
      });

    expect(editRes.status).toBe(200);
    expect(editRes.body.success).toBe(true);
    expect(editRes.body.user.full_name).toBe('Edited Full Name');
    expect(editRes.body.user.roles).toContain('sales_staff');
    expect(editRes.body.user.roles).not.toContain('accountant'); // old role should be cleared
  });

  it('should enforce status check permissions on user status edits', async () => {
    const adminAgent = request.agent(app);
    await adminAgent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

    const user = await usersService.findByUsername('test_mgt_newuser');

    // 1. Disable user
    const disableRes = await adminAgent
      .put(`/api/users/${user.id}/status`)
      .send({ status: 'disabled' });

    expect(disableRes.status).toBe(200);
    expect(disableRes.body.success).toBe(true);

    const updatedUser = await usersService.findById(user.id);
    expect(updatedUser.status).toBe('disabled');
  });

  it('should soft delete user via DELETE endpoint and filter them from index list', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

    const user = await usersService.findByUsername('test_mgt_newuser');

    const deleteRes = await agent.delete(`/api/users/${user.id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);

    // Verify user is no longer returned in index list
    const indexRes = await agent.get('/api/users?search=test_mgt_newuser');
    expect(indexRes.status).toBe(200);
    expect(indexRes.body.length).toBe(0);
  });
});
