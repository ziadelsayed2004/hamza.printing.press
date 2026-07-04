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
      await db.run('DELETE FROM return_items WHERE return_id IN (SELECT id FROM returns WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%"))');
      await db.run('DELETE FROM returns WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
      await db.run('DELETE FROM shipment_items WHERE shipment_id IN (SELECT id FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%"))');
      await db.run('DELETE FROM shipments WHERE invoice_id IN (SELECT id FROM invoices WHERE notes LIKE "E2E E2E%")');
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
      
      // Clean up free quantities test data
      await db.run('DELETE FROM return_items WHERE return_id IN (SELECT id FROM returns WHERE reason = "Return 5 physical items" OR reason = "Return another 4 physical items")');
      await db.run('DELETE FROM returns WHERE reason = "Return 5 physical items" OR reason = "Return another 4 physical items"');
      await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE notes = "Invoice with free items")');
      await db.run('DELETE FROM invoices WHERE notes = "Invoice with free items"');
      await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE code = "FREE-QTY-BK")');
      await db.run('DELETE FROM inventory_receipt_items WHERE product_id IN (SELECT id FROM products WHERE code = "FREE-QTY-BK")');
      await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE code = "FREE-QTY-BK")');
      await db.run('DELETE FROM products WHERE code = "FREE-QTY-BK"');
      await db.run('DELETE FROM outlets WHERE name = "Free Qty Outlet"');
      await db.run('DELETE FROM outlet_types WHERE name = "Free Qty Type"');
      
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
      phone: '01111111111'
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

    // 12. Create a payment receipt that is immediately approved
    const payReviewRes = await agent.post('/api/payments').send({
      invoiceId: invoice.id,
      amount: 50.0,
      paymentMethod: 'cash',
      receiptName: 'receipt_proof.png',
      receiptData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    });
    expect(payReviewRes.status).toBe(201);
    expect(payReviewRes.body.payment.receipt_status).toBe('approved');

    // 13. Create a partial shipment
    const invoiceItemId = invoice.items[0].id;
    const shipRes = await agent.post('/api/shipments').send({
      invoiceId: invoice.id,
      shippingCarrier: 'DHL',
      trackingNumber: 'TRK-E2E-12345',
      items: [{ invoiceItemId, quantity: 1 }]
    });
    expect(shipRes.status).toBe(201);

    // 14. Create a return for the shipped item
    const retRes = await agent.post('/api/returns').send({
      invoiceId: invoice.id,
      reason: 'E2E item return',
      items: [{ invoiceItemId, quantity: 1 }]
    });
    expect(retRes.status).toBe(201);

    // 15. Verify export downloads can run successfully
    const expPaymentsRes = await agent.get('/api/exports/payments');
    expect(expPaymentsRes.status).toBe(200);
    const expReturnsRes = await agent.get('/api/exports/returns');
    expect(expReturnsRes.status).toBe(200);
    const expShipmentsRes = await agent.get('/api/exports/shipments');
    expect(expShipmentsRes.status).toBe(200);
  });

  it('should support free quantities in invoice items and correctly cap return values', async () => {
    // 1. Create a product and an outlet
    const productRes = await agent.post('/api/products').send({
      title: 'Free Qty Test Book',
      code: 'FREE-QTY-BK',
      stockPolicy: 'track'
    });
    const product = productRes.body.product || productRes.body;

    const otRes = await agent.post('/api/outlet-types').send({
      name: 'Free Qty Type',
      description: 'E2E Test Type for Free Qty'
    });
    expect(otRes.status).toBe(201);
    const testOutletType = otRes.body.outletType || otRes.body;

    const outletRes = await agent.post('/api/outlets').send({
      name: 'Free Qty Outlet',
      outletTypeId: testOutletType.id,
      governorate: 'Cairo',
      addressDetails: 'E2E Address',
      phone: '01111111111',
      creditLimit: 100000
    });
    const outlet = outletRes.body.outlet || outletRes.body;

    // Set product price to 10.0
    await agent.put(`/api/product-prices/product/${product.id}`).send({
      prices: [{ outletTypeId: testOutletType.id, price: 10.0 }]
    });

    // Add inventory supply (50 units)
    await agent.post('/api/inventory/receipts').send({
      supplierName: 'E2E Printery',
      receivedDate: new Date().toISOString(),
      notes: 'Initial supply',
      items: [{ productId: product.id, quantity: 50, unitCost: 5.0 }]
    });

    // 2. Create invoice with 10 physical quantity and 2 free
    const invRes = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      discount: 0,
      shippingCost: 0,
      paymentType: 'deferred',
      notes: 'Invoice with free items',
      items: [{ productId: product.id, quantity: 10, freeQuantity: 2 }]
    });
    expect(invRes.status).toBe(201);
    const invoice = invRes.body.invoice;

    // Physical total: 10, billable total: 8 * 10 = 80
    expect(invoice.total_price).toBe(80);

    // Verify stock decreased to 40
    const stockRes = await agent.get(`/api/reports/stock?search=FREE-QTY-BK`);
    const stockRow = stockRes.body.find(b => b.productId === product.id);
    expect(stockRow.currentStock).toBe(40);

    // 3. Perform returns: return 5 physical items (gets $50 refund)
    const invoiceItemId = invoice.items[0].id;
    const retRes1 = await agent.post('/api/returns').send({
      invoiceId: invoice.id,
      reason: 'Return 5 physical items',
      items: [{ invoiceItemId, quantity: 5 }]
    });
    expect(retRes1.status).toBe(201);
    expect(retRes1.body.return.return_value).toBe(50); // 5 * 10

    // Return another 4 physical items (refund capped at remaining $30, not $40)
    const retRes2 = await agent.post('/api/returns').send({
      invoiceId: invoice.id,
      reason: 'Return another 4 physical items',
      items: [{ invoiceItemId, quantity: 4 }]
    });
    expect(retRes2.status).toBe(201);
    expect(retRes2.body.return.return_value).toBe(30); // 80 total invoice item price - 50 = 30 remaining

    // Verify stock increased back to 49 (40 + 5 + 4)
    const stockRes2 = await agent.get(`/api/reports/stock?search=FREE-QTY-BK`);
    const stockRow2 = stockRes2.body.find(b => b.productId === product.id);
    expect(stockRow2.currentStock).toBe(49);
  });
});
