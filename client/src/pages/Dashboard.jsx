import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import { formatCurrencyEGP, formatEgyptDateTime } from '../utils/formatters';
import LoadingState from '../components/LoadingState';
import { t } from '../locales/t';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  Divider,
  Alert,
  Button,
  LinearProgress,
  Stack
} from '@mui/material';
import {
  Store as StoreIcon,
  Book as BookIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  AddShoppingCart as AddInvoiceIcon,
  AddBox as AddProductIcon,
  MoveToInbox as AddStockIcon,
  AddCircle as AddCircleIcon,
  PersonAdd as AddUserIcon,
  History as HistoryIcon,
  NotificationImportant as AlertIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import './Dashboard.css';

export const Dashboard = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  // Core Data States
  const [financials, setFinancials] = useState(null);
  const [financeSummary, setFinanceSummary] = useState(null);
  const [stock, setStock] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [shipments, setShipments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [cairoTime, setCairoTime] = useState('');

  // Localized Cairo Dynamic Clock
  useEffect(() => {
    const updateTime = () => {
      setCairoTime(new Intl.DateTimeFormat('ar-EG', {
        timeZone: 'Africa/Cairo',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        numberingSystem: 'latn'
      }).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Dashboard Data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const promises = [];

      if (hasPermission('invoices.view')) {
        promises.push(
          apiClient.get('/finance/summary')
            .then(data => setFinanceSummary(data))
            .catch(err => console.error('Finance summary fetch error:', err))
        );
      } else if (hasPermission('reports.view')) {
        promises.push(
          apiClient.get('/reports/financials/summary')
            .then(data => setFinancials(data))
            .catch(err => console.error('Financials summary fetch error:', err))
        );
      }

      if (hasPermission('reports.view')) {
        promises.push(
          apiClient.get('/reports/stock')
            .then(data => setStock(data || []))
            .catch(err => console.error('Stock report fetch error:', err))
        );
      }

      if (hasPermission('notifications.view')) {
        promises.push(
          apiClient.get('/notifications?status=unread')
            .then(data => {
              const filtered = (data || []).filter(n => ['critical', 'warning'].includes(n.severity));
              setActiveAlerts(filtered);
            })
            .catch(err => console.error('Active notifications fetch error:', err))
        );
      }

      if (hasPermission('outlets.view')) {
        promises.push(
          apiClient.get('/outlets')
            .then(data => setOutlets(data || []))
            .catch(err => console.error('Outlets fetch error:', err))
        );
      }

      if (hasPermission('invoices.view')) {
        promises.push(
          apiClient.get('/invoices?limit=5')
            .then(data => setRecentInvoices(data || []))
            .catch(err => console.error('Recent invoices fetch error:', err))
        );
      }

      if (hasPermission('payments.view')) {
        promises.push(
          apiClient.get('/payments?limit=5')
            .then(data => setRecentPayments(data || []))
            .catch(err => console.error('Recent payments fetch error:', err))
        );
      }

      if (hasPermission('inventory.view')) {
        promises.push(
          apiClient.get('/inventory/transactions?limit=5')
            .then(data => setRecentTransactions(data || []))
            .catch(err => console.error('Recent transactions fetch error:', err))
        );
      }

      if (hasPermission('shipments.view')) {
        promises.push(
          apiClient.get('/shipments')
            .then(data => setShipments(data || []))
            .catch(err => console.error('Shipments fetch error:', err))
        );
      }

      await Promise.all(promises);
      setLoading(false);
    };

    loadDashboardData();
  }, [hasPermission]);

  const handleResolveAlert = async (id) => {
    try {
      await apiClient.patch(`/notifications/${id}/resolve`);
      const data = await apiClient.get('/notifications?status=unread');
      const filtered = (data || []).filter(n => ['critical', 'warning'].includes(n.severity));
      setActiveAlerts(filtered);
    } catch (err) {
      console.error('Error resolving notification on dashboard:', err);
    }
  };

  if (loading) {
    return <LoadingState message={t('common.loading')} />;
  }

  // Calculated Metrics & Counts
  const totalSales = financeSummary ? financeSummary.totalInvoices : (financials ? financials.totalSales : 0);
  const totalPaid = financeSummary ? financeSummary.totalCollected : (financials ? financials.totalPaid : 0);
  const totalRemaining = financeSummary ? financeSummary.totalReceivables : (financials ? financials.totalRemaining : 0);
  const totalOverdue = financeSummary ? financeSummary.totalOverdue : 0;
  
  const isDatabaseFresh = stock.length === 0 && (!financeSummary || financeSummary.totalInvoices === 0) && (!financials || financials.totalSales === 0);
  
  // Date calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const invoicesTodayCount = recentInvoices.filter(inv => {
    const invDateStr = inv.invoice_date || inv.created_at || '';
    return invDateStr.startsWith(todayStr);
  }).length;

  const salesTodayVal = recentInvoices
    .filter(inv => {
      const invDateStr = inv.invoice_date || inv.created_at || '';
      return invDateStr.startsWith(todayStr);
    })
    .reduce((sum, inv) => sum + (inv.total_price || 0), 0);

  const activeBooksCount = stock.length;
  const activeOutletsCount = outlets.filter(o => o.status === 'active').length;
  const collectionRate = totalSales > 0 ? (totalPaid / totalSales) * 100 : 0;
  
  // Exceeded limits outlets count
  const exceededLimitsCount = outlets.filter(o => o.credit_limit > 0 && o.balance > o.credit_limit).length;

  // Stock Snapshot calculations
  const lowStockItemsCount = stock.filter(item => item.currentStock <= 10 && item.stockPolicy !== 'ignore').length;
  const negativeStockItemsCount = stock.filter(item => item.currentStock < 0).length;
  const receiptsTodayCount = recentTransactions.filter(tx => {
    const txDateStr = tx.created_at || '';
    return tx.transaction_type === 'receipt' && txDateStr.startsWith(todayStr);
  }).length;

  // 8 Core Command Center metrics
  const pendingMetric = financeSummary ? (financeSummary.pending || 0) : totalRemaining;
  const collectedMetric = financeSummary ? (financeSummary.collected || 0) : totalPaid;
  const suppliedMetric = financeSummary ? (financeSummary.supplied || 0) : 0;
  const unsuppliedMetric = financeSummary ? (financeSummary.unsupplied || 0) : 0;
  const returnsMetric = financeSummary ? (financeSummary.returns || 0) : 0;
  const invoicesCountVal = financeSummary ? (financeSummary.totalInvoicesCount || 0) : recentInvoices.length;
  const invoicesAmountVal = totalSales;
  const partialShipmentsVal = financeSummary ? (financeSummary.partialShipmentsCount || 0) : shipments.filter(s => s.status === 'pending').length;
  const stockAlertsVal = financeSummary ? (financeSummary.stockAlertsCount || 0) : (lowStockItemsCount + negativeStockItemsCount);

  return (
    <Box className="dashboard-container">
      {/* 1. Welcome Hero Header */}
      <Paper className="dashboard-hero">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h5" className="dashboard-hero__title">
              {t('dashboard.welcome', { name: user?.fullName || user?.username || 'مدير النظام' })}
            </Typography>
            <Typography variant="body2" className="dashboard-hero__subtitle">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              {cairoTime || 'جاري تحميل التوقيت...'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
            {user?.roles?.map(r => (
              <Chip key={r} label={r === 'super_admin' ? 'مدير عام صلاحيات كاملة' : r} color="secondary" className="dashboard-hero__role-chip" />
            ))}
          </Grid>
        </Grid>
      </Paper>

      {/* 2. Onboarding Wizard for Fresh Database Reset */}
      {isDatabaseFresh && (
        <Paper className="onboarding-wizard">
          <Typography variant="h6" className="onboarding-wizard__title">
            <CheckCircleIcon color="success" /> تهيئة النظام جاهزة للبدء
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            قاعدة البيانات تم تصفيرها بنجاح للإنتاج. لبدء دورة العمل التشغيلية، يرجى اتباع الخطوات المتسلسلة التالية:
          </Typography>
          <Box className="onboarding-wizard__steps-grid">
            <Box className="onboarding-card" onClick={() => navigate('/outlet-types')}>
              <Typography variant="subtitle2" className="onboarding-card__step-title">
                ١. تصنيفات ومنافذ البيع
              </Typography>
              <Typography variant="caption" className="onboarding-card__step-description">
                قم بتعريف الفئات التسعيرية (مثال: جملة، تجزئة، معارض)، ثم أضف منافذ التوزيع وعناوينها.
              </Typography>
            </Box>
            <Box className="onboarding-card" onClick={() => navigate('/products')}>
              <Typography variant="subtitle2" className="onboarding-card__step-title">
                ٢. فهرس الكتب والأسعار
              </Typography>
              <Typography variant="caption" className="onboarding-card__step-description">
                أضف قائمة المؤلفين، ثم أضف الكتب وحدد أسعار بيعها المعتمدة لكل فئة منفذ بيع.
              </Typography>
            </Box>
            <Box className="onboarding-card" onClick={() => navigate('/inventory')}>
              <Typography variant="subtitle2" className="onboarding-card__step-title">
                ٣. توريد وجرد المخزون
              </Typography>
              <Typography variant="caption" className="onboarding-card__step-description">
                سجل فواتير التوريد الواردة من المطابع لزيادة كميات الكتب في المستودع قبل إصدار الفواتير.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* 3. Urgent Alerts and Notifications */}
      {activeAlerts.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertIcon /> تحذيرات تشغيلية حرجة
          </Typography>
          {activeAlerts.map((alert) => (
            <Alert
              key={alert.id}
              severity={alert.severity === 'critical' ? 'error' : 'warning'}
              sx={{ mb: 2, borderRadius: '8px', '& .MuiAlert-message': { width: '100%' } }}
              action={
                <Stack direction="row" spacing={1}>
                  {alert.action_url && (
                    <Button color="inherit" size="small" onClick={() => navigate(alert.action_url)}>
                      معاينة
                    </Button>
                  )}
                  <Button color="inherit" size="small" onClick={() => handleResolveAlert(alert.id)}>
                    حل المشكلة
                  </Button>
                </Stack>
              }
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{alert.title}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>{alert.message}</Typography>
            </Alert>
          ))}
        </Box>
      )}

      {/* 4. KPI Cards Strip (8-Card Grid) */}
      <Box className="kpi-grid">
        {[
          { title: 'الذمم المعلقة', value: formatCurrencyEGP(pendingMetric), sub: 'الذمم المدينة المتبقية المستحقة من العملاء', icon: <WalletIcon />, theme: 'warning' },
          { title: 'التحصيل الفعلي كاش', value: formatCurrencyEGP(collectedMetric), sub: 'إجمالي النقدية المحصلة فعلياً في الخزينة', icon: <PaymentIcon />, theme: 'success' },
          { title: 'التوريدات المسلمة', value: formatCurrencyEGP(suppliedMetric), sub: 'المبالغ الموردة والمسلمة للمقر الرئيسي', icon: <CheckCircleIcon />, theme: 'primary' },
          { title: 'التوريدات المعلقة', value: formatCurrencyEGP(unsuppliedMetric), sub: 'مبالغ محصلة جاري تسليمها للمقر الرئيسي', icon: <AccessTimeIcon />, theme: 'info' },
          { title: 'المرتجعات المعتمدة', value: formatCurrencyEGP(returnsMetric), sub: 'إجمالي قيمة المرتجعات المعتمدة بالكامل', icon: <HistoryIcon />, theme: 'danger' },
          { title: 'المبيعات والفواتير', value: formatCurrencyEGP(invoicesAmountVal), sub: `عدد الفواتير المصدرة: ${invoicesCountVal}`, icon: <ReceiptIcon />, theme: 'primary' },
          { title: 'شحنات جزئية معلقة', value: `${partialShipmentsVal} شحنة`, sub: 'شحنات جزئية معلقة للمنافذ والفروع', icon: <ShippingIcon />, theme: 'warning' },
          { title: 'تنبيهات المخزون', value: `${stockAlertsVal} كتاب`, sub: 'كتب تخطت حد الأمان أو ذات رصيد سالب', icon: <AlertIcon />, theme: 'danger' }
        ].map((card, i) => (
          <Card className={`kpi-card kpi-card--${card.theme}`} key={i}>
            <CardContent className="kpi-card__body">
              <Box className={`kpi-card__icon-wrapper kpi-card__icon-wrapper--${card.theme}`}>
                {card.icon}
              </Box>
              <Box>
                <Typography className="kpi-card__title">
                  {card.title}
                </Typography>
                <Typography className="kpi-card__value">
                  {card.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                  {card.sub}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 5. Finance and Operations Status Overview */}
      <Box className="snapshots-grid">
        {/* Finance Overview Panel */}
        <Paper className="snapshot-panel">
          <Typography variant="subtitle1" className="snapshot-panel__header">
            <TrendingUpIcon color="primary" /> ملخص المركز المالي والحسابات
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box className="snapshot-panel__progress-box">
            <Box className="snapshot-panel__progress-label">
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>نسبة تحصيل الديون والمبيعات</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {collectionRate.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={collectionRate} className="snapshot-panel__progress-bar" />
          </Box>

          <Box className="snapshot-panel__grid">
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">إجمالي المبيعات الآجلة</Typography>
              <Typography className="snapshot-panel__stat-value">
                {formatCurrencyEGP(totalSales)}
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">إجمالي الديون المتأخرة</Typography>
              <Typography className="snapshot-panel__stat-value snapshot-panel__stat-value--danger">
                {formatCurrencyEGP(totalOverdue)}
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">تجاوزات الحد الائتماني</Typography>
              <Typography className={`snapshot-panel__stat-value ${exceededLimitsCount > 0 ? 'snapshot-panel__stat-value--danger' : 'snapshot-panel__stat-value--success'}`}>
                {exceededLimitsCount} منافذ
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">عدد منافذ التوزيع</Typography>
              <Typography className="snapshot-panel__stat-value snapshot-panel__stat-value--warning">
                {activeOutletsCount} نشطة
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Inventory Operations Panel */}
        <Paper className="snapshot-panel">
          <Typography variant="subtitle1" className="snapshot-panel__header">
            <StoreIcon color="primary" /> ملخص حركة الجرد والكميات اللوجستية
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box className="snapshot-panel__grid" sx={{ height: '100%', alignContent: 'center' }}>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">تحت حد التنبيه ({"<= 10"})</Typography>
              <Typography className={`snapshot-panel__stat-value ${lowStockItemsCount > 0 ? 'snapshot-panel__stat-value--danger' : 'snapshot-panel__stat-value--success'}`}>
                {lowStockItemsCount} عنوان كتاب
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">عناوين ذات رصيد سالب</Typography>
              <Typography className={`snapshot-panel__stat-value ${negativeStockItemsCount > 0 ? 'snapshot-panel__stat-value--danger' : 'snapshot-panel__stat-value--success'}`}>
                {negativeStockItemsCount} عنوان كتاب
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">عمليات التوريد (اليوم)</Typography>
              <Typography className="snapshot-panel__stat-value snapshot-panel__stat-value--success">
                {receiptsTodayCount} توريدات واردة
              </Typography>
            </Box>
            <Box className="snapshot-panel__stat-box">
              <Typography className="snapshot-panel__stat-title">شحنات معلقة قيد التجهيز</Typography>
              <Typography className="snapshot-panel__stat-value snapshot-panel__stat-value--warning">
                {shipments.filter(s => s.status === 'pending').length} شحنة
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* 6. Quick Operations Grid */}
      <Typography variant="subtitle1" className="quick-actions-section-title">
        العمليات والمهام السريعة
      </Typography>
      <Box className="quick-actions-grid">
        {[
          { label: 'فاتورة مبيعات جديدة', icon: <AddInvoiceIcon className="quick-action-btn__icon" />, path: '/invoices', perm: 'invoices.create' },
          { label: 'توريد مخزون وارد', icon: <AddStockIcon className="quick-action-btn__icon" />, path: '/inventory', perm: 'inventory.create' },
          { label: 'إضافة فرع / منفذ', icon: <StoreIcon className="quick-action-btn__icon" />, path: '/outlets', perm: 'outlets.create' },
          { label: 'إضافة منتج جديد', icon: <AddProductIcon className="quick-action-btn__icon" />, path: '/products', perm: 'products.create' },
          { label: 'فئات منافذ البيع', icon: <AddCircleIcon className="quick-action-btn__icon" />, path: '/outlet-types', perm: 'outlet-types.create' },
        ].map(act => {
          if (act.perm && !hasPermission(act.perm)) return null;
          return (
            <Button
              key={act.label}
              variant="outlined"
              onClick={() => navigate(act.path)}
              className="quick-action-btn"
            >
              {act.icon}
              <Typography className="quick-action-btn__label">
                {act.label}
              </Typography>
            </Button>
          );
        })}
      </Box>

      {/* 7. Live Activity Lists */}
      <Box className="activity-grid">
        {/* Latest Invoices */}
        <Paper className="activity-panel">
          <Typography variant="subtitle2" className="activity-panel__header">
            <ReceiptIcon color="primary" /> آخر فواتير المبيعات
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {recentInvoices.length > 0 ? (
            <List disablePadding>
              {recentInvoices.map((inv, idx) => (
                <React.Fragment key={inv.id}>
                  <ListItem className="activity-item">
                    <Box>
                      <Typography className="activity-item__primary-text">{inv.invoice_number}</Typography>
                      <Typography className="activity-item__secondary-text">{inv.outlet_name}</Typography>
                    </Box>
                    <Box className="activity-item__meta">
                      <Typography className="activity-item__amount">
                        {formatCurrencyEGP(inv.total_price)}
                      </Typography>
                      <Chip
                        label={inv.payment_status === 'paid' ? 'مدفوعة' : inv.payment_status === 'partially_paid' ? 'جزئي' : inv.payment_status === 'cancelled' ? 'ملغاة' : 'غير مدفوع'}
                        size="small"
                        color={inv.payment_status === 'paid' ? 'success' : inv.payment_status === 'partially_paid' ? 'warning' : inv.payment_status === 'cancelled' ? 'default' : 'error'}
                        className="activity-item__chip"
                      />
                    </Box>
                  </ListItem>
                  {idx < recentInvoices.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>
              لا توجد فواتير مسجلة بعد.
            </Typography>
          )}
        </Paper>

        {/* Latest Payments */}
        <Paper className="activity-panel">
          <Typography variant="subtitle2" className="activity-panel__header">
            <PaymentIcon color="primary" /> آخر المدفوعات المحصلة
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {recentPayments.length > 0 ? (
            <List disablePadding>
              {recentPayments.map((pay, idx) => (
                <React.Fragment key={pay.id}>
                  <ListItem className="activity-item">
                    <Box>
                      <Typography className="activity-item__primary-text">{formatCurrencyEGP(pay.amount)}</Typography>
                      <Typography className="activity-item__secondary-text">فاتورة: {pay.invoice_number}</Typography>
                    </Box>
                    <Box className="activity-item__meta">
                      <Typography variant="caption" className="activity-item__secondary-text" sx={{ display: 'block' }}>
                        {pay.payment_method === 'cash' ? 'نقدي' : pay.payment_method === 'bank_transfer' ? 'تحويل' : pay.payment_method === 'check' ? 'شيك' : 'أخرى'}
                      </Typography>
                      <Typography variant="caption" className="activity-item__secondary-text">
                        {new Date(pay.payment_date).toLocaleDateString('ar-EG')}
                      </Typography>
                    </Box>
                  </ListItem>
                  {idx < recentPayments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>
              لا توجد دفعات محصلة بعد.
            </Typography>
          )}
        </Paper>

        {/* Recent Stock Transactions */}
        <Paper className="activity-panel">
          <Typography variant="subtitle2" className="activity-panel__header">
            <HistoryIcon color="primary" /> حركات الجرد والمخزون
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {recentTransactions.length > 0 ? (
            <List disablePadding>
              {recentTransactions.map((tx, idx) => (
                <React.Fragment key={tx.id}>
                  <ListItem className="activity-item">
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                      <Typography noWrap className="activity-item__primary-text">{tx.product_title}</Typography>
                      <Typography className="activity-item__secondary-text">SKU: {tx.product_code}</Typography>
                    </Box>
                    <Box className="activity-item__meta">
                      <Chip
                        label={tx.quantity > 0 ? `+${tx.quantity}` : tx.quantity}
                        size="small"
                        color={tx.quantity > 0 ? 'success' : 'error'}
                        variant="outlined"
                        className="activity-item__chip"
                      />
                      <Typography variant="caption" className="activity-item__secondary-text" sx={{ display: 'block', mt: 0.5 }}>
                        {tx.transaction_type === 'receipt' ? 'شراء/توريد' : tx.transaction_type === 'sale' ? 'بيع' : tx.transaction_type === 'return' ? 'مرتجع' : 'تعديل'}
                      </Typography>
                    </Box>
                  </ListItem>
                  {idx < recentTransactions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>
              لا توجد حركات مخزنية جارية.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
