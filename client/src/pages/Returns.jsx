import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrencyEGP, formatEgyptDate, formatEgyptDateTime } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { useLanguage } from '../locales/LanguageContext';
import { t } from '../locales/t';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import EntityDrawer from '../components/EntityDrawer';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
  Divider,
  Stack
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  History as HistoryIcon,
  Store as StoreIcon,
  Receipt as ReceiptIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import '../styles/Returns.css';

export const Returns = () => {
  const { hasPermission } = useAuth();
  const { language } = useLanguage();

  // Primary Data States
  const [returnsList, setReturnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filter list options
  const [outlets, setOutlets] = useState([]);

  // Pagination
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  // Filter values
  const [showFilters, setShowFilters] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterOutletId, setFilterOutletId] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Return Detail Drawer state
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  // Fetch Outlets dropdown
  useEffect(() => {
    apiClient.get('/outlets')
      .then(data => setOutlets(data || []))
      .catch(err => console.error(err));
  }, []);

  // Main list fetch
  const fetchReturns = useCallback(async () => {
    setLoading(true);
    try {
      let query = `/returns?limit=${limit}&offset=${page * limit}`;
      if (filterOutletId) query += `&outletId=${filterOutletId}`;
      
      const data = await apiClient.get(query);
      
      // Client-side search filters if text matches invoice number or outlet name
      let filtered = data || [];
      if (filterSearch.trim()) {
        const term = filterSearch.toLowerCase().trim();
        filtered = filtered.filter(item => 
          String(item.id).includes(term) ||
          (item.invoice_number && item.invoice_number.toLowerCase().includes(term)) ||
          (item.outlet_name && item.outlet_name.toLowerCase().includes(term))
        );
      }
      if (filterStartDate) {
        filtered = filtered.filter(item => item.created_at >= filterStartDate);
      }
      if (filterEndDate) {
        filtered = filtered.filter(item => item.created_at <= filterEndDate + 'T23:59:59');
      }

      setReturnsList(filtered);
      setTotalCount(filtered.length);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'خطأ أثناء تحميل المرتجعات', 'error');
    } finally {
      setLoading(false);
    }
  }, [limit, page, filterOutletId, filterSearch, filterStartDate, filterEndDate]);

  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  // Load Return details
  const handleOpenDetail = async (id) => {
    setDetailId(id);
    setDetailOpen(true);
    setDetailLoading(true);
    try {
      const data = await apiClient.get(`/returns/${id}`);
      setDetailData(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل تفاصيل المرتجع', 'error');
      setDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilterSearch('');
    setFilterOutletId('');
    setFilterStartDate('');
    setFilterEndDate('');
    setPage(0);
  };

  // KPI calculations
  const totalValue = returnsList.reduce((sum, item) => sum + parseFloat(item.return_value || 0), 0);
  const returnsCount = returnsList.length;
  const distinctOutletsCount = new Set(returnsList.map(item => item.outlet_id)).size;

  return (
    <Box sx={{ p: 1 }}>
      {/* KPI Cards Strip */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: 'error.light', color: 'error.contrastText', display: 'flex' }}>
                <HistoryIcon />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {t('returns.totalReturnsValue')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formatCurrencyEGP(totalValue)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.contrastText', display: 'flex' }}>
                <ReceiptIcon />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {t('returns.returnsCount')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {returnsCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: 'warning.light', color: 'warning.contrastText', display: 'flex' }}>
                <StoreIcon />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {t('returns.distinctOutlets')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {distinctOutletsCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters Toolbar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder={t('common.search')}
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                sx={{ minWidth: 260 }}
              />
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? t('common.cancel') : t('common.save') === 'Save' ? 'Filter' : 'تصفية'}
              </Button>
            </Box>
            {showFilters && (
              <Button variant="text" color="inherit" onClick={handleResetFilters}>
                {t('common.cancel') === 'Cancel' ? 'Clear Filters' : 'إعادة تعيين الفلاتر'}
              </Button>
            )}
          </Box>

          <Collapse in={showFilters}>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} className="returns-filters-grid">
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>{t('nav.outlets')}</InputLabel>
                  <Select
                    value={filterOutletId}
                    onChange={(e) => setFilterOutletId(e.target.value)}
                    label={t('nav.outlets')}
                  >
                    <MenuItem value="">{t('common.save') === 'Save' ? 'All Outlets' : 'جميع الفروع'}</MenuItem>
                    {outlets.map(o => (
                      <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('common.save') === 'Save' ? 'From Date' : 'من تاريخ'}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('common.save') === 'Save' ? 'To Date' : 'إلى تاريخ'}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>

      {/* Main Table */}
      {loading ? (
        <LoadingState message={t('common.loading')} />
      ) : returnsList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('nav.outlets')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('system.invoiceNumber')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('returns.total')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('returns.createdBy')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('returns.date')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('returns.status')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {returnsList.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.outlet_name}</TableCell>
                  <TableCell align="center">{item.invoice_number}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                    {formatCurrencyEGP(item.return_value)}
                  </TableCell>
                  <TableCell align="center">{item.user_full_name || '—'}</TableCell>
                  <TableCell align="center">{formatEgyptDateTime(item.created_at)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={item.status === 'approved' ? (language === 'en' ? 'Approved' : 'معتمد') : item.status}
                      size="small"
                      color={item.status === 'approved' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={t('returns.viewDetails')}>
                      <IconButton color="secondary" onClick={() => handleOpenDetail(item.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Custom pagination */}
          <Box className="returns-pagination-container">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="textSecondary">
                {language === 'en' ? 'Rows per page:' : 'عدد الأسطر لكل صفحة:'}
              </Typography>
              <Select
                size="small"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                sx={{ minWidth: 70 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button size="small" disabled={page === 0} onClick={() => setPage(prev => Math.max(0, prev - 1))}>
                {language === 'en' ? 'Previous' : 'السابق'}
              </Button>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {language === 'en' ? `Page ${page + 1}` : `صفحة ${page + 1}`}
              </Typography>
              <Button size="small" disabled={returnsList.length < limit} onClick={() => setPage(prev => prev + 1)}>
                {language === 'en' ? 'Next' : 'التالي'}
              </Button>
            </Box>
          </Box>
        </TableContainer>
      ) : (
        <EmptyState message={language === 'en' ? 'No returns matches the filters.' : 'لم يتم العثور على أي مرتجعات مطابقة للفلاتر.'} />
      )}

      {/* Details Drawer */}
      <EntityDrawer
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={t('returns.returnDetails')}
        size="medium"
        actions={
          <Button onClick={() => setDetailOpen(false)} variant="outlined" color="inherit">
            {language === 'en' ? 'Close' : 'إغلاق'}
          </Button>
        }
      >
        {detailLoading ? (
          <LoadingState message={t('common.loading')} />
        ) : detailData ? (
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('returns.invoiceNum')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {detailData.invoice_number}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('nav.outlets')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {detailData.outlet_name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('returns.createdBy')}
                </Typography>
                <Typography variant="body2">
                  {detailData.user_full_name || '—'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {t('returns.date')}
                </Typography>
                <Typography variant="body2">
                  {formatEgyptDateTime(detailData.created_at)}
                </Typography>
              </Grid>
            </Grid>

            <Box>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                {t('returns.reason')}
              </Typography>
              <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover', fontSize: '0.85rem', width: '100%' }}>
                {detailData.reason || (language === 'en' ? 'No return reason provided.' : 'لم يتم توضيح سبب الإرجاع.')}
              </Paper>
            </Box>

            <Divider />

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {language === 'en' ? 'Returned Books' : 'الكتب المرتجعة'}
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell className="returns-drawer-table-header">{t('returns.bookTitle')}</TableCell>
                    <TableCell className="returns-drawer-table-header" align="center">{t('returns.quantity')}</TableCell>
                    <TableCell className="returns-drawer-table-header" align="center">{t('returns.price')}</TableCell>
                    <TableCell className="returns-drawer-table-header" align="center">{t('returns.total')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailData.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{item.product_title} ({item.product_code})</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{formatCurrencyEGP(item.price)}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        {formatCurrencyEGP(item.quantity * item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {language === 'en' ? 'Total Return Value:' : 'إجمالي القيمة المستردة:'}
              </Typography>
              <Typography variant="h6" color="error.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrencyEGP(detailData.return_value)}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <EmptyState message={t('common.noData')} />
        )}
      </EntityDrawer>
    </Box>
  );
};

export default Returns;
