import React, { useState, useEffect } from 'react';
import { formatCurrencyEGP } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { FormSection } from '../components/forms/FormSection';
import { FieldGrid } from '../components/forms/FieldGrid';
import { FormActions } from '../components/forms/FormActions';
import EntityDrawer from '../components/EntityDrawer';
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
  Drawer,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import ConfirmDialog from '../components/ConfirmDialog';



export const Outlets = () => {
  const { hasPermission } = useAuth();
  
  // Data State
  const [outlets, setOutlets] = useState([]);
  const [outletTypes, setOutletTypes] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  // Filters State
  const [search, setSearch] = useState('');
  const [governorateFilter, setGovernorateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Dialog Controller State
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  // Deletion confirm state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [outletIdToDelete, setOutletIdToDelete] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formOutletTypeId, setFormOutletTypeId] = useState('');
  const [formGovernorate, setFormGovernorate] = useState('');
  const [formAddressDetails, setFormAddressDetails] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCreditLimit, setFormCreditLimit] = useState(0);
  const [formStatus, setFormStatus] = useState('active');
  const [formNotes, setFormNotes] = useState('');
  const [formUserId, setFormUserId] = useState('');

  // Toast Notifications State
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const fetchFiltersMetadata = async () => {
    try {
      const govData = await apiClient.get('/outlets/governorates');
      setGovernorates(govData);

      const typesData = await apiClient.get('/outlet-types?limit=100&includeDisabled=false');
      setOutletTypes(typesData);

      if (hasPermission('outlets.create') || hasPermission('outlets.update')) {
        const usersData = await apiClient.get('/users?limit=200');
        setUsersList(usersData.filter(u => u.status === 'active'));
      }
    } catch (err) {
      console.error('Failed to load outlets metadata:', err);
    }
  };

  const fetchOutlets = async () => {
    setLoading(true);
    try {
      let query = `/outlets?search=${search}`;
      if (governorateFilter) query += `&governorate=${governorateFilter}`;
      if (typeFilter) query += `&outletTypeId=${typeFilter}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      
      const data = await apiClient.get(query);
      setOutlets(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل بيانات المنافذ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltersMetadata();
  }, []);

  useEffect(() => {
    fetchOutlets();
  }, [search, governorateFilter, typeFilter, statusFilter]);

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedOutlet(null);
    setFormName('');
    setFormOutletTypeId(outletTypes[0]?.id || '');
    setFormGovernorate('القاهرة');
    setFormAddressDetails('');
    setFormPhone('');
    setFormCreditLimit(0);
    setFormStatus('active');
    setFormNotes('');
    setFormUserId('');
    setOpenModal(true);
  };

  const handleOpenEditModal = (outlet) => {
    setModalMode('edit');
    setSelectedOutlet(outlet);
    setFormName(outlet.name);
    setFormOutletTypeId(outlet.outlet_type_id);
    setFormGovernorate(outlet.governorate);
    setFormAddressDetails(outlet.address_details || '');
    setFormPhone(outlet.phone || '');
    setFormCreditLimit(outlet.credit_limit || 0);
    setFormStatus(outlet.status);
    setFormNotes(outlet.notes || '');
    setFormUserId(outlet.userId || '');
    setOpenModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formOutletTypeId || !formGovernorate) {
      showToast('الاسم، فئة المنفذ، والمحافظة حقول مطلوبة.', 'error');
      return;
    }

    const payload = {
      name: formName,
      outletTypeId: parseInt(formOutletTypeId, 10),
      governorate: formGovernorate,
      addressDetails: formAddressDetails,
      phone: formPhone,
      creditLimit: parseFloat(formCreditLimit),
      status: formStatus,
      notes: formNotes,
      userId: formUserId ? parseInt(formUserId, 10) : null
    };

    try {
      if (modalMode === 'create') {
        await apiClient.post('/outlets', payload);
        showToast('تم إضافة منفذ التوزيع بنجاح.');
      } else {
        await apiClient.put(`/outlets/${selectedOutlet.id}`, payload);
        showToast('تم تحديث بيانات منفذ التوزيع بنجاح.');
      }
      setOpenModal(false);
      fetchOutlets();
      // Reload unique governorates list in case a new one was added
      const govData = await apiClient.get('/outlets/governorates');
      setGovernorates(govData);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل حفظ التعديلات.', 'error');
    }
  };

  const handleToggleStatus = async (outlet) => {
    const targetStatus = outlet.status === 'active' ? 'disabled' : 'active';
    try {
      await apiClient.put(`/outlets/${outlet.id}/status`, { status: targetStatus });
      showToast(`تم ${targetStatus === 'active' ? 'تفعيل' : 'تعطيل'} المنفذ بنجاح.`);
      fetchOutlets();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تغيير حالة المنفذ.', 'error');
    }
  };

  const handleDeleteOutlet = (id) => {
    setOutletIdToDelete(id);
    setConfirmOpen(true);
  };

  const executeDeleteOutlet = async () => {
    if (!outletIdToDelete) return;
    try {
      await apiClient.delete(`/outlets/${outletIdToDelete}`);
      showToast('تم حذف منفذ التوزيع بنجاح.');
      fetchOutlets();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'لا يمكن حذف هذا المنفذ لوجود فواتير أو معاملات مسجلة عليه.', 'error');
    } finally {
      setConfirmOpen(false);
      setOutletIdToDelete(null);
    }
  };

  if (loading && outlets.length === 0) {
    return <LoadingState type="skeleton" />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          إدارة منافذ التوزيع والفروع
        </Typography>
        {hasPermission('outlets.create') && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ fontWeight: 'bold' }}
          >
            إضافة منفذ جديد
          </Button>
        )}
      </Box>

      {/* Search & Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={4.5}>
            <TextField
              fullWidth
              size="small"
              placeholder="البحث باسم المنفذ أو الهاتف..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 280 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2.6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="gov-filter-label">المحافظة</InputLabel>
              <Select
                labelId="gov-filter-label"
                value={governorateFilter}
                label="المحافظة"
                onChange={(e) => setGovernorateFilter(e.target.value)}
              >
                <MenuItem value="">الجميع</MenuItem>
                {governorates.map((gov) => (
                  <MenuItem key={gov} value={gov}>
                    {gov}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2.6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label">فئة المنفذ</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                label="فئة المنفذ"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">الجميع</MenuItem>
                {outletTypes.map((ot) => (
                  <MenuItem key={ot.id} value={ot.id}>
                    {ot.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2.8} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">الحالة</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="الحالة"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">الجميع</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="disabled">معطل</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid listing */}
      {outlets.length === 0 ? (
        <EmptyState title="لا توجد منافذ بيع" description="لم نتمكن من العثور على أي منافذ توزيع مطابقة لمعايير البحث الحالية." />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الفئة والسعر المعتمد</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة والمدينة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الهاتف</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحساب المرتبط</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>السقف الائتماني</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outlets.map((outlet) => (
                <TableRow key={outlet.id}>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{outlet.name}</TableCell>
                  <TableCell align="right">{outlet.outlet_type_name}</TableCell>
                  <TableCell align="right">{outlet.governorate}</TableCell>
                  <TableCell align="right">{outlet.phone || '-'}</TableCell>
                  <TableCell align="right">
                    {outlet.linked_username ? (
                      <Chip label={outlet.linked_username} size="small" color="primary" variant="outlined" />
                    ) : (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>غير مرتبط</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                    {formatCurrencyEGP(outlet.credit_limit || 0)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={outlet.status === 'active' ? 'نشط' : 'معطل'}
                      color={outlet.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {hasPermission('outlets.update') && (
                        <IconButton color="primary" onClick={() => handleOpenEditModal(outlet)} title="تعديل">
                          <EditIcon />
                        </IconButton>
                      )}
                      {hasPermission('outlets.update') && (
                        <IconButton
                          color={outlet.status === 'active' ? 'error' : 'success'}
                          onClick={() => handleToggleStatus(outlet)}
                          title={outlet.status === 'active' ? 'تعطيل' : 'تفعيل'}
                        >
                          {outlet.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                        </IconButton>
                      )}
                      {hasPermission('outlets.update') && (
                        <IconButton color="error" onClick={() => handleDeleteOutlet(outlet.id)} title="حذف">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Editor Drawer */}
      {/* Editor Drawer */}
      <EntityDrawer
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={modalMode === 'create' ? 'إضافة منفذ توزيع جديد' : 'تعديل بيانات المنفذ'}
        actions={
          <>
            <Button onClick={() => setOpenModal(false)}>إلغاء</Button>
            <Button type="submit" form="outlet-editor-form" variant="contained" color="secondary">حفظ</Button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit} id="outlet-editor-form">
          <FormSection title="البيانات الأساسية للمنفذ">
            <FieldGrid columns={2}>
              <TextField
                required
                fullWidth
                size="small"
                label="اسم المنفذ / المعرض"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="form-type-label">فئة المنفذ التسعيرية</InputLabel>
                <Select
                  labelId="form-type-label"
                  value={formOutletTypeId}
                  label="فئة المنفذ التسعيرية"
                  onChange={(e) => setFormOutletTypeId(e.target.value)}
                >
                  {outletTypes.map((ot) => (
                    <MenuItem key={ot.id} value={ot.id}>
                      {ot.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="form-gov-label">المحافظة</InputLabel>
                <Select
                  labelId="form-gov-label"
                  value={formGovernorate}
                  label="المحافظة"
                  onChange={(e) => setFormGovernorate(e.target.value)}
                >
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <MenuItem key={gov} value={gov}>
                      {gov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="رقم الهاتف"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                inputProps={{ className: 'ltr-value' }}
              />
              <TextField
                type="number"
                fullWidth
                size="small"
                label="السقف الائتماني المالي"
                value={formCreditLimit}
                onChange={(e) => setFormCreditLimit(e.target.value)}
                inputProps={{ className: 'ltr-value' }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="link-user-label">ربط الحساب البرمجي (اختياري)</InputLabel>
                <Select
                  labelId="link-user-label"
                  value={formUserId}
                  label="ربط الحساب البرمجي (اختياري)"
                  onChange={(e) => setFormUserId(e.target.value)}
                >
                  <MenuItem value="">غير مرتبط</MenuItem>
                  {usersList.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.full_name} ({u.username})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="form-status-label">الحالة</InputLabel>
                <Select
                  labelId="form-status-label"
                  value={formStatus}
                  label="الحالة"
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <MenuItem value="active">نشط</MenuItem>
                  <MenuItem value="disabled">معطل</MenuItem>
                </Select>
              </FormControl>
            </FieldGrid>
          </FormSection>

          <FormSection title="العنوان والملاحظات">
            <FieldGrid columns={1}>
              <TextField
                fullWidth
                size="small"
                label="تفاصيل العنوان (شارع، بناية، رقم المكتب)"
                value={formAddressDetails}
                onChange={(e) => setFormAddressDetails(e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="ملاحظات وشروط خاصة بالمنفذ"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
              />
            </FieldGrid>
          </FormSection>
        </form>
      </EntityDrawer>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={executeDeleteOutlet}
        title="تأكيد حذف منفذ التوزيع"
        message="هل أنت متأكد من حذف هذا المنفذ؟ لا يمكن التراجع عن هذا الإجراء."
        severity="error"
        confirmText="حذف"
      />

      {/* Snackbar alerting */}
      <Snackbar
        open={!!toastMsg}
        autoHideDuration={4000}
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

export default Outlets;
