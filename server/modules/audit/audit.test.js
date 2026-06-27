const express = require('express');
const request = require('supertest');
const db = require('../../db');
const usersService = require('../users/usersService');
const auditService = require('./auditService');
const { auditLog } = require('../../middleware/audit');

describe('Audit Logging System', () => {
  let app;
  let testUser;

  beforeAll(async () => {
    // 1. Create a test user
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_audit_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_audit_%"');
    await db.run('DELETE FROM audit_logs'); // clean audit logs before testing

    testUser = await usersService.createUser({
      username: 'test_audit_user',
      password: 'password123',
      fullName: 'Audit User'
    });
  });

  afterAll((done) => {
    db.db.close(done);
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Inject session mock
    app.use((req, res, next) => {
      req.session = {
        user: { id: testUser.id, username: testUser.username }
      };
      next();
    });
  });

  it('should write an audit log programmatically and retrieve it', async () => {
    const logId = await auditService.log({
      userId: testUser.id,
      action: 'login',
      targetType: 'users',
      targetId: testUser.id.toString(),
      details: { client: 'Jest test' },
      ipAddress: '127.0.0.1'
    });

    expect(logId).toBeDefined();
    expect(logId).toBeGreaterThan(0);

    const logs = await auditService.getLogs({ userId: testUser.id });
    expect(logs.length).toBe(1);
    expect(logs[0].action).toBe('login');
    expect(logs[0].details.client).toBe('Jest test');
    expect(logs[0].username).toBe('test_audit_user');
  });

  it('should auto log successful request via middleware and scrub passwords', async () => {
    app.post('/test-action/:id', auditLog('create_product', 'products'), (req, res) => {
      res.status(200).json({ success: true });
    });

    const response = await request(app)
      .post(`/test-action/45`)
      .send({ productName: 'Book A', password: 'secretPassword123' });

    expect(response.status).toBe(200);

    // Wait slightly for res.on('finish') to run db operations asynchronously
    await new Promise(resolve => setTimeout(resolve, 100));

    const logs = await auditService.getLogs({ action: 'create_product' });
    expect(logs.length).toBe(1);
    expect(logs[0].target_id).toBe('45');
    expect(logs[0].details.body.productName).toBe('Book A');
    expect(logs[0].details.body.password).toBeUndefined(); // MUST be scrubbed
  });

  it('should NOT log failed requests (statusCode >= 400)', async () => {
    app.post('/fail-route', auditLog('fail_action', 'users'), (req, res) => {
      res.status(400).json({ error: 'Bad Request' });
    });

    const response = await request(app).post('/fail-route');
    expect(response.status).toBe(400);

    await new Promise(resolve => setTimeout(resolve, 100));

    const logs = await auditService.getLogs({ action: 'fail_action' });
    expect(logs.length).toBe(0); // Should not record failures in audit system
  });
});
