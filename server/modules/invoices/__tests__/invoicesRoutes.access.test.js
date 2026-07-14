const express = require('express');
const request = require('supertest');

jest.mock('../invoicesService', () => ({
  getInvoices: jest.fn(),
  getInvoiceById: jest.fn(),
  getInvoiceVisibilityRecords: jest.fn(),
  createInvoice: jest.fn(),
  updateInvoice: jest.fn(),
  bulkUpdateShippingStatus: jest.fn(),
  cancelInvoice: jest.fn()
}));
jest.mock('../../payments/paymentsService', () => ({ getPayments: jest.fn() }));
jest.mock('../pdfService', () => ({ generateInvoicesPdf: jest.fn() }));
jest.mock('../../users/usersService', () => ({ getUserRoles: jest.fn() }));
jest.mock('../../authors/authorsService', () => ({ getLinkedAuthorsForUser: jest.fn() }));
jest.mock('../../outlets/outletsService', () => ({ getLinkedOutletsForUser: jest.fn() }));
jest.mock('../../../middleware/rbac', () => ({
  requireAuth: (_req, _res, next) => next(),
  checkPermission: () => (_req, _res, next) => next()
}));
jest.mock('../../../middleware/audit', () => ({
  auditLog: () => (_req, _res, next) => next()
}));

const invoicesService = require('../invoicesService');
const paymentsService = require('../../payments/paymentsService');
const pdfService = require('../pdfService');
const usersService = require('../../users/usersService');
const invoicesRouter = require('../invoicesRoutes');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.session = { user: { id: 77 } };
    next();
  });
  app.use('/api/invoices', invoicesRouter);
  return app;
}

function useRoles(...roleNames) {
  usersService.getUserRoles.mockResolvedValue(roleNames.map(name => ({ name })));
}

describe('invoice routes access scope', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
    invoicesService.getInvoices.mockResolvedValue([]);
    paymentsService.getPayments.mockResolvedValue([]);
    pdfService.generateInvoicesPdf.mockResolvedValue(Buffer.from('pdf'));
  });

  test.each(['inventory_manager', 'shipping_user'])(
    'passes the incomplete-only scope to GET / for %s without discarding requested filters',
    async role => {
      useRoles(role);

      const response = await request(app)
        .get('/api/invoices')
        .query({ shippingStatus: 'shipped', limit: 10, offset: 5 });

      expect(response.status).toBe(200);
      expect(invoicesService.getInvoices).toHaveBeenCalledWith(expect.objectContaining({
        shippingStatus: 'shipped',
        allowedShippingStatuses: ['pending', 'partially_shipped'],
        excludeCancelled: true,
        limit: 10,
        offset: 5
      }));
    }
  );

  test('removes the restriction when an elevated role is combined with a restricted role', async () => {
    useRoles('shipping_user', 'accountant');

    const response = await request(app).get('/api/invoices');

    expect(response.status).toBe(200);
    expect(invoicesService.getInvoices).toHaveBeenCalledWith(expect.objectContaining({
      allowedShippingStatuses: null,
      excludeCancelled: false
    }));
  });

  test.each([
    ['shipped', 'unpaid'],
    ['delivered', 'paid'],
    ['pending', 'cancelled']
  ])('returns 403 for direct details with shipping=%s payment=%s', async (shippingStatus, paymentStatus) => {
    useRoles('inventory_manager');
    invoicesService.getInvoiceById.mockResolvedValue({
      id: 42,
      shipping_status: shippingStatus,
      payment_status: paymentStatus,
      items: []
    });

    const response = await request(app).get('/api/invoices/42');

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Forbidden');
  });

  test('returns 403 before loading payments for a hidden invoice', async () => {
    useRoles('shipping_user');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([{
      id: 42,
      shipping_status: 'delivered',
      payment_status: 'paid'
    }]);

    const response = await request(app).get('/api/invoices/42/payments');

    expect(response.status).toBe(403);
    expect(paymentsService.getPayments).not.toHaveBeenCalled();
  });

  test('returns 400 without loading payments for a malformed invoice ID', async () => {
    const response = await request(app).get('/api/invoices/foo/payments');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(usersService.getUserRoles).not.toHaveBeenCalled();
    expect(invoicesService.getInvoiceVisibilityRecords).not.toHaveBeenCalled();
    expect(paymentsService.getPayments).not.toHaveBeenCalled();
  });

  test('returns 404 without loading payments when the invoice does not exist', async () => {
    useRoles('shipping_user');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([]);

    const response = await request(app).get('/api/invoices/404/payments');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
    expect(invoicesService.getInvoiceVisibilityRecords).toHaveBeenCalledWith([404]);
    expect(paymentsService.getPayments).not.toHaveBeenCalled();
  });

  test('allows payments for an incomplete, non-cancelled invoice', async () => {
    useRoles('shipping_user');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([{
      id: 42,
      shipping_status: 'partially_shipped',
      payment_status: 'partially_paid'
    }]);

    const response = await request(app).get('/api/invoices/42/payments');

    expect(response.status).toBe(200);
    expect(paymentsService.getPayments).toHaveBeenCalledWith({ invoiceId: 42 });
  });

  test('rejects the entire PDF request if any selected invoice is hidden', async () => {
    useRoles('inventory_manager');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([
      { id: 1, shipping_status: 'pending', payment_status: 'unpaid' },
      { id: 2, shipping_status: 'shipped', payment_status: 'paid' }
    ]);

    const response = await request(app)
      .post('/api/invoices/export/pdf')
      .send({ invoiceIds: [1, 2] });

    expect(response.status).toBe(403);
    expect(pdfService.generateInvoicesPdf).not.toHaveBeenCalled();
  });

  test('rejects malformed PDF invoice IDs before checking access or generating output', async () => {
    const response = await request(app)
      .post('/api/invoices/export/pdf')
      .send({ invoiceIds: [1, 'not-an-id'] });

    expect(response.status).toBe(400);
    expect(usersService.getUserRoles).not.toHaveBeenCalled();
    expect(invoicesService.getInvoiceVisibilityRecords).not.toHaveBeenCalled();
    expect(pdfService.generateInvoicesPdf).not.toHaveBeenCalled();
  });

  test('rejects the entire PDF request when a restricted user selects a missing invoice', async () => {
    useRoles('shipping_user');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([
      { id: 1, shipping_status: 'pending', payment_status: 'unpaid' }
    ]);

    const response = await request(app)
      .post('/api/invoices/export/pdf')
      .send({ invoiceIds: [1, 999999] });

    expect(response.status).toBe(403);
    expect(pdfService.generateInvoicesPdf).not.toHaveBeenCalled();
  });

  test('generates the PDF when every selected invoice is visible', async () => {
    useRoles('inventory_manager');
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([
      { id: 1, shipping_status: 'pending', payment_status: 'unpaid' },
      { id: 2, shipping_status: 'partially_shipped', payment_status: 'partially_paid' }
    ]);

    const response = await request(app)
      .post('/api/invoices/export/pdf')
      .send({ invoiceIds: [1, 2] });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/^application\/pdf/);
    expect(pdfService.generateInvoicesPdf).toHaveBeenCalledWith([1, 2]);
  });
});
