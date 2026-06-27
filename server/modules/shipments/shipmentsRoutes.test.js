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
const shipmentsService = require('./shipmentsService');

describe('Shipments API Integration Tests', () => {
  let adminUser;
  let staffUser;
  let viewerUser;

  let wholesaleType;
  let cairoOutlet;
  let testBook;
  let invoice;
  let invoiceItemId;

  const cleanup = async () => {
    // 1. Delete shipment-related records
    await db.run(`
      DELETE FROM shipment_status_history 
      WHERE shipment_id IN (
        SELECT id FROM shipments 
        WHERE invoice_id IN (
          SELECT id FROM invoices 
          WHERE outlet_id IN (
            SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
          )
        )
      )
    `);
    await db.run(`
      DELETE FROM shipment_items 
      WHERE shipment_id IN (
        SELECT id FROM shipments 
        WHERE invoice_id IN (
          SELECT id FROM invoices 
          WHERE outlet_id IN (
            SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
          )
        )
      )
    `);
    await db.run(`
      DELETE FROM shipments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
        )
      )
    `);

    // 2. Delete invoice-related records
    await db.run(`
      DELETE FROM payment_installments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_payments 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_status_history 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoice_items 
      WHERE invoice_id IN (
        SELECT id FROM invoices 
        WHERE outlet_id IN (
          SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
        )
      )
    `);
    await db.run(`
      DELETE FROM invoices 
      WHERE outlet_id IN (
        SELECT id FROM outlets WHERE name = "Test Cairo Shipment Outlet"
      )
    `);

    // 3. Delete inventory adjustments and transactions
    await db.run('DELETE FROM inventory_transactions WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Shipment Book%")');
    await db.run('DELETE FROM inventory_adjustment_items WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Shipment Book%")');
    await db.run('DELETE FROM inventory_adjustments WHERE created_by IN (SELECT id FROM users WHERE username LIKE "test_shp_api_%")');

    // 4. Delete products, prices, outlets, roles, users
    await db.run('DELETE FROM product_prices WHERE product_id IN (SELECT id FROM products WHERE title LIKE "Test Shipment Book%")');
    await db.run('DELETE FROM products WHERE title LIKE "Test Shipment Book%"');
    await db.run('DELETE FROM outlets WHERE name = "Test Cairo Shipment Outlet"');
    await db.run('DELETE FROM outlet_types WHERE name = "Cairo Shipment Wholesale"');
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_shp_api_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_shp_api_%"');
  };

  beforeAll(async () => {
    // Perform initial cleanup to guarantee clean slate
    await cleanup();

    // 1. Fetch roles
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    const staffRole = roles.find(r => r.name === 'sales_staff');
    const viewerRole = roles.find(r => r.name === 'readonly_viewer');

    // 2. Link permissions to roles if not present
    const insertPerm = async (roleId, permName) => {
      const p = await db.get('SELECT id FROM permissions WHERE name = ?', [permName]);
      if (p && roleId) {
        await db.run('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [roleId, p.id]);
      }
    };
    if (staffRole) {
      await insertPerm(staffRole.id, 'shipments.view');
      await insertPerm(staffRole.id, 'shipments.create');
      await insertPerm(staffRole.id, 'shipments.update');
      await insertPerm(staffRole.id, 'invoices.create');
      await insertPerm(staffRole.id, 'invoices.view');
    }
    if (viewerRole) {
      await insertPerm(viewerRole.id, 'shipments.view');
    }

    // 3. Create test users
    adminUser = await usersService.createUser({
      username: 'test_shp_api_admin',
      password: 'password123',
      fullName: 'Shipments Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    staffUser = await usersService.createUser({
      username: 'test_shp_api_staff',
      password: 'password123',
      fullName: 'Shipments Staff'
    });
    await usersService.assignRole(staffUser.id, staffRole.id);

    viewerUser = await usersService.createUser({
      username: 'test_shp_api_viewer',
      password: 'password123',
      fullName: 'Shipments Viewer'
    });
    await usersService.assignRole(viewerUser.id, viewerRole.id);

    // 4. Create outlet type and outlet
    wholesaleType = await outletTypesService.createOutletType({
      name: 'Cairo Shipment Wholesale',
      description: 'Test Type for Shipments'
    });

    cairoOutlet = await outletsService.createOutlet({
      name: 'Test Cairo Shipment Outlet',
      outletTypeId: wholesaleType.id,
      governorate: 'Cairo',
      addressDetails: 'Shipment Center',
      phone: '01222222222',
      creditLimit: 10000,
      notes: 'Test Outlet'
    });

    // 5. Create book/product
    testBook = await productsService.createProduct({
      title: 'Test Shipment Book A',
      code: 'T-SHP-BK-A',
      category: 'Science',
      status: 'active',
      stockPolicy: 'track'
    });

    // 6. Set price
    await productPricesService.updatePricesForProduct(testBook.id, [
      { outletTypeId: wholesaleType.id, price: 100.0 }
    ]);

    // 7. Set stock
    await inventoryService.createAdjustment({
      reason: 'Opening Balance',
      notes: 'Test stock',
      items: [{ productId: testBook.id, quantity: 15 }],
      userId: adminUser.id
    });

    // 8. Create an invoice with 5 books
    invoice = await invoicesService.createInvoice({
      outletId: cairoOutlet.id,
      items: [{ productId: testBook.id, quantity: 5 }],
      paymentType: 'cash',
      notes: 'Shipment invoice tests',
      userId: staffUser.id
    });

    invoiceItemId = invoice.items[0].id;
  });

  afterAll(async () => {
    await cleanup();
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  describe('RBAC Authorization', () => {
    it('should block anonymous requests', async () => {
      const response = await request(app).get('/api/shipments');
      expect(response.status).toBe(401);
    });

    it('should block shipment creation for unauthorized roles', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_viewer', password: 'password123' });

      const response = await agent
        .post('/api/shipments')
        .send({
          invoiceId: invoice.id,
          items: [{ invoiceItemId, quantity: 2 }]
        });
      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/shipments - Create shipment', () => {
    it('should fail with 400 if invoiceId or items are missing', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_staff', password: 'password123' });

      const response1 = await agent.post('/api/shipments').send({ invoiceId: invoice.id });
      expect(response1.status).toBe(400);

      const response2 = await agent.post('/api/shipments').send({ items: [] });
      expect(response2.status).toBe(400);
    });

    it('should record a partial shipment and update invoice status to partially_shipped', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_staff', password: 'password123' });

      const response = await agent
        .post('/api/shipments')
        .send({
          invoiceId: invoice.id,
          shippingCarrier: 'FedEx',
          trackingNumber: 'FX12345',
          items: [{ invoiceItemId, quantity: 2 }]
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.shipment.status).toBe('pending');
      expect(response.body.shipment.items).toHaveLength(1);
      expect(response.body.shipment.items[0].quantity).toBe(2);

      // Verify invoice shipping status is now partially_shipped
      const updatedInvoice = await invoicesService.getInvoiceById(invoice.id);
      expect(updatedInvoice.shipping_status).toBe('partially_shipped');
    });

    it('should fail if requested quantity exceeds remaining unshipped quantity', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_staff', password: 'password123' });

      // Remaining is 3 (5 - 2). Trying to ship 4 should fail.
      const response = await agent
        .post('/api/shipments')
        .send({
          invoiceId: invoice.id,
          items: [{ invoiceItemId, quantity: 4 }]
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('exceeds');
    });
  });

  describe('POST /api/shipments/:id/status - Update shipment status', () => {
    let shipment2;

    beforeAll(async () => {
      // Create a second shipment for the remaining 3 items
      shipment2 = await shipmentsService.createShipment({
        invoiceId: invoice.id,
        shippingCarrier: 'DHL',
        trackingNumber: 'DHL9876',
        items: [{ invoiceItemId, quantity: 3 }],
        userId: staffUser.id
      });
    });

    it('should transition invoice shipping status dynamically to shipped and then delivered', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_staff', password: 'password123' });

      // Currently we have:
      // Shipment 1 (qty 2) - status pending
      // Shipment 2 (qty 3) - status pending
      // Invoice status: partially_shipped (since they are pending, none is 'shipped'/'delivered')

      // 1. Shipped Shipment 2 (qty 3)
      const res1 = await agent.post(`/api/shipments/${shipment2.id}/status`).send({ status: 'shipped' });
      expect(res1.status).toBe(200);

      let updatedInvoice = await invoicesService.getInvoiceById(invoice.id);
      // Not all items are shipped (2 still pending in shipment 1)
      expect(updatedInvoice.shipping_status).toBe('partially_shipped');

      // 2. Shipped Shipment 1
      const list = await shipmentsService.getShipments({ invoiceId: invoice.id });
      const shipment1 = list.find(s => s.id !== shipment2.id);

      const res2 = await agent.post(`/api/shipments/${shipment1.id}/status`).send({ status: 'shipped' });
      expect(res2.status).toBe(200);

      updatedInvoice = await invoicesService.getInvoiceById(invoice.id);
      // All items are now shipped!
      expect(updatedInvoice.shipping_status).toBe('shipped');

      // 3. Deliver Shipment 2
      const res3 = await agent.post(`/api/shipments/${shipment2.id}/status`).send({ status: 'delivered' });
      expect(res3.status).toBe(200);

      updatedInvoice = await invoicesService.getInvoiceById(invoice.id);
      // Some but not all are delivered
      expect(updatedInvoice.shipping_status).toBe('shipped');

      // 4. Deliver Shipment 1
      const res4 = await agent.post(`/api/shipments/${shipment1.id}/status`).send({ status: 'delivered' });
      expect(res4.status).toBe(200);

      updatedInvoice = await invoicesService.getInvoiceById(invoice.id);
      // All items are now delivered!
      expect(updatedInvoice.shipping_status).toBe('delivered');
    });
  });

  describe('GET List and Details', () => {
    it('should list shipments with filters', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_viewer', password: 'password123' });

      const response = await agent.get('/api/shipments').query({ invoiceId: invoice.id });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].invoice_number).toBe(invoice.invoice_number);
    });

    it('should fetch shipment details by ID', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_viewer', password: 'password123' });

      const list = await shipmentsService.getShipments({ invoiceId: invoice.id });
      const shipmentId = list[0].id;

      const response = await agent.get(`/api/shipments/${shipmentId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(shipmentId);
      expect(response.body.items).toBeDefined();
      expect(response.body.history).toBeDefined();
    });

    it('should expose shipped_quantity and remaining_quantity on invoice items', async () => {
      const agent = request.agent(app);
      await agent.post('/api/auth/login').send({ username: 'test_shp_api_staff', password: 'password123' });

      const response = await agent.get(`/api/invoices/${invoice.id}`);
      expect(response.status).toBe(200);
      const items = response.body.items;
      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      
      const item = items.find(i => i.id === invoiceItemId);
      expect(item).toBeDefined();
      expect(item.ordered_quantity).toBe(5);
      expect(item.shipped_quantity).toBe(5); // fully shipped from the test scenarios before
      expect(item.remaining_quantity).toBe(0);
    });
  });
});
