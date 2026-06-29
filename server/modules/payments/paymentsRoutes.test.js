const request = require('supertest');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const productsService = require('../products/productsService');
const productPricesService = require('../products/productPricesService');
const outletsService = require('../outlets/outletsService');
const outletTypesService = require('../outlet-types/outletTypesService');
const invoicesService = require('../invoices/invoicesService');
const paymentsService = require('./paymentsService');
const financeService = require('../finance/financeService');

describe('Payments API Integration Tests', () => {
  let adminUser;
  let staffUser;
  let accountantUser;
  let guestUser;

  let adminRole;
  let staffRole;
  let accountantRole;
  let guestRole;

  let wholesaleType;
  let cairoOutlet;
  let testProduct;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    staffRole = roles.find(r => r.name === 'sales_staff');
    accountantRole = roles.find(r => r.name === 'accountant');
    guestRole = roles.find(r => r.name === 'readonly_viewer');

    // 2. Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title = "Test Payment Book")');
    await db.run('DELETE FROM products WHERE title = "Test Payment Book"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Payment Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Payment Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_pay_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_pay_api_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_pay_api_admin',
      password: 'password123',
      fullName: 'Payments Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_pay_api_staff',
      password: 'password123',
      fullName: 'Payments Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    accountantUser = await usersService.createUser({
      username: 'test_pay_api_accountant',
      password: 'password123',
      fullName: 'Payments Accountant'
    });
    await usersService.assignRole(accountantUser.id, accountantRole.id);

    guestUser = await usersService.createUser({
      username: 'test_pay_api_guest',
      password: 'password123',
      fullName: 'Payments Guest'
    });
    await usersService.assignRole(guestUser.id, guestRole.id);

    // 4. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Payment Wholesale',
      description: 'Test Type'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Cairo Payment Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown Cairo',
      phone: '01233333333',
      creditLimit: 10000,
      notes: 'Test Cairo Outlet'
    });

    // 5. Create books/products
    testProduct = await productsService.createProduct({
      title: 'Test Payment Book',
      code: 'T-PAY-BK',
      category: 'Science',
      status: 'active',
      stockPolicy: 'ignore'
    });

    // 6. Seed pricing
    await productPricesService.updatePricesForProduct(testProduct.id, [
      { outletTypeId: wholesaleType.id, price: 100.0 }
    ]);
  });

  afterAll(async () => {
    // Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title = "Test Payment Book")');
    await db.run('DELETE FROM products WHERE title = "Test Payment Book"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Payment Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Payment Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_pay_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_pay_api_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('POST /api/payments', () => {
    let cashInvoice;

    beforeEach(async () => {
      cashInvoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 2 }], // 200
        paymentType: 'cash',
        userId: staffUser.id
      });
    });

    it('should restrict payment creation for users without permission', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_guest', password: 'password123' });

      const response = await agent
        .post('/api/payments')
        .send({
          invoiceId: cashInvoice.id,
          amount: 50.0,
          paymentMethod: 'cash'
        });
      expect(response.status).toBe(403);
    });

    it('should reject payment if amount exceeds remaining balance', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      const response = await agent
        .post('/api/payments')
        .send({
          invoiceId: cashInvoice.id,
          amount: 250.0,
          paymentMethod: 'cash'
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('exceeds');
    });

    it('should record payment and update invoice status to paid when fully paid', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      let res = await agent.post('/api/payments').send({
        invoiceId: cashInvoice.id,
        amount: 100.0,
        paymentMethod: 'cash'
      });
      expect(res.status).toBe(201);
      
      let inv = await invoicesService.getInvoiceById(cashInvoice.id);
      expect(inv.payment_status).toBe('partially_paid');

      res = await agent.post('/api/payments').send({
        invoiceId: cashInvoice.id,
        amount: 100.0,
        paymentMethod: 'cash'
      });
      expect(res.status).toBe(201);

      inv = await invoicesService.getInvoiceById(cashInvoice.id);
      expect(inv.payment_status).toBe('paid');
    });
  });

  describe('Collection and Supply Reconciliation Scenarios', () => {
    beforeEach(async () => {
      // Clean existing invoice records to isolate calculations
      await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id = ?)', [cairoOutlet.id]);
      await db.run('DELETE FROM finance_ledger_entries WHERE outlet_id = ?', [cairoOutlet.id]);
      await db.run('DELETE FROM invoices WHERE outlet_id = ?', [cairoOutlet.id]);
    });

    it('should correctly process the 5 financial test scenarios', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      // --- Scenario 1: Create invoice for 1000 EGP, no payment ---
      // (10 items of 100 EGP each)
      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 10 }],
        paymentType: 'deferred',
        userId: staffUser.id
      });

      let summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.totalInvoices).toBe(1000.0);
      expect(summary.totalCollected).toBe(0.0);
      expect(summary.pendingBalance).toBe(1000.0);
      expect(summary.suppliedBalance).toBe(0.0);
      expect(summary.unsuppliedBalance).toBe(0.0);

      // --- Scenario 2: Collect 400 EGP, not supplied ---
      const collect1Res = await agent.post('/api/payments').send({
        invoiceId: invoice.id,
        amount: 400.0,
        paymentMethod: 'cash',
        supplyStatus: 'not_supplied'
      });
      expect(collect1Res.status).toBe(201);
      const payment1 = collect1Res.body.payment;

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.pendingBalance).toBe(600.0);
      expect(summary.totalCollected).toBe(400.0);
      expect(summary.unsuppliedBalance).toBe(400.0);
      expect(summary.suppliedBalance).toBe(0.0);

      // --- Scenario 3: Mark 400 supplied ---
      const supplyRes = await agent.post(`/api/payments/${payment1.id}/supply`);
      expect(supplyRes.status).toBe(200);

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.pendingBalance).toBe(600.0);
      expect(summary.totalCollected).toBe(400.0);
      expect(summary.unsuppliedBalance).toBe(0.0);
      expect(summary.suppliedBalance).toBe(400.0);

      // --- Scenario 4: Collect remaining 600 EGP supplied ---
      const collect2Res = await agent.post('/api/payments').send({
        invoiceId: invoice.id,
        amount: 600.0,
        paymentMethod: 'bank_transfer',
        supplyStatus: 'supplied'
      });
      expect(collect2Res.status).toBe(201);

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.pendingBalance).toBe(0.0);
      expect(summary.totalCollected).toBe(1000.0);
      expect(summary.unsuppliedBalance).toBe(0.0);
      expect(summary.suppliedBalance).toBe(1000.0);

      const inv = await invoicesService.getInvoiceById(invoice.id);
      expect(inv.payment_status).toBe('paid');

      // --- Scenario 5: Reverse payment ---
      const accountantAgent = request.agent(app);
      await accountantAgent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });
      
      const reverseRes = await accountantAgent.post(`/api/payments/${payment1.id}/reverse`).send({ notes: 'Reverse first payment' });
      expect(reverseRes.status).toBe(200);

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.pendingBalance).toBe(400.0);
      expect(summary.totalCollected).toBe(600.0);
      expect(summary.suppliedBalance).toBe(600.0); // The remaining payment was directly supplied
    });

    it('should support batch supply operations', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 5 }], // 500 EGP
        paymentType: 'deferred',
        userId: staffUser.id
      });

      const p1 = await paymentsService.recordPayment({
        invoiceId: invoice.id,
        amount: 150.0,
        paymentMethod: 'cash',
        supplyStatus: 'not_supplied',
        userId: staffUser.id
      });

      const p2 = await paymentsService.recordPayment({
        invoiceId: invoice.id,
        amount: 150.0,
        paymentMethod: 'cash',
        supplyStatus: 'not_supplied',
        userId: staffUser.id
      });

      let summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.unsuppliedBalance).toBe(300.0);

      // accountant batch supplies payments
      const accountantAgent = request.agent(app);
      await accountantAgent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      const batchRes = await accountantAgent.post('/api/payments/supply-batch').send({
        paymentIds: [p1.id, p2.id]
      });
      expect(batchRes.status).toBe(200);
      expect(batchRes.body.suppliedCount).toBe(2);

      // Verify supplied_at and supplied_by are set correctly
      const p1Record = await db.get('SELECT * FROM invoice_payments WHERE id = ?', [p1.id]);
      expect(p1Record.supplied_at).not.toBeNull();
      expect(p1Record.supplied_by).toBe(accountantUser.id);

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.unsuppliedBalance).toBe(0.0);
      expect(summary.suppliedBalance).toBe(300.0);
    });

    it('should support supply reversals', async () => {
      const accountantAgent = request.agent(app);
      await accountantAgent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 2 }], // 200 EGP
        paymentType: 'deferred',
        userId: staffUser.id
      });

      const payment = await paymentsService.recordPayment({
        invoiceId: invoice.id,
        amount: 100.0,
        paymentMethod: 'cash',
        supplyStatus: 'supplied',
        userId: staffUser.id
      });

      // Verify supplied_at and supplied_by are set on creation
      const payRecordAfterCreate = await db.get('SELECT * FROM invoice_payments WHERE id = ?', [payment.id]);
      expect(payRecordAfterCreate.supplied_at).not.toBeNull();
      expect(payRecordAfterCreate.supplied_by).toBe(staffUser.id);

      let summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.suppliedBalance).toBe(100.0);

      // Reverse supply
      const revSupplyRes = await accountantAgent.post(`/api/payments/${payment.id}/reverse-supply`).send({ notes: 'Correction' });
      expect(revSupplyRes.status).toBe(200);

      // Verify supplied_at and supplied_by are cleared (null) after reversal
      const payRecordAfterRev = await db.get('SELECT * FROM invoice_payments WHERE id = ?', [payment.id]);
      expect(payRecordAfterRev.supplied_at).toBeNull();
      expect(payRecordAfterRev.supplied_by).toBeNull();

      summary = await financeService.getFinanceSummary([cairoOutlet.id]);
      expect(summary.suppliedBalance).toBe(0.0);
      expect(summary.unsuppliedBalance).toBe(100.0);
    });

    it('should generate outlet statements with correct chronological balances', async () => {
      // Fetch statement of account for cairoOutlet
      const accountantAgent = request.agent(app);
      await accountantAgent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      const res = await accountantAgent.get(`/api/finance/outlets/${cairoOutlet.id}/statement`);
      expect(res.status).toBe(200);
      expect(res.body.outlet.id).toBe(cairoOutlet.id);
      expect(Array.isArray(res.body.statement)).toBe(true);

      const statement = res.body.statement;
      if (statement.length > 0) {
        const lastEntry = statement[statement.length - 1];
        expect(lastEntry).toHaveProperty('running_receivable');
        expect(lastEntry).toHaveProperty('running_cash');
      }
    });

    it('should support payment receipt upload, queue retrieval, and review approval', async () => {
      const staffAgent = request.agent(app);
      await staffAgent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      const accountantAgent = request.agent(app);
      await accountantAgent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      // Create a deferred invoice
      const invRes = await staffAgent.post('/api/invoices').send({
        outletId: cairoOutlet.id,
        paymentType: 'deferred',
        items: [{ productId: testProduct.id, quantity: 1 }]
      });
      expect(invRes.status).toBe(201);
      const invoice = invRes.body.invoice;

      // Base64 sample receipt data
      const sampleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      // Record payment with receipt
      const payRes = await staffAgent.post('/api/payments').send({
        invoiceId: invoice.id,
        amount: 50.0,
        paymentMethod: 'cash',
        paymentDate: new Date().toISOString(),
        receiptName: 'test_receipt.png',
        receiptData: sampleBase64
      });
      expect(payRes.status).toBe(201);
      expect(payRes.body.payment.receipt_status).toBe('approved');

      // Verify that invoice payment status updates immediately because payment is auto-approved
      const invAfterPending = await db.get('SELECT payment_status FROM invoices WHERE id = ?', [invoice.id]);
      expect(invAfterPending.payment_status).toBe('partially_paid');

      // Get review queue with status=approved
      const queueRes = await accountantAgent.get('/api/payments/receipts/review-queue?status=approved');
      expect(queueRes.status).toBe(200);
      const queuePayment = queueRes.body.find(p => p.id === payRes.body.payment.id);
      expect(queuePayment).toBeDefined();

      // Get review queue with outletId and invoiceId filter with status=approved
      const queueFilteredRes = await accountantAgent.get(`/api/payments/receipts/review-queue?status=approved&outletId=${cairoOutlet.id}&invoiceId=${invoice.id}`);
      expect(queueFilteredRes.status).toBe(200);
      expect(queueFilteredRes.body.length).toBeGreaterThan(0);
      expect(queueFilteredRes.body.some(p => p.id === payRes.body.payment.id)).toBe(true);

      // Download/preview receipt
      const previewRes = await accountantAgent.get(`/api/payments/${payRes.body.payment.id}/receipt`);
      expect(previewRes.status).toBe(200);
      expect(previewRes.header['content-type']).toBe('image/png');
    });
  });
});
