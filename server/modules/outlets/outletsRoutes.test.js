const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const outletTypesService = require('../outlet-types/outletTypesService');
const outletsService = require('./outletsService');

describe('Outlets API Integration Tests', () => {
  let adminUser;
  let staffUser; // sales_staff has outlets.view but not outlets.create
  let adminRole;
  let staffRole;
  let activeOutletType;
  let inactiveOutletType;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    staffRole = roles.find(r => r.name === 'sales_staff');

    // 2. Clean test users
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_outlets_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_outlets_%"');

    // 3. Create test accounts
    adminUser = await usersService.createUser({
      username: 'test_outlets_admin',
      password: 'password123',
      fullName: 'Outlets Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_outlets_staff',
      password: 'password123',
      fullName: 'Outlets Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    // 4. Create active and inactive outlet types for tests
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test OT %"');
    activeOutletType = await outletTypesService.createOutletType({ name: 'Test OT Active', status: 'active' });
    inactiveOutletType = await outletTypesService.createOutletType({ name: 'Test OT Inactive', status: 'disabled' });
  });

  afterAll(async () => {
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test OT %"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_outlets_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_outlets_%"');
    
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  beforeEach(async () => {
    // Clean custom outlets created in tests
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Outlet %"');
  });

  it('should list all outlets for users with outlets.view and support filters', async () => {
    const agent = request.agent(app);
    // login as staff
    await agent.post('/api/auth/login').send({ username: 'test_outlets_staff', password: 'password123' });

    // Seed an outlet manually to check listing
    const outlet = await outletsService.createOutlet({
      name: 'Test Outlet List Cairo',
      outletTypeId: activeOutletType.id,
      governorate: 'Cairo'
    });

    const response = await agent.get('/api/outlets');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    const cairoResponse = await agent.get('/api/outlets?governorate=Cairo');
    expect(cairoResponse.status).toBe(200);
    expect(cairoResponse.body[0].governorate).toBe('Cairo');
  });

  it('should block create requests for users lacking permission', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_outlets_staff', password: 'password123' });

    const response = await agent
      .post('/api/outlets')
      .send({
        name: 'Test Outlet Failure',
        outletTypeId: activeOutletType.id,
        governorate: 'Cairo'
      });

    expect(response.status).toBe(403);
  });

  it('should create an outlet successfully when request is authorized', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_outlets_admin', password: 'password123' });

    const response = await agent
      .post('/api/outlets')
      .send({
        name: 'Test Outlet Success',
        outletTypeId: activeOutletType.id,
        governorate: 'Cairo',
        addressDetails: 'Downtown',
        phone: '1234567890',
        creditLimit: 5000,
        status: 'active',
        notes: 'Premium partner'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.outlet.name).toBe('Test Outlet Success');

    // Query DB
    const dbOutlet = await outletsService.findById(response.body.outlet.id);
    expect(dbOutlet).toBeDefined();
    expect(dbOutlet.credit_limit).toBe(5000);
    expect(dbOutlet.outlet_type_name).toBe('Test OT Active');
  });

  it('should block creating outlet with an inactive outlet type', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_outlets_admin', password: 'password123' });

    const response = await agent
      .post('/api/outlets')
      .send({
        name: 'Test Outlet Inactive OT',
        outletTypeId: inactiveOutletType.id,
        governorate: 'Giza'
      });

    expect(response.status).toBe(400);
  });

  it('should update an outlet successfully', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_outlets_admin', password: 'password123' });

    const outlet = await outletsService.createOutlet({
      name: 'Test Outlet Original',
      outletTypeId: activeOutletType.id,
      governorate: 'Cairo'
    });

    const response = await agent
      .put(`/api/outlets/${outlet.id}`)
      .send({
        name: 'Test Outlet Updated',
        outletTypeId: activeOutletType.id,
        governorate: 'Giza',
        addressDetails: 'Pyramids area',
        phone: '0987654321',
        creditLimit: 8000,
        status: 'active',
        notes: 'Notes edited'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.outlet.name).toBe('Test Outlet Updated');
    expect(response.body.outlet.governorate).toBe('Giza');
    expect(response.body.outlet.credit_limit).toBe(8000);
  });

  it('should enforce status check permissions on outlet status edits', async () => {
    const adminAgent = request.agent(app);
    await adminAgent.post('/api/auth/login').send({ username: 'test_outlets_admin', password: 'password123' });

    const outlet = await outletsService.createOutlet({
      name: 'Test Outlet Status Original',
      outletTypeId: activeOutletType.id,
      governorate: 'Cairo'
    });

    // Disable outlet as admin -> should succeed
    const response = await adminAgent
      .put(`/api/outlets/${outlet.id}/status`)
      .send({ status: 'disabled' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const updated = await outletsService.findById(outlet.id);
    expect(updated.status).toBe('disabled');
  });

  it('should enforce scoped access for linked outlet users', async () => {
    // 1. Ensure 'outlet' role exists and has 'outlets.view' permission
    await db.run('INSERT OR IGNORE INTO roles (name, description) VALUES (?, ?)', ['outlet', 'Outlet Partner Account']);
    const roleRow = await db.get('SELECT id FROM roles WHERE name = ?', ['outlet']);
    const permRow = await db.get('SELECT id FROM permissions WHERE name = ?', ['outlets.view']);
    if (roleRow && permRow) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [roleRow.id, permRow.id]);
    }

    // 2. Create a scoped outlet user
    const scopedUser = await usersService.createUser({
      username: 'test_outlets_user_scoped',
      password: 'password123',
      fullName: 'Scoped Outlet User'
    });
    await usersService.assignRole(scopedUser.id, roleRow.id);

    // 3. Create two outlets
    const cairoOutlet = await outletsService.createOutlet({
      name: 'Test Outlet Cairo Scoped',
      outletTypeId: activeOutletType.id,
      governorate: 'Cairo',
      userId: scopedUser.id
    });

    const gizaOutlet = await outletsService.createOutlet({
      name: 'Test Outlet Giza Scoped',
      outletTypeId: activeOutletType.id,
      governorate: 'Giza'
    });

    // 4. Login as scopedUser
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'test_outlets_user_scoped', password: 'password123' });

    // 5. GET /api/outlets should only return Cairo outlet, NOT Giza outlet
    const listRes = await agent.get('/api/outlets');
    expect(listRes.status).toBe(200);
    const ids = listRes.body.map(o => o.id);
    expect(ids).toContain(cairoOutlet.id);
    expect(ids).not.toContain(gizaOutlet.id);

    // 6. GET /api/outlets/:cairo_id should succeed
    const cairoRes = await agent.get(`/api/outlets/${cairoOutlet.id}`);
    expect(cairoRes.status).toBe(200);
    expect(cairoRes.body.name).toBe('Test Outlet Cairo Scoped');

    // 7. GET /api/outlets/:giza_id should return 403 Forbidden
    const gizaRes = await agent.get(`/api/outlets/${gizaOutlet.id}`);
    expect(gizaRes.status).toBe(403);
  });
});
