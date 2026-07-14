jest.mock('../../../db', () => ({
  all: jest.fn(),
  get: jest.fn()
}));
jest.mock('html-pdf-node', () => ({ generatePdf: jest.fn() }));

const db = require('../../../db');
const exportsService = require('../exportsService');

describe('invoice export SQL visibility filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.all.mockResolvedValue([]);
  });

  test.each([
    ['exportInvoices', {}],
    ['exportInvoiceItems', {}]
  ])('applies scope and requested filters together in %s', async (method, query) => {
    await exportsService[method](
      { ...query, shippingStatus: method === 'exportInvoices' ? 'shipped' : undefined },
      'csv',
      {
        allowedShippingStatuses: ['pending', 'partially_shipped'],
        excludeCancelled: true
      }
    );

    expect(db.all).toHaveBeenCalledTimes(1);
    const [sql, params] = db.all.mock.calls[0];
    expect(sql).toContain('i.shipping_status IN (?, ?)');
    expect(sql).toContain('i.payment_status != ?');
    expect(params.slice(0, 3)).toEqual(['pending', 'partially_shipped', 'cancelled']);

    if (method === 'exportInvoices') {
      expect(sql).toContain('i.shipping_status = ?');
      expect(params).toEqual(['pending', 'partially_shipped', 'cancelled', 'shipped']);
    }
  });
});
