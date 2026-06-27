import React, { useState, useEffect } from 'react';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { FormSection } from '../components/forms/FormSection';
import { FieldGrid } from '../components/forms/FieldGrid';
import { FormActions } from '../components/forms/FormActions';
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
  IconButton,
  Chip,
  Drawer,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import ConfirmDialog from '../components/ConfirmDialog';

export const OutletTypes = () => {
  const { hasPermission } = useAuth();
  
  // Data State
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog State
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedType, setSelectedType] = useState(null);

  // Deletion Confirm Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [typeIdToDelete, setTypeIdToDelete] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('active');

  // Notifications Toast State
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/outlet-types?limit=100');
      setTypes(data);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تحميل فئات المنافذ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedType(null);
    setFormName('');
    setFormDescription('');
    setFormStatus('active');
    setOpenModal(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode('edit');
    setSelectedType(item);
    setFormName(item.name);
    setFormDescription(item.description || '');
    setFormStatus(item.status);
    setOpenModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formName) {
      showToast('اسم الفئة مطلوب.', 'error');
      return;
    }

    const payload = {
      name: formName,
      description: formDescription,
      status: formStatus
    };

    try {
      if (modalMode === 'create') {
        await apiClient.post('/outlet-types', payload);
        showToast('تم إضافة فئة المنفذ بنجاح.');
      } else {
        await apiClient.put(`/outlet-types/${selectedType.id}`, payload);
        showToast('تم تحديث فئة المنفذ بنجاح.');
      }
      setOpenModal(false);
      fetchTypes();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل حفظ التعديلات.', 'error');
    }
  };

  const handleDeleteType = (id) => {
    setTypeIdToDelete(id);
    setConfirmOpen(true);
  };

  const executeDeleteType = async () => {
    if (!typeIdToDelete) return;
    try {
      await apiClient.delete(`/outlet-types/${typeIdToDelete}`);
      showToast('تم حذف فئة منفذ التوزيع بنجاح.');
      fetchTypes();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل حذف فئة منفذ التوزيع لوجود ارتباطات قائمة.', 'error');
    } finally {
      setConfirmOpen(false);
      setTypeIdToDelete(null);
    }
  };

  if (loading && types.length === 0) {
    return <LoadingState type="skeleton" />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          إدارة فئات منافذ التوزيع
        </Typography>
        {hasPermission('outlet_types.manage') && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ fontWeight: 'bold' }}
          >
            إضافة فئة جديدة
          </Button>
        )}
      </Box>

      {types.length === 0 ? (
        <EmptyState title="لا توجد فئات منافذ" description="لم يتم تسجيل أي فئات منافذ توزيع في النظام بعد." />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم الفئة</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الوصف والبيانات الإضافية</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {types.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                  <TableCell align="right">{item.description || '-'}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={item.status === 'active' ? 'نشط' : 'معطل'}
                      color={item.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {hasPermission('outlet_types.manage') ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleOpenEditModal(item)} title="تعديل">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteType(item.id)} title="حذف">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Editor Drawer */}
      <EntityDrawer
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={modalMode === 'create' ? 'إضافة فئة منفذ توزيع' : 'تعديل فئة منفذ توزيع'}
      >
        <form onSubmit={handleFormSubmit} className="entity-drawer__form">
          <Box className="entity-drawer__content">
            <FormSection title="بيانات فئة منفذ التوزيع">
              <FieldGrid columns={1}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="اسم الفئة (مثال: جملة، مفرق، معارض خارجية)"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  label="الوصف والتفاصيل"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
                <FormControl fullWidth size="small">
                  <InputLabel id="status-label">الحالة</InputLabel>
                  <Select
                    labelId="status-label"
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
          </Box>
          <FormActions className="entity-drawer__actions">
            <Button onClick={() => setOpenModal(false)}>إلغاء</Button>
            <Button type="submit" variant="contained" color="secondary">حفظ</Button>
          </FormActions>
        </form>
      </EntityDrawer>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={executeDeleteType}
        title="تأكيد حذف فئة منفذ التوزيع"
        message="هل أنت متأكد من حذف فئة منفذ التوزيع هذه؟ لا يمكن التراجع عن هذا الإجراء."
        severity="error"
        confirmText="حذف"
      />

      {/* Snackbar alerts */}
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

export default OutletTypes;
