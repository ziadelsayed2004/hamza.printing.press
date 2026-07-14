const express = require('express');
const request = require('supertest');

jest.mock('../shipmentsService', () => ({
  getShipments: jest.fn(),
  getShipmentById: jest.fn(),
  getRemainingShippableItems: jest.fn(),
  createShipment: jest.fn(),
  updateShipmentStatus: jest.fn()
}));
jest.mock('../../invoices/invoicesService', () => ({
  getInvoiceById: jest.fn(),
  getInvoiceVisibilityRecords: jest.fn()
}));
jest.mock('../../users/usersService', () => ({ getUserRoles: jest.fn() }));
jest.mock('../../outlets/outletsService', () => ({ getLinkedOutletsForUser: jest.fn() }));
jest.mock('../../../middleware/rbac', () => ({
  requireAuth: (_req, _res, next) => next(),
  checkPermission: jest.fn(() => (_req, _res, next) => next())
}));
jest.mock('../../../middleware/audit', () => ({
  auditLog: () => (_req, _res, next) => next()
}));

const shipmentsService = require('../shipmentsService');
const invoicesService = require('../../invoices/invoicesService');
const usersService = require('../../users/usersService');
const { checkPermission } = require('../../../middleware/rbac');
const shipmentsRouter = require('../shipmentsRoutes');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.session = { user: { id: 17 } };
    next();
  });
  app.use('/api/shipments', shipmentsRouter);
  return app;
}

describe('shipment routes access and status permissions', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
    usersService.getUserRoles.mockResolvedValue([{ name: 'shipping_user' }]);
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([{
      id: 10,
      outlet_id: 3,
      shipping_status: 'pending',
      payment_status: 'unpaid'
    }]);
    shipmentsService.getRemainingShippableItems.mockResolvedValue([{ invoice_item_id: 4 }]);
    shipmentsService.createShipment.mockResolvedValue({ id: 7, status: 'pending' });
    shipmentsService.updateShipmentStatus.mockResolvedValue({ id: 7, status: 'shipped' });
  });

  test('registers the remaining-items route before the generic shipment ID route', async () => {
    const response = await request(app).get('/api/shipments/invoice/10/remaining');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ invoice_item_id: 4 }]);
    expect(shipmentsService.getRemainingShippableItems).toHaveBeenCalledWith(10);
    expect(shipmentsService.getShipmentById).not.toHaveBeenCalled();
  });

  test('rejects remaining items and shipment creation for a hidden completed invoice', async () => {
    invoicesService.getInvoiceVisibilityRecords.mockResolvedValue([{
      id: 10,
      outlet_id: 3,
      shipping_status: 'delivered',
      payment_status: 'paid'
    }]);

    const remainingResponse = await request(app).get('/api/shipments/invoice/10/remaining');
    const createResponse = await request(app)
      .post('/api/shipments')
      .send({ invoiceId: 10, items: [{ invoiceItemId: 4, quantity: 1 }] });

    expect(remainingResponse.status).toBe(403);
    expect(createResponse.status).toBe(403);
    expect(shipmentsService.getRemainingShippableItems).not.toHaveBeenCalled();
    expect(shipmentsService.createShipment).not.toHaveBeenCalled();
  });

  test('creates a pending shipment for a visible incomplete invoice', async () => {
    const response = await request(app)
      .post('/api/shipments')
      .send({ invoiceId: 10, items: [{ invoiceItemId: 4, quantity: 1 }] });

    expect(response.status).toBe(201);
    expect(response.body.shipment.status).toBe('pending');
    expect(shipmentsService.createShipment).toHaveBeenCalledWith({
      invoiceId: 10,
      shippingCarrier: '',
      trackingNumber: '',
      items: [{ invoiceItemId: 4, quantity: 1 }],
      userId: 17
    });
  });

  test.each([
    ['shipped', 'shipments.update'],
    ['cancelled', 'shipments.update'],
    ['delivered', 'shipments.deliver']
  ])('requires %s permission for a transition to %s', async (status, permission) => {
    shipmentsService.updateShipmentStatus.mockResolvedValue({ id: 7, status });

    const response = await request(app)
      .post('/api/shipments/7/status')
      .send({ status });

    expect(response.status).toBe(200);
    expect(checkPermission).toHaveBeenCalledWith(permission);
    expect(shipmentsService.updateShipmentStatus).toHaveBeenCalledWith(7, {
      status,
      notes: '',
      userId: 17
    });
  });
});
