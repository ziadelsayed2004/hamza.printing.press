const request = require('supertest');
const fs = require('fs');
const db = require('../../db');
const app = require('../../../app');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const outletsService = require('../outlets/outletsService');
const outletTypesService = require('../outlet-types/outletTypesService');
const productsService = require('../products/productsService');
const productPricesService = require('../products/productPricesService');

describe('Payment Receipt Security and Storage Tests', () => {
  let adminUser;
  let adminRole;
  let outletType;
  let outlet;
  let product;
  let invoice;
  let agent;

  beforeAll(async () => {
    // Setup roles & admin user
    const roles = await rolesService.getAllRoles();
    adminRole = roles.find(r => r.name === 'super_admin');

    adminUser = await usersService.createUser({
      username: 'receipt_sec_admin',
      password: 'password123',
      fullName: 'Receipt Security Admin'
    });
    await usersService.assignRole(adminUser.id, adminRole.id);

    agent = request.agent(app);
    await agent.post('/api/auth/login').send({ username: 'receipt_sec_admin', password: 'password123' });

    // Seed dependencies
    outletType = await outletTypesService.createOutletType({ name: 'Sec Wholesale', description: 'Sec Type' });
    outlet = await outletsService.createOutlet({
      name: 'Sec Outlet',
      outletTypeId: outletType.id,
      governorate: 'Cairo',
      addressDetails: 'Sec Address',
      phone: '01000000000',
      creditLimit: 1000
    });
    product = await productsService.createProduct({
      title: 'Sec Book',
      code: 'SEC-BK-1',
      category: 'Science',
      status: 'active',
      stockPolicy: 'ignore'
    });
    await productPricesService.updatePricesForProduct(product.id, [{ outletTypeId: outletType.id, price: 100.0 }]);

    // Create an invoice
    const invRes = await agent.post('/api/invoices').send({
      outletId: outlet.id,
      paymentType: 'deferred',
      items: [{ productId: product.id, quantity: 2 }]
    });
    invoice = invRes.body.invoice;
  });

  afterAll(async () => {
    if (adminUser) {
      await db.run('DELETE FROM user_roles WHERE user_id = ?', [adminUser.id]);
      await db.run('DELETE FROM users WHERE id = ?', [adminUser.id]);
    }
    await db.run('DELETE FROM invoice_payments WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id = ?)', [outlet?.id]);
    await db.run('DELETE FROM invoice_items WHERE invoice_id IN (SELECT id FROM invoices WHERE outlet_id = ?)', [outlet?.id]);
    await db.run('DELETE FROM invoices WHERE outlet_id = ?', [outlet?.id]);
    await db.run('DELETE FROM product_prices WHERE product_id = ?', [product?.id]);
    await db.run('DELETE FROM products WHERE id = ?', [product?.id]);
    await db.run('DELETE FROM outlets WHERE id = ?', [outlet?.id]);
    await db.run('DELETE FROM outlet_types WHERE id = ?', [outletType?.id]);
    await new Promise((resolve) => {
      db.db.close(resolve);
    });
  });

  it('should reject invalid MIME types', async () => {
    const res = await agent.post('/api/payments').send({
      invoiceId: invoice.id,
      amount: 10,
      paymentMethod: 'cash',
      receiptName: 'malicious.exe',
      receiptData: 'data:application/x-msdownload;base64,TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAA4fug4AtAnNIbgBTM0hVGhpcyBwcm9ncmFtIGNhbm5vdCBiZSBydW4gaW4gRE9TIG1vZGUuDQokAAAAAAAAAFBFAABMAQMAAAAAAAAAAAAAAAAAAJAAAgELAgAAAAACAAAAAAAAAAAAAA=='
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Only PNG, JPEG, GIF, and PDF are allowed');
  });

  it('should reject files exceeding the 5MB size limit', async () => {
    // 5MB + 10 bytes: 5242890 bytes
    const largeBase64 = Buffer.alloc(5242890, 'A').toString('base64');
    const res = await agent.post('/api/payments').send({
      invoiceId: invoice.id,
      amount: 10,
      paymentMethod: 'cash',
      receiptName: 'large.pdf',
      receiptData: `data:application/pdf;base64,${largeBase64}`
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('size exceeds');
  });

  it('should successfully upload valid files and delete from disk upon reversal', async () => {
    const res = await agent.post('/api/payments').send({
      invoiceId: invoice.id,
      amount: 20,
      paymentMethod: 'cash',
      receiptName: 'receipt.pdf',
      receiptData: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxMzUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA0Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoxODQKJSVFT0Y='
    });
    expect(res.status).toBe(201);
    
    const payment = res.body.payment;
    expect(payment.receipt_stored_path).toBeDefined();
    expect(fs.existsSync(payment.receipt_stored_path)).toBe(true);

    // Now reverse the payment and verify it gets deleted
    const reverseRes = await agent.post(`/api/payments/${payment.id}/reverse`).send({
      notes: 'Test reversal'
    });
    expect(reverseRes.status).toBe(200);
    expect(fs.existsSync(payment.receipt_stored_path)).toBe(false);
  });
});
