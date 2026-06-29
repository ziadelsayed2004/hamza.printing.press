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
  Divider,
  Stack
} from '@mui/material';
import {
  Book as BookIcon,
  AttachMoney as PriceIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Receipt as InvoiceIcon,
  Payment as PaymentIcon,
  Inventory as LedgerIcon,
  FileDownload as DownloadIcon,
  Loop as ReturnIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

export const Exports = () => {
  const { hasPermission } = useAuth();
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const showToast = (msg, severity = 'success') => { setToastMsg(msg); setToastSeverity(severity); };

  const exportSectors = [
    {
      name: 'القطاع المالي والمبيعات',
      description: 'تقارير الفواتير والمقبوضات والحسابات المالية والتسويات.',
      color: '#2ecc71',
      modules: [
        {
          title: 'سجل الفواتير الصادرة',
          description: 'تصدير كامل فواتير البيع المصدرة متضمنة المنفذ، القيمة، والتاريخ وحالة السداد والشحن.',
          icon: <InvoiceIcon sx={{ fontSize: 28, color: '#e67e22' }} />,
          endpoint: '/exports/invoices',
          filename: 'invoices_export.csv'
        },
        {
          title: 'سجل المقبوضات والدفعات',
          description: 'تصدير حركات المقبوضات المالية والدفعات المضافة للنظام ووسائل الدفع.',
          icon: <PaymentIcon sx={{ fontSize: 28, color: '#9b59b6' }} />,
          endpoint: '/exports/payments',
          filename: 'payments_export.csv'
        }
      ]
    },
    {
      name: 'قطاع المخزون والخدمات اللوجستية',
      description: 'تقارير حركة المستودعات، الشحنات الصادرة، وإدارة مرتجعات المبيعات.',
      color: '#3498db',
      modules: [
        {
          title: 'دفتر حركات المخزون',
          description: 'تصدير دفتر الأستاذ لحركات المستودعات (الوارد، الصادر، المرتجعات، التسويات المخزنية).',
          icon: <LedgerIcon sx={{ fontSize: 28, color: '#1abc9c' }} />,
          endpoint: '/exports/inventory',
          filename: 'inventory_export.csv'
        },
        {
          title: 'سجل الشحنات والطرود الصادرة',
          description: 'تصدير كامل بيانات الطرود والشحنات المرسلة للمنافذ مع أرقام التتبع وتكلفة الشحن.',
          icon: <ShippingIcon sx={{ fontSize: 28, color: '#34495e' }} />,
          endpoint: '/exports/shipments',
          filename: 'shipments_export.csv'
        },
        {
          title: 'سجل المرتجعات والمسترجعات',
          description: 'تصدير حركات مرتجعات مبيعات الكتب بالتفصيل مع قيمة المرتجع وسبب الارتجاع.',
          icon: <ReturnIcon sx={{ fontSize: 28, color: '#e74c3c' }} />,
          endpoint: '/exports/returns',
          filename: 'returns_export.csv'
        }
      ]
    },
    {
      name: 'قطاع البيانات الأساسية والتعريفات',
      description: 'دليل الكتب والمنتجات، لوائح الأسعار المعتمدة، وسجلات المؤلفين ومنافذ التوزيع.',
      color: '#f1c40f',
      modules: [
        {
          title: 'دليل المنتجات والكتب',
          description: 'تصدير كامل المنتجات والكتب المسجلة في النظام مع تفاصيل SKU والبيانات الفنية.',
          icon: <BookIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
          endpoint: '/exports/products',
          filename: 'products_export.csv'
        },
        {
          title: 'قوائم الأسعار التفصيلية',
          description: 'تصدير أسعار الكتب والمنتجات الموزعة والمخصصة لكل فئة منفذ بيع.',
          icon: <PriceIcon sx={{ fontSize: 28, color: 'success.main' }} />,
          endpoint: '/exports/prices',
          filename: 'prices_export.csv'
        },
        {
          title: 'قائمة منافذ البيع والفروع',
          description: 'تصدير دليل فروع ومنافذ البيع بالتفصيل مع المحافظات وأرقام الهواتف والتصنيف.',
          icon: <StoreIcon sx={{ fontSize: 28, color: 'secondary.main' }} />,
          endpoint: '/exports/outlets',
          filename: 'outlets_export.csv'
        },
        {
          title: 'سجل وأسماء المؤلفين',
          description: 'تصدير قائمة المؤلفين ومعلومات الاتصال وحسابات المؤلفين المرتبطة.',
          icon: <PeopleIcon sx={{ fontSize: 28, color: 'info.main' }} />,
          endpoint: '/exports/authors',
          filename: 'authors_export.csv'
        }
      ]
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
      <Box sx={{ mb: 4 }}>
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
        <Stack spacing={5}>
          {exportSectors.map((sector, sIdx) => (
            <Box key={sIdx} sx={{ position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 1.5 }}>
                <Box sx={{ width: 6, height: 24, borderRadius: 1, bgcolor: sector.color }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {sector.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.2 }}>
                    {sector.description}
                  </Typography>
                </Box>
              </Box>
              
              <Grid container spacing={3}>
                {sector.modules.map((mod, mIdx) => (
                  <Grid item xs={12} sm={6} md={4} key={mIdx}>
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      transition: 'all 0.25s ease-in-out', 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderTop: `4px solid ${sector.color}`,
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.08)',
                        borderColor: 'transparent'
                      } 
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                          <Box sx={{ 
                            p: 1.5, 
                            borderRadius: '10px', 
                            bgcolor: `${sector.color}15`, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            {mod.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.975rem', color: 'text.primary', lineHeight: 1.4 }}>
                            {mod.title}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1.5, opacity: 0.6 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.85rem' }}>
                          {mod.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 3, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleExport(mod.endpoint)}
                          startIcon={<DownloadIcon />}
                          sx={{ 
                            py: 1, 
                            fontWeight: 'bold', 
                            borderRadius: 2,
                            borderColor: `${sector.color}60`,
                            color: 'text.primary',
                            transition: 'all 0.2s',
                            '&:hover': {
                              bgcolor: sector.color,
                              borderColor: sector.color,
                              color: '#fff'
                            }
                          }}
                        >
                          تصدير ملف CSV
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>
      )}

      <Snackbar open={!!toastMsg} autoHideDuration={4000} onClose={() => setToastMsg('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Exports;
