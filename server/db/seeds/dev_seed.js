const bcrypt = require('bcrypt');
const dbHelper = require('../index');

async function seed() {
  const isTest = process.env.NODE_ENV === 'test';
  console.log(`--- Seeding Database (Mode: ${isTest ? 'TEST' : 'PRODUCTION FRESH'}) ---`);

  // 1. Seed Permissions
  const permissionsList = [
    'users.view', 'users.create', 'users.update', 'users.disable', 'users.archive',
    'roles.manage', 'permissions.manage',
    'authors.view', 'authors.create', 'authors.update',
    'products.view', 'products.create', 'products.update', 'products.delete',
    'product_prices.view', 'product_prices.update',
    'outlet_types.view', 'outlet_types.manage',
    'outlets.view', 'outlets.create', 'outlets.update', 'outlets.disable',
    'invoices.view', 'invoices.create', 'invoices.update', 'invoices.cancel', 'invoices.export',
    'payments.view', 'payments.create', 'payments.reverse',
    'inventory.view', 'inventory.receipts.create', 'inventory.adjustments.create',
    'shipments.view', 'shipments.create', 'shipments.update',
    'reports.view', 'reports.export',
    'imports.run', 'exports.run',
    'audit.view', 'settings.update',
    'backup.create', 'backup.restore',
    'finance.view', 'finance.adjust', 'finance.export',
    'notifications.view', 'notifications.manage'
  ];

  console.log('Seeding permissions...');
  for (const perm of permissionsList) {
    await dbHelper.run(
      'INSERT OR IGNORE INTO permissions (name, description) VALUES (?, ?)',
      [perm, `Permission to access ${perm}`]
    );
  }

  // 2. Seed Roles
  // In production fresh start, we only seed super_admin.
  // In test environment, we seed all legacy roles expected by integration tests.
  const rolesList = isTest
    ? [
        { name: 'super_admin', desc: 'System Super Administrator' },
        { name: 'admin', desc: 'Administrator' },
        { name: 'accountant', desc: 'Financial Accountant' },
        { name: 'inventory_manager', desc: 'Inventory Manager' },
        { name: 'sales_staff', desc: 'Sales Representative' },
        { name: 'shipping_user', desc: 'Shipping and Logistics User' },
        { name: 'readonly_viewer', desc: 'Read Only Auditor' },
        { name: 'author', desc: 'Book Author View' }
      ]
    : [
        { name: 'super_admin', desc: 'System Super Administrator' }
      ];

  console.log('Seeding roles...');
  for (const r of rolesList) {
    await dbHelper.run(
      'INSERT OR IGNORE INTO roles (name, description) VALUES (?, ?)',
      [r.name, r.desc]
    );
  }

  // 3. Link super_admin role with all permissions
  console.log('Linking super_admin with all permissions...');
  const permissions = await dbHelper.all('SELECT id, name FROM permissions');
  const superAdminRole = await dbHelper.get('SELECT id FROM roles WHERE name = ?', ['super_admin']);
  
  if (superAdminRole) {
    for (const perm of permissions) {
      await dbHelper.run(
        'INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [superAdminRole.id, perm.id]
      );
    }
  }

  // For testing, we also assign permissions to other roles
  if (isTest) {
    const roles = await dbHelper.all('SELECT id, name FROM roles');
    const permMap = new Map(permissions.map(p => [p.name, p.id]));
    const roleMap = new Map(roles.map(r => [r.name, r.id]));

    const linkPerm = async (roleName, permName) => {
      const roleId = roleMap.get(roleName);
      const permId = permMap.get(permName);
      if (roleId && permId) {
        await dbHelper.run(
          'INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
          [roleId, permId]
        );
      }
    };

    // Admin gets all permissions too
    for (const perm of permissionsList) {
      await linkPerm('admin', perm);
    }

    // Accountant permissions
    const accountantPerms = [
      'invoices.view', 'payments.view', 'payments.create', 'payments.reverse', 'reports.view', 'reports.export',
      'finance.view', 'finance.export'
    ];
    for (const p of accountantPerms) {
      await linkPerm('accountant', p);
    }

    // Sales Staff permissions
    const salesPerms = [
      'products.view', 'outlets.view', 'invoices.view', 'invoices.create', 'invoices.update', 'payments.view', 'payments.create'
    ];
    for (const p of salesPerms) {
      await linkPerm('sales_staff', p);
    }

    // Inventory Manager permissions
    const inventoryPerms = [
      'products.view', 'products.create', 'products.update', 'inventory.view', 'inventory.receipts.create', 'inventory.adjustments.create'
    ];
    for (const p of inventoryPerms) {
      await linkPerm('inventory_manager', p);
    }
  }

  // 4. Seed a single active super admin user
  console.log('Seeding super admin user...');
  const adminUsername = process.env.SUPER_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD || '912Isk912';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const userResult = await dbHelper.run(
    'INSERT OR IGNORE INTO users (username, password_hash, full_name, status) VALUES (?, ?, ?, ?)',
    [adminUsername, hashedPassword, 'System Administrator', 'active']
  );
  
  let userId;
  if (userResult.lastID) {
    userId = userResult.lastID;
  } else {
    const userRow = await dbHelper.get('SELECT id FROM users WHERE username = ?', [adminUsername]);
    if (userRow) userId = userRow.id;
  }
  
  if (userId && superAdminRole) {
    await dbHelper.run(
      'INSERT OR IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)',
      [userId, superAdminRole.id]
    );
  }

  // 5. Seed Outlet Types (For both tests and fresh dev starts)
  console.log('Seeding standard outlet types...');
  const outletTypes = [
    { name: 'Wholesale', desc: 'Wholesale distributors and large bookstores' },
    { name: 'Retail', desc: 'Standard retail outlets and individual shops' },
    { name: 'Special Outlets', desc: 'Exhibitions and special promotional locations' }
  ];
  
  for (const ot of outletTypes) {
    await dbHelper.run(
      'INSERT OR IGNORE INTO outlet_types (name, description, status) VALUES (?, ?, ?)',
      [ot.name, ot.desc, 'active']
    );
  }

  console.log(`✓ Seeding completed successfully. Environment setup verified.`);
}

module.exports = seed;
