import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrencyEGP, formatEgyptDate } from '../utils/formatters';
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
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  Divider,
  Card,
  CardContent,
  Collapse,
  LinearProgress,
  Tooltip,
  Drawer
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Undo as UndoIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Sync as SyncIcon,
  Receipt as ReceiptIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';

export const Payments = () => {
  const { hasPermission } = useAuth();

  // Data states
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterInvoiceId, setFilterInvoiceId] = useState('');

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  // Add Payment Dialog
  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [payFormInvoiceId, setPayFormInvoiceId] = useState('');
  const [payFormAmount, setPayFormAmount] = useState('');
  const [payFormMethod, setPayFormMethod] = useState('cash');
  const [payFormDate, setPayFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [payFormReference, setPayFormReference] = useState('');
  const [payFormNotes, setPayFormNotes] = useState('');
  const [payFormSubmitting, setPayFormSubmitting] = useState(false);
  const [payFormMetrics, setPayFormMetrics] = useState(null);
  const [payFormMetricsLoading, setPayFormMetricsLoading] = useState(false);

  // Invoice Metrics Detail Dialog
  const [openMetrics, setOpenMetrics] = useState(false);
  const [metricsData, setMetricsData] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(false);

  // Reverse Payment Dialog
  const [openReverseDialog, setOpenReverseDialog] = useState(false);
  const [reversePaymentTarget, setReversePaymentTarget] = useState(null);
  const [reverseNotes, setReverseNotes] = useState('');
  const [reverseSubmitting, setReverseSubmitting] = useState(false);

  // Overdue check
  const [overdueChecking, setOverdueChecking] = useState(false);

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  // ---- Data fetching ----

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      let query = `/payments?limit=${limit}&offset=${offset}`;
      if (filterInvoiceId) query += `&invoiceId=${filterInvoiceId}`;
      const data = await apiClient.get(query);
      setPayments(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل سجل المدفوعات.', 'error');
    } finally {
      setLoading(false);
    }
  }, [limit, offset, filterInvoiceId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // ---- Pagination ----

  const handlePrevPage = () => {
    if (offset >= limit) setOffset(offset - limit);
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  // ---- Filters ----

  const handleApplyFilters = () => {
    setOffset(0);
    fetchPayments();
  };

  const handleResetFilters = () => {
    setFilterInvoiceId('');
    setOffset(0);
  };

  // ---- Helpers ----

  const translateMethod = (m) => {
    switch (m) {
      case 'cash': return 'نقدي';
      case 'check': return 'شيك';
      case 'bank_transfer': return 'تحويل بنكي';
      case 'deferred': return 'آجل';
      default: return m || 'غير محدد';
    }
  };



  // ---- Add Payment ----

  const handleOpenAddPayment = (prefilledInvoiceId = '') => {
    setPayFormInvoiceId(prefilledInvoiceId ? String(prefilledInvoiceId) : '');
    setPayFormAmount('');
    setPayFormMethod('cash');
    setPayFormDate(new Date().toISOString().split('T')[0]);
    setPayFormReference('');
    setPayFormNotes('');
    setPayFormMetrics(null);
    setOpenAddPayment(true);

    if (prefilledInvoiceId) {
      loadPayFormMetrics(prefilledInvoiceId);
    }
  };

  const loadPayFormMetrics = async (invoiceId) => {
    if (!invoiceId) {
      setPayFormMetrics(null);
      return;
    }
    setPayFormMetricsLoading(true);
    try {
      const data = await apiClient.get(`/payments/invoice/${invoiceId}/metrics`);
      setPayFormMetrics(data);
    } catch (err) {
      console.error(err);
      setPayFormMetrics(null);
    } finally {
      setPayFormMetricsLoading(false);
    }
  };

  const handlePayFormInvoiceBlur = () => {
    const id = parseInt(payFormInvoiceId, 10);
    if (id > 0) loadPayFormMetrics(id);
    else setPayFormMetrics(null);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!payFormInvoiceId || !payFormAmount || !payFormMethod) {
      showToast('رقم الفاتورة والمبلغ وطريقة الدفع مطلوبة.', 'error');
      return;
    }
    setPayFormSubmitting(true);
    try {
      await apiClient.post('/payments', {
        invoiceId: parseInt(payFormInvoiceId, 10),
        amount: parseFloat(payFormAmount),
        paymentMethod: payFormMethod,
        paymentDate: payFormDate || undefined,
        referenceNumber: payFormReference,
        notes: payFormNotes
      });
      showToast('تم تسجيل الدفعة بنجاح وتحديث حالة الفاتورة.');
      setOpenAddPayment(false);
      fetchPayments();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تسجيل الدفعة.', 'error');
    } finally {
      setPayFormSubmitting(false);
    }
  };

  // ---- Reverse Payment ----

  const handleOpenReverse = (payment) => {
    setReversePaymentTarget(payment);
    setReverseNotes('');
    setOpenReverseDialog(true);
  };

  const handleSubmitReverse = async () => {
    if (!reversePaymentTarget) return;
    setReverseSubmitting(true);
    try {
      await apiClient.post(`/payments/${reversePaymentTarget.id}/reverse`, {
        notes: reverseNotes
      });
      showToast('تم إلغاء/عكس الدفعة وإعادة حساب رصيد الفاتورة بنجاح.');
      setOpenReverseDialog(false);
      fetchPayments();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل عكس الدفعة.', 'error');
    } finally {
      setReverseSubmitting(false);
    }
  };

  // ---- Overdue Check ----

  const handleCheckOverdue = async () => {
    setOverdueChecking(true);
    try {
      const res = await apiClient.post('/payments/check-overdue', {});
      showToast(`تم التحقق من الأقساط المتأخرة بنجاح. تم تحديث ${res.updatedCount || 0} قسط.`);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل التحقق من الأقساط المتأخرة.', 'error');
    } finally {
      setOverdueChecking(false);
    }
  };

  // ---- Invoice Metrics Viewer ----

  const handleOpenMetrics = async (invoiceId) => {
    setMetricsData(null);
    setMetricsLoading(true);
    setOpenMetrics(true);
    try {
      const data = await apiClient.get(`/payments/invoice/${invoiceId}/metrics`);
      setMetricsData(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل بيانات تحصيلات الفاتورة.', 'error');
      setOpenMetrics(false);
    } finally {
      setMetricsLoading(false);
    }
  };

  // ---- Render ----

  return (
    <Box sx={{ p: 1 }}>
      {/* Title & Top Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          سجل المدفوعات والتحصيل
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {hasPermission('payments.supply_batch') && payments.filter(p => p.supply_status !== 'supplied').length > 0 && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={handleBatchSupply}
            >
              توريد الدفعات المعلقة ({payments.filter(p => p.supply_status !== 'supplied').length})
            </Button>
          )}

          {hasPermission('payments.create') && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenAddPayment()}
            >
              تسجيل دفعة جديدة
            </Button>
          )}
        </Box>
      </Box>

      {/* Expandable Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon color="action" />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                خيارات البحث والتصفية
              </Typography>
            </Box>
            <IconButton size="small">
              {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={showFilters} sx={{ mt: 2 }}>
            <Divider sx={{ my: 1.5 }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth
                  label="رقم معرّف الفاتورة (Invoice ID)"
                  size="small"
                  type="number"
                  value={filterInvoiceId}
                  onChange={(e) => setFilterInvoiceId(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" startIcon={<FilterIcon />} onClick={handleApplyFilters}>
                  تطبيق
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit" startIcon={<ClearIcon />} onClick={handleResetFilters}>
                  إلغاء التصفية
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>

      {/* Summary Stats Row */}
      {!loading && payments.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'success.light', color: 'success.contrastText' }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <WalletIcon />
                  <Typography variant="subtitle2">إجمالي الدفعات المعروضة</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formatCurrencyEGP(payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <ReceiptIcon />
                  <Typography variant="subtitle2">عدد الدفعات</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {payments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: 'warning.light', color: 'warning.contrastText' }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <CheckCircleIcon />
                  <Typography variant="subtitle2">فواتير مشمولة</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {new Set(payments.map(p => p.invoice_id)).size}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Main Payments Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        {loading ? (
          <LoadingState message="جاري تحميل سجل المدفوعات..." />
        ) : payments.length === 0 ? (
          <EmptyState
            title="لا يوجد دفعات مسجلة"
            description="لم يتم تسجيل أي دفعات بعد، أو لا توجد دفعات تطابق معايير التصفية."
          />
        ) : (
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>تاريخ الدفع</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>طريقة الدفع</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>المرجع</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>سجّلت بواسطة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>حالة التوريد</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 160 }}>خيارات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{row.id}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.invoice_number}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontFamily: 'monospace', cursor: 'pointer' }}
                        onClick={() => handleOpenMetrics(row.invoice_id)}
                      />
                    </TableCell>
                    <TableCell>
                      {row.payment_date
                        ? formatEgyptDate(row.payment_date)
                        : '-'}
                    </TableCell>
                    <TableCell>{translateMethod(row.payment_method)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      {formatCurrencyEGP(row.amount)}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      {row.reference_number || '-'}
                    </TableCell>
                    <TableCell>{row.user_full_name || 'غير معروف'}</TableCell>
                     <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.notes || '-'}
                    </TableCell>
                    <TableCell>
                      {row.supply_status === 'supplied' ? (
                        <Chip label="مورد للشركة" color="success" size="small" />
                      ) : (
                        <Chip label="معلق طرف المندوب" color="warning" size="small" variant="outlined" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="عرض تفاصيل تحصيلات الفاتورة">
                        <IconButton color="primary" onClick={() => handleOpenMetrics(row.invoice_id)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {hasPermission('payments.mark_supplied') && row.supply_status !== 'supplied' && (
                        <Tooltip title="تأكيد توريد المقبوضات للشركة">
                          <IconButton color="success" onClick={() => handleSupplyPayment(row.id)}>
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {hasPermission('payments.reverse') && row.supply_status === 'supplied' && (
                        <Tooltip title="إلغاء التوريد المالي">
                          <IconButton color="warning" onClick={() => handleReverseSupply(row.id)}>
                            <UndoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {hasPermission('payments.create') && (
                        <Tooltip title="تسجيل دفعة إضافية لنفس الفاتورة">
                          <IconButton color="secondary" onClick={() => handleOpenAddPayment(row.invoice_id)}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {hasPermission('payments.reverse') && (
                        <Tooltip title="إلغاء / عكس هذه الدفعة">
                          <IconButton color="error" onClick={() => handleOpenReverse(row)}>
                            <UndoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(224, 224, 224, 1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="textSecondary">عدد السجلات بالصفحة:</Typography>
            <Select
              size="small"
              value={limit}
              onChange={(e) => { setLimit(e.target.value); setOffset(0); }}
              sx={{ minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" disabled={offset === 0} onClick={handlePrevPage}>السابق</Button>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              ({offset + 1} - {offset + payments.length})
            </Typography>
            <Button size="small" disabled={payments.length < limit} onClick={handleNextPage}>التالي</Button>
          </Box>
        </Box>
      </Paper>

      {/* ================ ADD PAYMENT Drawer ================ */}
      <Drawer
        anchor="left"
        open={openAddPayment}
        onClose={() => !payFormSubmitting && setOpenAddPayment(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 450 }, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسجيل دفعة جديدة</Typography>
          <Button onClick={() => setOpenAddPayment(false)} variant="outlined" size="small" color="inherit" disabled={payFormSubmitting}>إغلاق</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>
            <Grid container spacing={2}>
              {/* Invoice ID */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="رقم معرّف الفاتورة (Invoice ID)"
                  size="small"
                  type="number"
                  value={payFormInvoiceId}
                  onChange={(e) => setPayFormInvoiceId(e.target.value)}
                  onBlur={handlePayFormInvoiceBlur}
                />
              </Grid>

              {/* Live invoice metrics preview */}
              {payFormMetricsLoading && <Grid item xs={12}><LinearProgress color="secondary" /></Grid>}
              {payFormMetrics && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                          {payFormMetrics.invoiceNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="textSecondary">نوع الدفع</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {translateMethod(payFormMetrics.paymentType)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="textSecondary">إجمالي الفاتورة</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {formatCurrencyEGP(payFormMetrics.totalPrice)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="caption" color="textSecondary">المسدد حتى الآن</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                          {formatCurrencyEGP(payFormMetrics.paidAmount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                            المتبقي: {formatCurrencyEGP(payFormMetrics.remainingAmount)}
                          </Typography>
                          {payFormMetrics.overdueCount > 0 && (
                            <Chip
                              icon={<WarningIcon />}
                              label={`${payFormMetrics.overdueCount} أقساط متأخرة`}
                              color="error"
                              size="small"
                            />
                          )}
                        </Box>
                        {/* Progress bar */}
                        <LinearProgress
                          variant="determinate"
                          value={payFormMetrics.totalPrice > 0
                            ? Math.min(100, (payFormMetrics.paidAmount / payFormMetrics.totalPrice) * 100)
                            : 0}
                          sx={{ mt: 1, height: 8, borderRadius: 4 }}
                          color={payFormMetrics.remainingAmount <= 0 ? 'success' : 'warning'}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )}

              {/* Amount */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="مبلغ الدفعة"
                  size="small"
                  type="number"
                  inputProps={{ step: '0.01', min: '0.01' }}
                  value={payFormAmount}
                  onChange={(e) => setPayFormAmount(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ج.م</InputAdornment>
                  }}
                  helperText={
                    payFormMetrics
                      ? `الحد الأقصى المسموح: ${formatCurrencyEGP(payFormMetrics.remainingAmount)}`
                      : ''
                  }
                />
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>طريقة الدفع</InputLabel>
                  <Select
                    value={payFormMethod}
                    onChange={(e) => setPayFormMethod(e.target.value)}
                    label="طريقة الدفع"
                  >
                    <MenuItem value="cash">نقدي (Cash)</MenuItem>
                    <MenuItem value="check">شيك (Check)</MenuItem>
                    <MenuItem value="bank_transfer">تحويل بنكي (Bank Transfer)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Payment Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="تاريخ الدفع"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={payFormDate}
                  onChange={(e) => setPayFormDate(e.target.value)}
                />
              </Grid>

              {/* Reference Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="رقم مرجعي / رقم الإيصال"
                  size="small"
                  value={payFormReference}
                  onChange={(e) => setPayFormReference(e.target.value)}
                />
              </Grid>

              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ملاحظات"
                  size="small"
                  multiline
                  rows={2}
                  value={payFormNotes}
                  onChange={(e) => setPayFormNotes(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setOpenAddPayment(false)} disabled={payFormSubmitting}>
              إلغاء
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={payFormSubmitting}>
              {payFormSubmitting ? 'جاري التسجيل...' : 'تأكيد وتسجيل الدفعة'}
            </Button>
          </Box>
        </form>
      </Drawer>

      {/* ================ REVERSE PAYMENT DIALOG ================ */}
      <Dialog
        open={openReverseDialog}
        onClose={() => !reverseSubmitting && setOpenReverseDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: 'error.main' }}>
          إلغاء / عكس دفعة
        </DialogTitle>
        <DialogContent dividers>
          {reversePaymentTarget && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                سيتم حذف سجل الدفعة وإعادة حساب رصيد الفاتورة والأقساط تلقائياً. لا يمكن التراجع عن هذه العملية.
              </Alert>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>رقم الدفعة:</strong> {reversePaymentTarget.id}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>الفاتورة:</strong> {reversePaymentTarget.invoice_number}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>المبلغ:</strong>{' '}
                <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                  {formatCurrencyEGP(reversePaymentTarget.amount)}
                </span>
              </Typography>
            </Box>
          )}
          <TextField
            fullWidth
            label="سبب الإلغاء / ملاحظات"
            size="small"
            multiline
            rows={2}
            value={reverseNotes}
            onChange={(e) => setReverseNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="inherit" onClick={() => setOpenReverseDialog(false)} disabled={reverseSubmitting}>
            تراجع
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmitReverse} disabled={reverseSubmitting}>
            {reverseSubmitting ? 'جاري الإلغاء...' : 'تأكيد الإلغاء وعكس الدفعة'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================ INVOICE METRICS & INSTALLMENTS Drawer ================ */}
      <Drawer
        anchor="left"
        open={openMetrics}
        onClose={() => setOpenMetrics(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 650 }, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            تفاصيل تحصيلات الفاتورة
          </Typography>
          <Button onClick={() => setOpenMetrics(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>
          {metricsLoading ? (
            <LoadingState message="جاري تحميل بيانات التحصيلات..." />
          ) : metricsData ? (
            <Box>
              {/* Metrics Summary */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {metricsData.invoiceNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">نوع الدفع</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {translateMethod(metricsData.paymentType)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">إجمالي الفاتورة</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {formatCurrencyEGP(metricsData.totalPrice)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">حالة الدفع</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    {metricsData.paymentStatus === 'paid' && <Chip label="مسددة بالكامل" color="success" size="small" />}
                    {metricsData.paymentStatus === 'unpaid' && <Chip label="غير مسددة" color="error" size="small" />}
                    {metricsData.paymentStatus === 'partially_paid' && <Chip label="مسددة جزئياً" color="warning" size="small" />}
                    {metricsData.paymentStatus === 'overdue' && <Chip label="متأخرة" color="error" size="small" />}
                  </Box>
                </Grid>
              </Grid>

              {/* Progress bar */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                    المسدد: {formatCurrencyEGP(metricsData.paidAmount)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    المتبقي: {formatCurrencyEGP(metricsData.remainingAmount)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metricsData.totalPrice > 0
                    ? Math.min(100, (metricsData.paidAmount / metricsData.totalPrice) * 100)
                    : 0}
                  sx={{ height: 10, borderRadius: 5 }}
                  color={metricsData.remainingAmount <= 0 ? 'success' : 'warning'}
                />
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}>
                  {metricsData.totalPrice > 0
                    ? `${((metricsData.paidAmount / metricsData.totalPrice) * 100).toFixed(1)}% مسددة`
                    : '0%'}
                </Typography>
              </Box>



              {/* Quick-add payment button */}
              {hasPermission('payments.create') && metricsData.remainingAmount > 0 && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setOpenMetrics(false);
                      handleOpenAddPayment(metricsData.invoiceId);
                    }}
                  >
                    تسجيل دفعة لهذه الفاتورة
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <EmptyState title="لا يوجد بيانات" description="تعذر تحميل بيانات التحصيلات." />
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={() => setOpenMetrics(false)} variant="contained" color="inherit">إغلاق</Button>
        </Box>
      </Drawer>

      {/* Snackbar Toast */}
      <Snackbar
        open={!!toastMsg}
        autoHideDuration={4000}
        onClose={() => setToastMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Payments;
