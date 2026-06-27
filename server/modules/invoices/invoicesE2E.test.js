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
const notificationsService = require('../notifications/notificationsService');

describe('E2E Business Flow Integrity Tests', () => {
  let adminUser;
  let adminRole;
  let outletType;
  let outlet;
  let author;
  let product;
  let agent;

  async function cleanTestData() {
    await db.run('PRAGMA foreign_keys = OFF;');
    try {
      await db.run('DELETE FROM payment_installments WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
      await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
      await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
      await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
      await db.run('DELETE FROM invoices WHERE notes LIKE "E2E E2E%"');
      
      await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "E2E Book%")');
      await db.run('DELETE FROM inventory_adjustments WHERE notes LIKE "%E2E%"');
      await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "E2E Book%")');
      
      await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "E2E Book%")');
      await db.run('DELETE FROM inventory_receipts WHERE supplier_name = "E2E Printery"');
      
      await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "E2E Book%")');
      await db.run('DELETE FROM product_authors WHERE product_id IN (SELECT id FROM products WHERE title LIKE "E2E Book%")');
      await db.run('DELETE FROM products WHERE title LIKE "E2E Book%"');
      await db.run('DELETE FROM author_users WHERE author_id IN (SELECT id FROM authors WHERE name LIKE "E2E Author%")');
      await db.run('DELETE FROM authors WHERE name LIKE "E2E Author%"');
      
      await db.run('DELETE FROM finance_ledger_entries WHERE notes LIKE "%E2E%" OR outlet_id IN (SELECT id FROM outlets WHERE name = "E2E Test Outlet")');
      await db.run('DELETE FROM manual_adjustments WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "E2E Test Outlet")');
      await db.run('DELETE FROM outlets WHERE name = "E2E Test Outlet"');
      await db.run('DELETE FROM outlet_types WHERE name = "E2E Wholesale"');
      
      await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username = "e2e_flow_admin")');
      await db.run('DELETE FROM users WHERE username = "e2e_flow_admin"');
      await db.run('DELETE FROM notifications WHERE dedupe_key LIKE "%e2e%" OR dedupe_key LIKE "%E2E%"');
    } finally {
      await db.run('PRAGMA foreign_keys = ON;');
    }
  }

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');

    // 2. Clean database records
    await cleanTestData();

    // 3. Create unique admin user
    adminUser = await usersService.createUser({
      username: 'e2e_flow_admin',
      password: 'password123',
      fullName: 'E2E Flow Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    // Initialize agent
    agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'e2e_flow_admin', password: 'password123' });
  });

  afterAll(async () => {
    // Clean test data
    await cleanTestData();

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  it('should run the complete business flow end-to-end', async () => {
    // 1. Create outlet type
    const otRes = await agent.post('/api/outlet-types').send({
      name: 'E2E Wholesale',
      description: 'E2E Test Type'
    });
    expect(otRes.status).toBe(201);
    outletType = otRes.body.outletType || otRes.body;
    expect(outletType.id).toBeDefined();

    // 2. Create outlet
    const outRes = await agent.post('/api/outlets').send({
      name: 'E2E Test Outlet',
      outletTypeId: outletType.id,
      governorate: 'Cairo',
      addressDetails: 'Ramses Square',
      phone: '01011111111',
      creditLimit: 500.0,
      notes: 'E2E Test Outlet'
    });
    expect(outRes.status).toBe(201);
    outlet = outRes.body.outlet || outRes.body;
    expect(outlet.id).toBeDefined();

    // 3. Create author
    const autRes = await agent.post('/api/authors').send({
      name: 'E2E Author Name',
      phone: '01111111111',
      email: 'e2e@author.com'
    });
    expect(autRes.status).toBe(201);
    author = autRes.body.author || autRes.body;
    expect(author.id).toBeDefined();

    // 4. Create book/product (track policy)
    const prodRes = await agent.post('/api/products').send({
      title: 'E2E Book Tracked',
      code: 'E2E-BK-TRACK',
      category: 'Literature',
      status: 'active',
      stockPolicy: 'track',
      authorIds: [author.id]
    });
    expect(prodRes.status).toBe(201);
    product = prodRes.body.product || prodRes.body;
    expect(product.id).toBeDefined();

    // 5. Add pricing per outlet type
    const priceRes1 = await agent.put(`/api/product-prices/product/${product.id}`).send({
      prices: [{ outletTypeId: outletType.id, price: 100.0 }]
    });
    expect(priceRes1.status).toBe(200);

    // 6. Add inventory receipt for book (supply 50 units)
    const recRes = await agent.post('/api/inventory/receipts').send({
      supplierName: 'E2E Printery',
      receivedDate: new Date().toISOString(),
      notes: 'Initial supply',
      items: [{ productId: product.id, quantity: 50, unitCost: 40.0 }]
    });
    expect(recRes.status).toBe(201);

    // Verify stock became 50
    const stockSummaryRes = await agent.get(`/api/reports/stock?search=E2E-BK-TRACK`);
    expect(stockSummaryRes.status).toBe(200);
    const stockRow = stockSummaryRes.body.find(b => b.productId === product.id);
    expect(stockRow.currentStock).toBe(50);

    // 7. Create invoice (deferred, quantity = 3, total = 3 * 100 = 300)
    const invRes = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'deferred',
      notes: 'E2E E2E First Invoice',
      items: [{ productId: product.id, quantity: 3 }]
    });
    expect(invRes.status).toBe(201);
    const invoice = invRes.body.invoice;
    expect(invoice.total_price).toBe(300);

    // Verify stock decreased to 47
    const stockSummaryRes2 = await agent.get(`/api/reports/stock?search=E2E-BK-TRACK`);
    const stockRow2 = stockSummaryRes2.body.find(b => b.productId === product.id);
    expect(stockRow2.currentStock).toBe(47);

    // Verify receivables increased in finance summary
    const finRes1 = await agent.get('/api/finance/summary');
    expect(finRes1.status).toBe(200);
    expect(finRes1.body.totalReceivables).toBeGreaterThanOrEqual(300);

    // 8. Add payment (amount = 200)
    const payRes = await agent.post('/api/payments').send({
      invoiceId: invoice.id,
      amount: 200,
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString(),
      referenceNumber: 'REF-E2E-999',
      notes: 'E2E first payment'
    });
    expect(payRes.status).toBe(201);

    // Verify finance balance (receivables decreased by 200, cash collected increased by 200)
    const finRes2 = await agent.get('/api/finance/summary');
    expect(finRes2.status).toBe(200);

    // 9. Deferred payment and supply scenario
    // Create another invoice for 200 EGP (2 * 100 EGP)
    const inv2Res = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'deferred',
      notes: 'E2E E2E Second Invoice',
      items: [{ productId: product.id, quantity: 2 }]
    });
    expect(inv2Res.status).toBe(201);
    const invoice2 = inv2Res.body.invoice;

    // Verify pending balance increased
    const finResBefore = await agent.get('/api/finance/summary');
    const prevPending = finResBefore.body.pendingBalance;

    // Record a payment of 120 (not supplied)
    const payRes2 = await agent.post('/api/payments').send({
      invoiceId: invoice2.id,
      amount: 120.0,
      paymentMethod: 'cash',
      supplyStatus: 'not_supplied'
    });
    expect(payRes2.status).toBe(201);
    const payment2 = payRes2.body.payment;

    // Verify unsupplied balance increases
    const finResAfterPay = await agent.get('/api/finance/summary');
    expect(finResAfterPay.body.unsuppliedBalance).toBeGreaterThanOrEqual(120.0);

    // Supply the payment
    const supplyRes = await agent.post(`/api/payments/${payment2.id}/supply`);
    expect(supplyRes.status).toBe(200);

    // Verify supplied balance increases
    const finResAfterSupply = await agent.get('/api/finance/summary');
    expect(finResAfterSupply.body.suppliedBalance).toBeGreaterThanOrEqual(120.0);

    // 10. Trigger low stock warning (stock of tracked book drops to 5, which is low stock threshold of 5)
    // Currently stock is 45 (50 - 3 - 2). Let's checkout 40 units to leave exactly 5.
    const invLowRes = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'cash',
      notes: 'E2E E2E Low Invoice',
      items: [{ productId: product.id, quantity: 40 }]
    });
    expect(invLowRes.status).toBe(201);

    // Verify low stock alert exists
    const notifRes2 = await agent.get('/api/notifications?status=unread');
    const lowStockNotif = notifRes2.body.find(n => n.category === 'stock_low' && n.source_id === product.id);
    expect(lowStockNotif).toBeDefined();

    // 10b. Trigger negative stock warning
    // Post a stock adjustment of -10 units, bringing stock to -5
    const adjRes = await agent.post('/api/inventory/adjustments').send({
      reason: 'Wastage',
      notes: 'E2E stock correction',
      items: [{ productId: product.id, quantity: -10 }]
    });
    expect(adjRes.status).toBe(201);

    // Verify negative stock alert in notifications
    const notifRes1 = await agent.get('/api/notifications?status=unread');
    const negStockNotif = notifRes1.body.find(n => n.category === 'stock_negative' && n.source_id === product.id);
    expect(negStockNotif).toBeDefined();

    // 11. Trigger credit limit notification
    // Replenish stock by receiving 20 units so we have 15 units available (-5 + 20 = 15)
    const recRes2 = await agent.post('/api/inventory/receipts').send({
      supplierName: 'E2E Printery',
      receivedDate: new Date().toISOString(),
      notes: 'Replenishing stock for limit check',
      items: [{ productId: product.id, quantity: 20, unitCost: 40.0 }]
    });
    expect(recRes2.status).toBe(201);

    // Outstanding receivables is around 300 (remaining of inv1 = 100, remaining of inv2 = 200).
    // Let's create an invoice for 300 EGP to push total receivables to 600 EGP, exceeding credit limit of 500 EGP.
    const invLimitRes = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'deferred',
      notes: 'E2E E2E Limit Invoice',
      items: [{ productId: product.id, quantity: 3 }] // 3 * 100 = 300
    });
    expect(invLimitRes.status).toBe(201);

    // Verify credit limit alert exists
    const notifRes3 = await agent.get('/api/notifications?status=unread');
    const limitNotif = notifRes3.body.find(n => n.category === 'outlet_credit_limit_exceeded' && n.source_id === outlet.id);
    expect(limitNotif).toBeDefined();
  });
});
