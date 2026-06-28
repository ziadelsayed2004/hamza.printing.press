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

describe('Finance API Integration Tests', () => {
  let adminUser;
  let accountantUser;
  let guestUser;

  let adminRole;
  let accountantRole;
  let guestRole;

  let wholesaleType;
  let cairoOutlet;
  let activeBook;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    accountantRole = roles.find(r => r.name === 'accountant');
    guestRole = roles.find(r => r.name === 'readonly_viewer');

    // 2. Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM manual_adjustments WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_fin_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Finance Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Finance Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Finance Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_fin_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_fin_api_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_fin_api_admin',
      password: 'password123',
      fullName: 'Finance Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    accountantUser = await usersService.createUser({
      username: 'test_fin_api_accountant',
      password: 'password123',
      fullName: 'Finance Accountant'
    });
    await usersService.assignRole(accountantUser.id, accountantRole.id);

    guestUser = await usersService.createUser({
      username: 'test_fin_api_guest',
      password: 'password123',
      fullName: 'Finance Guest'
    });
    await usersService.assignRole(guestUser.id, guestRole.id);

    // 4. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Finance Wholesale',
      description: 'Test Finance Type'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Finance Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown Cairo',
      phone: '01222222222',
      creditLimit: 20000,
      notes: 'Test Finance Outlet'
    });

    // 5. Create active book
    activeBook = await productsService.createProduct({
      title: 'Test Finance Book Tracked',
      code: 'T-FIN-BK-TRACK',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track'
    });

    // 6. Seed pricing for the Finance Wholesale type
    await productPricesService.updatePricesForProduct(activeBook.id, [
      { outletTypeId: wholesaleType.id, price: 200.0 }
    ]);

    // 7. Seed stock
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      notes: 'Test stock',
      items: [{ productId: activeBook.id, quantity: 20 }],
      userId: adminUser.id
    });
  });

  afterAll(async () => {
    // Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet"))');
    await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM manual_adjustments WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Finance Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_fin_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Finance Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Finance Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Finance Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Finance Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_fin_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_fin_api_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('RBAC Permissions for Finance Endpoints', () => {
    it('should block GET /api/finance/summary for users without permission', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_guest', password: 'password123' });

      const res = await agent.get('/api/finance/summary');
      expect(res.status).toBe(403);
    });

    it('should block POST /api/finance/manual-adjustments for accountants (has view, not adjust)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_accountant', password: 'password123' });

      const res = await agent
        .post('/api/finance/manual-adjustments')
        .send({
          outletId: cairoOutlet.id,
          amount: 500,
          adjustmentType: 'deposit',
          notes: 'Test deposit'
        });
      expect(res.status).toBe(403);
    });
  });

  describe('Invoice and Payment Lifecycle Balance Integration', () => {
    let invoiceId;
    let paymentId;

    it('should record an invoice creation in the finance ledger (increasing receivables)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      // Check summary before
      let summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.status).toBe(200);
      const initialReceivables = summaryRes.body.totalReceivables;
      const initialCollected = summaryRes.body.totalCollected;

      // 1. Create an invoice of 400 EGP (2 * 200 EGP)
      const invRes = await agent
        .post('/api/invoices')
        .send({
          outletId: cairoOutlet.id,
          discount: 0,
          shippingCost: 0,
          paymentType: 'deferred',
          notes: 'Finance test invoice',
          items: [{ productId: activeBook.id, quantity: 2 }]
        });
      expect(invRes.status).toBe(201);
      invoiceId = invRes.body.invoice.id;

      // Verify summary updated
      summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.body.totalReceivables).toBe(initialReceivables + 400);
      expect(summaryRes.body.totalCollected).toBe(initialCollected);

      // Verify ledger history row exists
      const historyRes = await agent.get(`/api/finance/balances/history?outletId=${cairoOutlet.id}`);
      expect(historyRes.status).toBe(200);
      const latestEntry = historyRes.body.find(e => e.reference_id === invoiceId && e.entry_type === 'invoice_created');
      expect(latestEntry).toBeDefined();
      expect(latestEntry.receivable_amount).toBe(400);
      expect(latestEntry.cash_amount).toBe(0);
    });

    it('should record a payment in the finance ledger (reducing receivables, increasing collected cash)', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      // Check summary before
      let summaryRes = await agent.get('/api/finance/summary');
      const recvBefore = summaryRes.body.totalReceivables;
      const cashBefore = summaryRes.body.totalCollected;

      // Record 150 EGP payment
      const payRes = await agent
        .post('/api/payments')
        .send({
          invoiceId,
          amount: 150,
          paymentMethod: 'cash',
          paymentDate: new Date().toISOString(),
          notes: 'Partially paying'
        });
      expect(payRes.status).toBe(201);
      paymentId = payRes.body.payment.id;

      // Verify summary
      summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.body.totalReceivables).toBe(recvBefore - 150);
      expect(summaryRes.body.totalCollected).toBe(cashBefore + 150);

      // Verify ledger entries
      const historyRes = await agent.get(`/api/finance/balances/history?outletId=${cairoOutlet.id}`);
      const payEntry = historyRes.body.find(e => e.reference_id === paymentId && e.entry_type === 'payment_recorded');
      expect(payEntry).toBeDefined();
      expect(payEntry.receivable_amount).toBe(-150);
      expect(payEntry.cash_amount).toBe(150);
    });

    it('should reverse the balance impact when a payment is reversed', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      let summaryRes = await agent.get('/api/finance/summary');
      const recvBefore = summaryRes.body.totalReceivables;
      const cashBefore = summaryRes.body.totalCollected;

      // Reverse the 150 EGP payment
      const revRes = await agent.post(`/api/payments/${paymentId}/reverse`).send({ notes: 'Reversal' });
      expect(revRes.status).toBe(200);

      // Verify summary
      summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.body.totalReceivables).toBe(recvBefore + 150);
      expect(summaryRes.body.totalCollected).toBe(cashBefore - 150);

      // Verify ledger entries
      const historyRes = await agent.get(`/api/finance/balances/history?outletId=${cairoOutlet.id}`);
      const revEntry = historyRes.body.find(e => e.reference_id === paymentId && e.entry_type === 'payment_reversed');
      expect(revEntry).toBeDefined();
      expect(revEntry.receivable_amount).toBe(150);
      expect(revEntry.cash_amount).toBe(-150);
    });

    it('should reverse outstanding receivables when an invoice is cancelled', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      let summaryRes = await agent.get('/api/finance/summary');
      const recvBefore = summaryRes.body.totalReceivables;

      // Cancel the invoice (400 EGP receivable outstanding)
      const cancelRes = await agent.post(`/api/invoices/${invoiceId}/cancel`);
      expect(cancelRes.status).toBe(200);
      expect(cancelRes.body.invoice.payment_status).toBe('cancelled');

      // Verify summary
      summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.body.totalReceivables).toBe(recvBefore - 400);

      // Verify ledger entry
      const historyRes = await agent.get(`/api/finance/balances/history?outletId=${cairoOutlet.id}`);
      const cancelEntry = historyRes.body.find(e => e.reference_id === invoiceId && e.entry_type === 'invoice_cancelled');
      expect(cancelEntry).toBeDefined();
      expect(cancelEntry.receivable_amount).toBe(-400);
      expect(cancelEntry.cash_amount).toBe(0);
    });
  });

  describe('Outlet Statement API tests', () => {
    it('should successfully retrieve the outlet statement with correct summary structure', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      const res = await agent.get(`/api/finance/outlets/${cairoOutlet.id}/statement`);
      expect(res.status).toBe(200);
      expect(res.body.outlet).toBeDefined();
      expect(res.body.outlet.id).toBe(cairoOutlet.id);
      expect(res.body.summary).toBeDefined();
      expect(res.body.summary.return_balance).toBeDefined();
      expect(res.body.summary.net_exposure).toBeDefined();
      expect(res.body.statement).toBeInstanceOf(Array);
    });

    it('should block non-elevated user with no linked outlets from viewing the statement', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_guest', password: 'password123' });

      const res = await agent.get(`/api/finance/outlets/${cairoOutlet.id}/statement`);
      expect(res.status).toBe(403);
    });
  });

  describe('Manual Adjustments and Grouped Balance Breakdowns', () => {
    it('should successfully record manual adjustments and reflect them in the history and breakdowns', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      // 1. Post a manual deposit of 1000 EGP
      const depRes = await agent
        .post('/api/finance/manual-adjustments')
        .send({
          outletId: cairoOutlet.id,
          amount: 1000,
          adjustmentType: 'deposit',
          notes: 'Initial seed deposit'
        });
      expect(depRes.status).toBe(201);
      expect(depRes.body.success).toBe(true);

      // 2. Post a manual withdrawal of 300 EGP
      const wdRes = await agent
        .post('/api/finance/manual-adjustments')
        .send({
          outletId: cairoOutlet.id,
          amount: 300,
          adjustmentType: 'withdrawal',
          notes: 'Petty cash withdrawal'
        });
      expect(wdRes.status).toBe(201);

      // 3. Post a manual debit adjustment (adding receivable) of 400 EGP
      const debRes = await agent
        .post('/api/finance/manual-adjustments')
        .send({
          outletId: cairoOutlet.id,
          amount: 400,
          adjustmentType: 'debit_adjustment',
          notes: 'Fines/fees adjustment'
        });
      expect(debRes.status).toBe(201);

      // Verify summary has +700 Collected and +400 Receivables
      const summaryRes = await agent.get('/api/finance/summary');
      expect(summaryRes.body.totalCollected).toBeGreaterThanOrEqual(700);
      expect(summaryRes.body.totalReceivables).toBeGreaterThanOrEqual(400);

      // Verify outlet breakdown matches
      const outletsRes = await agent.get('/api/finance/outlets');
      expect(outletsRes.status).toBe(200);
      const currentOutletBalance = outletsRes.body.find(o => o.id === cairoOutlet.id);
      expect(currentOutletBalance).toBeDefined();
      expect(currentOutletBalance.collected_balance).toBe(700);
      expect(currentOutletBalance.receivable_balance).toBe(400);

      // Verify governorates breakdown
      const govRes = await agent.get('/api/finance/governorates');
      expect(govRes.status).toBe(200);
      const cairoGov = govRes.body.find(g => g.governorate === 'Cairo');
      expect(cairoGov).toBeDefined();
      expect(cairoGov.collected_balance).toBe(700);
      expect(cairoGov.receivable_balance).toBe(400);

      // Verify outlet-types breakdown
      const typeRes = await agent.get('/api/finance/outlet-types');
      expect(typeRes.status).toBe(200);
      const wholesaleTypeBal = typeRes.body.find(t => t.id === wholesaleType.id);
      expect(wholesaleTypeBal).toBeDefined();
      expect(wholesaleTypeBal.collected_balance).toBe(700);
      expect(wholesaleTypeBal.receivable_balance).toBe(400);
    });

    it('should fail with 400 if notes/reason is missing for manual adjustments', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_fin_api_admin', password: 'password123' });

      const res = await agent
        .post('/api/finance/manual-adjustments')
        .send({
          outletId: cairoOutlet.id,
          amount: 100,
          adjustmentType: 'deposit',
          notes: '   ' // empty
        });
      expect(res.status).toBe(400);
    });
  });
});
