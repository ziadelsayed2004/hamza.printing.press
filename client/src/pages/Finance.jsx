import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrencyEGP, formatEgyptDateTime } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TablePagination,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  Warning as WarningIcon,
  AddCircle as AddIcon,
  History as HistoryIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Store as StoreIcon,
  Map as MapIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...props }) {
  return (
    <Box role="tabpanel" hidden={value !== index} {...props}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </Box>
  );
}

const adjustmentTypeTranslations = {
  'deposit': 'إيداع نقدي الخزينة',
  'withdrawal': 'سحب نقدي من الخزينة',
  'credit_adjustment': 'تسوية خصم ذمم (إبراء)',
  'debit_adjustment': 'تسوية إضافة ذمم (قيد مالي)'
};

const entryTypeTranslations = {
  'invoice_created': 'إنشاء فاتورة مبيعات',
  'invoice_cancelled': 'إلغاء فاتورة مبيعات',
  'invoice_updated': 'تعديل فاتورة مبيعات',
  'payment_recorded': 'تحصيل نقدي (سداد فاتورة)',
  'payment_reversed': 'إلغاء تحصيل نقدي (عكس سداد)',
  'manual_adjustment': 'تسوية يدوية بالخزينة'
};

export const Finance = () => {
  const { hasPermission } = useAuth();
  
  // Page UI State
  const [tab, setTab] = useState(0);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  // Dropdowns Lists for filter/form
  const [outlets, setOutlets] = useState([]);

  // Ledger History list state
  const [ledger, setLedger] = useState([]);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Ledger Filters
  const [filterOutlet, setFilterOutlet] = useState('');
  const [filterEntryType, setFilterEntryType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Grouped Breakdowns state
  const [outletBalances, setOutletBalances] = useState([]);
  const [outletLoading, setOutletLoading] = useState(false);

  const [governorateBalances, setGovernorateBalances] = useState([]);
  const [govLoading, setGovLoading] = useState(false);

  const [outletTypeBalances, setOutletTypeBalances] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);

  // Manual Adjustment Form state
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjOutletId, setAdjOutletId] = useState('');
  const [adjAmount, setAdjAmount] = useState('');
  const [adjType, setAdjType] = useState('deposit');
  const [adjNotes, setAdjNotes] = useState('');
  const [submittingAdj, setSubmittingAdj] = useState(false);

  // Fetch Dropdown data
  useEffect(() => {
    apiClient.get('/outlets')
      .then(data => setOutlets(data))
      .catch(err => console.error('Failed to load outlets for dropdowns', err));
  }, []);

  // Fetch Treasury Summary
  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await apiClient.get('/finance/summary');
      setSummary(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل ملخص البيانات المالية والخزينة', 'error');
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  // Fetch Ledger History
  const fetchLedger = useCallback(async () => {
    setLedgerLoading(true);
    try {
      const offset = page * rowsPerPage;
      let q = `/finance/balances/history?limit=${rowsPerPage}&offset=${offset}`;
      if (filterOutlet) q += `&outletId=${filterOutlet}`;
      if (filterEntryType) q += `&entryType=${filterEntryType}`;
      if (filterStartDate) q += `&startDate=${filterStartDate}`;
      if (filterEndDate) q += `&endDate=${filterEndDate}`;

      const data = await apiClient.get(q);
      // Wait, endpoint `/finance/balances/history` returns array, let's determine count.
      // Since SQLite ledger table could be large, if the array is less than limit, count is current size + offset.
      // Let's set count safely.
      setLedger(data);
      setTotalCount(data.length >= rowsPerPage ? offset + rowsPerPage + 1 : offset + data.length);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل سجل حركات الخزينة والحسابات', 'error');
    } finally {
      setLedgerLoading(false);
    }
  }, [page, rowsPerPage, filterOutlet, filterEntryType, filterStartDate, filterEndDate]);

  // Fetch Outlet Balances
  const fetchOutletBalances = useCallback(async () => {
    setOutletLoading(true);
    try {
      const data = await apiClient.get('/finance/outlets');
      setOutletBalances(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل أرصدة منافذ البيع', 'error');
    } finally {
      setOutletLoading(false);
    }
  }, []);

  // Fetch Governorate Balances
  const fetchGovernorateBalances = useCallback(async () => {
    setGovLoading(true);
    try {
      const data = await apiClient.get('/finance/governorates');
      setGovernorateBalances(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل أرصدة المحافظات', 'error');
    } finally {
      setGovLoading(false);
    }
  }, []);

  // Fetch Outlet Type Balances
  const fetchOutletTypeBalances = useCallback(async () => {
    setTypeLoading(true);
    try {
      const data = await apiClient.get('/finance/outlet-types');
      setOutletTypeBalances(data);
    } catch (err) {
      showToast(err.message || 'خطأ في تحميل أرصدة فئات منافذ التوزيع', 'error');
    } finally {
      setTypeLoading(false);
    }
  }, []);

  // Trigger loading based on Active Tab
  useEffect(() => {
    fetchSummary();
    if (tab === 0) {
      fetchLedger();
    } else if (tab === 1) {
      fetchOutletBalances();
    } else if (tab === 2) {
      fetchGovernorateBalances();
    } else if (tab === 3) {
      fetchOutletTypeBalances();
    }
  }, [tab, fetchSummary, fetchLedger, fetchOutletBalances, fetchGovernorateBalances, fetchOutletTypeBalances]);

  // Reset page on filter changes
  useEffect(() => {
    setPage(0);
  }, [filterOutlet, filterEntryType, filterStartDate, filterEndDate]);

  // Reset Filters
  const handleClearFilters = () => {
    setFilterOutlet('');
    setFilterEntryType('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  // Submit Manual Adjustment
  const handleAdjSubmit = async (e) => {
    e.preventDefault();
    if (!adjOutletId || !adjAmount || !adjNotes.trim()) {
      showToast('يرجى ملء جميع الحقول المطلوبة للتسوية', 'error');
      return;
    }
    const amtNum = parseFloat(adjAmount);
    if (isNaN(amtNum) || amtNum <= 0) {
      showToast('يرجى إدخال مبلغ صحيح أكبر من الصفر', 'error');
      return;
    }

    setSubmittingAdj(true);
    try {
      await apiClient.post('/finance/manual-adjustments', {
        outletId: adjOutletId,
        amount: amtNum,
        adjustmentType: adjType,
        notes: adjNotes.trim()
      });
      showToast('تم تسجيل حركة التسوية اليدوية بالخزينة والحسابات بنجاح.', 'success');
      setAdjustOpen(false);
      // Reset form
      setAdjOutletId('');
      setAdjAmount('');
      setAdjType('deposit');
      setAdjNotes('');
      // Refresh active lists
      fetchSummary();
      if (tab === 0) fetchLedger();
      else if (tab === 1) fetchOutletBalances();
      else if (tab === 2) fetchGovernorateBalances();
      else if (tab === 3) fetchOutletTypeBalances();
    } catch (err) {
      showToast(err.message || 'خطأ أثناء تسجيل التسوية اليدوية بالخزينة', 'error');
    } finally {
      setSubmittingAdj(false);
    }
  };

  if (summaryLoading && !summary) {
    return <LoadingState message="جاري تحميل البيانات المالية وإحصائيات الخزينة..." />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          إدارة الخزينة والحسابات المالية
        </Typography>
        {hasPermission('finance.adjust') && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setAdjustOpen(true)}
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
          >
            إجراء تسوية يدوية بالخزينة
          </Button>
        )}
      </Box>

      {/* Summary Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid', borderColor: 'primary.main', height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
              <Box sx={{ p: 1.5, mr: 2, bg: 'primary.light', color: 'primary.main', borderRadius: 2, display: 'flex' }}>
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  إجمالي فواتير المبيعات
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                  {formatCurrencyEGP(summary?.totalInvoices || 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid', borderColor: 'success.main', height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
              <Box sx={{ p: 1.5, mr: 2, bg: 'success.light', color: 'success.main', borderRadius: 2, display: 'flex' }}>
                <PaymentIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  رصيد المقبوضات النقدي (المحصل)
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'success.main' }}>
                  {formatCurrencyEGP(summary?.totalCollected || 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid', borderColor: 'warning.main', height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
              <Box sx={{ p: 1.5, mr: 2, bg: 'warning.light', color: 'warning.main', borderRadius: 2, display: 'flex' }}>
                <WalletIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  الذمم المدينة المتبقية (المديونيات)
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'warning.main' }}>
                  {formatCurrencyEGP(summary?.totalReceivables || 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '5px solid', borderColor: 'error.main', height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
              <Box sx={{ p: 1.5, mr: 2, bg: 'error.light', color: 'error.main', borderRadius: 2, display: 'flex' }}>
                <WarningIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  الأقساط والمبالغ المتأخرة
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'error.main' }}>
                  {formatCurrencyEGP(summary?.totalOverdue || 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Tabs */}
      <Paper sx={{ width: '100%', borderRadius: 3, mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="سجل حركات الخزينة والحسابات" icon={<HistoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
          <Tab label="أرصدة منافذ التوزيع" icon={<StoreIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
          <Tab label="المبيعات والأرصدة بالمحافظات" icon={<MapIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
          <Tab label="أرصدة فئات منافذ البيع" icon={<CategoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />
        </Tabs>

        {/* TAB 0: LEDGER HISTORY */}
        <TabPanel value={tab} index={0}>
          {/* Filters Panel */}
          <Box sx={{ p: 2, mb: 2, bg: 'action.hover', borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>تصفية حسب المنفذ</InputLabel>
                  <Select
                    value={filterOutlet}
                    onChange={(e) => setFilterOutlet(e.target.value)}
                    label="تصفية حسب المنفذ"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {outlets.map(o => (
                      <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>نوع الحركة المالية</InputLabel>
                  <Select
                    value={filterEntryType}
                    onChange={(e) => setFilterEntryType(e.target.value)}
                    label="نوع الحركة المالية"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {Object.entries(entryTypeTranslations).map(([k, v]) => (
                      <MenuItem key={k} value={k}>{v}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="من تاريخ"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="إلى تاريخ"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={2} sx={{ display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  size="small"
                >
                  إعادة تعيين
                </Button>
              </Grid>
            </Grid>
          </Box>

          {ledgerLoading ? (
            <LoadingState message="جاري تحميل حركات الدفتر المالي..." />
          ) : ledger.length > 0 ? (
            <Box>
              <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ bgcolor: 'action.selected' }}>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>التاريخ والوقت</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>منفذ البيع</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>نوع الحركة</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير الخزينة (نقدي)</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير المديونيات (ذمم)</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>الملاحظات والبيان</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ledger.map((entry) => (
                      <TableRow key={entry.id} hover>
                        <TableCell align="right">{formatEgyptDateTime(entry.created_at)}</TableCell>
                        <TableCell align="right">{entry.outlet_name}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={entryTypeTranslations[entry.entry_type] || entry.entry_type}
                            size="small"
                            color={
                              entry.entry_type === 'invoice_cancelled' || entry.entry_type === 'payment_reversed'
                                ? 'error'
                                : entry.entry_type === 'payment_recorded'
                                ? 'success'
                                : 'default'
                            }
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: entry.cash_amount !== 0 ? 'bold' : 'normal',
                              color: entry.cash_amount > 0 ? 'success.main' : entry.cash_amount < 0 ? 'error.main' : 'text.primary'
                            }}
                          >
                            {entry.cash_amount > 0 ? '+' : ''}{formatCurrencyEGP(entry.cash_amount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: entry.receivable_amount !== 0 ? 'bold' : 'normal',
                              color: entry.receivable_amount > 0 ? 'warning.main' : entry.receivable_amount < 0 ? 'success.main' : 'text.primary'
                            }}
                          >
                            {entry.receivable_amount > 0 ? '+' : ''}{formatCurrencyEGP(entry.receivable_amount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{entry.user_full_name || 'غير معروف'}</TableCell>
                        <TableCell align="right">{entry.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                labelRowsPerPage="عدد الأسطر لكل صفحة:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
              />
            </Box>
          ) : (
            <EmptyState message="لم يتم العثور على أي حركات مالية مسجلة بالخزينة تطابق البحث." />
          )}
        </TabPanel>

        {/* TAB 1: GROUPED BY OUTLETS */}
        <TabPanel value={tab} index={1}>
          {outletLoading ? (
            <LoadingState message="جاري تحميل أرصدة الفروع والمنافذ..." />
          ) : outletBalances.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: 'action.selected' }}>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحد الائتماني</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outletBalances.map((bal) => {
                    const limitExceeded = bal.receivable_balance > bal.credit_limit && bal.credit_limit > 0;
                    return (
                      <TableRow key={bal.id} hover>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.name}</TableCell>
                        <TableCell align="right">{bal.outlet_type_name}</TableCell>
                        <TableCell align="right">{bal.governorate}</TableCell>
                        <TableCell align="right">{formatCurrencyEGP(bal.credit_limit)}</TableCell>
                        <TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          {formatCurrencyEGP(bal.collected_balance)}
                        </TableCell>
                        <TableCell align="right" sx={{ color: limitExceeded ? 'error.main' : 'warning.main', fontWeight: 'bold' }}>
                          {formatCurrencyEGP(bal.receivable_balance)}
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={limitExceeded ? 'تجاوز الحد الائتماني' : 'سليم ائتمانياً'}
                            color={limitExceeded ? 'error' : 'success'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyState message="لا يوجد منافذ بيع مسجلة حالياً." />
          )}
        </TabPanel>

        {/* TAB 2: GROUPED BY GOVERNORATE */}
        <TabPanel value={tab} index={2}>
          {govLoading ? (
            <LoadingState message="جاري تحميل أرصدة المحافظات..." />
          ) : governorateBalances.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: 'action.selected' }}>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {governorateBalances.map((bal) => (
                    <TableRow key={bal.governorate} hover>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.governorate}</TableCell>
                      <TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                        {formatCurrencyEGP(bal.collected_balance)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                        {formatCurrencyEGP(bal.receivable_balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyState message="لا توجد بيانات لأي محافظات." />
          )}
        </TabPanel>

        {/* TAB 3: GROUPED BY OUTLET TYPE */}
        <TabPanel value={tab} index={3}>
          {typeLoading ? (
            <LoadingState message="جاري تحميل أرصدة الفئات..." />
          ) : outletTypeBalances.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: 'action.selected' }}>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة منفذ التوزيع</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outletTypeBalances.map((bal) => (
                    <TableRow key={bal.id} hover>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.outlet_type_name}</TableCell>
                      <TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                        {formatCurrencyEGP(bal.collected_balance)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                        {formatCurrencyEGP(bal.receivable_balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyState message="لا توجد فئات منافذ مسجلة." />
          )}
        </TabPanel>
      </Paper>

      {/* MANUAL ADJUSTMENT DIALOG */}
      <Dialog open={adjustOpen} onClose={() => !submittingAdj && setAdjustOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>تسجيل حركة تسوية يدوية (الخزينة والحسابات)</DialogTitle>
        <form onSubmit={handleAdjSubmit}>
          <DialogContent dividers>
            <Stack spacing={3}>
              <FormControl fullWidth required size="small">
                <InputLabel>اختر منفذ التوزيع / الفرع</InputLabel>
                <Select
                  value={adjOutletId}
                  onChange={(e) => setAdjOutletId(e.target.value)}
                  label="اختر منفذ التوزيع / الفرع"
                  disabled={submittingAdj}
                >
                  {outlets.map(o => (
                    <MenuItem key={o.id} value={o.id}>{o.name} ({o.governorate})</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required size="small">
                    <InputLabel>طبيعة التسوية</InputLabel>
                    <Select
                      value={adjType}
                      onChange={(e) => setAdjType(e.target.value)}
                      label="طبيعة التسوية"
                      disabled={submittingAdj}
                    >
                      {Object.entries(adjustmentTypeTranslations).map(([k, v]) => (
                        <MenuItem key={k} value={k}>{v}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    label="المبلغ المالي"
                    type="number"
                    inputProps={{ step: '0.01', min: '0.01' }}
                    value={adjAmount}
                    onChange={(e) => setAdjAmount(e.target.value)}
                    disabled={submittingAdj}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">ج.م</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                required
                multiline
                rows={3}
                size="small"
                label="البيان وسبب التسوية (إلزامي)"
                value={adjNotes}
                onChange={(e) => setAdjNotes(e.target.value)}
                disabled={submittingAdj}
                placeholder="يرجى كتابة شرح كامل لسبب التعديل المالي..."
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAdjustOpen(false)} disabled={submittingAdj}>إلغاء</Button>
            <Button type="submit" variant="contained" color="secondary" disabled={submittingAdj}>
              {submittingAdj ? 'جاري الحفظ والتسجيل...' : 'تسجيل التسوية المالي'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Alert toast message */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={6000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Finance;
