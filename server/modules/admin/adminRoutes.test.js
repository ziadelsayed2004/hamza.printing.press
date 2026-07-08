const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const fs = require('fs');

describe('Admin API Backup Integration Tests', () => {
  let adminUser;
  let unauthorizedUser;

  beforeAll(async () => {
    // 1. Retrieve seeded roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    if (!adminRole || !viewerRole) {
      throw new Error('Required roles (super_admin, readonly_viewer) not found in the database.');
    }

    // 2. Create test users
    const rand = Math.floor(Math.random() * 100000);
    const adminUsername = `bk_adm_${rand}`;
    const unauthUsername = `bk_unauth_${rand}`;

    const adminUserObj = await usersService.createUser({
      username: adminUsername,
      password: 'password123',
      fullName: 'Backup Administrator'
    });
    await usersService.assignRole(adminUserObj.id, adminRole.id);
    adminUser = { id: adminUserObj.id, username: adminUsername };

    const unauthorizedUserObj = await usersService.createUser({
      username: unauthUsername,
      password: 'password123',
      fullName: 'Unauthorized Viewer'
    });
    await usersService.assignRole(unauthorizedUserObj.id, viewerRole.id);
    unauthorizedUser = { id: unauthorizedUserObj.id, username: unauthUsername };
  });

  afterAll(async () => {
    if (adminUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [adminUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [adminUser.id]);
    }
    if (unauthorizedUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [unauthorizedUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [unauthorizedUser.id]);
    }
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  it('should block unauthorized backup request', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: unauthorizedUser.username, password: 'password123' });
    
    const res = await agent.post('/api/admin/backup');
    expect(res.status).toBe(403);
  });

  it('should allow authorized backup request and handle full backups lifecycle', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: adminUser.username, password: 'password123' });

    // Create backup
    const res = await agent.post('/api/admin/backup');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('backup');
    expect(res.body.filename).toBeDefined();

    const filename = res.body.filename;
    const backupPath = res.body.path;

    try {
      // 1. List backups
      const listRes = await agent.get('/api/admin/backups');
      expect(listRes.status).toBe(200);
      expect(Array.isArray(listRes.body)).toBe(true);
      expect(listRes.body.some(b => b.filename === filename)).toBe(true);

      // 2. Download backup
      const downloadRes = await agent.get(`/api/admin/backups/${filename}/download`);
      expect(downloadRes.status).toBe(200);
      expect(downloadRes.headers['content-type']).toBeDefined();

      // 3. Restore backup
      const restoreRes = await agent.post('/api/admin/restore').send({ filename });
      expect(restoreRes.status).toBe(200);
      expect(restoreRes.body.message).toContain('restored');

      // 4. Delete backup
      const deleteRes = await agent.delete(`/api/admin/backups/${filename}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toContain('deleted');

      // Verify it is gone
      const listResAfter = await agent.get('/api/admin/backups');
      expect(listResAfter.body.some(b => b.filename === filename)).toBe(false);
    } finally {
      // Cleanup generated backup file if exists
      if (fs.existsSync(backupPath)) {
        fs.unlinkSync(backupPath);
      }
    }
  });

  it('should verify password successfully for authorized admin user', async () => {
    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: adminUser.username, password: 'password123' });

    // Correct password
    const res = await agent.post('/api/admin/backups/verify').send({ password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // Incorrect password
    const failRes = await agent.post('/api/admin/backups/verify').send({ password: 'wrong_password' });
    expect(failRes.status).toBe(401);
  });
});
