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
const invoicesService = require('./invoicesService');

describe('Invoices API Integration Tests', () => {
  let adminUser;
  let staffUser; // sales_staff has invoices.view, invoices.create, invoices.update
  let guestUser; // readonly_viewer has invoices.view only

  let adminRole;
  let staffRole;
  let guestRole;

  let wholesaleType;
  let cairoOutlet;
  let activeBookTrack;
  let activeBookIgnore;

  beforeAll(async () => {
    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');
    staffRole = roles.find(r => r.name === 'sales_staff');
    guestRole = roles.find(r => r.name === 'readonly_viewer');

    // Link permissions to guest role for testing
    const invViewPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['invoices.view']);
    if (guestRole && invViewPerm) {
      await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [guestRole.id, invViewPerm.id]);
    }

    // 2. Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Invoice Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Invoice Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Invoice Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_inv_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_inv_api_%"');

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_inv_api_admin',
      password: 'password123',
      fullName: 'Invoices Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_inv_api_staff',
      password: 'password123',
      fullName: 'Invoices Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    guestUser = await usersService.createUser({
      username: 'test_inv_api_guest',
      password: 'password123',
      fullName: 'Invoices Guest'
    });
    await usersService.assignRole(guestUser.id, guestRole.id);

    // 4. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Invoice Wholesale',
      description: 'Test Type'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Cairo Invoice Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Downtown Cairo',
      phone: '01222222222',
      creditLimit: 10000,
      notes: 'Test Cairo Outlet'
    });

    // 5. Create books/products (track and ignore)
    activeBookTrack = await productsService.createProduct({
      title: 'Test Invoice Book Tracked',
      code: 'T-INV-BK-TRACK',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track'
    });

    activeBookIgnore = await productsService.createProduct({
      title: 'Test Invoice Book Ignore',
      code: 'T-INV-BK-IGNORE',
      category: 'History',
      status: 'active',
      stockPolicy: 'ignore'
    });

    // 6. Seed pricing for the Cairo Invoice Wholesale outlet type
    await productPricesService.updatePricesForProduct(activeBookTrack.id, [
      { outletTypeId: wholesaleType.id, price: 150.0 }
    ]);
    await productPricesService.updatePricesForProduct(activeBookIgnore.id, [
      { outletTypeId: wholesaleType.id, price: 80.0 }
    ]);

    // 7. Seed inventory opening balances (stock) for Cairo Outlet for tracked book (e.g. quantity 10)
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      notes: 'Test stock',
      items: [{ productId: activeBookTrack.id, quantity: 10 }],
      userId: adminUser.id
    });
  });

  afterAll(async () => {
    // Clean test data
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet"))');
    await db.run('DELETE FROM invoices WHERE outlet_id IN (SELECT id FROM outlets WHERE name = "Test Cairo Invoice Outlet")');
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_inv_api_%")');
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Invoice Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Invoice Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Invoice Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Invoice Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_inv_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_inv_api_%"');

    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('POST /api/invoices', () => {
    it('should block invoice creation for users without permission', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_guest', password: 'password123' });

      const response = await agent
        .post('/api/invoices')
        .send({
          outletId: cairoOutlet.id,
          items: [{ productId: activeBookTrack.id, quantity: 2 }]
        });
      expect(response.status).toBe(403);
    });

    it('should fail if discount makes total price negative', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_staff', password: 'password123' });

      const response = await agent
        .post('/api/invoices')
        .send({
          outletId: cairoOutlet.id,
          discount: 500.0,
          items: [{ productId: activeBookTrack.id, quantity: 2 }] // Subtotal is 300
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('negative');
    });

    it('should fail if stock level is insufficient for tracked books', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_staff', password: 'password123' });

      const response = await agent
        .post('/api/invoices')
        .send({
          outletId: cairoOutlet.id,
          items: [{ productId: activeBookTrack.id, quantity: 20 }] // Available is 10
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Insufficient stock');
    });

    it('should create an invoice successfully, resolving pricing, stock decrements, and status history logs', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_staff', password: 'password123' });

      const stockBefore = await inventoryService.getRealTimeStock(activeBookTrack.id);
      expect(stockBefore).toBe(10);

      const response = await agent
        .post('/api/invoices')
        .send({
          outletId: cairoOutlet.id,
          discount: 10.0,
          shippingCost: 15.0,
          paymentType: 'deferred',
          notes: 'Test invoice transaction',
          items: [
            { productId: activeBookTrack.id, quantity: 3 }, // 3 * 150 = 450
            { productId: activeBookIgnore.id, quantity: 2 }  // 2 * 80  = 160. Subtotal: 610. Total: 610 + 15 - 10 = 615.
          ]
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      
      const invoice = response.body.invoice;
      expect(invoice.invoice_number).toBeDefined();
      expect(invoice.subtotal).toBe(610.0);
      expect(invoice.discount).toBe(10.0);
      expect(invoice.shipping_cost).toBe(15.0);
      expect(invoice.total_price).toBe(615.0);
      expect(invoice.payment_status).toBe('unpaid');
      expect(invoice.shipping_status).toBe('pending');
      expect(invoice.payment_type).toBe('deferred');

      // Verify stock level decremented for tracked book only
      const stockAfter = await inventoryService.getRealTimeStock(activeBookTrack.id);
      expect(stockAfter).toBe(7); // Decremented by 3

      // Verify stock level for ignored book is unaffected (remains 0)
      const stockIgnore = await inventoryService.getRealTimeStock(activeBookIgnore.id);
      expect(stockIgnore).toBe(0);

      // Verify status logs exist
      expect(invoice.history.length).toBe(2);
      expect(invoice.history.map(h => h.status_type)).toContain('payment');
      expect(invoice.history.map(h => h.status_type)).toContain('shipping');
    });
  });

  describe('PUT /api/invoices/:id', () => {
    let createdInvoiceId;

    beforeEach(async () => {
      // Create a base invoice to update
      const invoice = await db.get('SELECT * FROM invoices ORDER BY id DESC LIMIT 1');
      if (invoice) {
        createdInvoiceId = invoice.id;
      }
    });

    it('should fail to update if new items exceed stock level limits', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_staff', password: 'password123' });

      // Cairo stock is originally 10. Currently 3 is sold, so 7 is in stock.
      // If we request 15, it should throw error
      const response = await agent
        .put(`/api/invoices/${createdInvoiceId}`)
        .send({
          outletId: cairoOutlet.id,
          items: [{ productId: activeBookTrack.id, quantity: 15 }]
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Insufficient stock');
    });

    it('should successfully update an invoice, reconciling items, recalculating totals, and correctly updating ledger stock', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_staff', password: 'password123' });

      const stockBefore = await inventoryService.getRealTimeStock(activeBookTrack.id);
      // Currently, stock is 7 (meaning 3 are sold in this invoice, total database has 7 remaining)
      expect(stockBefore).toBe(7);

      const response = await agent
        .put(`/api/invoices/${createdInvoiceId}`)
        .send({
          outletId: cairoOutlet.id,
          discount: 20.0,
          shippingCost: 5.0,
          paymentType: 'cash',
          notes: 'Updated invoice',
          items: [
            { productId: activeBookTrack.id, quantity: 5 } // 5 * 150 = 750. Total: 750 + 5 - 20 = 735.
          ]
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const invoice = response.body.invoice;
      expect(invoice.subtotal).toBe(750.0);
      expect(invoice.total_price).toBe(735.0);
      expect(invoice.items.length).toBe(1);
      expect(invoice.items[0].product_id).toBe(activeBookTrack.id);
      expect(invoice.items[0].quantity).toBe(5);

      // Verify stock level updated correctly:
      // Seeded: 10
      // Sold: 5
      // Remaining should be: 5
      const stockAfter = await inventoryService.getRealTimeStock(activeBookTrack.id);
      expect(stockAfter).toBe(5);

      // Verify ledger transactions to check append-only integrity (no deletions)
      const txs = await db.all(
        'SELECT * FROM inventory_transactions WHERE reference_type = "invoice" AND reference_id = ? ORDER BY id ASC',
        [createdInvoiceId]
      );
      // We expect 2 transactions:
      // 1. The original sale: quantity = -3
      // 2. The delta: quantity = -2
      expect(txs).toHaveLength(2);
      expect(txs[0].transaction_type).toBe('sale');
      expect(txs[0].quantity).toBe(-3);
      expect(txs[1].transaction_type).toBe('sale');
      expect(txs[1].quantity).toBe(-2);
    });
  });

  describe('GET /api/invoices', () => {
    it('should allow viewing and filtering invoices', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_guest', password: 'password123' });

      // List all
      let response = await agent.get('/api/invoices');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);

      // Filter by outlet
      response = await agent.get(`/api/invoices?outletId=${cairoOutlet.id}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);

      // Filter by governorate
      response = await agent.get('/api/invoices?governorate=Cairo');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should retrieve detail view of an invoice by ID', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_guest', password: 'password123' });

      const lastInv = await db.get('SELECT id FROM invoices ORDER BY id DESC LIMIT 1');

      const response = await agent.get(`/api/invoices/${lastInv.id}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(lastInv.id);
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].product_title).toBe('Test Invoice Book Tracked');
      expect(response.body.history.length).toBe(2);
    });
  });

  describe('POST /api/invoices/export/pdf', () => {
    it('should export selected invoices as a unified PDF', async () => {
      // Link invoices.export to guestRole
      const exportPerm = await db.get('SELECT id FROM permissions WHERE name = ?', ['invoices.export']);
      if (guestRole && exportPerm) {
        await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [guestRole.id, exportPerm.id]);
      }

      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_guest', password: 'password123' });

      const lastInv = await db.get('SELECT id FROM invoices ORDER BY id DESC LIMIT 1');
      expect(lastInv).toBeDefined();

      const response = await agent.post('/api/invoices/export/pdf').send({
        invoiceIds: [lastInv.id]
      });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.headers['content-disposition']).toContain('attachment; filename="invoices_report.pdf"');
      expect(Buffer.isBuffer(response.body)).toBe(true);
    });

    it('should fail with 400 for empty invoice IDs list', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_guest', password: 'password123' });

      const response = await agent.post('/api/invoices/export/pdf').send({
        invoiceIds: []
      });
      expect(response.status).toBe(400);
    });

    it('should fail with 403 for unauthorized requests', async () => {
      const noPermUser = await usersService.createUser({
        username: 'test_inv_api_noperm',
        password: 'password123',
        fullName: 'No Perm User'
      });
      const roles = await rolesService.getAllRoles();
      const authorRole = roles.find(r => r.name === 'author');
      if (authorRole) {
        await usersService.assignRole(noPermUser.id, authorRole.id);
      }

      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_noperm', password: 'password123' });

      const response = await agent.post('/api/invoices/export/pdf').send({
        invoiceIds: [1]
      });
      expect(response.status).toBe(403);

      // Cleanup
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [noPermUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [noPermUser.id]);
    });
  });

  describe('Single-Transaction Initial Payment at Invoice Creation', () => {
    let testInvoiceId;

    afterEach(async () => {
      if (testInvoiceId) {
        await db.run('DELETE FROM invoice_payments WHERE invoice_id = ?', [testInvoiceId]);
        await db.run('DELETE FROM invoice_status_history WHERE invoice_id = ?', [testInvoiceId]);
        await db.run('DELETE FROM invoice_items WHERE invoice_id = ?', [testInvoiceId]);
        await db.run('DELETE FROM invoices WHERE id = ?', [testInvoiceId]);
        testInvoiceId = null;
      }
    });

    it('should create an invoice and record a partial payment inside the same transaction', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_admin', password: 'password123' });

      const response = await agent.post('/api/invoices').send({
        outletId: cairoOutlet.id,
        items: [{ productId: activeBookIgnore.id, quantity: 3 }],
        discount: 0,
        shippingCost: 0,
        paymentType: 'deferred',
        notes: 'TEST single transaction partial payment',
        paymentAmount: 100.0,
        paymentSupplyStatus: 'not_supplied',
        paymentNotes: 'Partial initial payment'
      });

      expect(response.status).toBe(201);
      const invoice = response.body.invoice;
      expect(invoice).toBeDefined();
      testInvoiceId = invoice.id;

      expect(invoice.payment_status).toBe('partially_paid');

      const payments = await db.all('SELECT * FROM invoice_payments WHERE invoice_id = ?', [invoice.id]);
      expect(payments.length).toBe(1);
      expect(payments[0].amount).toBe(100.0);
      expect(payments[0].supply_status).toBe('not_supplied');
    });

    it('should create an invoice and record a full payment and supply inside the same transaction', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_inv_api_admin', password: 'password123' });

      const response = await agent.post('/api/invoices').send({
        outletId: cairoOutlet.id,
        items: [{ productId: activeBookIgnore.id, quantity: 2 }],
        discount: 0,
        shippingCost: 0,
        paymentType: 'cash',
        notes: 'TEST single transaction full payment',
        paymentAmount: 160.0,
        paymentSupplyStatus: 'supplied',
        paymentNotes: 'Full initial payment supplied'
      });

      expect(response.status).toBe(201);
      const invoice = response.body.invoice;
      expect(invoice).toBeDefined();
      testInvoiceId = invoice.id;

      expect(invoice.payment_status).toBe('paid');

      const payments = await db.all('SELECT * FROM invoice_payments WHERE invoice_id = ?', [invoice.id]);
      expect(payments.length).toBe(1);
      expect(payments[0].amount).toBe(160.0);
      expect(payments[0].supply_status).toBe('supplied');
    });
  });

  describe('Restricted Author Invoice Scoping', () => {
    let authorUser;
    let authorA;
    let authorB;
    let bookA;
    let bookB;
    let invoiceAId;
    let invoiceBId;

    beforeAll(async () => {
      // 1. Create Author User
      authorUser = await usersService.createUser({
        username: 'test_author_scope_user',
        password: 'password123',
        fullName: 'Test Author User'
      });
      // Assign guest role which has invoices.view permission
      await usersService.assignRole(authorUser.id, guestRole.id);

      // 2. Create Authors
      const authorsService = require('../authors/authorsService');
      authorA = await authorsService.createAuthor({
        name: 'Author Scope A',
        userId: authorUser.id
      });
      authorB = await authorsService.createAuthor({
        name: 'Author Scope B'
      });

      // 3. Create Books
      bookA = await productsService.createProduct({
        title: 'Book Scope A',
        code: 'BK-SCOPE-A',
        category: 'Fiction',
        status: 'active',
        stockPolicy: 'ignore',
        authorIds: [authorA.id]
      });

      bookB = await productsService.createProduct({
        title: 'Book Scope B',
        code: 'BK-SCOPE-B',
        category: 'Fiction',
        status: 'active',
        stockPolicy: 'ignore',
        authorIds: [authorB.id]
      });

      // Configure prices for Cairo Invoice Wholesale
      await productPricesService.updatePricesForProduct(bookA.id, [
        { outletTypeId: wholesaleType.id, price: 100 }
      ]);
      await productPricesService.updatePricesForProduct(bookB.id, [
        { outletTypeId: wholesaleType.id, price: 150 }
      ]);

      // 4. Create Invoices
      const invA = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: bookA.id, quantity: 2 }],
        paymentType: 'cash',
        userId: adminUser.id
      });
      invoiceAId = invA.id;

      const invB = await invoicesService.createInvoice({
        outletId: cairoOutlet.id,
        items: [{ productId: bookB.id, quantity: 3 }],
        paymentType: 'cash',
        userId: adminUser.id
      });
      invoiceBId = invB.id;
    });

    afterAll(async () => {
      // Cleanup
      await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (?, ?)', [invoiceAId, invoiceBId]);
      await db.run('DELETE FROM invoice_status_history WHERE invoice_id IN (?, ?)', [invoiceAId, invoiceBId]);
      await db.run('DELETE FROM invoice_items WHERE invoice_id IN (?, ?)', [invoiceAId, invoiceBId]);
      await db.run('DELETE FROM invoices WHERE id IN (?, ?)', [invoiceAId, invoiceBId]);
      await db.run('DELETE FROM product_prices WHERE product_id IN (?, ?)', [bookA.id, bookB.id]);
      await db.run('DELETE FROM product_authors WHERE product_id IN (?, ?)', [bookA.id, bookB.id]);
      await db.run('DELETE FROM products WHERE id IN (?, ?)', [bookA.id, bookB.id]);
      await db.run('DELETE FROM author_users WHERE author_id IN (?, ?)', [authorA.id, authorB.id]);
      await db.run('DELETE FROM authors WHERE id IN (?, ?)', [authorA.id, authorB.id]);
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [authorUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [authorUser.id]);
    });

    it('should restrict invoices list to only invoices containing the authors products', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_author_scope_user', password: 'password123' });

      const response = await agent.get('/api/invoices');
      expect(response.status).toBe(200);
      
      const invoiceIds = response.body.map(inv => inv.id);
      expect(invoiceIds).toContain(invoiceAId);
      expect(invoiceIds).not.toContain(invoiceBId);
    });

    it('should allow viewing invoice details of an invoice containing own products', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_author_scope_user', password: 'password123' });

      const response = await agent.get(`/api/invoices/${invoiceAId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(invoiceAId);
      
      // Items must be filtered to show only own products
      const itemProductIds = response.body.items.map(item => item.product_id);
      expect(itemProductIds).toContain(bookA.id);
      expect(itemProductIds).not.toContain(bookB.id);
    });

    it('should forbid viewing invoice details of an invoice containing only other authors products', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_author_scope_user', password: 'password123' });

      const response = await agent.get(`/api/invoices/${invoiceBId}`);
      expect(response.status).toBe(403);
    });
  });
});
