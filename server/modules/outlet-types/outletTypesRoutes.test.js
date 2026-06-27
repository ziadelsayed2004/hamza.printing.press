const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const outletTypesService = require('./outletTypesService');

describe('Outlet Types API Integration Tests', () => {
  let adminUser;
  let accountantUser;
  let adminRole;
  let accountantRole;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    accountantRole = roles.find(r => r.name === 'accountant');

    // 2. Clean test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_ot_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_ot_%"');

    // 3. Create test accounts
    adminUser = await usersService.createUser({
      username: 'test_ot_admin',
      password: 'password123',
      fullName: 'OT Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    accountantUser = await usersService.createUser({
      username: 'test_ot_accountant',
      password: 'password123',
      fullName: 'OT Accountant'
    });
    await usersService.assignRole(accountantUser.id, accountantRole.id);
  });

  afterAll((done) => {
    db.db.close(done);
  });

  beforeEach(async () => {
    // Clean up custom outlets and outlet types created in tests to satisfy FK constraints
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test OT %"');
  });

  it('should list all outlet types for users with outlet_types.view', async () => {
    const agent = request.agent(app);
    // login as admin
    await agent.post('/api/auth/login').send({ username: 'test_ot_admin', password: 'password123' });

    const response = await agent.get('/api/outlet-types');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    
    const names = response.body.map(ot => ot.name);
    expect(names).toContain('Wholesale');
    expect(names).toContain('Retail');
  });

  it('should block read requests for users lacking permission', async () => {
    const agent = request.agent(app);
    // login as accountant (does not have outlet_types.view)
    await agent.post('/api/auth/login').send({ username: 'test_ot_accountant', password: 'password123' });

    const response = await agent.get('/api/outlet-types');
    expect(response.status).toBe(403);
  });

  it('should create an outlet type successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_ot_admin', password: 'password123' });

    const response = await agent
      .post('/api/outlet-types')
      .send({
        name: 'Test OT Custom',
        description: 'A custom test outlet type',
        status: 'active'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.outletType.name).toBe('Test OT Custom');

    // Verify it is queryable from DB
    const ot = await outletTypesService.findByName('Test OT Custom');
    expect(ot).toBeDefined();
    expect(ot.description).toBe('A custom test outlet type');
  });

  it('should reject creating duplicate outlet types', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_ot_admin', password: 'password123' });

    await outletTypesService.createOutletType({ name: 'Test OT Custom' });

    const response = await agent
      .post('/api/outlet-types')
      .send({ name: 'Test OT Custom' });

    expect(response.status).toBe(409); // Conflict
  });

  it('should update an existing outlet type', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_ot_admin', password: 'password123' });

    const ot = await outletTypesService.createOutletType({ name: 'Test OT Custom', description: 'Original' });

    const response = await agent
      .put(`/api/outlet-types/${ot.id}`)
      .send({
        name: 'Test OT Custom Edited',
        description: 'New Description',
        status: 'disabled'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.outletType.name).toBe('Test OT Custom Edited');
    expect(response.body.outletType.description).toBe('New Description');
    expect(response.body.outletType.status).toBe('disabled');
  });
});
