import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrencyEGP, formatEgyptDateTime, formatEgyptDate } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { EGYPT_GOVERNORATES } from '../constants/governorates';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  FileDownload as DownloadIcon,
  Clear as ClearIcon
} from '@mui/icons-material';



function TabPanel({ children, value, index, ...props }) {
  return (
    <Box role="tabpanel" hidden={value !== index} {...props}>
      {value === index && <Box sx={{ pt: 3, pb: 'var(--space-6)' }}>{children}</Box>}
    </Box>
  );
}

export const Reports = () => {
  const { hasPermission } = useAuth();
  const [tab, setTab] = useState(0);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const showToast = (msg, severity = 'success') => { setToastMsg(msg); setToastSeverity(severity); };

  // Dropdown list states
  const [outlets, setOutlets] = useState([]);
  const [outletTypes, setOutletTypes] = useState([]);

  // Filter States
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [selectedOutletType, setSelectedOutletType] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  
  // Stock/Author/Receipt extra search filters
  const [stockSearch, setStockSearch] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [authorStatus, setAuthorStatus] = useState('');
  const [receiptSearch, setReceiptSearch] = useState('');

  // Report Data States
  const [summaryData, setSummaryData] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [balancesOutlet, setBalancesOutlet] = useState([]);
  const [balancesOutletLoading, setBalancesOutletLoading] = useState(false);

  const [balancesGov, setBalancesGov] = useState([]);
  const [balancesGovLoading, setBalancesGovLoading] = useState(false);

  const [balancesType, setBalancesType] = useState([]);
  const [balancesTypeLoading, setBalancesTypeLoading] = useState(false);

  const [stockData, setStockData] = useState([]);
  const [stockLoading, setStockLoading] = useState(false);

  const [authorData, setAuthorData] = useState([]);
  const [authorLoading, setAuthorLoading] = useState(false);

  const [receiptData, setReceiptData] = useState([]);
  const [receiptLoading, setReceiptLoading] = useState(false);

  // Fetch Dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const types = await apiClient.get('/outlet-types');
        setOutletTypes(types);
        const list = await apiClient.get('/outlets');
        setOutlets(list);
      } catch (err) {
        console.error('Failed to load filter dropdowns', err);
      }
    };
    fetchDropdowns();
  }, []);

  // Fetch Summary
  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      let q = `/reports/financials/summary?startDate=${startDate}&endDate=${endDate}`;
      if (selectedOutlet) q += `&outletId=${selectedOutlet}`;
      if (selectedOutletType) q += `&outletTypeId=${selectedOutletType}`;
      if (selectedGovernorate) q += `&governorate=${encodeURIComponent(selectedGovernorate)}`;
      
      const data = await apiClient.get(q);
      setSummaryData(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل الخلاصة المالية', 'error');
    } finally {
      setSummaryLoading(false);
    }
  }, [startDate, endDate, selectedOutlet, selectedOutletType, selectedGovernorate]);

  // Fetch Balances by Outlet
  const fetchBalancesOutlet = useCallback(async () => {
    setBalancesOutletLoading(true);
    try {
      let q = `/reports/financials/by-outlet?startDate=${startDate}&endDate=${endDate}`;
      if (selectedOutletType) q += `&outletTypeId=${selectedOutletType}`;
      if (selectedGovernorate) q += `&governorate=${encodeURIComponent(selectedGovernorate)}`;
      
      const data = await apiClient.get(q);
      setBalancesOutlet(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل أرصدة المنافذ', 'error');
    } finally {
      setBalancesOutletLoading(false);
    }
  }, [startDate, endDate, selectedOutletType, selectedGovernorate]);

  // Fetch Balances by Governorate
  const fetchBalancesGov = useCallback(async () => {
    setBalancesGovLoading(true);
    try {
      const data = await apiClient.get(`/reports/financials/by-governorate?startDate=${startDate}&endDate=${endDate}`);
      setBalancesGov(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل مبيعات المحافظات', 'error');
    } finally {
      setBalancesGovLoading(false);
    }
  }, [startDate, endDate]);

  // Fetch Balances by Outlet Type
  const fetchBalancesType = useCallback(async () => {
    setBalancesTypeLoading(true);
    try {
      const data = await apiClient.get(`/reports/financials/by-outlet-type?startDate=${startDate}&endDate=${endDate}`);
      setBalancesType(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل مبيعات فئات المنافذ', 'error');
    } finally {
      setBalancesTypeLoading(false);
    }
  }, [startDate, endDate]);

  // Fetch Stock Report
  const fetchStockReport = useCallback(async () => {
    setStockLoading(true);
    try {
      let q = `/reports/stock?search=${encodeURIComponent(stockSearch)}`;
      if (stockStatus) q += `&status=${stockStatus}`;
      const data = await apiClient.get(q);
      setStockData(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل تقرير المخزون', 'error');
    } finally {
      setStockLoading(false);
    }
  }, [stockSearch, stockStatus]);

  // Fetch Author Report
  const fetchAuthorReport = useCallback(async () => {
    setAuthorLoading(true);
    try {
      let q = `/reports/authors?search=${encodeURIComponent(authorSearch)}`;
      if (authorStatus) q += `&status=${authorStatus}`;
      const data = await apiClient.get(q);
      setAuthorData(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل تقرير المؤلفين', 'error');
    } finally {
      setAuthorLoading(false);
    }
  }, [authorSearch, authorStatus]);

  // Fetch Receipt Report
  const fetchReceiptReport = useCallback(async () => {
    setReceiptLoading(true);
    try {
      const q = `/reports/receipts?search=${encodeURIComponent(receiptSearch)}&startDate=${startDate}&endDate=${endDate}`;
      const data = await apiClient.get(q);
      setReceiptData(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل تقرير التوريدات', 'error');
    } finally {
      setReceiptLoading(false);
    }
  }, [receiptSearch, startDate, endDate]);

  // Trigger loading based on active tab
  useEffect(() => {
    if (tab === 0) fetchSummary();
    if (tab === 1) fetchBalancesOutlet();
    if (tab === 2) fetchBalancesGov();
    if (tab === 3) fetchBalancesType();
    if (tab === 4) fetchStockReport();
    if (tab === 5) fetchAuthorReport();
    if (tab === 6) fetchReceiptReport();
  }, [tab, fetchSummary, fetchBalancesOutlet, fetchBalancesGov, fetchBalancesType, fetchStockReport, fetchAuthorReport, fetchReceiptReport]);

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedOutlet('');
    setSelectedOutletType('');
    setSelectedGovernorate('');
    setStockSearch('');
    setStockStatus('');
    setAuthorSearch('');
    setAuthorStatus('');
    setReceiptSearch('');
  };

  const handleExportExcel = (type) => {
    if (!hasPermission('exports.run')) {
      showToast('ليس لديك صلاحية تصدير البيانات', 'error');
      return;
    }
    // We can directly navigate to the API Excel export route
    const exportUrl = `/api/exports/reports?type=${type}`;
    window.open(exportUrl, '_blank');
    showToast('بدأ تحميل تقرير Excel...', 'info');
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            التقارير والإحصائيات
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            متابعة الحركات المالية، المستودعية ومبيعات الفروع والمؤلفين.
          </Typography>
        </Box>
      </Box>

      {/* Tabs list */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="الخلاصة المالية" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="أرصدة المنافذ" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="مبيعات المحافظات" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="مبيعات فئات المنافذ" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="حالة المخزون" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="مبيعات المؤلفين" sx={{ whiteSpace: 'nowrap' }} />
          <Tab label="سجل التوريدات" sx={{ whiteSpace: 'nowrap' }} />
        </Tabs>
      </Paper>

      {/* Filter Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Common Date Range Filters */}
          {[0, 1, 2, 3, 6].includes(tab) && (
            <>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="تاريخ البدء"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ notched: true }}
                  size="small"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="تاريخ النهاية"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ notched: true }}
                  size="small"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
            </>
          )}

          {/* Tab specific filters */}
          {tab === 0 && (
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>المنفذ</InputLabel>
                <Select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  label="المنفذ"
                >
                  <MenuItem value="">الكل</MenuItem>
                  {outlets.map((o) => (
                    <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {[0, 1].includes(tab) && (
            <>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>فئة المنفذ</InputLabel>
                  <Select
                    value={selectedOutletType}
                    onChange={(e) => setSelectedOutletType(e.target.value)}
                    label="فئة المنفذ"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {outletTypes.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>المحافظة</InputLabel>
                  <Select
                    value={selectedGovernorate}
                    onChange={(e) => setSelectedGovernorate(e.target.value)}
                    label="المحافظة"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {EGYPT_GOVERNORATES.map((g) => (
                      <MenuItem key={g} value={g}>{g}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Stock Report Filters */}
          {tab === 4 && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="بحث باسم الكتاب أو الرمز"
                  value={stockSearch}
                  onChange={(e) => setStockSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>الحالة</InputLabel>
                  <Select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} label="الحالة">
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="active">نشط</MenuItem>
                    <MenuItem value="disabled">معطل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Author Report Filters */}
          {tab === 5 && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="بحث باسم المؤلف"
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>الحالة</InputLabel>
                  <Select value={authorStatus} onChange={(e) => setAuthorStatus(e.target.value)} label="الحالة">
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="active">نشط</MenuItem>
                    <MenuItem value="disabled">معطل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Receipts Report Filters */}
          {tab === 6 && (
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="بحث باسم المورد"
                value={receiptSearch}
                onChange={(e) => setReceiptSearch(e.target.value)}
              />
            </Grid>
          )}

          {/* Actions */}
          <Grid item xs={12} sm={2} sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              fullWidth
            >
              مسح
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ───── TAB 0: FINANCIAL SUMMARY ───── */}
      <TabPanel value={tab} index={0}>
        {summaryLoading ? <LoadingState /> : !summaryData ? <EmptyState title="لا توجد بيانات" /> : (
          <Stack spacing={3}>
            {/* Main Financial Metrics */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#ebf5fb', borderRight: 6, borderColor: 'primary.main', display: 'flex', alignItems: 'center', p: 2 }}>
                  <TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <CardContent sx={{ py: 0, '&:last-child': { pb: 0 } }}>
                    <Typography variant="subtitle2" color="text.secondary">إجمالي المبيعات</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }}>{formatCurrencyEGP(summaryData.totalSales)}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#e8f8f5', borderRight: 6, borderColor: 'success.main', display: 'flex', alignItems: 'center', p: 2 }}>
                  <PaymentIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <CardContent sx={{ py: 0, '&:last-child': { pb: 0 } }}>
                    <Typography variant="subtitle2" color="text.secondary">المبالغ المسددة</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }} color="success.main">{formatCurrencyEGP(summaryData.totalPaid)}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#fdf2e9', borderRight: 6, borderColor: 'warning.main', display: 'flex', alignItems: 'center', p: 2 }}>
                  <WalletIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <CardContent sx={{ py: 0, '&:last-child': { pb: 0 } }}>
                    <Typography variant="subtitle2" color="text.secondary">المبالغ المتبقية (الديون)</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }} color="warning.main">{formatCurrencyEGP(summaryData.totalRemaining)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Detailed Supply and Shipment Metrics */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9f9' }}>
                  <Typography variant="body2" color="text.secondary">مدفوعات موردة (Supplied)</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: 'success.main' }}>{formatCurrencyEGP(summaryData.totalSupplied)}</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9f9' }}>
                  <Typography variant="body2" color="text.secondary">مدفوعات غير موردة (Unsupplied)</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: 'error.main' }}>{formatCurrencyEGP(summaryData.totalUnsupplied)}</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9f9' }}>
                  <Typography variant="body2" color="text.secondary">شحنات مكتملة</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>{summaryData.countShipped} فاتورة</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9f9' }}>
                  <Typography variant="body2" color="text.secondary">شحنات جزئية</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: 'warning.main' }}>{summaryData.countPartiallyShipped} فاتورة</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9f9' }}>
                  <Typography variant="body2" color="text.secondary">غير مشحون</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: 'error.main' }}>{summaryData.countNotShipped} فاتورة</Typography>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        )}
      </TabPanel>

      {/* ───── TAB 1: OUTLET BALANCES ───── */}
      <TabPanel value={tab} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>أرصدة وذمم الفروع ومنافذ البيع</Typography>
          <Button variant="contained" color="secondary" size="small" startIcon={<DownloadIcon />} onClick={() => handleExportExcel('balances')}>
            تصدير كملف Excel
          </Button>
        </Box>
        {balancesOutletLoading ? <LoadingState /> : balancesOutlet.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>سقف الائتمان</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balancesOutlet.map((row) => (
                  <TableRow key={row.outletId}>
                    <TableCell align="right">{row.outletName}</TableCell>
                    <TableCell align="right">{row.outletTypeName}</TableCell>
                    <TableCell align="right">{row.governorate}</TableCell>
                    <TableCell align="right">{row.creditLimit ? formatCurrencyEGP(row.creditLimit) : 'مفتوح'}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalSales)}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalPaid)}</TableCell>
                    <TableCell align="right" sx={{ color: row.remainingAmount > 0 ? 'warning.main' : 'inherit', fontWeight: row.remainingAmount > 0 ? 'bold' : 'normal' }}>
                      {formatCurrencyEGP(row.remainingAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* ───── TAB 2: BALANCES BY GOVERNORATE ───── */}
      <TabPanel value={tab} index={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات المحافظات</Typography>
        {balancesGovLoading ? <LoadingState /> : balancesGov.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (الذمم المفتوحة)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balancesGov.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="right">{row.governorate || 'غير مصنف'}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalSales)}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalPaid)}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.remainingAmount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* ───── TAB 3: BALANCES BY OUTLET TYPE ───── */}
      <TabPanel value={tab} index={3}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات فئات منافذ البيع</Typography>
        {balancesTypeLoading ? <LoadingState /> : balancesType.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balancesType.map((row) => (
                  <TableRow key={row.outletTypeId}>
                    <TableCell align="right">{row.outletTypeName}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalSales)}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalPaid)}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.remainingAmount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* ───── TAB 4: STOCK REPORT ───── */}
      <TabPanel value={tab} index={4}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير المخزون التفصيلي للكتب والمنتجات</Typography>
          <Button variant="contained" color="secondary" size="small" startIcon={<DownloadIcon />} onClick={() => handleExportExcel('stock')}>
            تصدير كملف Excel
          </Button>
        </Box>
        {stockLoading ? <LoadingState /> : stockData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>رمز الكتاب (SKU)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>العنوان</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>الوارد الكلي</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المبيعات الكلية</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المرتجعات الكلية</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>التعديلات المستودعية</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون الحالي</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockData.map((row) => (
                  <TableRow key={row.productId}>
                    <TableCell align="right">{row.productCode}</TableCell>
                    <TableCell align="right">{row.productTitle}</TableCell>
                    <TableCell align="right">{row.category || 'غير محدد'}</TableCell>
                    <TableCell align="right">{row.totalReceived.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.totalSold.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.totalReturned.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.totalAdjusted.toLocaleString()}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: row.currentStock <= 5 ? 'error.main' : 'success.main' }}>
                      {row.currentStock.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* ───── TAB 5: AUTHORS REPORT ───── */}
      <TabPanel value={tab} index={5}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير مبيعات وأرصدة المؤلفين</Typography>
          <Button variant="contained" color="secondary" size="small" startIcon={<DownloadIcon />} onClick={() => handleExportExcel('authors')}>
            تصدير كملف Excel
          </Button>
        </Box>
        {authorLoading ? <LoadingState /> : authorData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المؤلف</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد العناوين</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>مبيعات كلي</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي النسخ المباعة</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون المتوفر للعناوين</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authorData.map((row) => (
                  <TableRow key={row.authorId}>
                    <TableCell align="right">{row.authorName}</TableCell>
                    <TableCell align="right">
                      {row.status === 'active' ? (
                        <Alert severity="success" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>نشط</Alert>
                      ) : (
                        <Alert severity="error" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>معطل</Alert>
                      )}
                    </TableCell>
                    <TableCell align="right">{row.totalBooks}</TableCell>
                    <TableCell align="right">{formatCurrencyEGP(row.totalSales)}</TableCell>
                    <TableCell align="right">{row.totalCopiesSold.toLocaleString()} نسخة</TableCell>
                    <TableCell align="right">{row.currentStock.toLocaleString()} نسخة</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* ───── TAB 6: RECEIPTS REPORT ───── */}
      <TabPanel value={tab} index={6}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>سجل توريدات الموردين وكمياتها</Typography>
          <Button variant="contained" color="secondary" size="small" startIcon={<DownloadIcon />} onClick={() => handleExportExcel('receipts')}>
            تصدير كملف Excel
          </Button>
        </Box>
        {receiptLoading ? <LoadingState /> : receiptData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (
          <TableContainer className="scrollable-table-container" component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المورد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد حركات التوريد</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي الكمية الموردة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receiptData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="right">{row.supplierName}</TableCell>
                    <TableCell align="right">{row.totalReceipts}</TableCell>
                    <TableCell align="right">{row.totalQuantity.toLocaleString()} نسخة</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      <Snackbar open={!!toastMsg} autoHideDuration={4000} onClose={() => setToastMsg('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Reports;
