const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');

describe('RBAC Permissions Integration Tests (Finance, Supply, Shipping, Exports)', () => {
  let authorizedUser;
  let unauthorizedUser;

  beforeAll(async () => {
    // Retrieve super_admin role
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');

    if (!adminRole) {
      throw new Error('super_admin role not found in the database.');
    }

    const rand = Math.floor(Math.random() * 100000);
    
    // Create custom role with no permissions for the unauthorized user
    const unauthRoleName = `rbac_unauth_role_${rand}`;
    const unauthRoleObj = await rolesService.createRole(unauthRoleName, 'RBAC Unauthorized Role');

    const authUsername = `rbac_auth_${rand}`;
    const unauthUsername = `rbac_unauth_${rand}`;

    // Create Authorized User (assigned to super_admin role, has all permissions)
    const authUserObj = await usersService.createUser({
      username: authUsername,
      password: 'password123',
      fullName: 'Authorized RBAC User'
    });
    await usersService.assignRole(authUserObj.id, adminRole.id);
    authorizedUser = { id: authUserObj.id, username: authUsername };

    // Create Unauthorized User (assigned to custom role, has no permissions)
    const unauthUserObj = await usersService.createUser({
      username: unauthUsername,
      password: 'password123',
      fullName: 'Unauthorized RBAC User'
    });
    await usersService.assignRole(unauthUserObj.id, unauthRoleObj.id);
    unauthorizedUser = { id: unauthUserObj.id, username: unauthUsername, roleId: unauthRoleObj.id };
  });

  afterAll(async () => {
    if (authorizedUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [authorizedUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [authorizedUser.id]);
    }
    if (unauthorizedUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [unauthorizedUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [unauthorizedUser.id]);
      await db.run('DELETE FROM roles WHERE id = ?', [unauthorizedUser.roleId]);
    }
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('Critical Area: Finance API', () => {
    it('should ALLOW access to finance summary for authorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: authorizedUser.username, password: 'password123' });
      const res = await agent.get('/api/finance/summary');
      expect(res.status).toBe(200);
    });

    it('should DENY access to finance summary for unauthorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
      const res = await agent.get('/api/finance/summary');
      expect(res.status).toBe(403);
    });
  });

  describe('Critical Area: Payments & Supply API', () => {
    it('should ALLOW payment recording check for authorized user (bad request test to verify bypass of RBAC)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: authorizedUser.username, password: 'password123' });
      // Send invalid data to hit validation (400) instead of RBAC block (403)
      const res = await agent.post('/api/payments').send({});
      expect(res.status).toBe(400);
    });

    it('should DENY payment recording for unauthorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
      const res = await agent.post('/api/payments').send({});
      expect(res.status).toBe(403);
    });

    it('should ALLOW supply batch check for authorized user (bad request test to verify bypass of RBAC)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: authorizedUser.username, password: 'password123' });
      const res = await agent.post('/api/payments/supply-batch').send({});
      expect(res.status).toBe(400);
    });

    it('should DENY supply batch for unauthorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
      const res = await agent.post('/api/payments/supply-batch').send({});
      expect(res.status).toBe(403);
    });
  });

  describe('Critical Area: Shipments API', () => {
    it('should ALLOW shipment creation check for authorized user (bad request test)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: authorizedUser.username, password: 'password123' });
      const res = await agent.post('/api/shipments').send({});
      expect(res.status).toBe(400);
    });

    it('should DENY shipment creation for unauthorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
      const res = await agent.post('/api/shipments').send({});
      expect(res.status).toBe(403);
    });
  });

  describe('Critical Area: Exports API', () => {
    it('should ALLOW running exports for authorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: authorizedUser.username, password: 'password123' });
      const res = await agent.get('/api/exports/products');
      expect(res.status).toBe(200);
      expect(res.header['content-type']).toContain('text/csv');
    });

    it('should DENY running exports for unauthorized user', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
      const res = await agent.get('/api/exports/products');
      expect(res.status).toBe(403);
    });
  });
});
