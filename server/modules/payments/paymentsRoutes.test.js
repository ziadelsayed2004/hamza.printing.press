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
const paymentsService = require('./paymentsService');

describe('Payments API Integration Tests', () => {
  let adminUser;
  let staffUser; // sales_staff has payments.view, payments.create, invoices.view, invoices.create
  let accountantUser; // accountant has payments.view, payments.create, payments.reverse
  let guestUser; // readonly_viewer has no payments.create permission

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
    await db.run('DELETE FROM payment_installments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
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
    await db.run('DELETE FROM payment_installments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Payment Outlet"))');
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

  describe('Installment Schedule Generation', () => {
    it('should generate an installment schedule successfully, adjusting rounding on the last installment', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      // Create an invoice of total 100
      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 1 }], // Subtotal 100, Total 100
        userId: staffUser.id
      });

      const response = await agent
        .post(`/api/invoices/${invoice.id}/installment-schedule`)
        .send({
          installmentsCount: 3,
          intervalDays: 30,
          startDate: '2026-07-01T00:00:00.000Z',
          notes: 'Test installment generation'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);

      const schedule = response.body.schedule;
      expect(schedule.length).toBe(3);
      expect(schedule[0].amount).toBe(33.33);
      expect(schedule[1].amount).toBe(33.33);
      expect(schedule[2].amount).toBe(33.34); // Absorbs rounding error (100 - 33.33 - 33.33)
    });
  });

  describe('POST /api/payments', () => {
    let cashInvoice;
    let installmentInvoice;

    beforeEach(async () => {
      // 1. Create a cash invoice (Total: 200)
      cashInvoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 2 }],
        paymentType: 'cash',
        userId: staffUser.id
      });

      // 2. Create an installment invoice (Total: 100) and generate 3 installments
      installmentInvoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 1 }],
        paymentType: 'installments',
        userId: staffUser.id
      });
      await paymentsService.generateInstallmentSchedule({
        invoiceId: installmentInvoice.id,
        totalAmount: 100.0,
        installmentsCount: 3
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
          amount: 250.0, // Invoice total is 200
          paymentMethod: 'cash'
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('exceeds');
    });

    it('should record payment and update invoice payment_status to paid when fully paid', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      // Pay first half -> partially_paid
      let res = await agent.post('/api/payments').send({
        invoiceId: cashInvoice.id,
        amount: 100.0,
        paymentMethod: 'cash'
      });
      expect(res.status).toBe(201);
      
      let inv = await invoicesService.getInvoiceById(cashInvoice.id);
      expect(inv.payment_status).toBe('partially_paid');

      // Pay second half -> paid
      res = await agent.post('/api/payments').send({
        invoiceId: cashInvoice.id,
        amount: 100.0,
        paymentMethod: 'cash'
      });
      expect(res.status).toBe(201);

      inv = await invoicesService.getInvoiceById(cashInvoice.id);
      expect(inv.payment_status).toBe('paid');
    });

    it('should sequentially match payments to installments and update their paid_amount and status fields', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      // Inst 1: 33.33, Inst 2: 33.33, Inst 3: 33.34
      // We pay 50.0.
      // Inst 1 should be fully paid (33.33). Inst 2 should be partially paid (16.67). Inst 3 unpaid (0).
      const response = await agent
        .post('/api/payments')
        .send({
          invoiceId: installmentInvoice.id,
          amount: 50.0,
          paymentMethod: 'bank_transfer'
        });

      expect(response.status).toBe(201);

      const inv = await invoicesService.getInvoiceById(installmentInvoice.id);
      expect(inv.payment_status).toBe('partially_paid');
      expect(inv.installments[0].status).toBe('paid');
      expect(inv.installments[0].paid_amount).toBe(33.33);
      expect(inv.installments[1].status).toBe('partially_paid');
      expect(inv.installments[1].paid_amount).toBe(16.67);
      expect(inv.installments[2].status).toBe('unpaid');
      expect(inv.installments[2].paid_amount).toBe(0.0);
    });
  });

  describe('Payment Reversal', () => {
    let invoice;
    let payment;

    beforeEach(async () => {
      invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 1 }],
        paymentType: 'cash',
        userId: staffUser.id
      });
      payment = await paymentsService.recordPayment({
        invoiceId: invoice.id,
        amount: 60.0,
        paymentMethod: 'cash',
        userId: staffUser.id
      });
    });

    it('should block reversal for staff without permission', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_staff', password: 'password123' });

      const response = await agent.post(`/api/payments/${payment.id}/reverse`).send({ notes: 'test error' });
      expect(response.status).toBe(403);
    });

    it('should allow accountant to reverse a payment and reset invoice metrics correctly', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      let inv = await invoicesService.getInvoiceById(invoice.id);
      expect(inv.payment_status).toBe('partially_paid');

      const response = await agent.post(`/api/payments/${payment.id}/reverse`).send({ notes: 'Refund customer' });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      inv = await invoicesService.getInvoiceById(invoice.id);
      expect(inv.payment_status).toBe('unpaid'); // Reverted to unpaid
    });
  });

  describe('Payment Status Engine & Overdue Check APIs', () => {
    it('should retrieve metrics for a specific invoice', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      // Create an invoice
      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 2 }], // 200
        paymentType: 'cash',
        userId: staffUser.id
      });

      // Record a payment of 80
      await paymentsService.recordPayment({
        invoiceId: invoice.id,
        amount: 80.0,
        paymentMethod: 'cash',
        userId: staffUser.id
      });

      const response = await agent.get(`/api/payments/invoice/${invoice.id}/metrics`);
      expect(response.status).toBe(200);
      expect(response.body.invoiceId).toBe(invoice.id);
      expect(response.body.totalPrice).toBe(200.0);
      expect(response.body.paidAmount).toBe(80.0);
      expect(response.body.remainingAmount).toBe(120.0);
      expect(response.body.paymentStatus).toBe('partially_paid');
    });

    it('should detect and update overdue installments', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_pay_api_accountant', password: 'password123' });

      // Create an invoice
      const invoice = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: testProduct.id, quantity: 1 }], // 100
        paymentType: 'installments',
        userId: staffUser.id
      });

      // Create a past due installment manually in the database
      const pastDueDate = new Date();
      pastDueDate.setDate(pastDueDate.getDate() - 5); // 5 days ago

      await db.run(`
        INSERT INTO payment_installments (invoice_id, installment_number, due_date, amount, paid_amount, status, notes)
        VALUES (?, 1, ?, 100.0, 0.0, 'unpaid', 'Past Due Installment')
      `, [invoice.id, pastDueDate.toISOString()]);

      // Verify it is currently unpaid (not overdue)
      let inst = await db.get('SELECT * FROM payment_installments WHERE invoice_id = ? AND installment_number = 1', [invoice.id]);
      expect(inst.status).toBe('unpaid');

      // Call overdue check API
      const response = await agent.post('/api/payments/check-overdue');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.updatedCount).toBeGreaterThanOrEqual(1);

      // Verify its status is now overdue
      inst = await db.get('SELECT * FROM payment_installments WHERE invoice_id = ? AND installment_number = 1', [invoice.id]);
      expect(inst.status).toBe('overdue');
    });
  });
});
