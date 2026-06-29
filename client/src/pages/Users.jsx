import React, { useState, useEffect } from 'react';
import { formatEgyptDate } from '../utils/formatters';
import { useAuth } from '../app/AuthContext';
import { apiClient } from '../services/apiClient';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { FormSection } from '../components/forms/FormSection';
import { FieldGrid } from '../components/forms/FieldGrid';
import { FormActions } from '../components/forms/FormActions';
import EntityDrawer from '../components/EntityDrawer';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  Drawer,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
  VpnKey as VpnKeyIcon,
  Search as SearchIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@mui/icons-material';

const roleTranslations = {
  super_admin: 'مدير النظام (سوبر أدمن)',
  admin: 'مدير',
  accountant: 'محاسب مالي',
  inventory_manager: 'مسؤول المخازن والجرد',
  sales_staff: 'موظف مبيعات وتوزيع',
  shipping_user: 'مسؤول الشحن واللوجستيات',
  readonly_viewer: 'مراقب عام (قراءة فقط)',
  author: 'حساب مؤلف كتب',
  outlet: 'منفذ توزيع / فرع',
  assistant: 'مساعد إداري',
  visitor: 'حساب زائر (ماليات فقط)'
};

const permissionTranslations = {
  'users.view': { name: 'عرض الحسابات', desc: 'استعراض قائمة مستخدمي النظام وتفاصيلهم.' },
  'users.create': { name: 'إنشاء مستخدمين', desc: 'إضافة حسابات مستخدمين جديدة للنظام.' },
  'users.update': { name: 'تعديل مستخدمين', desc: 'تعديل بيانات المستخدمين وصلاحياتهم.' },
  'users.disable': { name: 'تعطيل حسابات', desc: 'إيقاف حسابات المستخدمين مؤقتاً ومنع دخولهم.' },
  'users.archive': { name: 'أرشفة وحذف', desc: 'أرشفة حسابات المستخدمين وحذفها نهائياً.' },
  'roles.manage': { name: 'إدارة الأدوار والصلاحيات (RBAC)', desc: 'إدارة مصفوفة توزيع صلاحيات الأدوار الوظيفية.' },
  'permissions.manage': { name: 'إدارة الصلاحيات التفصيلية', desc: 'إدارة الصلاحيات الفردية المسجلة بالخلفية.' },
  'authors.view': { name: 'عرض المؤلفين', desc: 'استعراض دليل وبيانات المؤلفين المسجلين.' },
  'authors.create': { name: 'إضافة مؤلفين', desc: 'تسجيل مؤلفين جدد في دليل النظام.' },
  'authors.update': { name: 'تعديل المؤلفين', desc: 'تحديث بيانات وعناوين وحسابات المؤلفين.' },
  'products.view': { name: 'عرض الكتب والمنتجات', desc: 'تصفح وعرض دليل الكتب والمنتجات وتفاصيلها.' },
  'products.create': { name: 'إضافة منتجات جديدة', desc: 'إدراج كتب ومنتجات جديدة وتفاصيل SKU.' },
  'products.update': { name: 'تعديل منتجات قائمة', desc: 'تحديث تفاصيل الكتب والبيانات الفنية للمنتجات.' },
  'products.delete': { name: 'حذف منتجات', desc: 'حذف الكتب أو المنتجات من النظام نهائياً.' },
  'product_prices.view': { name: 'عرض لوائح الأسعار', desc: 'استعراض تفاصيل الأسعار حسب فئات منافذ البيع.' },
  'product_prices.update': { name: 'تحديث الأسعار', desc: 'تعديل وتحديث لوائح أسعار المنتجات المعتمدة.' },
  'outlet_types.view': { name: 'عرض فئات المنافذ', desc: 'عرض تصنيفات وفئات منافذ البيع.' },
  'outlet_types.manage': { name: 'إدارة فئات المنافذ', desc: 'إنشاء وتعديل وتفعيل فئات تصنيف المنافذ.' },
  'outlets.view': { name: 'عرض الفروع والمنافذ', desc: 'تصفح دليل منافذ البيع والفروع الموزعة.' },
  'outlets.create': { name: 'إضافة منافذ توزيع', desc: 'تسجيل منفذ توزيع أو فرع جديد في النظام.' },
  'outlets.update': { name: 'تعديل منافذ التوزيع', desc: 'تحديث عناوين وهواتف وحدود الائتمان للمنافذ.' },
  'outlets.disable': { name: 'تعطيل منافذ التوزيع', desc: 'إيقاف التعامل مؤقتاً مع منفذ توزيع معين.' },
  'invoices.view': { name: 'عرض الفواتير المبيعات', desc: 'تصفح سجل الفواتير وحالات السداد والتفاصيل.' },
  'invoices.create': { name: 'إنشاء فواتير جديدة', desc: 'تسجيل فواتير مبيعات صادرة جديدة للمنافذ.' },
  'invoices.update': { name: 'تعديل الفواتير', desc: 'تعديل بيانات الفواتير المعلقة قبل الترحيل.' },
  'invoices.cancel': { name: 'إلغاء الفواتير', desc: 'إلغاء فواتير البيع الصادرة وعكس تأثيرها.' },
  'invoices.export': { name: 'تصدير فواتير', desc: 'تنزيل فواتير المبيعات كملفات خارجية.' },
  'payments.view': { name: 'عرض المقبوضات والدفعات', desc: 'استعراض سجل حركات المقبوضات وسداد الفواتير.' },
  'payments.create': { name: 'تسجيل مقبوضات جديدة', desc: 'إدخال دفعات سداد نقدية أو بنكية لصالح الفواتير.' },
  'payments.reverse': { name: 'إلغاء وعكس المقبوضات', desc: 'عكس حركة المقبوضات وإرجاع المديونية للفاتورة.' },
  'inventory.view': { name: 'عرض المخزون وواردات الكتب', desc: 'استعراض رصيد المخازن الحالي وحركات الوارد.' },
  'inventory.receipts.create': { name: 'تسجيل واردات مخزن', desc: 'إدخال شحنات كتب واردة جديدة للمستودع لزيادة الرصيد.' },
  'inventory.adjustments.create': { name: 'تسجيل تسوية جرد', desc: 'إجراء تعديلات جردية يدوية للمخزون (عجز/زيادة).' },
  'shipments.view': { name: 'عرض الشحنات والطرود', desc: 'متابعة سجل شحن الفواتير وحالات التوصيل.' },
  'shipments.create': { name: 'إنشاء شحنات جديدة', desc: 'شحن الفواتير وتوليد طرود شحن للمنافذ.' },
  'shipments.update': { name: 'تحديث حالة الشحن', desc: 'تحديث حالات الشحنات (شحن جزئي، تم التوصيل، إلخ).' },
  'reports.view': { name: 'عرض التقارير المتقدمة', desc: 'استعراض الرسوم البيانية والملخصات الإدارية المجمعة.' },
  'reports.export': { name: 'تصدير التقارير', desc: 'استخراج وتصدير التقارير بصيغ Excel أو PDF.' },
  'exports.run': { name: 'تصدير البيانات لقاعدة البيانات', desc: 'استخراج الجداول الأساسية كملفات CSV.' },
  'audit.view': { name: 'عرض سجل التدقيق والعمليات', desc: 'مراقبة سجل عمليات المستخدمين وتعديلاتهم.' },
  'settings.update': { name: 'تحديث الإعدادات العامة', desc: 'تحديث خيارات النظام العامة والتحكم.' },
  'backup.create': { name: 'إنشاء نسخ احتياطية', desc: 'أخذ نسخة احتياطية من قاعدة البيانات بالكامل.' },
  'backup.restore': { name: 'استعادة نسخ احتياطية', desc: 'استعادة النظام لحالة نسخة احتياطية سابقة.' },
  'finance.view': { name: 'عرض الخزينة والحركات المالية', desc: 'تتبع ملخصات النقدية ومقادير التوريد المعلقة.' },
  'finance.adjust': { name: 'تسجيل تسوية مالية يدوية', desc: 'عمل قيود تسوية يدوية لزيادة/نقص النقدية بالفروع.' },
  'finance.export': { name: 'تصدير بيانات المالية', desc: 'تصدير كشوف الحسابات وحركات الخزينة.' },
  'finance.statement.view': { name: 'كشف حساب تفصيلي للعميل', desc: 'توليد وعرض كشف حساب أستاذ تفصيلي لكل منفذ بيع.' },
  'payments.mark_supplied': { name: 'توريد مقبوضات الفروع', desc: 'تعليم الدفعات بأنها وردت لخزينة الشركة.' },
  'payments.supply_batch': { name: 'توريد دفعات مجمعة', desc: 'إرسال حزمة مقبوضات دفعة واحدة للخزينة.' },
  'notifications.view': { name: 'عرض الإشعارات والتحذيرات', desc: 'مشاهدة إشعارات العجز وحدود الائتمان.' },
  'notifications.manage': { name: 'إدارة وتجاهل الإشعارات', desc: 'معالجة الإشعارات وحلها أو تجاهلها بالكامل.' }
};

