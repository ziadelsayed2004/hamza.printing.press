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

  describe('Custom Roles & RBAC integration', () => {
    it('should allow admin to list all permissions', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });
      const res = await agent.get('/api/users/permissions');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.some(p => p.name === 'invoices.pay')).toBe(true);
    });

    it('should create a custom role with permissions', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

      // 1. Get view permissions ID
      const perms = await rolesService.getAllPermissions();
      const invoiceViewPerm = perms.find(p => p.name === 'invoices.view');

      const res = await agent
        .post('/api/users/roles')
        .send({
          name: 'test_custom_viewer_role',
          description: 'A test role for viewing invoices',
          permissionIds: [invoiceViewPerm.id]
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.role.name).toBe('test_custom_viewer_role');
    });

    it('should block modifying system roles', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

      const roles = await rolesService.getAllRoles();
      const accountant = roles.find(r => r.name === 'accountant');

      const res = await agent
        .put(`/api/users/roles/${accountant.id}`)
        .send({
          name: 'hacky_renamed_accountant',
          description: 'Try to modify system role'
        });

      expect(res.status).toBe(403);
    });

    it('should update custom role and link users to it to verify access control', async () => {
      const adminAgent = request.agent(app);
      await adminAgent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

      // 1. Find the custom role created
      const roles = await rolesService.getAllRoles();
      const customRole = roles.find(r => r.name === 'test_custom_viewer_role');

      // 2. Update it and add invoices.view AND invoices.create permissions
      const perms = await rolesService.getAllPermissions();
      const viewId = perms.find(p => p.name === 'invoices.view').id;
      const createId = perms.find(p => p.name === 'invoices.create').id;

      const updateRes = await adminAgent
        .put(`/api/users/roles/${customRole.id}`)
        .send({
          name: 'test_custom_viewer_role',
          description: 'Updated test role',
          permissionIds: [viewId, createId]
        });
      expect(updateRes.status).toBe(200);

      // 3. Create a clean user to test access control
      const testUser = await usersService.createUser({
        username: 'test_mgt_rbac_user',
        password: 'password123',
        fullName: 'RBAC Tester'
      });
      await usersService.assignRole(testUser.id, customRole.id);

      // 4. Login as the new user and assert they can query invoices but CANNOT manage users
      const userAgent = request.agent(app);
      await userAgent.post('/api/auth/login').send({ username: 'test_mgt_rbac_user', password: 'password123' });

      const invoicesRes = await userAgent.get('/api/invoices');
      expect(invoicesRes.status).toBe(200); // accessible

      const usersListRes = await userAgent.get('/api/users');
      expect(usersListRes.status).toBe(403); // denied!
      
      // Clean up test user
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [testUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [testUser.id]);
    });

    it('should block deleting system roles and safely delete custom roles', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_mgt_admin', password: 'password123' });

      const roles = await rolesService.getAllRoles();
      const superAdmin = roles.find(r => r.name === 'super_admin');
      const customRole = roles.find(r => r.name === 'test_custom_viewer_role');

      // Delete system role fails
      const deleteSystemRes = await agent.delete(`/api/users/roles/${superAdmin.id}`);
      expect(deleteSystemRes.status).toBe(403);

      // Delete custom role succeeds
      const deleteCustomRes = await agent.delete(`/api/users/roles/${customRole.id}`);
      expect(deleteCustomRes.status).toBe(200);
    });
  });
});
