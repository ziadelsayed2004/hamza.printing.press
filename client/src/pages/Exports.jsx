import React, { useState } from 'react';
import { useAuth } from '../app/AuthContext';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import {
  Book as BookIcon,
  AttachMoney as PriceIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Receipt as InvoiceIcon,
  Payment as PaymentIcon,
  Inventory as LedgerIcon,
  FileDownload as DownloadIcon
} from '@mui/icons-material';

export const Exports = () => {
  const { hasPermission } = useAuth();
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const showToast = (msg, severity = 'success') => { setToastMsg(msg); setToastSeverity(severity); };

  const exportModules = [
    {
      title: 'دليل المنتجات والكتب',
      description: 'تصدير كامل المنتجات والكتب المسجلة في النظام مع تفاصيل SKU والبيانات الفنية.',
      icon: <BookIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      endpoint: '/exports/products',
      filename: 'products_export.csv'
    },
    {
      title: 'قوائم الأسعار التفصيلية',
      description: 'تصدير أسعار الكتب والمنتجات الموزعة والمخصصة لكل فئة منفذ بيع.',
      icon: <PriceIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      endpoint: '/exports/prices',
      filename: 'prices_export.csv'
    },
    {
      title: 'سجل وأسماء المؤلفين',
      description: 'تصدير قائمة المؤلفين ومعلومات الاتصال وحسابات المؤلفين المرتبطة.',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      endpoint: '/exports/authors',
      filename: 'authors_export.csv'
    },
    {
      title: 'قائمة منافذ البيع والفروع',
      description: 'تصدير دليل فروع ومنافذ البيع بالتفصيل مع المحافظات وأرقام الهواتف والتصنيف.',
      icon: <StoreIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      endpoint: '/exports/outlets',
      filename: 'outlets_export.csv'
    },
    {
      title: 'سجل الفواتير الصادرة',
      description: 'تصدير كامل فواتير البيع المصدرة متضمنة المنفذ، القيمة، والتاريخ وحالة السداد والشحن.',
      icon: <InvoiceIcon sx={{ fontSize: 40, color: '#e67e22' }} />,
      endpoint: '/exports/invoices',
      filename: 'invoices_export.csv'
    },
    {
      title: 'سجل المقبوضات والدفعات',
      description: 'تصدير حركات المقبوضات المالية والدفعات المضافة للنظام ووسائل الدفع.',
      icon: <PaymentIcon sx={{ fontSize: 40, color: '#9b59b6' }} />,
      endpoint: '/exports/payments',
      filename: 'payments_export.csv'
    },
    {
      title: 'دفتر حركات المخزون',
      description: 'تصدير دفتر الأستاذ لحركات المستودعات (الوارد، الصادر، المرتجعات، التسويات المخزنية).',
      icon: <LedgerIcon sx={{ fontSize: 40, color: '#1abc9c' }} />,
      endpoint: '/exports/inventory',
      filename: 'inventory_export.csv'
    }
  ];

  const handleExport = (endpoint) => {
    if (!hasPermission('exports.run')) {
      showToast('ليس لديك صلاحية تصدير البيانات', 'error');
      return;
    }
    const downloadUrl = `/api${endpoint}`;
    window.open(downloadUrl, '_blank');
    showToast('تم إرسال طلب التصدير، جاري التنزيل...', 'success');
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
          تصدير البيانات والنسخ الاحتياطي
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          تنزيل سجلات وجداول قاعدة البيانات كملفات CSV مهيأة للعمل عليها في برامج معالجة البيانات مثل Excel.
        </Typography>
      </Box>

      {!hasPermission('exports.run') ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          تنبيه: أنت لا تملك صلاحية `exports.run` لتصدير السجلات أو إجراء النسخ الاحتياطي للبيانات. يرجى مراجعة المسؤول.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {exportModules.map((mod, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#f8f9fa', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {mod.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {mod.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {mod.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport(mod.endpoint)}
                  >
                    تحميل ملف CSV
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={!!toastMsg} autoHideDuration={4000} onClose={() => setToastMsg('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Exports;
