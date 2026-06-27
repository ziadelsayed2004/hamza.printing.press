const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const auditService = require('../audit/auditService');

describe('Auth Router Integration Tests', () => {
  let adminUser;
  let normalUser;
  let adminRole;
  let userRole;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    userRole = roles.find(r => r.name === 'accountant');

    // 2. Clean up test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_route_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_route_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_route_admin',
      password: 'adminPassword123',
      fullName: 'Route Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    normalUser = await usersService.createUser({
      username: 'test_route_user',
      password: 'userPassword123',
      fullName: 'Route User'
    });
    await usersService.assignRole(normalUser.id, userRole.id);
  });

  afterAll((done) => {
    db.db.close(done);
  });

  it('should return 401 on login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'wrongPassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should login successfully with correct credentials and establish a session', async () => {
    const agent = request.agent(app); // session-preserving agent

    const loginRes = await agent
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'userPassword123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.user.username).toBe('test_route_user');

    // Query GET /api/auth/me using the session cookie
    const meRes = await agent.get('/api/auth/me');
    expect(meRes.status).toBe(200);
    expect(meRes.body.username).toBe('test_route_user');
    expect(meRes.body.permissions).toContain('invoices.view');

    // Log out
    const logoutRes = await agent.post('/api/auth/logout');
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.success).toBe(true);

    // Verify session is cleared
    const meRes2 = await agent.get('/api/auth/me');
    expect(meRes2.status).toBe(401);
  });

  it('should allow a logged-in user to change their password', async () => {
    const agent = request.agent(app);

    // 1. Login
    await agent
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'userPassword123' });

    // 2. Change password
    const changeRes = await agent
      .post('/api/auth/change-password')
      .send({ currentPassword: 'userPassword123', newPassword: 'newSecretPassword' });

    expect(changeRes.status).toBe(200);
    expect(changeRes.body.success).toBe(true);

    // 3. Verify logging in with old password fails
    const failLogin = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'userPassword123' });
    expect(failLogin.status).toBe(401);

    // 4. Verify logging in with new password succeeds
    const successLogin = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'newSecretPassword' });
    expect(successLogin.status).toBe(200);

    // Restore password back to original to not break other tests
    const restoreAgent = request.agent(app);
    await restoreAgent.post('/api/auth/login').send({ username: 'test_route_user', password: 'newSecretPassword' });
    await restoreAgent.post('/api/auth/change-password').send({ currentPassword: 'newSecretPassword', newPassword: 'userPassword123' });
  });

  it('should allow admin to reset other user passwords and reject non-admin requests', async () => {
    const userAgent = request.agent(app);
    await userAgent.post('/api/auth/login').send({ username: 'test_route_user', password: 'userPassword123' });

    // Try to reset password as normal user (accountant) -> should get 403 Forbidden
    const rejectRes = await userAgent
      .post(`/api/auth/reset-password/${normalUser.id}`)
      .send({ newPassword: 'passwordReset123' });
    expect(rejectRes.status).toBe(403);

    // Login as admin
    const adminAgent = request.agent(app);
    await adminAgent.post('/api/auth/login').send({ username: 'test_route_admin', password: 'adminPassword123' });

    // Reset password as admin -> should get 200 OK
    const acceptRes = await adminAgent
      .post(`/api/auth/reset-password/${normalUser.id}`)
      .send({ newPassword: 'passwordReset123' });
    expect(acceptRes.status).toBe(200);

    // Verify user can login with reset password
    const resetLogin = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test_route_user', password: 'passwordReset123' });
    expect(resetLogin.status).toBe(200);

    // Restore password back
    const finalAgent = request.agent(app);
    await finalAgent.post('/api/auth/login').send({ username: 'test_route_user', password: 'passwordReset123' });
    await finalAgent.post('/api/auth/change-password').send({ currentPassword: 'passwordReset123', newPassword: 'userPassword123' });
  });
});
