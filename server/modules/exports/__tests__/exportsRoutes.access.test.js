const express = require('express');
const request = require('supertest');

jest.mock('../exportsService', () => ({
  exportProducts: jest.fn(),
  exportPrices: jest.fn(),
  exportAuthors: jest.fn(),
  exportOutlets: jest.fn(),
  exportInvoices: jest.fn(),
  exportInvoiceItems: jest.fn(),
  exportPayments: jest.fn(),
  exportInventory: jest.fn(),
  exportReturns: jest.fn(),
  exportShipments: jest.fn(),
  exportCourierSheet: jest.fn(),
  exportOutletStatement: jest.fn(),
  exportReport: jest.fn()
}));
jest.mock('../../users/usersService', () => ({ getUserRoles: jest.fn() }));
jest.mock('../../../middleware/rbac', () => ({
  requireAuth: (_req, _res, next) => next(),
  checkPermission: () => (_req, _res, next) => next()
}));
jest.mock('../../../middleware/audit', () => ({
  auditLog: () => (_req, _res, next) => next()
}));

const exportsService = require('../exportsService');
const usersService = require('../../users/usersService');
const exportsRouter = require('../exportsRoutes');

function createApp() {
  const app = express();
  app.use((req, _res, next) => {
    req.session = { user: { id: 88 } };
    next();
  });
  app.use('/api/exports', exportsRouter);
  return app;
}

describe('invoice export route access scope', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
    usersService.getUserRoles.mockResolvedValue([{ name: 'shipping_user' }]);
    exportsService.exportInvoices.mockResolvedValue('invoice csv');
    exportsService.exportInvoiceItems.mockResolvedValue('item csv');
  });

  test.each([
    ['/api/exports/invoices', 'exportInvoices'],
    ['/api/exports/invoice-items', 'exportInvoiceItems']
  ])('passes the restricted scope through %s', async (path, serviceMethod) => {
    const response = await request(app)
      .get(path)
      .query({ format: 'csv', shippingStatus: 'shipped' });

    expect(response.status).toBe(200);
    expect(exportsService[serviceMethod]).toHaveBeenCalledWith(
      expect.objectContaining({ format: 'csv', shippingStatus: 'shipped' }),
      'csv',
      {
        allowedShippingStatuses: ['pending', 'partially_shipped'],
        excludeCancelled: true
      }
    );
  });

  test('passes an unrestricted scope when a bypass role is also present', async () => {
    usersService.getUserRoles.mockResolvedValue([
      { name: 'inventory_manager' },
      { name: 'admin' }
    ]);

    const response = await request(app).get('/api/exports/invoices?format=csv');

    expect(response.status).toBe(200);
    expect(exportsService.exportInvoices).toHaveBeenCalledWith(
      expect.any(Object),
      'csv',
      { allowedShippingStatuses: null, excludeCancelled: false }
    );
  });
});