const translateRoleName = (name) => roleTranslations[name] || name;
const translatePermission = (name) => permissionTranslations[name] || { name, desc: '' };

export const Users = () => {
  const { user: currentUser, hasPermission } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  // Loading & Notification state
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  // Users data state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [rolesList, setRolesList] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);

  // Modals state
  const [openUserModal, setOpenUserModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // create or edit
  const [selectedUser, setSelectedUser] = useState(null);

  // User form state
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formFullName, setFormFullName] = useState('');
  const [formStatus, setFormStatus] = useState('active');
  const [formRoles, setFormRoles] = useState([]);

  // Reset password modal state
  const [openResetModal, setOpenResetModal] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState(null);
  const [resetNewPassword, setResetNewPassword] = useState('');

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userIdToArchive, setUserIdToArchive] = useState(null);

  // Permissions Matrix state
  const [selectedMatrixRoleId, setSelectedMatrixRoleId] = useState('');
  const [matrixPermissions, setMatrixPermissions] = useState([]); // array of permission IDs

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      if (hasPermission('users.view')) {
        const usersData = await apiClient.get(`/users?search=${search}`);
        setUsers(usersData);
      }
      
      if (hasPermission('roles.manage')) {
        const rolesData = await apiClient.get('/users/roles');
        setRolesList(rolesData);
        
        const permsData = await apiClient.get('/users/permissions');
        setPermissionsList(permsData);

        if (rolesData.length > 0 && !selectedMatrixRoleId) {
          setSelectedMatrixRoleId(rolesData[0].id);
          // Set checked permissions for the first role
          const rolePerms = permsData.filter(p => rolesData[0].permissions.includes(p.name)).map(p => p.id);
          setMatrixPermissions(rolePerms);
        }
      }
    } catch (err) {
      console.error(err);
      showToast(err.message || 'حدث خطأ في تحميل البيانات.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const showToast = (msg, severity = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
  };

  // User creation/editing handler
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === 'create' && (!formUsername || !formPassword || !formFullName)) {
      showToast('يرجى تعبئة كافة الحقول المطلوبة.', 'error');
      return;
    }
    if (modalMode === 'edit' && !formFullName) {
      showToast('حقل الاسم الكامل مطلوب.', 'error');
      return;
    }

    try {
      if (modalMode === 'create') {
        await apiClient.post('/users', {
          username: formUsername,
          password: formPassword,
          fullName: formFullName,
          status: formStatus,
          roles: formRoles
        });
        showToast('تم إنشاء الحساب بنجاح.');
      } else {
        await apiClient.put(`/users/${selectedUser.id}`, {
          fullName: formFullName,
          roles: formRoles
        });
        showToast('تم تعديل بيانات الحساب بنجاح.');
      }
      setOpenUserModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل في حفظ البيانات.', 'error');
    }
  };

  // Toggle user status (active vs disabled)
  const handleToggleStatus = async (user) => {
    const targetStatus = user.status === 'active' ? 'disabled' : 'active';
    try {
      await apiClient.put(`/users/${user.id}/status`, { status: targetStatus });
      showToast(`تم ${targetStatus === 'active' ? 'تفعيل' : 'تعطيل'} الحساب بنجاح.`);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تعديل حالة الحساب.', 'error');
    }
  };

  // Soft delete / Archive user
  const handleArchiveUser = (userId) => {
    setUserIdToArchive(userId);
    setConfirmOpen(true);
  };

  const executeArchiveUser = async () => {
    if (!userIdToArchive) return;
    try {
      await apiClient.delete(`/users/${userIdToArchive}`);
      showToast('تم أرشفة الحساب بنجاح.');
      fetchData();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل أرشفة الحساب.', 'error');
    } finally {
      setConfirmOpen(false);
      setUserIdToArchive(null);
    }
  };

  // Admin resets another user's password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetNewPassword) return;

    try {
      await apiClient.post(`/auth/reset-password/${resetPasswordUser.id}`, {
        newPassword: resetNewPassword
      });
      showToast(`تم إعادة تعيين كلمة المرور للمستخدم '${resetPasswordUser.username}' بنجاح.`);
      setOpenResetModal(false);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل تعيين كلمة المرور.', 'error');
    }
  };

  // Role permissions matrix selection
  const handleMatrixRoleChange = (roleId) => {
    setSelectedMatrixRoleId(roleId);
    const targetRole = rolesList.find(r => r.id === roleId);
    if (targetRole) {
      const activePermIds = permissionsList
        .filter(p => targetRole.permissions.includes(p.name))
        .map(p => p.id);
      setMatrixPermissions(activePermIds);
    }
  };

  // Toggle permission checkbox
  const handleToggleMatrixPermission = (permId) => {
    if (matrixPermissions.includes(permId)) {
      setMatrixPermissions(matrixPermissions.filter(id => id !== permId));
    } else {
      setMatrixPermissions([...matrixPermissions, permId]);
    }
  };

  // Save role permissions changes
  const handleSaveMatrixPermissions = async () => {
    try {
      await apiClient.post(`/users/roles/${selectedMatrixRoleId}/permissions`, {
        permissionIds: matrixPermissions
      });
      showToast('تم حفظ الصلاحيات للأدوار بنجاح.');
      
      // Reload roles definitions
      const rolesData = await apiClient.get('/users/roles');
      setRolesList(rolesData);
    } catch (err) {
      console.error(err);
      showToast(err.message || 'فشل حفظ الصلاحيات.', 'error');
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedUser(null);
    setFormUsername('');
    setFormPassword('');
    setFormFullName('');
    setFormStatus('active');
    setFormRoles([]);
    setOpenUserModal(true);
  };

  const handleOpenEditModal = (u) => {
    setModalMode('edit');
    setSelectedUser(u);
    setFormUsername(u.username);
    setFormFullName(u.full_name);
    setFormStatus(u.status);
    setFormRoles(u.roles || []);
    setOpenUserModal(true);
  };

  const handleOpenResetModal = (u) => {
    setResetPasswordUser(u);
    setResetNewPassword('');
    setOpenResetModal(true);
  };

  if (loading && users.length === 0 && rolesList.length === 0) {
    return <LoadingState type="skeleton" />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          إدارة الصلاحيات والمستخدمين
        </Typography>
        {tabValue === 0 && hasPermission('users.create') && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ fontWeight: 'bold' }}
          >
            إضافة مستخدم جديد
          </Button>
        )}
      </Box>

      {/* Tabs loader */}
      <Tabs
        value={tabValue}
        onChange={(e, nv) => setTabValue(nv)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label="حسابات المستخدمين" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} />
        {hasPermission('roles.manage') && <Tab label="جدول صلاحيات الأدوار (RBAC)" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} />}
      </Tabs>

      {/* Tab 0: Users Management */}
      {tabValue === 0 && (
        <Box>
          {/* Search bar */}
          <TextField
            fullWidth
            placeholder="البحث باسم المستخدم أو الاسم الكامل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 3, minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {users.length === 0 ? (
            <EmptyState title="لا يوجد مستخدمين" description="لم نتمكن من العثور على أي حسابات مستخدمين مطابقة للبحث." />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المستخدم</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>الاسم الكامل</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>الأدوار</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاريخ الإنشاء</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>{u.username}</TableCell>
                      <TableCell align="right">{u.full_name}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {u.roles?.map((r) => (
                            <Chip key={r} label={translateRoleName(r)} size="small" color="primary" variant="outlined" />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={u.status === 'active' ? 'نشط' : 'معطل'}
                          color={u.status === 'active' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {formatEgyptDate(u.created_at)}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          {hasPermission('users.update') && (
                            <IconButton color="primary" onClick={() => handleOpenEditModal(u)} title="تعديل">
                              <EditIcon />
                            </IconButton>
                          )}
                          {hasPermission('users.update') && (
                            <IconButton color="warning" onClick={() => handleOpenResetModal(u)} title="إعادة تعيين كلمة المرور">
                              <VpnKeyIcon />
                            </IconButton>
                          )}
                          {hasPermission('users.disable') && u.id !== currentUser.id && (
                            <IconButton
                              color={u.status === 'active' ? 'error' : 'success'}
                              onClick={() => handleToggleStatus(u)}
                              title={u.status === 'active' ? 'تعطيل' : 'تفعيل'}
                            >
                              {u.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                            </IconButton>
                          )}
                          {hasPermission('users.archive') && u.id !== currentUser.id && (
                            <IconButton color="error" onClick={() => handleArchiveUser(u.id)} title="أرشفة/حذف">
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
        </Box>
      )}

      {/* Tab 1: Permissions Matrix */}
      {tabValue === 1 && hasPermission('roles.manage') && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="select-role-label">اختر الدور الوظيفي</InputLabel>
              <Select
                labelId="select-role-label"
                value={selectedMatrixRoleId}
                label="اختر الدور الوظيفي"
                onChange={(e) => handleMatrixRoleChange(e.target.value)}
              >
                {rolesList.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {translateRoleName(r.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SaveIcon />}
              onClick={handleSaveMatrixPermissions}
              sx={{ fontWeight: 'bold' }}
            >
              حفظ تغييرات الصلاحيات
            </Button>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            حدد الصلاحيات الممنوحة لهذا الدور:
          </Typography>

          <Grid container spacing={2}>
            {permissionsList.map((p) => {
              const isChecked = matrixPermissions.includes(p.id);
              return (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => handleToggleMatrixPermission(p.id)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {translatePermission(p.name).name}
                        </Typography>
                        {(translatePermission(p.name).desc || p.description) && (
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            {translatePermission(p.name).desc || p.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      )}

      {/* Create / Edit User Drawer */}
      <EntityDrawer
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        title={modalMode === 'create' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}
        actions={
          <>
            <Button onClick={() => setOpenUserModal(false)}>إلغاء</Button>
            <Button type="submit" form="user-editor-form" variant="contained" color="secondary">حفظ</Button>
          </>
        }
      >
        <form onSubmit={handleUserSubmit} id="user-editor-form">
          <FormSection title="تفاصيل حساب المستخدم">
            <FieldGrid columns={1}>
              <TextField
                required
                fullWidth
                size="small"
                label="اسم المستخدم"
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
                disabled={modalMode === 'edit'}
                inputProps={{ className: 'ltr-value' }}
              />
              {modalMode === 'create' && (
                <TextField
                  required
                  fullWidth
                  size="small"
                  type="password"
                  label="كلمة المرور"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  inputProps={{ className: 'ltr-value' }}
                />
              )}
              <TextField
                required
                fullWidth
                size="small"
                label="الاسم الكامل"
                value={formFullName}
                onChange={(e) => setFormFullName(e.target.value)}
              />

              <FormControl fullWidth size="small">
                <InputLabel id="form-roles-label">الأدوار الممنوحة</InputLabel>
                <Select
                  labelId="form-roles-label"
                  multiple
                  value={formRoles}
                  label="الأدوار الممنوحة"
                  onChange={(e) => setFormRoles(e.target.value)}
                  renderValue={(selected) => (
                    <Box className="roles-chip-container">
                      {selected.map((value) => (
                        <Chip key={value} label={translateRoleName(value)} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {rolesList.map((r) => (
                    <MenuItem key={r.id} value={r.name}>
                      {translateRoleName(r.name)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FieldGrid>
          </FormSection>
        </form>
      </EntityDrawer>

      {/* Reset Password Dialog */}
      <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          إعادة تعيين كلمة المرور
        </DialogTitle>
        <form onSubmit={handleResetPassword}>
          <DialogContent dividers>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              سيتم تغيير كلمة المرور للمستخدم <strong>{resetPasswordUser?.username}</strong>
            </Typography>
            <TextField
              required
              fullWidth
              type="password"
              label="كلمة المرور الجديدة"
              value={resetNewPassword}
              onChange={(e) => setResetNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenResetModal(false)}>إلغاء</Button>
            <Button type="submit" variant="contained" color="warning">
              تحديث
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={executeArchiveUser}
        title="تأكيد أرشفة الحساب"
        message="هل أنت متأكد من أرشفة هذا الحساب؟ لا يمكن التراجع عن هذا الإجراء."
        severity="error"
        confirmText="أرشفة"
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

export default Users;
