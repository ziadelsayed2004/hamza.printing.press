jest.mock('../../../db', () => ({
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  exec: jest.fn()
}));
jest.mock('../../shipments/shipmentsService', () => ({
  recalculateInvoiceShippingStatus: jest.fn()
}));

const db = require('../../../db');
const shipmentsService = require('../../shipments/shipmentsService');
const invoicesService = require('../invoicesService');

describe('invoicesService authorized bulk shipping action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.exec.mockResolvedValue();
    db.run.mockResolvedValue({ lastID: 70, changes: 1 });
    shipmentsService.recalculateInvoiceShippingStatus.mockResolvedValue();
  });

  test.each(['pending', 'partially_shipped', 'cancelled'])('rejects unsafe direct target %s', async shippingStatus => {
    await expect(invoicesService.bulkUpdateShippingStatus({
      invoiceIds: [10],
      shippingStatus,
      userId: 17
    })).rejects.toThrow(`Invalid shipping status: ${shippingStatus}`);

    expect(db.exec).not.toHaveBeenCalled();
  });

  test('creates a pending shipment, transitions it to shipped, and derives invoice status', async () => {
    db.get.mockImplementation(sql => {
      if (sql.includes('SELECT shipping_status, payment_status')) {
        return Promise.resolve({
          shipping_status: 'pending',
          payment_status: 'unpaid',
          invoice_number: 'INV-1',
          outlet_id: 3
        });
      }
      if (sql.includes('SELECT title, stock_policy')) {
        return Promise.resolve({ title: 'Book', stock_policy: 'none' });
      }
      if (sql.includes('COALESCE(SUM(si.quantity)')) return Promise.resolve({ qty: 0 });
      if (sql.includes('SELECT shipping_status FROM invoices')) {
        return Promise.resolve({ shipping_status: 'shipped' });
      }
      return Promise.resolve(null);
    });
    db.all.mockImplementation(sql => {
      if (sql.includes('FROM shipments') && sql.includes("status != 'cancelled'")) return Promise.resolve([]);
      if (sql.includes('SELECT * FROM invoice_items')) {
        return Promise.resolve([{ id: 4, product_id: 6, quantity: 2 }]);
      }
      return Promise.resolve([]);
    });

    await invoicesService.bulkUpdateShippingStatus({
      invoiceIds: [10],
      shippingStatus: 'shipped',
      userId: 17
    });

    const shipmentInsert = db.run.mock.calls.find(([sql]) => sql.includes('INSERT INTO shipments'));
    const transitionUpdates = db.run.mock.calls.filter(([sql]) => sql.includes('UPDATE shipments'));
    expect(shipmentInsert[0]).toContain("'pending'");
    expect(transitionUpdates).toHaveLength(1);
    expect(transitionUpdates[0][1][0]).toBe('shipped');
    expect(db.run.mock.calls.some(([sql]) => sql.includes('UPDATE invoices SET shipping_status'))).toBe(false);
    expect(shipmentsService.recalculateInvoiceShippingStatus).toHaveBeenCalledWith(10, 17);
    expect(db.exec).toHaveBeenLastCalledWith('COMMIT;');
  });

  test('moves pending shipments through shipped before delivered', async () => {
    db.get.mockImplementation(sql => {
      if (sql.includes('SELECT shipping_status, payment_status')) {
        return Promise.resolve({
          shipping_status: 'pending',
          payment_status: 'unpaid',
          invoice_number: 'INV-1',
          outlet_id: 3
        });
      }
      if (sql.includes('SELECT shipping_status FROM invoices')) {
        return Promise.resolve({ shipping_status: 'delivered' });
      }
      return Promise.resolve(null);
    });
    db.all.mockImplementation(sql => {
      if (sql.includes('FROM shipments') && sql.includes("status != 'cancelled'")) {
        return Promise.resolve([{ id: 70, status: 'pending', shipped_at: null, delivered_at: null }]);
      }
      if (sql.includes('SELECT * FROM invoice_items')) return Promise.resolve([]);
      return Promise.resolve([]);
    });

    await invoicesService.bulkUpdateShippingStatus({
      invoiceIds: [10],
      shippingStatus: 'delivered',
      userId: 17
    });

    const transitionStatuses = db.run.mock.calls
      .filter(([sql]) => sql.includes('UPDATE shipments'))
      .map(([, params]) => params[0]);
    expect(transitionStatuses).toEqual(['shipped', 'delivered']);
    expect(shipmentsService.recalculateInvoiceShippingStatus).toHaveBeenCalledWith(10, 17);
  });
});
