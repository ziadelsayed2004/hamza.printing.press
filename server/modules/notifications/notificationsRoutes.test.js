const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const productsService = require('../products/productsService');
const productPricesService = require('../products/productPricesService');
const outletsService = require('../outlets/outletsService');
const outletTypesService = require('../outlet-types/outletTypesService');
const inventoryService = require('../inventory/inventoryService');
const invoicesService = require('../invoices/invoicesService');
const paymentsService = require('../payments/paymentsService');

describe('Notifications API Integration Tests', () => {
  let adminUser;
  let guestUser;
  let adminRole;
  let guestRole;

  let wholesaleType;
  let testOutlet;
  let testProduct;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    guestRole = roles.find(r => r.name === 'readonly_viewer');

    // 2. Clean up table data
    await db.run('DELETE FROM notifications');
    await db.run('DELETE FROM shipment_items WHERE invoice_item_id IN (SELECT id FROM invoice_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES")) OR invoice_item_id IN (SELECT id FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM shipment_status_history WHERE shipment_id IN (SELECT id FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM return_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES") OR invoice_item_id IN (SELECT id FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM returns WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet") OR invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES") OR invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_receipts WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS")) OR outlet_type_id IN (SELECT id FROM outlet_types WHERE name = "Notif Wholesale")');
    await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM manual_adjustments WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS")');
    await db.run('DELETE FROM outlets WHERE name = "Test Notification Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Notif Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_notif_api_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_notif_api_admin',
      password: 'password123',
      fullName: 'Notif Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    guestUser = await usersService.createUser({
      username: 'test_notif_api_guest',
      password: 'password123',
      fullName: 'Notif Guest'
    });
    await usersService.assignRole(guestUser.id, guestRole.id);

    // 4. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Notif Wholesale',
      description: 'Test Notif Type'
    });

    testOutlet = await outletsService.createOutlet({
      name: 'Test Notification Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown Cairo',
      phone: '01222222222',
      creditLimit: 1000, // Small limit to test overage
      notes: 'Test Outlet'
    });

    // 5. Create product
    testProduct = await productsService.createProduct({
      title: 'Test Notification Book Tracked',
      code: 'T-NOTIF-BK-TRACK',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track'
    });

    // Seed pricing
    await productPricesService.updatePricesForProduct(testProduct.id, [
      { outletTypeId: wholesaleType.id, price: 100.0 }
    ]);
  });

  afterAll(async () => {
    // Clean test data
    await db.run('DELETE FROM notifications');
    await db.run('DELETE FROM shipment_items WHERE invoice_item_id IN (SELECT id FROM invoice_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES")) OR invoice_item_id IN (SELECT id FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM shipment_status_history WHERE shipment_id IN (SELECT id FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM return_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES") OR invoice_item_id IN (SELECT id FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")))');
    await db.run('DELETE FROM returns WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet") OR invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code = "BK-WITHOUT-PRICES") OR invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS"))');
    await db.run('DELETE FROM inventory_receipts WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS")) OR outlet_type_id IN (SELECT id FROM outlet_types WHERE name = "Notif Wholesale")');
    await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM manual_adjustments WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Notification Outlet")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Notification Book%" OR code IN ("BK-WITHOUT-PRICES", "BK-STOCK-LIMITS")');
    await db.run('DELETE FROM outlets WHERE name = "Test Notification Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Notif Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_notif_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_notif_api_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('RBAC Permissions for Notifications API', () => {
    it('should block GET /api/notifications for users without permissions', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_guest', password: 'password123' });

      const res = await agent.get('/api/notifications');
      expect(res.status).toBe(403);
    });

    it('should allow GET /api/notifications for super_admin users', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      const res = await agent.get('/api/notifications');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Stock Alerts Triggering and Deduplication', () => {
    it('should generate negative stock alert when stock drops below 0, and not create duplicates on subsequent adjustments', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // 1. Make stock negative by creating a negative stock adjustment (-5)
      await inventoryService.createAdjustment({
        reason: 'Test Stock Negative',
        notes: 'Adjustment',
        items: [{ productId: testProduct.id, quantity: -5 }],
        userId: adminUser.id
      });

      // 2. Fetch notifications and check if stock_negative alert was generated
      let res = await agent.get('/api/notifications?status=unread');
      expect(res.status).toBe(200);
      let notifs = res.body;
      let negAlert = notifs.find(n => n.category === 'stock_negative' && n.source_id === testProduct.id);
      expect(negAlert).toBeDefined();
      expect(negAlert.severity).toBe('critical');

      // 3. Make it further negative (-10) and verify that it updates the existing alert rather than creating a new one
      await inventoryService.createAdjustment({
        reason: 'Test Stock Negative More',
        notes: 'Adjustment',
        items: [{ productId: testProduct.id, quantity: -5 }],
        userId: adminUser.id
      });

      res = await agent.get('/api/notifications?status=unread');
      let count = res.body.filter(n => n.category === 'stock_negative' && n.source_id === testProduct.id).length;
      expect(count).toBe(1);

      // 4. Recover stock back to positive (+20) and check that the negative stock alert is resolved
      await inventoryService.createAdjustment({
        reason: 'Stock Recovered',
        notes: 'Adjustment',
        items: [{ productId: testProduct.id, quantity: 30 }],
        userId: adminUser.id
      });

      res = await agent.get('/api/notifications?category=stock_negative');
      let activeNegAlerts = res.body.filter(n => n.source_id === testProduct.id && n.status !== 'resolved');
      expect(activeNegAlerts.length).toBe(0);

      // The resolved alert should still exist but marked resolved
      let resolvedNegAlerts = res.body.filter(n => n.source_id === testProduct.id && n.status === 'resolved');
      expect(resolvedNegAlerts.length).toBeGreaterThan(0);
    });
  });

  describe('Outlet Credit Limit Alerts', () => {
    it('should generate an alert when receivables exceed credit limit, and resolve it when balance returns within limit', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // 1. Create invoice that exceeds the 1000 credit limit (12 books @ 100 = 1200 EGP)
      const invRes = await agent
        .post('/api/invoices')
        .send({
          outletId: testOutlet.id,
          paymentType: 'deferred',
          items: [{ productId: testProduct.id, quantity: 12 }],
          notes: 'Invoice for overage'
        });
      expect(invRes.status).toBe(201);
      const invoiceId = invRes.body.invoice.id;

      // 2. Verify that the credit limit exceeded notification was triggered
      let res = await agent.get('/api/notifications?status=unread');
      let limitAlert = res.body.find(n => n.category === 'outlet_credit_limit_exceeded' && n.source_id === testOutlet.id);
      expect(limitAlert).toBeDefined();
      expect(limitAlert.severity).toBe('critical');

      // 3. Make a payment that brings receivables back under the limit (e.g. pay 400 EGP, leaving 800 EGP outstanding)
      const payRes = await agent
        .post(`/api/payments`)
        .send({
          invoiceId,
          amount: 400,
          paymentMethod: 'cash',
          notes: 'Partial payment'
        });
      expect(payRes.status).toBe(201);

      // 4. Verify that the credit limit exceeded alert was automatically resolved
      res = await agent.get('/api/notifications?category=outlet_credit_limit_exceeded');
      let activeLimitAlerts = res.body.filter(n => n.source_id === testOutlet.id && n.status !== 'resolved');
      expect(activeLimitAlerts.length).toBe(0);

      // Payment received info alert should be created
      let payRecNotif = res.body.find(n => n.category === 'payment_received');
      // If category list doesn't match outlet limit, search all
      let allRes = await agent.get('/api/notifications');
      let payRec = allRes.body.find(n => n.category === 'payment_received');
      expect(payRec).toBeDefined();
    });
  });

  describe('Notifications Modification Actions', () => {
    let notifId;

    beforeEach(async () => {
      // Create a test system notification
      const sql = `
        INSERT INTO notifications (category, severity, title, message, status)
        VALUES ('system', 'info', 'Test Title', 'Test Message', 'unread')
      `;
      const result = await db.run(sql);
      notifId = result.lastID;
    });

    it('should mark a notification as read via PATCH /api/notifications/:id/read', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      const res = await agent.patch(`/api/notifications/${notifId}/read`);
      expect(res.status).toBe(200);

      const check = await db.get('SELECT status FROM notifications WHERE id = ?', [notifId]);
      expect(check.status).toBe('read');
    });

    it('should resolve a notification via PATCH /api/notifications/:id/resolve', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      const res = await agent.patch(`/api/notifications/${notifId}/resolve`);
      expect(res.status).toBe(200);

      const check = await db.get('SELECT status FROM notifications WHERE id = ?', [notifId]);
      expect(check.status).toBe('resolved');
      expect(check.resolved_at).not.toBeNull();
    });
  });

  describe('Advanced Notifications Rules Integration', () => {
    it('should trigger missing price notifications on active products and resolve them when prices are configured', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // 1. Create a product with no price configurations
      const product = await productsService.createProduct({
        title: 'Book without prices',
        code: 'BK-WITHOUT-PRICES',
        category: 'Literature',
        status: 'active',
        stockPolicy: 'track'
      });

      // Verify that the price_missing notification was triggered
      let res = await agent.get('/api/notifications?status=unread');
      let priceAlert = res.body.find(n => n.category === 'price_missing' && n.source_id === product.id);
      expect(priceAlert).toBeDefined();
      expect(priceAlert.severity).toBe('warning');

      // 2. Configure price for all active outlet types
      const outletTypes = await db.all("SELECT id FROM outlet_types WHERE status = 'active'");
      const pricesPayload = outletTypes.map(ot => ({ outletTypeId: ot.id, price: 100.0 }));
      
      const priceRes = await agent.put(`/api/product-prices/product/${product.id}`).send({
        prices: pricesPayload
      });
      expect(priceRes.status).toBe(200);

      // Verify that the price_missing alert was resolved
      res = await agent.get('/api/notifications');
      let activePriceAlerts = res.body.filter(n => n.category === 'price_missing' && n.source_id === product.id && n.status !== 'resolved');
      expect(activePriceAlerts.length).toBe(0);
    });

    it('should trigger insufficient stock warning notification when trying to purchase more than available', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // Create an active product with 5 stock tracked
      const product = await productsService.createProduct({
        title: 'Book for stock limits',
        code: 'BK-STOCK-LIMITS',
        category: 'Literature',
        status: 'active',
        stockPolicy: 'track'
      });
      // configure pricing
      const outletTypes = await db.all("SELECT id FROM outlet_types WHERE status = 'active'");
      const pricesPayload = outletTypes.map(ot => ({ outletTypeId: ot.id, price: 100.0 }));
      await agent.put(`/api/product-prices/product/${product.id}`).send({
        prices: pricesPayload
      });
      // seed 5 stock
      await inventoryService.createTransaction({
        productId: product.id,
        transactionType: 'receipt',
        quantity: 5,
        referenceType: 'receipt',
        referenceId: 99999,
        userId: adminUser.id
      });

      // Try to create an invoice with quantity 10 (exceeds 5 available)
      const resInvoice = await agent
        .post('/api/invoices')
        .send({
          outletId: testOutlet.id,
          discount: 0,
          shippingCost: 0,
          paymentType: 'deferred',
          items: [{ productId: product.id, quantity: 10 }]
        });
      expect(resInvoice.status).toBe(400);

      // Verify that insufficient stock notification was triggered
      const resNotif = await agent.get('/api/notifications?status=unread');
      const stockAlert = resNotif.body.find(
        n => n.category === 'stock_low' &&
        n.severity === 'critical' &&
        n.message.includes('المخزون غير كافٍ للكتاب') &&
        n.source_id === product.id
      );
      expect(stockAlert).toBeDefined();
    });

    it('should trigger collected-not-supplied cash warning notifications when unsupplied balance exceeds 1000 EGP', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // Seed stock and increase credit limit so invoice creation succeeds
      await inventoryService.createTransaction({
        productId: testProduct.id,
        transactionType: 'receipt',
        quantity: 100,
        referenceType: 'receipt',
        referenceId: 99999,
        userId: adminUser.id
      });
      await db.run('UPDATE outlets SET credit_limit = 10000 WHERE id = ?', [testOutlet.id]);

      // Create a test invoice
      const invRes = await agent
        .post('/api/invoices')
        .send({
          outletId: testOutlet.id,
          discount: 0,
          shippingCost: 0,
          paymentType: 'deferred',
          items: [{ productId: testProduct.id, quantity: 15 }] // 15 * 100 = 1500 EGP
        });
      expect(invRes.status).toBe(201);
      const invoiceId = invRes.body.invoice.id;

      // Record a payment of 1100 EGP (exceeds 1000 EGP limit) with status not_supplied
      const payRes = await agent
        .post('/api/payments')
        .send({
          invoiceId,
          amount: 1100,
          paymentMethod: 'cash',
          supplyStatus: 'not_supplied',
          notes: 'Unsupplied payment'
        });
      expect(payRes.status).toBe(201);
      const paymentId = payRes.body.payment.id;

      // Verify that the finance_warning notification was triggered for collected-not-supplied cash
      let res = await agent.get('/api/notifications?status=unread');
      let financeAlert = res.body.find(n => n.category === 'finance_warning' && n.dedupe_key === `outlet_unsupplied_cash:${testOutlet.id}`);
      expect(financeAlert).toBeDefined();

      // Supply the payment
      const supplyRes = await agent.post(`/api/payments/${paymentId}/supply`);
      expect(supplyRes.status).toBe(200);

      // Verify that the finance_warning notification is resolved
      res = await agent.get('/api/notifications');
      let activeFinanceAlerts = res.body.filter(n => n.dedupe_key === `outlet_unsupplied_cash:${testOutlet.id}` && n.status !== 'resolved');
      expect(activeFinanceAlerts.length).toBe(0);
    });

    it('should trigger invoice_overdue notifications for deferred invoices older than 30 days and resolve them when invoice is cancelled', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_notif_api_admin', password: 'password123' });

      // 1. Create a deferred invoice
      const invRes = await agent
        .post('/api/invoices')
        .send({
          outletId: testOutlet.id,
          discount: 0,
          shippingCost: 0,
          paymentType: 'deferred',
          items: [{ productId: testProduct.id, quantity: 2 }]
        });
      expect(invRes.status).toBe(201);
      const invoiceId = invRes.body.invoice.id;

      // 2. Set the invoice date back by 40 days
      await db.run("UPDATE invoices SET created_at = datetime('now', '-40 days') WHERE id = ?", [invoiceId]);

      // 3. Fetch notifications (should trigger the overdue scan)
      let res = await agent.get('/api/notifications?status=unread');
      let overdueAlert = res.body.find(n => n.category === 'invoice_overdue' && n.source_id === invoiceId);
      expect(overdueAlert).toBeDefined();

      // 4. Cancel the invoice (this should mark the invoice as cancelled)
      const cancelRes = await agent.post(`/api/invoices/${invoiceId}/cancel`);
      expect(cancelRes.status).toBe(200);

      // 5. Fetch notifications again and verify alert is resolved
      res = await agent.get('/api/notifications?status=unread');
      let resolvedAlert = res.body.find(n => n.category === 'invoice_overdue' && n.source_id === invoiceId);
      expect(resolvedAlert).toBeUndefined();
    });
  });
});
