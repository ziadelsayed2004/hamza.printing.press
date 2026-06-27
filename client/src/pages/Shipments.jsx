import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrencyEGP, formatEgyptDate, formatEgyptDateTime } from '../utils/formatters';
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
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Drawer
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  LocalShipping as ShipIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

export const Shipments = () => {
  const { hasPermission } = useAuth();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterInvoiceId, setFilterInvoiceId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const showToast = (msg, severity = 'success') => { setToastMsg(msg); setToastSeverity(severity); };

  // Detail dialog
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Create Shipment dialog
  const [openCreate, setOpenCreate] = useState(false);
  const [csInvoiceId, setCsInvoiceId] = useState('');
  const [csCarrier, setCsCarrier] = useState('');
  const [csTracking, setCsTracking] = useState('');
  const [csItems, setCsItems] = useState([{ invoiceItemId: '', quantity: '' }]);
  const [csSubmitting, setCsSubmitting] = useState(false);

  // Update Status dialog
  const [openStatusDlg, setOpenStatusDlg] = useState(false);
  const [statusShipmentId, setStatusShipmentId] = useState(null);
  const [statusCurrentStatus, setStatusCurrentStatus] = useState('');
  const [statusNewStatus, setStatusNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [statusSubmitting, setStatusSubmitting] = useState(false);

  // ── Data fetching ──

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    try {
      let q = `/shipments?limit=${limit}&offset=${offset}`;
      if (filterInvoiceId) q += `&invoiceId=${filterInvoiceId}`;
      if (filterStatus) q += `&status=${filterStatus}`;
      const data = await apiClient.get(q);
      setShipments(data);
    } catch (err) {
      showToast(err.message || 'فشل تحميل سجل الشحنات.', 'error');
    } finally {
      setLoading(false);
    }
  }, [limit, offset, filterInvoiceId, filterStatus]);

  useEffect(() => { fetchShipments(); }, [fetchShipments]);

  // ── Detail ──

  const handleViewDetail = async (id) => {
    setDetailData(null);
    setDetailLoading(true);
    setOpenDetail(true);
    try {
      const data = await apiClient.get(`/shipments/${id}`);
      setDetailData(data);
    } catch (err) {
      showToast(err.message || 'فشل تحميل تفاصيل الشحنة.', 'error');
      setOpenDetail(false);
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Create Shipment ──

  const handleOpenCreate = () => {
    setCsInvoiceId('');
    setCsCarrier('');
    setCsTracking('');
    setCsItems([{ invoiceItemId: '', quantity: '' }]);
    setOpenCreate(true);
  };

  const handleCsAddItem = () => {
    setCsItems([...csItems, { invoiceItemId: '', quantity: '' }]);
  };

  const handleCsRemoveItem = (index) => {
    if (csItems.length > 1) setCsItems(csItems.filter((_, i) => i !== index));
  };

  const handleCsItemChange = (index, field, value) => {
    const updated = [...csItems];
    updated[index][field] = value;
    setCsItems(updated);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    if (!csInvoiceId || csItems.some(i => !i.invoiceItemId || !i.quantity)) {
      showToast('رقم الفاتورة ومعرّف صنف الفاتورة والكمية مطلوبة.', 'error');
      return;
    }
    setCsSubmitting(true);
    try {
      await apiClient.post('/shipments', {
        invoiceId: parseInt(csInvoiceId, 10),
        shippingCarrier: csCarrier,
        trackingNumber: csTracking,
        items: csItems.map(i => ({
          invoiceItemId: parseInt(i.invoiceItemId, 10),
          quantity: parseInt(i.quantity, 10)
        }))
      });
      showToast('تم إنشاء الشحنة بنجاح وتحديث حالة شحن الفاتورة.');
      setOpenCreate(false);
      fetchShipments();
    } catch (err) {
      showToast(err.message || 'فشل إنشاء الشحنة.', 'error');
    } finally {
      setCsSubmitting(false);
    }
  };

  // ── Update Status ──

  const handleOpenStatus = (shipment) => {
    setStatusShipmentId(shipment.id);
    setStatusCurrentStatus(shipment.status);
    setStatusNewStatus('');
    setStatusNotes('');
    setOpenStatusDlg(true);
  };

  const handleSubmitStatus = async () => {
    if (!statusNewStatus) {
      showToast('يجب اختيار الحالة الجديدة.', 'error');
      return;
    }
    setStatusSubmitting(true);
    try {
      await apiClient.post(`/shipments/${statusShipmentId}/status`, {
        status: statusNewStatus,
        notes: statusNotes
      });
      showToast('تم تحديث حالة الشحنة بنجاح.');
      setOpenStatusDlg(false);
      fetchShipments();
    } catch (err) {
      showToast(err.message || 'فشل تحديث حالة الشحنة.', 'error');
    } finally {
      setStatusSubmitting(false);
    }
  };

  // ── Helpers ──

  const statusLabel = (s) => {
    switch (s) {
      case 'pending': return 'قيد الانتظار';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغاة';
      default: return s || '—';
    }
  };

  const statusColor = (s) => {
    switch (s) {
      case 'pending': return 'warning';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const statusSteps = ['pending', 'shipped', 'delivered'];
  const getActiveStep = (s) => {
    if (s === 'cancelled') return -1;
    return statusSteps.indexOf(s);
  };

  // ──── Render ────

  return (
    <Box sx={{ p: 1 }}>
      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          تتبع وإصدار الشحنات
        </Typography>
        {hasPermission('shipments.create') && (
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenCreate}>
            إنشاء شحنة جديدة
          </Button>
        )}
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
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>خيارات البحث والتصفية</Typography>
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
                  fullWidth label="معرّف الفاتورة (Invoice ID)" size="small" type="number"
                  value={filterInvoiceId}
                  onChange={(e) => setFilterInvoiceId(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>حالة الشحنة</InputLabel>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="حالة الشحنة">
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="pending">قيد الانتظار</MenuItem>
                    <MenuItem value="shipped">تم الشحن</MenuItem>
                    <MenuItem value="delivered">تم التسليم</MenuItem>
                    <MenuItem value="cancelled">ملغاة</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" startIcon={<FilterIcon />} onClick={() => { setOffset(0); fetchShipments(); }}>
                  تطبيق
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit" startIcon={<ClearIcon />} onClick={() => { setFilterInvoiceId(''); setFilterStatus(''); setOffset(0); }}>
                  إلغاء
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>

      {/* Summary stats */}
      {!loading && shipments.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {['pending', 'shipped', 'delivered', 'cancelled'].map(st => {
            const count = shipments.filter(s => s.status === st).length;
            const colors = {
              pending: { bg: 'warning.light', fg: 'warning.contrastText' },
              shipped: { bg: 'info.light', fg: 'info.contrastText' },
              delivered: { bg: 'success.light', fg: 'success.contrastText' },
              cancelled: { bg: 'error.light', fg: 'error.contrastText' }
            };
            return (
              <Grid item xs={6} sm={3} key={st}>
                <Card sx={{ backgroundColor: colors[st].bg, color: colors[st].fg }}>
                  <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
                    <Typography variant="body2">{statusLabel(st)}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Shipments Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        {loading ? (
          <LoadingState message="جاري تحميل سجل الشحنات..." />
        ) : shipments.length === 0 ? (
          <EmptyState
            title="لا يوجد شحنات"
            description="لم يتم إنشاء أي شحنات بعد. يمكن إنشاء شحنة جديدة مرتبطة بفاتورة."
            actionLabel={hasPermission('shipments.create') ? 'إنشاء شحنة جديدة' : undefined}
            onAction={hasPermission('shipments.create') ? handleOpenCreate : undefined}
          />
        ) : (
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>رقم الشحنة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>شركة الشحن</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>رقم التتبع</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>تاريخ الشحن</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>تاريخ التسليم</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 120 }}>خيارات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipments.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.shipment_number}</TableCell>
                    <TableCell>
                      <Chip label={row.invoice_number} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
                    </TableCell>
                    <TableCell>{row.shipping_carrier || '—'}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{row.tracking_number || '—'}</TableCell>
                    <TableCell>
                      <Chip label={statusLabel(row.status)} color={statusColor(row.status)} size="small" />
                    </TableCell>
                    <TableCell>{row.shipped_at ? formatEgyptDate(row.shipped_at) : '—'}</TableCell>
                    <TableCell>{row.delivered_at ? formatEgyptDate(row.delivered_at) : '—'}</TableCell>
                    <TableCell>{row.user_full_name || '—'}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="عرض التفاصيل">
                        <IconButton color="primary" onClick={() => handleViewDetail(row.id)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {hasPermission('shipments.update') && row.status !== 'delivered' && row.status !== 'cancelled' && (
                        <Tooltip title="تحديث الحالة">
                          <IconButton color="secondary" onClick={() => handleOpenStatus(row)}>
                            <EditIcon fontSize="small" />
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
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="textSecondary">عدد:</Typography>
            <Select size="small" value={limit} onChange={(e) => { setLimit(e.target.value); setOffset(0); }} sx={{ minWidth: 60 }}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" disabled={offset === 0} onClick={() => setOffset(offset - limit)}>السابق</Button>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>({offset + 1} - {offset + shipments.length})</Typography>
            <Button size="small" disabled={shipments.length < limit} onClick={() => setOffset(offset + limit)}>التالي</Button>
          </Box>
        </Box>
      </Paper>

      {/* ══════ CREATE SHIPMENT Drawer ══════ */}
      <Drawer
        anchor="left"
        open={openCreate}
        onClose={() => !csSubmitting && setOpenCreate(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 600 }, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>إنشاء شحنة جديدة</Typography>
          <Button onClick={() => setOpenCreate(false)} variant="outlined" size="small" color="inherit" disabled={csSubmitting}>إغلاق</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmitCreate} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              يجب تحديد أصناف الفاتورة (Invoice Item IDs) والكمية المراد شحنها لكل صنف.
              يتم حساب الكمية المتبقية تلقائياً بناءً على الشحنات السابقة.
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth required label="معرّف الفاتورة (Invoice ID)" size="small" type="number"
                  value={csInvoiceId} onChange={(e) => setCsInvoiceId(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="شركة الشحن" size="small"
                  value={csCarrier} onChange={(e) => setCsCarrier(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="رقم التتبع" size="small"
                  value={csTracking} onChange={(e) => setCsTracking(e.target.value)} />
              </Grid>

              {/* Items */}
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>أصناف الشحنة</Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={handleCsAddItem}>إضافة صنف</Button>
                </Box>

                {csItems.map((item, idx) => (
                  <Grid container spacing={1} key={idx} sx={{ mb: 1 }} alignItems="center">
                    <Grid item xs={5}>
                      <TextField fullWidth required label="معرّف صنف الفاتورة (Invoice Item ID)" size="small" type="number"
                        value={item.invoiceItemId} onChange={(e) => handleCsItemChange(idx, 'invoiceItemId', e.target.value)} />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField fullWidth required label="الكمية" size="small" type="number" inputProps={{ min: 1 }}
                        value={item.quantity} onChange={(e) => handleCsItemChange(idx, 'quantity', e.target.value)} />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton color="error" onClick={() => handleCsRemoveItem(idx)} disabled={csItems.length <= 1}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setOpenCreate(false)} disabled={csSubmitting}>إلغاء</Button>
            <Button variant="contained" color="primary" type="submit" disabled={csSubmitting}>
              {csSubmitting ? 'جاري الإنشاء...' : 'تأكيد وإنشاء الشحنة'}
            </Button>
          </Box>
        </form>
      </Drawer>

      {/* ══════ SHIPMENT DETAIL Drawer ══════ */}
      <Drawer
        anchor="left"
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 600 }, p: 3, display: 'flex', flexDirection: 'column', height: '100vh' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الشحنة</Typography>
          <Button onClick={() => setOpenDetail(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>
          {detailLoading ? (
            <LoadingState message="جاري التحميل..." />
          ) : detailData ? (
            <Box>
              {/* Shipment Info */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">رقم الشحنة</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{detailData.shipment_number}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>
                  <Chip label={detailData.invoice_number} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace', mt: 0.5 }} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">شركة الشحن</Typography>
                  <Typography variant="body1">{detailData.shipping_carrier || '—'}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="textSecondary">رقم التتبع</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{detailData.tracking_number || '—'}</Typography>
                </Grid>
              </Grid>

              {/* Status Stepper */}
              {detailData.status !== 'cancelled' ? (
                <Box sx={{ mb: 3 }}>
                  <Stepper activeStep={getActiveStep(detailData.status)} alternativeLabel>
                    {statusSteps.map((step) => (
                      <Step key={step}>
                        <StepLabel>{statusLabel(step)}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              ) : (
                <Alert severity="error" sx={{ mb: 3 }}>هذه الشحنة ملغاة.</Alert>
              )}

              {/* Items */}
              {detailData.items && detailData.items.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    أصناف الشحنة ({detailData.items.length})
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>الكود</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المشحونة</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailData.items.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontWeight: 500 }}>{item.product_title}</TableCell>
                            <TableCell sx={{ fontFamily: 'monospace' }}>{item.product_code || '—'}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>{item.quantity}</TableCell>
                            <TableCell align="right">{formatCurrencyEGP(item.unit_price)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Status History */}
              {detailData.history && detailData.history.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    سجل تغييرات الحالة
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>من</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>إلى</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detailData.history.map((h, i) => (
                          <TableRow key={i}>
                            <TableCell><Chip label={statusLabel(h.old_status)} size="small" variant="outlined" /></TableCell>
                            <TableCell><Chip label={statusLabel(h.new_status)} color={statusColor(h.new_status)} size="small" /></TableCell>
                            <TableCell>{h.user_full_name || '—'}</TableCell>
                            <TableCell>{h.notes || '—'}</TableCell>
                            <TableCell>{h.created_at ? formatEgyptDateTime(h.created_at) : '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Update status CTA */}
              {hasPermission('shipments.update') && detailData.status !== 'delivered' && detailData.status !== 'cancelled' && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ShipIcon />}
                    onClick={() => {
                      setOpenDetail(false);
                      handleOpenStatus(detailData);
                    }}
                  >
                    تحديث حالة الشحنة
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <EmptyState title="لا توجد بيانات" />
          )}
        </Box>
      </Drawer>

      {/* ══════ UPDATE STATUS DIALOG ══════ */}
      <Dialog open={openStatusDlg} onClose={() => !statusSubmitting && setOpenStatusDlg(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>تحديث حالة الشحنة</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            الحالة الحالية: <Chip label={statusLabel(statusCurrentStatus)} color={statusColor(statusCurrentStatus)} size="small" />
          </Typography>
          <FormControl fullWidth size="small" required sx={{ mb: 2 }}>
            <InputLabel>الحالة الجديدة</InputLabel>
            <Select value={statusNewStatus} onChange={(e) => setStatusNewStatus(e.target.value)} label="الحالة الجديدة">
              {statusCurrentStatus === 'pending' && <MenuItem value="shipped">تم الشحن (Shipped)</MenuItem>}
              {statusCurrentStatus === 'pending' && <MenuItem value="cancelled">ملغاة (Cancelled)</MenuItem>}
              {statusCurrentStatus === 'shipped' && <MenuItem value="delivered">تم التسليم (Delivered)</MenuItem>}
              {statusCurrentStatus === 'shipped' && <MenuItem value="cancelled">ملغاة (Cancelled)</MenuItem>}
            </Select>
          </FormControl>
          <TextField fullWidth label="ملاحظات" size="small" multiline rows={2} value={statusNotes} onChange={(e) => setStatusNotes(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="inherit" onClick={() => setOpenStatusDlg(false)} disabled={statusSubmitting}>إلغاء</Button>
          <Button variant="contained" color="primary" onClick={handleSubmitStatus} disabled={statusSubmitting || !statusNewStatus}>
            {statusSubmitting ? 'جاري التحديث...' : 'تأكيد تحديث الحالة'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Toast */}
      <Snackbar open={!!toastMsg} autoHideDuration={4000} onClose={() => setToastMsg('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Shipments;
