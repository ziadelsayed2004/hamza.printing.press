const db = require('../server/db');
const usersService = require('../server/modules/users/usersService');
const rolesService = require('../server/modules/roles/rolesService');
const outletTypesService = require('../server/modules/outlet-types/outletTypesService');
const outletsService = require('../server/modules/outlets/outletsService');
const authorsService = require('../server/modules/authors/authorsService');
const productsService = require('../server/modules/products/productsService');
const productPricesService = require('../server/modules/products/productPricesService');
const inventoryService = require('../server/modules/inventory/inventoryService');
const invoicesService = require('../server/modules/invoices/invoicesService');
const paymentsService = require('../server/modules/payments/paymentsService');
const shipmentsService = require('../server/modules/shipments/shipmentsService');
const returnsService = require('../server/modules/returns/returnsService');
const financeService = require('../server/modules/finance/financeService');

async function runE2EChain() {
  console.log('--- Starting E2E Business Chain Verification ---');
  
  // Track created entity IDs for cleanups
  const created = {
    userIds: [],
    outletTypeIds: [],
    outletIds: [],
    authorIds: [],
    productIds: [],
    adjustmentIds: [],
    invoiceIds: [],
    paymentIds: [],
    shipmentIds: [],
    returnIds: []
  };

  try {
    // 1. Fetch super admin role & create test admin user
    console.log('Step 1: Admin User Setup...');
    const roles = await rolesService.getAllRoles();
    const adminRole = roles.find(r => r.name === 'super_admin');
    if (!adminRole) throw new Error('super_admin role not found');

    const adminUser = await usersService.createUser({
      username: 'e2e_chain_admin_' + Date.now(),
      password: 'password123',
      fullName: 'E2E Chain Admin'
    });
    created.userIds.push(adminUser.id);
    await usersService.assignRole(adminUser.id, adminRole.id);
    console.log(`✓ Admin user created with ID ${adminUser.id}`);

    // 2. Create Outlet Type
    console.log('Step 2: Creating Outlet Type...');
    const outletType = await outletTypesService.createOutletType({
      name: 'E2E Wholesale ' + Date.now(),
      description: 'E2E Test Type'
    });
    created.outletTypeIds.push(outletType.id);
    console.log(`✓ Outlet Type created with ID ${outletType.id}`);

    // 3. Create Outlet
    console.log('Step 3: Creating Outlet...');
    const outlet = await outletsService.createOutlet({
      name: 'E2E Cairo Outlet ' + Date.now(),
      outletTypeId: outletType.id,
      governorate: 'Cairo'
    });
    created.outletIds.push(outlet.id);
    console.log(`✓ Outlet created with ID ${outlet.id}`);

    // 4. Create Author
    console.log('Step 4: Creating Author...');
    const author = await authorsService.createAuthor({
      name: 'E2E Author ' + Date.now(),
      phone: '01012345678'
    });
    created.authorIds.push(author.id);
    console.log(`✓ Author created with ID ${author.id}`);

    // 5. Create Product + Price
    console.log('Step 5: Creating Product & Price...');
    const product = await productsService.createProduct({
      title: 'E2E Book Title ' + Date.now(),
      code: 'BK-E2E-' + Date.now(),
      category: 'Fiction',
      stockPolicy: 'track',
      authorIds: [author.id]
    });
    created.productIds.push(product.id);

    await productPricesService.updatePricesForProduct(product.id, [
      { outletTypeId: outletType.id, price: 120.00 }
    ]);
    console.log(`✓ Product created with ID ${product.id} and price 120.00 EGP`);

    // 6. Inventory Receipt (Tawreed)
    console.log('Step 6: Adding Inventory Stock...');
    const adjustment = await inventoryService.createAdjustment({
      reason: 'E2E stock correction',
      notes: 'E2E initial stock adjust',
      userId: adminUser.id,
      items: [{ productId: product.id, quantity: 100 }]
    });
    created.adjustmentIds.push(adjustment.id);
    console.log(`✓ Inventory adjustment recorded with ID ${adjustment.id} (+100 stock)`);

    // 7. Deferred Invoice (Fatoora Ajela)
    console.log('Step 7: Creating Deferred Invoice...');
    const invoice = await invoicesService.createInvoice({
      outletId: outlet.id,
      items: [{ productId: product.id, quantity: 10 }],
      discount: 10.00,
      shippingCost: 15.00,
      paymentType: 'deferred',
      userId: adminUser.id
    });
    created.invoiceIds.push(invoice.id);
    // Unit price is 120. Total for 10 is 1200. Discount 10. Shipping 15. Total invoice price = 1205.00 EGP.
    console.log(`✓ Deferred invoice created with ID ${invoice.id}. Net total: ${invoice.total_price} EGP`);

    // 8. Partial Payment Not Supplied
    console.log('Step 8: Recording Partial Payment (Not Supplied)...');
    const payment = await paymentsService.recordPayment({
      invoiceId: invoice.id,
      amount: 500.00,
      paymentMethod: 'cash',
      notes: 'E2E Cash Partial Payment',
      userId: adminUser.id,
      supplyStatus: 'not_supplied'
    });
    created.paymentIds.push(payment.id);
    console.log(`✓ Recorded payment with ID ${payment.id} (500.00 EGP, not_supplied)`);

    // 9. Supply Payment
    console.log('Step 9: Supplying Payment to HQ...');
    await paymentsService.supplyPayments({ paymentIds: [payment.id], userId: adminUser.id });
    console.log(`✓ Payment ${payment.id} supply status updated to 'supplied'`);

    // 10. Partial Shipment by Item
    console.log('Step 10: Dispatching Partial Shipment (4 units)...');
    const shipment = await shipmentsService.createShipment({
      invoiceId: invoice.id,
      notes: 'E2E Partial Shipment of 4 books',
      userId: adminUser.id,
      items: [{ invoiceItemId: invoice.items[0].id, quantity: 4 }]
    });
    created.shipmentIds.push(shipment.id);
    console.log(`✓ Shipment created with ID ${shipment.id} (4 units)`);

    // 11. Return Item (1 unit of shipped items)
    console.log('Step 11: Recording Returns (1 unit)...');
    const returnObj = await returnsService.createReturn({
      invoiceId: invoice.id,
      reason: 'E2E damaged book return',
      userId: adminUser.id,
      items: [{ invoiceItemId: invoice.items[0].id, quantity: 1 }]
    });
    created.returnIds.push(returnObj.id);
    console.log(`✓ Approved return created with ID ${returnObj.id} (1 unit)`);

    // 12. Check Balances / Stock / Notifications / Reports
    console.log('Step 12: Asserting Final Stock, Balances & Reports...');

    // A. Assert Real-time Stock level
    const currentStock = await inventoryService.getRealTimeStock(product.id);
    console.log(`- Asserting Product Stock: expected 91, got ${currentStock}`);
    if (currentStock !== 91) {
      throw new Error(`Stock mismatch: expected 91, got ${currentStock}`);
    }

    // B. Assert Finance Summary values
    const summary = await financeService.getFinanceSummary([outlet.id]);
    console.log('- Asserting Finance Summary metrics:');
    console.log(`  - totalInvoices: expected 1205.00, got ${summary.totalInvoices}`);
    if (summary.totalInvoices !== 1205.00) {
      throw new Error(`totalInvoices mismatch: expected 1205.00, got ${summary.totalInvoices}`);
    }

    console.log(`  - pending (receivable): expected 585.00, got ${summary.pending}`);
    // receivable_amount = unit price 120 * returned unit 1 = 120 reduction.
    // invoice total 1205 - paid 500 - return 120 = 585.
    if (summary.pending !== 585.00) {
      throw new Error(`receivables mismatch: expected 585.00, got ${summary.pending}`);
    }

    console.log(`  - collected: expected 500.00, got ${summary.collected}`);
    if (summary.collected !== 500.00) {
      throw new Error(`collected mismatch: expected 500.00, got ${summary.collected}`);
    }

    console.log(`  - supplied: expected 500.00, got ${summary.supplied}`);
    if (summary.supplied !== 500.00) {
      throw new Error(`supplied mismatch: expected 500.00, got ${summary.supplied}`);
    }

    console.log(`  - unsupplied: expected 0.00, got ${summary.unsupplied}`);
    if (summary.unsupplied !== 0.00) {
      throw new Error(`unsupplied mismatch: expected 0.00, got ${summary.unsupplied}`);
    }

    console.log(`  - returns: expected 120.00, got ${summary.returns}`);
    if (summary.returns !== 120.00) {
      throw new Error(`returns mismatch: expected 120.00, got ${summary.returns}`);
    }

    console.log('✅ All E2E assertions passed successfully!');
  } finally {
    // Clean up E2E generated rows
    console.log('--- Cleaning Up E2E Data ---');
    try {
      if (created.returnIds.length > 0) {
        await db.run(`DELETE FROM return_items WHERE return_id IN (${created.returnIds.join(',')})`);
        await db.run(`DELETE FROM returns WHERE id IN (${created.returnIds.join(',')})`);
      }
      if (created.shipmentIds.length > 0) {
        await db.run(`DELETE FROM shipment_items WHERE shipment_id IN (${created.shipmentIds.join(',')})`);
        await db.run(`DELETE FROM shipments WHERE id IN (${created.shipmentIds.join(',')})`);
      }
      if (created.paymentIds.length > 0) {
        await db.run(`DELETE FROM invoice_payments WHERE id IN (${created.paymentIds.join(',')})`);
      }
      if (created.invoiceIds.length > 0) {
        await db.run(`DELETE FROM invoice_items WHERE invoice_id IN (${created.invoiceIds.join(',')})`);
        await db.run(`DELETE FROM invoice_status_history WHERE invoice_id IN (${created.invoiceIds.join(',')})`);
        await db.run(`DELETE FROM invoices WHERE id IN (${created.invoiceIds.join(',')})`);
      }
      if (created.adjustmentIds.length > 0) {
        await db.run(`DELETE FROM inventory_adjustment_items WHERE adjustment_id IN (${created.adjustmentIds.join(',')})`);
        await db.run(`DELETE FROM inventory_adjustments WHERE id IN (${created.adjustmentIds.join(',')})`);
      }
      if (created.productIds.length > 0) {
        await db.run(`DELETE FROM product_prices WHERE product_id IN (${created.productIds.join(',')})`);
        await db.run(`DELETE FROM product_authors WHERE product_id IN (${created.productIds.join(',')})`);
        await db.run(`DELETE FROM products WHERE id IN (${created.productIds.join(',')})`);
      }
      if (created.authorIds.length > 0) {
        await db.run(`DELETE FROM author_users WHERE author_id IN (${created.authorIds.join(',')})`);
        await db.run(`DELETE FROM authors WHERE id IN (${created.authorIds.join(',')})`);
      }
      if (created.outletIds.length > 0) {
        await db.run(`DELETE FROM outlet_users WHERE outlet_id IN (${created.outletIds.join(',')})`);
        await db.run(`DELETE FROM outlets WHERE id IN (${created.outletIds.join(',')})`);
      }
      if (created.outletTypeIds.length > 0) {
        await db.run(`DELETE FROM outlet_types WHERE id IN (${created.outletTypeIds.join(',')})`);
      }
      if (created.userIds.length > 0) {
        await db.run(`DELETE FROM user_roles WHERE user_id IN (${created.userIds.join(',')})`);
        await db.run(`DELETE FROM users WHERE id IN (${created.userIds.join(',')})`);
      }
      // Also clean up any global transaction logs or notifications created during E2E
      if (created.productIds.length > 0) {
        await db.run(`DELETE FROM inventory_transactions WHERE product_id IN (${created.productIds.join(',')})`);
        await db.run(`DELETE FROM notifications WHERE category IN ('price_missing')`); // cleanup test notifications
      }
      if (created.outletIds.length > 0) {
        await db.run(`DELETE FROM finance_ledger_entries WHERE outlet_id IN (${created.outletIds.join(',')})`);
      }
      console.log('✓ Database cleaned up successfully');
    } catch (cleanupErr) {
      console.error('❌ Failed to clean up database:', cleanupErr.message);
    }
  }
}

// Connect, run, and exit
db.run('SELECT 1')
  .then(() => runE2EChain())
  .then(() => {
    console.log('--- E2E Business Chain Verification Successful! ---');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ E2E Business Chain Verification Failed:', err.message);
    process.exit(1);
  });
