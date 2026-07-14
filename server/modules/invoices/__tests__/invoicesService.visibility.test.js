jest.mock('../../../db', () => ({
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  exec: jest.fn()
}));

const db = require('../../../db');
const invoicesService = require('../invoicesService');

describe('invoicesService invoice visibility filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.all.mockResolvedValue([]);
  });

  test('intersects an explicit completed filter with the restricted scope before pagination', async () => {
    await invoicesService.getInvoices({
      shippingStatus: 'shipped',
      allowedShippingStatuses: ['pending', 'partially_shipped'],
      excludeCancelled: true,
      limit: 10,
      offset: 20
    });

    expect(db.all).toHaveBeenCalledTimes(1);
    const [sql, params] = db.all.mock.calls[0];

    expect(sql).toContain('i.shipping_status IN (?,?)');
    expect(sql).toContain("i.payment_status != 'cancelled'");
    expect(sql).toContain('i.shipping_status = ?');
    expect(sql.indexOf('i.shipping_status IN (?,?)')).toBeLessThan(sql.indexOf('LIMIT ? OFFSET ?'));
    expect(sql.indexOf("i.payment_status != 'cancelled'")).toBeLessThan(sql.indexOf('LIMIT ? OFFSET ?'));
    expect(params).toEqual(['pending', 'partially_shipped', 'shipped', 10, 20]);
  });

  test('turns an explicitly empty allowed-status scope into an always-empty query', async () => {
    await invoicesService.getInvoices({
      allowedShippingStatuses: [],
      limit: 5,
      offset: 0
    });

    const [sql, params] = db.all.mock.calls[0];
    expect(sql).toContain('AND 0=1');
    expect(params).toEqual([5, 0]);
  });
});
