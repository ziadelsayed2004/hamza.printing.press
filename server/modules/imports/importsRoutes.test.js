const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const productsService = require('../products/productsService');
const outletsService = require('../outlets/outletsService');
const outletTypesService = require('../outlet-types/outletTypesService');

describe('Imports API Integration Tests', () => {
  let adminUser;
  let viewerUser;
  let wholesaleType;
  let retailType;

  const cleanup = async () => {
    // 1. Delete audit logs, roles and users
    await db.run('DELETE FROM audit_logs WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_imp_api_%")');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_imp_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_imp_api_%"');

    // 2. Delete import jobs
    await db.run('DELETE FROM import_job_rows WHERE job_id IN (SELECT id FROM import_jobs WHERE filename LIKE "test_%")');
    await db.run('DELETE FROM import_jobs WHERE filename LIKE "test_%"');

    // 3. Delete products and prices created during testing
    await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Import Book%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Import Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Import Book%"');

    // 4. Delete outlets created during testing
    await db.run('DELETE FROM outlets WHERE name LIKE "Test Import Outlet%"');

    // 5. Delete outlet types
    await db.run('DELETE FROM outlet_types WHERE name LIKE "Test Imp %"');
    await db.run('DELETE FROM authors WHERE name LIKE "Test Import Author%"');
  };

  beforeAll(async () => {
    await cleanup();

    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    // Link imports.run permission to viewer role if not present
    const runPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['imports.run']);
    if (runPerm && viewerRole) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [viewerRole.id, runPerm.id]);
    }

    // 2. Create users
    adminUser = await usersService.createUser({
      username: 'test_imp_api_admin',
      password: 'password123',
      fullName: 'Imports Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    viewerUser = await usersService.createUser({
      username: 'test_imp_api_viewer',
      password: 'password123',
      fullName: 'Imports Viewer'
    });
    await usersService.assignRole(viewerUser.id, viewerRole.id);

    // 3. Create outlet types
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Test Imp Wholesale',
      description: 'Test Imp Wholesaler Type'
    });

    retailType = await outletTypesService.createOutletType({
      name: 'Test Imp Retail',
      description: 'Test Imp Retailer Type'
    });
  });

  afterAll(async () => {
    await cleanup();
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('CSV Templates Downloads', () => {
    let agent;

    beforeAll(async () => {
      agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_imp_api_viewer', password: 'password123' });
    });

    it('should download products template CSV', async () => {
      const res = await agent.get('/api/imports/templates/products');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.headers['content-disposition']).toContain('attachment; filename="products_import_template.csv"');
      expect(res.text.startsWith('\uFEFF')).toBe(true);
      
      const clean = res.text.replace(/^\uFEFF/, '');
      const firstLine = clean.split('\r\n')[0];
      expect(firstLine).toBe('"title","code","category","status","stock_policy","authors","prices"');
    });

    it('should download outlets template CSV', async () => {
      const res = await agent.get('/api/imports/templates/outlets');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.headers['content-disposition']).toContain('attachment; filename="outlets_import_template.csv"');
      expect(res.text.startsWith('\uFEFF')).toBe(true);

      const clean = res.text.replace(/^\uFEFF/, '');
      const firstLine = clean.split('\r\n')[0];
      expect(firstLine).toBe('"name","outlet_type_name","governorate","address_details","phone","credit_limit","status","notes"');
    });

    it('should return 400 for unsupported templates', async () => {
      const res = await agent.get('/api/imports/templates/unknown');
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Unsupported template type');
    });
  });

  describe('Import Jobs Pipelines and Validation', () => {
    let agent;

    beforeAll(async () => {
      agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_imp_api_viewer', password: 'password123' });
    });

    it('should upload and validate products CSV with errors and successes', async () => {
      const csvContent = [
        'title,code,category,status,stock_policy,authors,prices',
        'Test Import Book 1,T-IMP-BK1,Science,active,track,Test Import Author 1,Test Imp Wholesale:150.00 | Test Imp Retail:180.00',
        'Test Import Book 2,,Science,active,track,,', // Error: code missing
        'Test Import Book 3,T-IMP-BK1,Science,active,track,,', // Error: duplicate code
        'Test Import Book 4,T-IMP-BK4,History,active,track,Test Import Author 2,Test Imp Wholesales:100' // Error: outlet type Wholesales doesn't exist
      ].join('\r\n');

      const res = await agent.post('/api/imports/jobs').send({
        type: 'products',
        filename: 'test_products.csv',
        csvContent
      });

      expect(res.status).toBe(201);
      expect(res.body.job_type).toBe('products');
      expect(res.body.status).toBe('pending'); // awaiting commit
      expect(res.body.total_rows).toBe(4);
      expect(res.body.success_rows).toBe(1);
      expect(res.body.failed_rows).toBe(3);

      const jobId = res.body.id;

      // Check job details
      const details = await agent.get(`/api/imports/jobs/${jobId}`);
      expect(details.status).toBe(200);
      expect(details.body.job.id).toBe(jobId);
      expect(details.body.rows.length).toBe(4);

      // Verify row status
      expect(details.body.rows[0].status).toBe('success');
      expect(details.body.rows[1].status).toBe('error');
      expect(details.body.rows[1].errors).toContain('Code is required');
      expect(details.body.rows[2].status).toBe('error');
      expect(details.body.rows[2].errors.join(' ')).toContain('Duplicate product code');
      expect(details.body.rows[3].status).toBe('error');
      expect(details.body.rows[3].errors.join(' ')).toContain('does not exist');

      // Download error sheet
      const errRes = await agent.get(`/api/imports/jobs/${jobId}/errors`);
      expect(errRes.status).toBe(200);
      expect(errRes.text.startsWith('\uFEFF')).toBe(true);
      expect(errRes.text).toContain('Code is required');
      expect(errRes.text).toContain('Outlet type ""Test Imp Wholesales"" does not exist');
      expect(errRes.text).toContain('Test Import Book 3');

      // Commit the job
      const commitRes = await agent.post(`/api/imports/jobs/${jobId}/commit`);
      expect(commitRes.status).toBe(200);
      expect(commitRes.body.status).toBe('completed');
      expect(commitRes.body.committedRows).toBe(1);

      // Verify product exists in active tables
      const rawProd = await productsService.findByCode('T-IMP-BK1');
      expect(rawProd).toBeDefined();
      const prod = await productsService.findById(rawProd.id);
      expect(prod.title).toBe('Test Import Book 1');

      // Verify prices were written
      const prices = await db.all('SELECT * FROM product_prices WHERE product_id = ?', [prod.id]);
      expect(prices.length).toBe(2);

      // Verify author was created and associated
      expect(prod.authors.length).toBe(1);
      expect(prod.authors[0].name).toBe('Test Import Author 1');

      // Trying to commit again should fail
      const commitRes2 = await agent.post(`/api/imports/jobs/${jobId}/commit`);
      expect(commitRes2.status).toBe(400);
      expect(commitRes2.body.message).toContain('cannot be committed');
    });

    it('should upload and validate outlets CSV', async () => {
      const csvContent = [
        'name,outlet_type_name,governorate,address_details,phone,credit_limit,status,notes',
        'Test Import Outlet 1,Test Imp Wholesale,Cairo,Downtown,01234567,10000,active,first outlet',
        'Test Import Outlet 2,Test Imp Retail,Giza,Pyramids,,2000,active,',
        'Test Import Outlet 3,Invalid Type,Cairo,Heliopolis,,0,active,' // Error: outlet type does not exist
      ].join('\r\n');

      const res = await agent.post('/api/imports/jobs').send({
        type: 'outlets',
        filename: 'test_outlets.csv',
        csvContent
      });

      expect(res.status).toBe(201);
      expect(res.body.job_type).toBe('outlets');
      expect(res.body.status).toBe('pending');
      expect(res.body.total_rows).toBe(3);
      expect(res.body.success_rows).toBe(2);
      expect(res.body.failed_rows).toBe(1);

      const jobId = res.body.id;

      // Commit the outlets job
      const commitRes = await agent.post(`/api/imports/jobs/${jobId}/commit`);
      expect(commitRes.status).toBe(200);
      expect(commitRes.body.status).toBe('completed');
      expect(commitRes.body.committedRows).toBe(2);

      // Verify outlets exist in active tables
      const outlets = await outletsService.getAll({ search: 'Test Import Outlet' });
      expect(outlets.length).toBe(2);
      expect(outlets[0].name).toBe('Test Import Outlet 1');
      expect(outlets[1].name).toBe('Test Import Outlet 2');
    });
  });

  describe('RBAC Security check', () => {
    it('should forbid access without imports.run permission', async () => {
      const unauthorizedAgent = request.agent(app);
      // Create user without permission
      const noPermUser = await usersService.createUser({
        username: 'test_imp_api_noperm',
        password: 'password123',
        fullName: 'No Perm User'
      });
      // Assign role without imports.run (e.g. author role or something else)
      const roles = await rolesService.getAllRoles();
      const authorRole = roles.find(r => r.name === 'author');
      if (authorRole) {
        await usersService.assignRole(noPermUser.id, authorRole.id);
      }

      await unauthorizedAgent.post('/api/auth/login').send({ username: 'test_imp_api_noperm', password: 'password123' });

      const res1 = await unauthorizedAgent.get('/api/imports/templates/products');
      expect(res1.status).toBe(403);

      const res2 = await unauthorizedAgent.post('/api/imports/jobs').send({
        type: 'products',
        filename: 'test_fail.csv',
        csvContent: 'title,code\nBook,B1'
      });
      expect(res2.status).toBe(403);

      // Cleanup noPermUser
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [noPermUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [noPermUser.id]);
    });
  });
});
