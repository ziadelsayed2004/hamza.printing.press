const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const notificationsService = require('./notificationsService');

describe('Notification Preview Routes Smoke Matrix Tests', () => {
  let adminUser;
  let adminRole;
  let agent;

  beforeAll(async () => {
    // Retrieve super_admin role
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');

    const rand = Math.floor(Math.random() * 100000);
    const username = `notif_smoke_${rand}`;

    adminUser = await usersService.createUser({
      username,
      password: 'password123',
      fullName: 'Notification Smoke Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username, password: 'password123' });
  });

  afterAll(async () => {
    if (adminUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [adminUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [adminUser.id]);
    }
    await db.run('DELETE FROM notifications WHERE title LIKE "%SMOKE%"');
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  const smokeMatrix = [
    { category: 'stock_negative', severity: 'critical', title: 'SMOKE: Negative Stock Alert', message: 'Negative stock detected', action_url: '/inventory' },
    { category: 'stock_low', severity: 'warning', title: 'SMOKE: Low Stock Alert', message: 'Low stock detected', action_url: '/inventory' },
    { category: 'outlet_credit_limit_exceeded', severity: 'critical', title: 'SMOKE: Credit Limit Alert', message: 'Credit limit exceeded', action_url: '/outlets' },
    { category: 'invoice_overdue', severity: 'warning', title: 'SMOKE: Invoice Overdue Alert', message: 'Invoice is overdue', action_url: '/invoices' },
    { category: 'payment_received', severity: 'success', title: 'SMOKE: Payment Receipt Alert', message: 'Payment receipt pending review', action_url: '/payments' },
    { category: 'shipment_partial', severity: 'info', title: 'SMOKE: Shipment Alert', message: 'Partial shipment created', action_url: '/shipments' }
  ];

  it('should successfully create, fetch, verify preview URL mapping, and resolve all notification types in the matrix', async () => {
    // 1. Create a notification for each category in the smoke matrix
    for (const testCase of smokeMatrix) {
      const notifId = await notificationsService.createOrUpdateNotification({
        category: testCase.category,
        severity: testCase.severity,
        title: testCase.title,
        message: testCase.message,
        source_type: 'system',
        source_id: 999,
        dedupe_key: `smoke:${testCase.category}:${Math.random()}`,
        action_url: testCase.action_url
      });
      expect(notifId).toBeDefined();
    }

    // 2. Query notifications from API and assert their properties
    const listRes = await agent.get('/api/notifications?limit=100');
    expect(listRes.status).toBe(200);

    const activeSmokeNotifications = listRes.body.filter(n => n.title.startsWith('SMOKE:'));
    expect(activeSmokeNotifications.length).toBe(smokeMatrix.length);

    activeSmokeNotifications.forEach(notif => {
      const match = smokeMatrix.find(item => item.category === notif.category);
      expect(match).toBeDefined();
      expect(notif.severity).toBe(match.severity);
      expect(notif.action_url).toBe(match.action_url);
      expect(notif.status).toBe('unread'); // initial state
    });

    // 3. Resolve all active smoke notifications and verify ignored states
    for (const notif of activeSmokeNotifications) {
      const resolveRes = await agent.patch(`/api/notifications/${notif.id}/resolve`);
      expect(resolveRes.status).toBe(200);
      expect(resolveRes.body.success).toBe(true);
    }

    // 4. Verify resolved status from dynamic list query
    const listResolvedRes = await agent.get('/api/notifications?status=resolved&limit=100');
    expect(listResolvedRes.status).toBe(200);

    const resolvedSmokeNotifications = listResolvedRes.body.filter(n => n.title.startsWith('SMOKE:'));
    expect(resolvedSmokeNotifications.length).toBe(smokeMatrix.length);

    resolvedSmokeNotifications.forEach(notif => {
      expect(notif.status).toBe('resolved');
    });
  });
});
