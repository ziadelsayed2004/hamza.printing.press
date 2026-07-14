const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function openMemoryDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(':memory:', error => {
      if (error) reject(error);
      else resolve(db);
    });
  });
}

function createDbHelper(db) {
  return {
    exec(sql) {
      return new Promise((resolve, reject) => {
        db.exec(sql, error => {
          if (error) reject(error);
          else resolve();
        });
      });
    },
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, function onRun(error) {
          if (error) reject(error);
          else resolve({ lastID: this.lastID, changes: this.changes });
        });
      });
    },
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.get(sql, params, (error, row) => {
          if (error) reject(error);
          else resolve(row);
        });
      });
    },
    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (error, rows) => {
          if (error) reject(error);
          else resolve(rows);
        });
      });
    }
  };
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close(error => {
      if (error) reject(error);
      else resolve();
    });
  });
}

describe('fresh development seed invoice permissions', () => {
  let db;
  let dbHelper;
  let consoleSpy;

  beforeEach(async () => {
    db = await openMemoryDatabase();
    dbHelper = createDbHelper(db);
    const initialSchema = fs.readFileSync(
      path.join(__dirname, '..', '..', 'migrations', '001_initial_schema.sql'),
      'utf8'
    );
    await dbHelper.exec(initialSchema);

    jest.resetModules();
    jest.doMock('../../index', () => dbHelper);
    jest.doMock('bcrypt', () => ({
      hash: jest.fn().mockResolvedValue('test-password-hash')
    }));
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(async () => {
    consoleSpy.mockRestore();
    jest.dontMock('../../index');
    jest.dontMock('bcrypt');
    await close(db);
  });

  test('links invoices.view to both restricted roles and no other invoice permission', async () => {
    const seed = require('../dev_seed');

    await seed();
    await seed();

    const grants = await dbHelper.all(`
      SELECT r.name AS role_name, p.name AS permission_name
      FROM role_permissions rp
      JOIN roles r ON r.id = rp.role_id
      JOIN permissions p ON p.id = rp.permission_id
      WHERE r.name IN ('inventory_manager', 'shipping_user')
        AND p.name LIKE 'invoices.%'
      ORDER BY r.name, p.name
    `);

    expect(grants).toEqual([
      { role_name: 'inventory_manager', permission_name: 'invoices.view' },
      { role_name: 'shipping_user', permission_name: 'invoices.view' }
    ]);
  });
});
