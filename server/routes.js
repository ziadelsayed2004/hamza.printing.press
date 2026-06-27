const express = require('express');
const router = express.Router();
const authRoutes = require('./modules/auth/authRoutes');
const userRoutes = require('./modules/users/userRoutes');
const outletTypesRoutes = require('./modules/outlet-types/outletTypesRoutes');
const outletsRoutes = require('./modules/outlets/outletsRoutes');
const authorsRoutes = require('./modules/authors/authorsRoutes');
const productsRoutes = require('./modules/products/productsRoutes');
const productPricesRoutes = require('./modules/products/productPricesRoutes');
const inventoryRoutes = require('./modules/inventory/inventoryRoutes');
const invoicesRoutes = require('./modules/invoices/invoicesRoutes');
const paymentsRoutes = require('./modules/payments/paymentsRoutes');
const shipmentsRoutes = require('./modules/shipments/shipmentsRoutes');
const reportsRoutes = require('./modules/reports/reportsRoutes');
const exportsRoutes = require('./modules/exports/exportsRoutes');
const importsRoutes = require('./modules/imports/importsRoutes');
const financeRoutes = require('./modules/finance/financeRoutes');
const notificationsRoutes = require('./modules/notifications/notificationsRoutes');

// Mount sub-routers
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/outlet-types', outletTypesRoutes);
router.use('/outlets', outletsRoutes);
router.use('/authors', authorsRoutes);
router.use('/products', productsRoutes);
router.use('/product-prices', productPricesRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/shipments', shipmentsRoutes);
router.use('/reports', reportsRoutes);
router.use('/exports', exportsRoutes);
router.use('/imports', importsRoutes);
router.use('/finance', financeRoutes);
router.use('/notifications', notificationsRoutes);

module.exports = router;
