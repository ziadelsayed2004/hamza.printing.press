const express = require('express');
const request = require('supertest');
const db = require('../db');
const usersService = require('../modules/users/usersService');
const rolesService = require('../modules/roles/rolesService');
const { requireAuth, checkPermission } = require('./rbac');

describe('RBAC Middleware', () => {
  let app;
  let testUser;
  let testAdminUser;
  let disabledUser;
  let accountantRole;
  let superAdminRole;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    accountantRole = roles.find(r => r.name === 'accountant');
    superAdminRole = roles.find(r => r.name === 'super_admin');

    // 2. Create test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_rbac_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_rbac_%"');

    testUser = await usersService.createUser({
      username: 'test_rbac_john',
      password: 'password123',
      fullName: 'John RBAC'
    });
    await usersService.assignRole(testUser.id, accountantRole.id);

    testAdminUser = await usersService.createUser({
      username: 'test_rbac_admin',
      password: 'password123',
      fullName: 'Admin RBAC'
    });
    await usersService.assignRole(testAdminUser.id, superAdminRole.id);

    disabledUser = await usersService.createUser({
      username: 'test_rbac_disabled',
      password: 'password123',
      fullName: 'Disabled RBAC',
      status: 'disabled'
    });
  });

  afterAll((done) => {
    db.db.close(done);
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Middleware to inject session mock based on test headers
    app.use((req, res, next) => {
      const userType = req.headers['x-test-user'];
      req.session = {}; // mock session object
      if (userType === 'john') {
        req.session.user = { id: testUser.id, username: testUser.username };
      } else if (userType === 'admin') {
        req.session.user = { id: testAdminUser.id, username: testAdminUser.username };
      } else if (userType === 'disabled') {
        req.session.user = { id: disabledUser.id, username: disabledUser.username };
      } else {
        req.session = null; // No session
      }
      next();
    });

    // Test routes
    app.get('/protected-route', requireAuth, (req, res) => {
      res.status(200).json({ success: true, message: 'Access granted' });
    });

    app.get('/invoice-route', checkPermission('invoices.view'), (req, res) => {
      res.status(200).json({ success: true, message: 'Invoices view granted' });
    });

    app.get('/user-create-route', checkPermission('users.create'), (req, res) => {
      res.status(200).json({ success: true, message: 'User create granted' });
    });
  });

  it('should block unauthenticated requests with 401', async () => {
    const response = await request(app).get('/protected-route');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should allow authenticated requests', async () => {
    const response = await request(app)
      .get('/protected-route')
      .set('x-test-user', 'john');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should allow requests if the user has correct permission', async () => {
    const response = await request(app)
      .get('/invoice-route')
      .set('x-test-user', 'john');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should deny requests with 403 if user lacks permission', async () => {
    const response = await request(app)
      .get('/user-create-route')
      .set('x-test-user', 'john');
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });

  it('should bypass all checks for super_admin users', async () => {
    const response = await request(app)
      .get('/user-create-route')
      .set('x-test-user', 'admin');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should reject deactivated users with 401', async () => {
    const response = await request(app)
      .get('/invoice-route')
      .set('x-test-user', 'disabled');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.message).toContain('deactivated');
  });
});
