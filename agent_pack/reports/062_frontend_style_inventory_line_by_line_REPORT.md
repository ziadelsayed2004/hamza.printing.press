# Step Completion Report - 062 Style Inventory

## Selected step

- ID: 062
- Title: Frontend Style Inventory Line By Line
- Status: done

## Summary

Created a comprehensive line-by-line frontend style debt inventory scanning all JSX/JS files in `client/src/`. We identified every instance of `style={{`, `sx={{`, hardcoded colors, hardcoded Arabic text, and left-alignments to establish the migration contract and clean-up roadmap.

## Style Scan Statistics

- Total JSX/JS files scanned: 29
- Total issues identified: 2525

## Inventory details

### [App.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/App.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 32 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 33 | **Arabic Text** | `<Typography>جاري التحميل...</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 51 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 52 | **Arabic Text** | `<Typography>جاري التحميل...</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 66 | **sx={{** | `<Paper sx={{ p: 4, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 67 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 67 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 70 | **sx={{** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 70 | **Hardcoded Color** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 71 | **Arabic Text** | `هذه الصفحة قيد التطوير وسيتم تفعيلها في خطوة العمل القادمة.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 115 | **Arabic Text** | `<Route path="imports" element={<PlaceholderPage title="استيراد البيانات من Excel" />} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

### [components/Breadcrumbs.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/components/Breadcrumbs.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 8 | **Arabic Text** | `'users': 'المستخدمين والأدوار',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 9 | **Arabic Text** | `'outlet-types': 'فئات منافذ التوزيع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 10 | **Arabic Text** | `'outlets': 'المنافذ والفروع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 11 | **Arabic Text** | `'authors': 'المؤلفين',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 12 | **Arabic Text** | `'products': 'الكتب والمنتجات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 13 | **Arabic Text** | `'inventory': 'سجل الوارد وحركة المخزون',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 14 | **Arabic Text** | `'invoices': 'إدارة فواتير المبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 15 | **Arabic Text** | `'payments': 'سجل المدفوعات والتحصيل',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 16 | **Arabic Text** | `'shipments': 'تتبع وإصدار الشحنات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 17 | **Arabic Text** | `'reports': 'التقارير والإحصائيات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 18 | **Arabic Text** | `'imports': 'استيراد البيانات من Excel',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 19 | **Arabic Text** | `'exports': 'تصدير البيانات والنسخ الاحتياطي',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 20 | **Arabic Text** | `'audit': 'سجل العمليات (Audit Logs)'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 33 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 37 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 38 | **Hardcoded Color** | `color: 'text.secondary',` | Reference values via CSS variables or standard MUI components classes. |
| 49 | **sx={{** | `sx={{ display: 'flex', alignItems: 'center' }}` | Move component styling to a separate CSS file and assign a class name. |
| 51 | **sx={{** | `<HomeIcon sx={{ mr: 0.5, ml: 0.5, fontSize: 20 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 52 | **Arabic Text** | `الرئيسية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **sx={{** | `<Typography color="text.primary" key={name} sx={{ fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |

### [components/EmptyState.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/components/EmptyState.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 6 | **Arabic Text** | `title = 'لا توجد بيانات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 7 | **Arabic Text** | `description = 'لم نتمكن من العثور على أي سجلات مطابقة للبحث أو الفرز الحالي.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 8 | **sx={{** | `icon = <InfoOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 8 | **Hardcoded Color** | `icon = <InfoOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 15 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 30 | **sx={{** | `<Box sx={{ mb: 2 }}>{icon}</Box>` | Move component styling to a separate CSS file and assign a class name. |
| 31 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 31 | **Hardcoded Color** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 34 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 34 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 42 | **sx={{** | `sx={{ fontWeight: 'bold', px: 3, py: 1 }}` | Move component styling to a separate CSS file and assign a class name. |

### [components/ErrorBoundary.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/components/ErrorBoundary.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 25 | **style={{** | `<div style={styles.container}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 26 | **style={{** | `<div style={styles.card}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 27 | **style={{** | `<h1 style={styles.title}>عذراً، حدث خطأ ما</h1>` | Move styling to a separate page/component CSS file using CSS variables. |
| 27 | **Arabic Text** | `<h1 style={styles.title}>عذراً، حدث خطأ ما</h1>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 28 | **style={{** | `<p style={styles.subtitle}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 29 | **Arabic Text** | `لقد واجه النظام خطأً غير متوقع أثناء معالجة طلبك.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 32 | **style={{** | `<pre style={styles.errorText}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 36 | **style={{** | `<button onClick={this.handleReset} style={styles.button}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 37 | **Arabic Text** | `العودة إلى الرئيسية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Hardcoded Color** | `backgroundColor: '#f5f7fa',` | Reference values via CSS variables or standard MUI components classes. |
| 60 | **Hardcoded Color** | `backgroundColor: '#ffffff',` | Reference values via CSS variables or standard MUI components classes. |
| 62 | **Hardcoded Color** | `boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',` | Reference values via CSS variables or standard MUI components classes. |
| 69 | **Hardcoded Color** | `color: '#d32f2f',` | Reference values via CSS variables or standard MUI components classes. |
| 75 | **Hardcoded Color** | `color: '#5c6f84',` | Reference values via CSS variables or standard MUI components classes. |
| 81 | **Hardcoded Color** | `backgroundColor: '#fafafa',` | Reference values via CSS variables or standard MUI components classes. |
| 82 | **Hardcoded Color** | `border: '1px solid #eaeaea',` | Reference values via CSS variables or standard MUI components classes. |
| 86 | **Hardcoded Color** | `color: '#e53935',` | Reference values via CSS variables or standard MUI components classes. |
| 87 | **Left Alignment** | `textAlign: 'left',` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 94 | **Hardcoded Color** | `backgroundColor: '#1976d2',` | Reference values via CSS variables or standard MUI components classes. |
| 95 | **Hardcoded Color** | `color: '#ffffff',` | Reference values via CSS variables or standard MUI components classes. |
| 104 | **Hardcoded Color** | `boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)'` | Reference values via CSS variables or standard MUI components classes. |

### [components/LoadingState.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/components/LoadingState.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 4 | **Arabic Text** | `export const LoadingState = ({ type = 'spinner', message = 'جاري تحميل البيانات...', rows = 5 }) => {` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 7 | **sx={{** | `<Box sx={{ width: '100%', mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 8 | **sx={{** | `<Skeleton variant="rectangular" height={50} sx={{ mb: 1, borderRadius: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 10 | **sx={{** | `<Skeleton key={index} variant="text" height={40} sx={{ mb: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 18 | **sx={{** | `<Box sx={{ width: '100%', p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 19 | **sx={{** | `<Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 20 | **sx={{** | `<Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 21 | **sx={{** | `<Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 29 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 38 | **sx={{** | `<CircularProgress color="secondary" sx={{ mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 39 | **sx={{** | `<Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 39 | **Hardcoded Color** | `<Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |

### [config/appConfig.js](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/config/appConfig.js)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 2 | **Arabic Text** | `appName: 'مطبعة حمزة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 3 | **Arabic Text** | `shortName: 'مطبعة حمزة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 4 | **Arabic Text** | `companyName: 'مطبعة حمزة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 5 | **Arabic Text** | `logoText: 'مطبعة حمزة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 7 | **Arabic Text** | `loginSubtitle: 'نظام احترافي لإدارة الكتب، المنافذ، المخزون، الفواتير، المدفوعات، الأرصدة، والإشعارات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 8 | **Arabic Text** | `dashboardSubtitle: 'لوحة تشغيل وماليات متكاملة لمطبعة حمزة'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

### [layouts/MainLayout.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/layouts/MainLayout.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 126 | **sx={{** | `case 'critical': return <ErrorIcon sx={{ color: '#ef4444' }} fontSize="small" />;` | Move component styling to a separate CSS file and assign a class name. |
| 126 | **Hardcoded Color** | `case 'critical': return <ErrorIcon sx={{ color: '#ef4444' }} fontSize="small" />;` | Reference values via CSS variables or standard MUI components classes. |
| 127 | **sx={{** | `case 'warning': return <WarningIcon sx={{ color: '#f59e0b' }} fontSize="small" />;` | Move component styling to a separate CSS file and assign a class name. |
| 127 | **Hardcoded Color** | `case 'warning': return <WarningIcon sx={{ color: '#f59e0b' }} fontSize="small" />;` | Reference values via CSS variables or standard MUI components classes. |
| 128 | **sx={{** | `case 'success': return <CheckCircleIcon sx={{ color: '#10b981' }} fontSize="small" />;` | Move component styling to a separate CSS file and assign a class name. |
| 128 | **Hardcoded Color** | `case 'success': return <CheckCircleIcon sx={{ color: '#10b981' }} fontSize="small" />;` | Reference values via CSS variables or standard MUI components classes. |
| 130 | **sx={{** | `default: return <InfoIcon sx={{ color: '#3b82f6' }} fontSize="small" />;` | Move component styling to a separate CSS file and assign a class name. |
| 130 | **Hardcoded Color** | `default: return <InfoIcon sx={{ color: '#3b82f6' }} fontSize="small" />;` | Reference values via CSS variables or standard MUI components classes. |
| 137 | **Arabic Text** | `if (pathnames.length === 0) return 'لوحة التحكم';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 140 | **Arabic Text** | `'profile': 'الملف الشخصي',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 141 | **Arabic Text** | `'users': 'المستخدمين والأدوار',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 142 | **Arabic Text** | `'outlet-types': 'فئات المنافذ',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 143 | **Arabic Text** | `'outlets': 'المنافذ والفروع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 144 | **Arabic Text** | `'authors': 'المؤلفين',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 145 | **Arabic Text** | `'products': 'الكتب والمنتجات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 146 | **Arabic Text** | `'inventory': 'المخزون والوارد',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 147 | **Arabic Text** | `'invoices': 'الفواتير والمبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 148 | **Arabic Text** | `'payments': 'المدفوعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 149 | **Arabic Text** | `'finance': 'الخزينة والمالية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 150 | **Arabic Text** | `'shipments': 'الشحنات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 151 | **Arabic Text** | `'reports': 'التقارير',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 152 | **Arabic Text** | `'imports': 'استيراد البيانات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 153 | **Arabic Text** | `'exports': 'تصدير البيانات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 154 | **Arabic Text** | `'audit': 'سجل العمليات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 155 | **Arabic Text** | `'notifications': 'التنبيهات'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 182 | **Arabic Text** | `title: 'الرئيسية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 184 | **Arabic Text** | `{ text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/', permission: null }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 188 | **Arabic Text** | `title: 'الكتالوج والتسعير',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 190 | **Arabic Text** | `{ text: 'الكتب والمنتجات', icon: <BookIcon />, path: '/products', permission: 'products.view' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 191 | **Arabic Text** | `{ text: 'المؤلفين', icon: <CreateIcon />, path: '/authors', permission: 'authors.view' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 192 | **Arabic Text** | `{ text: 'فئات المنافذ', icon: <CategoryIcon />, path: '/outlet-types', permission: 'outlet_types.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 196 | **Arabic Text** | `title: 'المنافذ والتوزيع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 198 | **Arabic Text** | `{ text: 'المنافذ والفروع', icon: <StoreIcon />, path: '/outlets', permission: 'outlets.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 202 | **Arabic Text** | `title: 'الفواتير والمبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 204 | **Arabic Text** | `{ text: 'الفواتير', icon: <ReceiptIcon />, path: '/invoices', permission: 'invoices.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 208 | **Arabic Text** | `title: 'المالية والحسابات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 210 | **Arabic Text** | `{ text: 'المدفوعات', icon: <PaymentIcon />, path: '/payments', permission: 'payments.view' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 211 | **Arabic Text** | `{ text: 'الخزينة والمالية', icon: <WalletIcon />, path: '/finance', permission: 'finance.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 215 | **Arabic Text** | `title: 'المخزون',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 217 | **Arabic Text** | `{ text: 'المخزون والوارد', icon: <InventoryIcon />, path: '/inventory', permission: 'inventory.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 221 | **Arabic Text** | `title: 'الشحن',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 223 | **Arabic Text** | `{ text: 'الشحنات', icon: <LocalShippingIcon />, path: '/shipments', permission: 'shipments.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 227 | **Arabic Text** | `title: 'التقارير والتصدير',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 229 | **Arabic Text** | `{ text: 'التقارير', icon: <AssessmentIcon />, path: '/reports', permission: 'reports.view' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 230 | **Arabic Text** | `{ text: 'استيراد البيانات', icon: <CloudUploadIcon />, path: '/imports', permission: 'imports.run' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 231 | **Arabic Text** | `{ text: 'تصدير البيانات', icon: <CloudDownloadIcon />, path: '/exports', permission: 'exports.run' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 235 | **Arabic Text** | `title: 'الإدارة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 237 | **Arabic Text** | `{ text: 'المستخدمين والأدوار', icon: <PeopleIcon />, path: '/users', permission: 'users.view' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 238 | **Arabic Text** | `{ text: 'سجل العمليات', icon: <HistoryIcon />, path: '/audit', permission: 'audit.view' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 256 | **sx={{** | `<Divider sx={{ my: 0.5, mx: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 259 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 261 | **Hardcoded Color** | `color: 'text.secondary',` | Reference values via CSS variables or standard MUI components classes. |
| 286 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 298 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 320 | **sx={{** | `<ListItem key={item.text} disablePadding sx={{ display: 'block' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 341 | **sx={{** | `<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 344 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 354 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 363 | **Hardcoded Color** | `color: '#fff',` | Reference values via CSS variables or standard MUI components classes. |
| 367 | **sx={{** | `<StoreIcon sx={{ fontSize: 20 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 370 | **sx={{** | `<Box sx={{ overflow: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 374 | **sx={{** | `sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, color: 'text.primary' }}` | Move component styling to a separate CSS file and assign a class name. |
| 374 | **Hardcoded Color** | `sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, color: 'text.primary' }}` | Reference values via CSS variables or standard MUI components classes. |
| 381 | **sx={{** | `sx={{ color: 'text.secondary', fontSize: '0.7rem', display: 'block', lineHeight: 1.2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 381 | **Hardcoded Color** | `sx={{ color: 'text.secondary', fontSize: '0.7rem', display: 'block', lineHeight: 1.2 }}` | Reference values via CSS variables or standard MUI components classes. |
| 383 | **Arabic Text** | `نظام إدارة متكامل` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 397 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 416 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 417 | **Hardcoded Color** | `bgcolor: 'secondary.main',` | Reference values via CSS variables or standard MUI components classes. |
| 427 | **sx={{** | `<Box sx={{ overflow: 'hidden', flex: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 428 | **sx={{** | `<Typography variant="body2" noWrap sx={{ fontWeight: 600, lineHeight: 1.3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 431 | **sx={{** | `<Typography variant="caption" noWrap sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 431 | **Hardcoded Color** | `<Typography variant="caption" noWrap sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 432 | **Arabic Text** | `{user?.roles?.join(' • ') \|\| 'مستخدم'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 439 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 440 | **sx={{** | `<List disablePadding sx={{ pb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 449 | **sx={{** | `<Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 450 | **Arabic Text** | `<Tooltip title={collapsed ? 'توسيع القائمة' : 'تصغير القائمة'} placement="left">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 454 | **sx={{** | `sx={{ color: 'text.secondary' }}` | Move component styling to a separate CSS file and assign a class name. |
| 454 | **Hardcoded Color** | `sx={{ color: 'text.secondary' }}` | Reference values via CSS variables or standard MUI components classes. |
| 457 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 472 | **sx={{** | `<Box sx={{ display: 'flex', minHeight: '100vh' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 479 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 488 | **sx={{** | `<Toolbar sx={{ gap: 1, minHeight: '64px !important' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 492 | **Arabic Text** | `aria-label="فتح القائمة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 495 | **sx={{** | `sx={{ display: { md: 'none' } }}` | Move component styling to a separate CSS file and assign a class name. |
| 505 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 509 | **Hardcoded Color** | `color: 'text.primary',` | Reference values via CSS variables or standard MUI components classes. |
| 518 | **Arabic Text** | `<Tooltip title={mode === 'dark' ? 'الوضع المضيء' : 'الوضع المظلم'}>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 521 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 522 | **Hardcoded Color** | `color: 'text.secondary',` | Reference values via CSS variables or standard MUI components classes. |
| 523 | **Hardcoded Color** | `'&:hover': { color: 'text.primary' },` | Reference values via CSS variables or standard MUI components classes. |
| 531 | **Arabic Text** | `<Tooltip title="التنبيهات">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 534 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 535 | **Hardcoded Color** | `color: 'text.secondary',` | Reference values via CSS variables or standard MUI components classes. |
| 536 | **Hardcoded Color** | `'&:hover': { color: 'text.primary' },` | Reference values via CSS variables or standard MUI components classes. |
| 544 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 558 | **Arabic Text** | `<Tooltip title="خيارات الحساب">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 566 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 569 | **Hardcoded Color** | `bgcolor: 'secondary.main',` | Reference values via CSS variables or standard MUI components classes. |
| 600 | **sx={{** | `<Box sx={{ px: 2, py: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 601 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 604 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 604 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 609 | **sx={{** | `<MenuItem onClick={() => navigate('/profile')} sx={{ gap: 1.5, py: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 610 | **sx={{** | `<PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 610 | **Hardcoded Color** | `<PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />` | Reference values via CSS variables or standard MUI components classes. |
| 611 | **Arabic Text** | `الملف الشخصي` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 613 | **sx={{** | `<MenuItem onClick={() => navigate('/notifications')} sx={{ gap: 1.5, py: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 614 | **sx={{** | `<NotificationsIcon fontSize="small" sx={{ color: 'text.secondary' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 614 | **Hardcoded Color** | `<NotificationsIcon fontSize="small" sx={{ color: 'text.secondary' }} />` | Reference values via CSS variables or standard MUI components classes. |
| 615 | **Arabic Text** | `التنبيهات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 617 | **sx={{** | `<Chip label={unreadCount} size="small" color="error" sx={{ height: 20, fontSize: '0.7rem', marginInlineStart: 'auto' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 621 | **sx={{** | `<MenuItem onClick={handleLogout} sx={{ color: 'error.main', gap: 1.5, py: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 621 | **Hardcoded Color** | `<MenuItem onClick={handleLogout} sx={{ color: 'error.main', gap: 1.5, py: 1 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 623 | **Arabic Text** | `تسجيل الخروج` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 648 | **sx={{** | `<Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 649 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 650 | **Arabic Text** | `التنبيهات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 653 | **sx={{** | `<Chip label={`${unreadCount} جديد`} size="small" color="error" sx={{ height: 22 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 653 | **Arabic Text** | `<Chip label={`${unreadCount} جديد`} size="small" color="error" sx={{ height: 22 }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 658 | **sx={{** | `<Box sx={{ p: 3, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 659 | **sx={{** | `<NotificationsIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 659 | **Hardcoded Color** | `<NotificationsIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />` | Reference values via CSS variables or standard MUI components classes. |
| 660 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 660 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 661 | **Arabic Text** | `لا توجد تنبيهات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 668 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 688 | **sx={{** | `<Box sx={{ mt: 0.25, flexShrink: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 691 | **sx={{** | `<Box sx={{ flexGrow: 1, minWidth: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 692 | **sx={{** | `<Typography variant="body2" noWrap sx={{ fontWeight: n.status === 'unread' ? 600 : 400, fontSize: '0.825rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 695 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.3, lineHeight: 1.4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 695 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.3, lineHeight: 1.4 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 698 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.3, fontSize: '0.7rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 698 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.3, fontSize: '0.7rem' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 702 | **sx={{** | `<Box sx={{ mt: 0.8, display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>` | Move component styling to a separate CSS file and assign a class name. |
| 708 | **sx={{** | `sx={{ fontSize: '0.7rem', py: 0, px: 0.5, minWidth: 0 }}` | Move component styling to a separate CSS file and assign a class name. |
| 710 | **Arabic Text** | `مقروء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 719 | **sx={{** | `sx={{ fontSize: '0.7rem', py: 0, px: 0.5, minWidth: 0 }}` | Move component styling to a separate CSS file and assign a class name. |
| 721 | **Arabic Text** | `حل` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 731 | **sx={{** | `<Box sx={{ p: 1, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 736 | **sx={{** | `sx={{ borderRadius: 2, py: 0.8 }}` | Move component styling to a separate CSS file and assign a class name. |
| 738 | **Arabic Text** | `عرض جميع التنبيهات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 748 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 764 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 779 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 802 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 817 | **sx={{** | `<Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, pt: { xs: 0, sm: 0 } }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/AuditLogs.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/AuditLogs.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 36 | **Arabic Text** | `'login': 'تسجيل الدخول',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 37 | **Arabic Text** | `'logout': 'تسجيل الخروج',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 38 | **Arabic Text** | `'change_password': 'تغيير كلمة المرور',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 39 | **Arabic Text** | `'reset_password_by_admin': 'إعادة تعيين كلمة المرور',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 40 | **Arabic Text** | `'create_user': 'إنشاء مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 41 | **Arabic Text** | `'update_user': 'تحديث بيانات مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 42 | **Arabic Text** | `'disable_user': 'تعطيل حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 43 | **Arabic Text** | `'enable_user': 'تفعيل حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 44 | **Arabic Text** | `'archive_user': 'أرشفة حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 45 | **Arabic Text** | `'update_role_permissions': 'تحديث صلاحيات الأدوار',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 46 | **Arabic Text** | `'backup_db': 'إنشاء نسخة احتياطية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 47 | **Arabic Text** | `'restore_db': 'استعادة نسخة احتياطية'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 51 | **Arabic Text** | `'users': 'حسابات المستخدمين',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 52 | **Arabic Text** | `'roles': 'أدوار المستخدمين',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 53 | **Arabic Text** | `'invoices': 'الفواتير',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Arabic Text** | `'products': 'المنتجات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 55 | **Arabic Text** | `'outlets': 'المنافذ والفروع'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 104 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 104 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 105 | **Arabic Text** | `سجل عمليات النظام (Audit Logs)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 109 | **sx={{** | `<Paper sx={{ p: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 111 | **sx={{** | `<Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 112 | **sx={{** | `<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 112 | **Hardcoded Color** | `<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />` | Reference values via CSS variables or standard MUI components classes. |
| 113 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>تصفية:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 113 | **Arabic Text** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>تصفية:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 117 | **Arabic Text** | `<InputLabel id="action-filter-label">نوع العملية</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 121 | **Arabic Text** | `label="نوع العملية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 124 | **Arabic Text** | `<MenuItem value="">جميع العمليات</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 135 | **Arabic Text** | `<InputLabel id="type-filter-label">القسم المستهدف</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 139 | **Arabic Text** | `label="القسم المستهدف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 142 | **Arabic Text** | `<MenuItem value="">جميع الأقسام</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 158 | **Arabic Text** | `إعادة تعيين الفلاتر` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 165 | **Arabic Text** | `<EmptyState title="لا توجد سجلات" description="لم نتمكن من العثور على أي سجلات مطابقة للفلاتر النشطة." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 169 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 169 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 171 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التاريخ والوقت</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 171 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التاريخ والوقت</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 172 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المستخدم</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 172 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المستخدم</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 173 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العملية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 173 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العملية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 174 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القسم المستهدف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 174 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القسم المستهدف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 175 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عنوان IP</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 175 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عنوان IP</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 176 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>التفاصيل</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 176 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>التفاصيل</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 186 | **Arabic Text** | `{log.full_name \|\| log.username \|\| 'النظام'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 203 | **Arabic Text** | `<IconButton color="secondary" onClick={() => handleOpenDetails(log)} title="عرض التفاصيل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 216 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 217 | **Arabic Text** | `تفاصيل سجل العملية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 221 | **sx={{** | `<Box sx={{ fontFamily: 'monospace', fontSize: '13px', direction: 'ltr', textAlign: 'left', backgroundColor: '#fafafa', p: 2, borderRadius: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 221 | **Left Alignment** | `<Box sx={{ fontFamily: 'monospace', fontSize: '13px', direction: 'ltr', textAlign: 'left', backgroundColor: '#fafafa', p: 2, borderRadius: 2 }}>` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 221 | **Hardcoded Color** | `<Box sx={{ fontFamily: 'monospace', fontSize: '13px', direction: 'ltr', textAlign: 'left', backgroundColor: '#fafafa', p: 2, borderRadius: 2 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 222 | **style={{** | `<pre style={{ margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 229 | **sx={{** | `<Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 230 | **Arabic Text** | `إغلاق` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

### [pages/Authors.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Authors.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 82 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل بيانات المؤلفين.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 122 | **Arabic Text** | `showToast('الاسم الكامل للمؤلف مطلوب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 137 | **Arabic Text** | `showToast('تم إنشاء سجل المؤلف بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 140 | **Arabic Text** | `showToast('تم تحديث سجل المؤلف بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 146 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ سجل المؤلف.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 160 | **Arabic Text** | `showToast(`تم ${targetStatus === 'active' ? 'تفعيل' : 'تعطيل'} المؤلف بنجاح.`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 164 | **Arabic Text** | `showToast(err.message \|\| 'فشل تعديل حالة المؤلف.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 174 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 175 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 175 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 176 | **Arabic Text** | `إدارة شؤون المؤلفين` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 184 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 186 | **Arabic Text** | `إضافة مؤلف جديد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 192 | **sx={{** | `<Paper sx={{ p: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 198 | **Arabic Text** | `placeholder="البحث باسم المؤلف..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 212 | **Arabic Text** | `<InputLabel id="status-filter-label">حالة المؤلف</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 216 | **Arabic Text** | `label="حالة المؤلف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 219 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 220 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 221 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 230 | **Arabic Text** | `<EmptyState title="لا يوجد مؤلفين" description="لم نتمكن من العثور على أي مؤلفين مسجلين يطابقون شروط البحث." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 234 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 234 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 236 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المؤلف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 236 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المؤلف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 237 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 237 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 238 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>البريد الإلكتروني</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 238 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>البريد الإلكتروني</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 239 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحساب المرتبط</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 239 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحساب المرتبط</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 240 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 240 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 241 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 241 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 247 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 500 }}>{author.name}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 254 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير مرتبط</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 254 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير مرتبط</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 254 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير مرتبط</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 259 | **Arabic Text** | `label={author.status === 'active' ? 'نشط' : 'معطل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 265 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 267 | **Arabic Text** | `<IconButton color="primary" onClick={() => handleOpenEditModal(author)} title="تعديل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 275 | **Arabic Text** | `title={author.status === 'active' ? 'تعطيل' : 'تفعيل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 291 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 292 | **Arabic Text** | `{modalMode === 'create' ? 'إضافة سجل مؤلف' : 'تعديل سجل مؤلف'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 300 | **Arabic Text** | `label="اسم المؤلف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 303 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 308 | **Arabic Text** | `label="رقم الهاتف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 311 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 317 | **Arabic Text** | `label="البريد الإلكتروني"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 320 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 322 | **sx={{** | `<FormControl fullWidth sx={{ mt: 1, mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 323 | **Arabic Text** | `<InputLabel id="link-user-label">ربط الحساب البرمجي (اختياري)</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 327 | **Arabic Text** | `label="ربط الحساب البرمجي (اختياري)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 330 | **Arabic Text** | `<MenuItem value="">غير مرتبط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 338 | **sx={{** | `<FormControl fullWidth sx={{ mt: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 339 | **Arabic Text** | `<InputLabel id="status-label">الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 343 | **Arabic Text** | `label="الحالة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 346 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 347 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 352 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 353 | **Arabic Text** | `<Button type="submit" variant="contained" color="secondary">حفظ</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 365 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Dashboard.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Dashboard.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 56 | **Arabic Text** | `'login': 'تسجيل الدخول',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 57 | **Arabic Text** | `'logout': 'تسجيل الخروج',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 58 | **Arabic Text** | `'change_password': 'تغيير كلمة المرور',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 59 | **Arabic Text** | `'reset_password_by_admin': 'إعادة تعيين كلمة المرور',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **Arabic Text** | `'create_user': 'إنشاء مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 61 | **Arabic Text** | `'update_user': 'تحديث بيانات مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 62 | **Arabic Text** | `'disable_user': 'تعطيل حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 63 | **Arabic Text** | `'enable_user': 'تفعيل حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 64 | **Arabic Text** | `'archive_user': 'أرشفة حساب مستخدم',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 65 | **Arabic Text** | `'update_role_permissions': 'تحديث صلاحيات الأدوار',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 66 | **Arabic Text** | `'backup_db': 'إنشاء نسخة احتياطية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 67 | **Arabic Text** | `'restore_db': 'استعادة نسخة احتياطية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 68 | **Arabic Text** | `'create_invoice': 'إنشاء فاتورة مبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 69 | **Arabic Text** | `'create_product': 'إنشاء منتج جديد',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 70 | **Arabic Text** | `'update_product': 'تعديل منتج',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 71 | **Arabic Text** | `'receive_stock': 'توريد مخزون وارد',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 72 | **Arabic Text** | `'create_outlet': 'إضافة منفذ بيع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 73 | **Arabic Text** | `'create_outlet_type': 'إضافة فئة منفذ بيع'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 223 | **Arabic Text** | `return <LoadingState message="جاري تحميل لوحة الإحصائيات التنفيذية الموحدة..." />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 241 | **sx={{** | `<Box sx={{ pb: 5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 244 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 249 | **Hardcoded Color** | `? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'` | Reference values via CSS variables or standard MUI components classes. |
| 250 | **Hardcoded Color** | `: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',` | Reference values via CSS variables or standard MUI components classes. |
| 251 | **Hardcoded Color** | `color: '#fff',` | Reference values via CSS variables or standard MUI components classes. |
| 258 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Outfit, sans-serif' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 259 | **Arabic Text** | `مرحباً بك، {user?.fullName \|\| user?.username \|\| 'مدير النظام'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 261 | **sx={{** | `<Typography variant="body2" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 262 | **sx={{** | `<AccessTimeIcon sx={{ fontSize: 16 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 263 | **Arabic Text** | `القاهرة (مصر): {cairoTime \|\| 'جاري تحميل التوقيت...'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 266 | **sx={{** | `<Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 268 | **sx={{** | `<Chip key={r} label={r === 'super_admin' ? 'مدير عام صلاحيات كاملة' : r} color="secondary" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 268 | **Arabic Text** | `<Chip key={r} label={r === 'super_admin' ? 'مدير عام صلاحيات كاملة' : r} color="secondary" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 277 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 282 | **Hardcoded Color** | `backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f0fdf4' : '#042f2e',` | Reference values via CSS variables or standard MUI components classes. |
| 283 | **Hardcoded Color** | `color: (theme) => theme.palette.mode === 'light' ? '#15803d' : '#2dd4bf',` | Reference values via CSS variables or standard MUI components classes. |
| 287 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 288 | **Arabic Text** | `<CheckCircleIcon color="success" /> تهيئة النظام جاهزة للبدء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 290 | **sx={{** | `<Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 291 | **Arabic Text** | `قاعدة البيانات تم تصفيرها بنجاح للإنتاج. لبدء دورة العمل التشغيلية، يرجى اتباع الخطوات المتسلسلة التالية:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 295 | **sx={{** | `<Paper sx={{ p: 2.5, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)' }, transition: '0.2s', borderRadius: 1 }} onClick={() => navigate('/outlet-types')}>` | Move component styling to a separate CSS file and assign a class name. |
| 296 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 296 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 297 | **Arabic Text** | `١. تصنيفات ومنافذ البيع` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 299 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 299 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 300 | **Arabic Text** | `قم بتعريف الفئات التسعيرية (مثال: جملة، تجزئة، معارض)، ثم أضف منافذ التوزيع وعناوينها.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 305 | **sx={{** | `<Paper sx={{ p: 2.5, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)' }, transition: '0.2s', borderRadius: 1 }} onClick={() => navigate('/products')}>` | Move component styling to a separate CSS file and assign a class name. |
| 306 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 306 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 307 | **Arabic Text** | `٢. فهرس الكتب والأسعار` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 309 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 309 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 310 | **Arabic Text** | `أضف قائمة المؤلفين، ثم أضف الكتب وحدد أسعار بيعها المعتمدة لكل فئة منفذ بيع.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 315 | **sx={{** | `<Paper sx={{ p: 2.5, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-2px)' }, transition: '0.2s', borderRadius: 1 }} onClick={() => navigate('/inventory')}>` | Move component styling to a separate CSS file and assign a class name. |
| 316 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 316 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 317 | **Arabic Text** | `٣. توريد وجرد المخزون` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 319 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 319 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 320 | **Arabic Text** | `سجل فواتير التوريد الواردة من المطابع لزيادة كميات الكتب في المستودع قبل إصدار الفواتير.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 330 | **sx={{** | `<Box sx={{ mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 331 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 331 | **Hardcoded Color** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 332 | **Arabic Text** | `<AlertIcon /> تحذيرات تشغيلية حرجة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 338 | **sx={{** | `sx={{ mb: 2, borderRadius: 2, '& .MuiAlert-message': { width: '100%' } }}` | Move component styling to a separate CSS file and assign a class name. |
| 343 | **Arabic Text** | `معاينة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 347 | **Arabic Text** | `حل المشكلة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 352 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{alert.title}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 353 | **sx={{** | `<Typography variant="body2" sx={{ opacity: 0.9 }}>{alert.message}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 360 | **sx={{** | `<Grid container spacing={3} sx={{ mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 362 | **Arabic Text** | `{ title: 'إجمالي قيمة المبيعات', value: formatCurrencyEGP(totalSales), icon: <TrendingUpIcon />, color: 'primary.main' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 362 | **Hardcoded Color** | `{ title: 'إجمالي قيمة المبيعات', value: formatCurrencyEGP(totalSales), icon: <TrendingUpIcon />, color: 'primary.main' },` | Reference values via CSS variables or standard MUI components classes. |
| 363 | **Arabic Text** | `{ title: 'التحصيل الفعلي (كاش)', value: formatCurrencyEGP(totalPaid), icon: <PaymentIcon />, color: 'success.main' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 363 | **Hardcoded Color** | `{ title: 'التحصيل الفعلي (كاش)', value: formatCurrencyEGP(totalPaid), icon: <PaymentIcon />, color: 'success.main' },` | Reference values via CSS variables or standard MUI components classes. |
| 364 | **Arabic Text** | `{ title: 'الذمم المدينة (المعلقة)', value: formatCurrencyEGP(totalRemaining), icon: <WalletIcon />, color: 'warning.main' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 364 | **Hardcoded Color** | `{ title: 'الذمم المدينة (المعلقة)', value: formatCurrencyEGP(totalRemaining), icon: <WalletIcon />, color: 'warning.main' },` | Reference values via CSS variables or standard MUI components classes. |
| 365 | **Arabic Text** | `{ title: 'المستودع (كتب نشطة)', value: `${stock.length} عنوان`, icon: <BookIcon />, color: 'info.main' }` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 365 | **Hardcoded Color** | `{ title: 'المستودع (كتب نشطة)', value: `${stock.length} عنوان`, icon: <BookIcon />, color: 'info.main' }` | Reference values via CSS variables or standard MUI components classes. |
| 368 | **sx={{** | `<Card sx={{ borderRadius: 3, borderLeft: `5px solid`, borderColor: card.color }}>` | Move component styling to a separate CSS file and assign a class name. |
| 369 | **sx={{** | `<CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 370 | **sx={{** | `<Box sx={{ p: 1.5, borderRadius: 2.5, backgroundColor: 'action.hover', color: card.color }}>` | Move component styling to a separate CSS file and assign a class name. |
| 374 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 374 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 377 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 388 | **sx={{** | `<Grid container spacing={3} sx={{ mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 391 | **sx={{** | `<Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 392 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 393 | **Arabic Text** | `<TrendingUpIcon color="primary" /> ملخص المركز المالي والحسابات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 395 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 397 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 398 | **sx={{** | `<Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 399 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>نسبة تحصيل الديون والمبيعات</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 399 | **Arabic Text** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>نسبة تحصيل الديون والمبيعات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 400 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **Hardcoded Color** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 404 | **sx={{** | `<LinearProgress variant="determinate" value={collectionRate} sx={{ height: 10, borderRadius: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 409 | **sx={{** | `<Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 410 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>إجمالي المديونيات المتأخرة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 410 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>إجمالي المديونيات المتأخرة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 410 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>إجمالي المديونيات المتأخرة</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 411 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'error.main', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 411 | **Hardcoded Color** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'error.main', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 417 | **sx={{** | `<Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 418 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>المنافذ المعتمدة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 418 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>المنافذ المعتمدة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 418 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>المنافذ المعتمدة</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 419 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'success.main', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 419 | **Hardcoded Color** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'success.main', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 420 | **Arabic Text** | `{activeOutletsCount} منفذ نشط` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 430 | **sx={{** | `<Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 431 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 432 | **Arabic Text** | `<ShippingIcon color="primary" /> اللوجستيات وحركة الشحن والمخزون` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 434 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 436 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 439 | **sx={{** | `<Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'error.light', color: 'error.contrastText' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 439 | **Hardcoded Color** | `<Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'error.light', color: 'error.contrastText' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 440 | **sx={{** | `<AlertIcon sx={{ fontSize: 20 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 443 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>منتجات تحت حد التنبيه</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 443 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>منتجات تحت حد التنبيه</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 443 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>منتجات تحت حد التنبيه</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 444 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 445 | **Arabic Text** | `{lowStockItems.length} كتب ومطبوعات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 452 | **sx={{** | `<Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'warning.light', color: 'warning.contrastText' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 452 | **Hardcoded Color** | `<Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'warning.light', color: 'warning.contrastText' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 453 | **sx={{** | `<ShippingIcon sx={{ fontSize: 20 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 456 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>شحنات معلقة للشحن</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 456 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>شحنات معلقة للشحن</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 456 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>شحنات معلقة للشحن</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 457 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 458 | **Arabic Text** | `{pendingShipmentsCount} فواتير مطلوبة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 465 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 468 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 468 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 469 | **style={{** | `شحنات جزئية جارية: <strong style={{ color: '#f59e0b' }}>{partialShipmentsCount}</strong>` | Move styling to a separate page/component CSS file using CSS variables. |
| 469 | **Arabic Text** | `شحنات جزئية جارية: <strong style={{ color: '#f59e0b' }}>{partialShipmentsCount}</strong>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 469 | **Hardcoded Color** | `شحنات جزئية جارية: <strong style={{ color: '#f59e0b' }}>{partialShipmentsCount}</strong>` | Reference values via CSS variables or standard MUI components classes. |
| 471 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 471 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 472 | **Arabic Text** | `إجمالي إيصالات الشحن: <strong>{shipments.length}</strong>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 480 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 481 | **Arabic Text** | `العمليات والمهام السريعة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 483 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 485 | **sx={{** | `{ label: 'فاتورة مبيعات جديدة', icon: <AddInvoiceIcon sx={{ fontSize: 24 }} />, path: '/invoices', perm: 'invoices.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 485 | **Arabic Text** | `{ label: 'فاتورة مبيعات جديدة', icon: <AddInvoiceIcon sx={{ fontSize: 24 }} />, path: '/invoices', perm: 'invoices.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 486 | **sx={{** | `{ label: 'توريد مخزون وارد', icon: <AddStockIcon sx={{ fontSize: 24 }} />, path: '/inventory', perm: 'inventory.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 486 | **Arabic Text** | `{ label: 'توريد مخزون وارد', icon: <AddStockIcon sx={{ fontSize: 24 }} />, path: '/inventory', perm: 'inventory.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 487 | **sx={{** | `{ label: 'إضافة فرع / منفذ', icon: <StoreIcon sx={{ fontSize: 24 }} />, path: '/outlets', perm: 'outlets.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 487 | **Arabic Text** | `{ label: 'إضافة فرع / منفذ', icon: <StoreIcon sx={{ fontSize: 24 }} />, path: '/outlets', perm: 'outlets.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 488 | **sx={{** | `{ label: 'إضافة منتج جديد', icon: <AddProductIcon sx={{ fontSize: 24 }} />, path: '/products', perm: 'products.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 488 | **Arabic Text** | `{ label: 'إضافة منتج جديد', icon: <AddProductIcon sx={{ fontSize: 24 }} />, path: '/products', perm: 'products.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 489 | **sx={{** | `{ label: 'فئات منافذ البيع', icon: <AddCircleIcon sx={{ fontSize: 24 }} />, path: '/outlet-types', perm: 'outlet-types.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 489 | **Arabic Text** | `{ label: 'فئات منافذ البيع', icon: <AddCircleIcon sx={{ fontSize: 24 }} />, path: '/outlet-types', perm: 'outlet-types.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 490 | **sx={{** | `{ label: 'إضافة مستخدم جديد', icon: <AddUserIcon sx={{ fontSize: 24 }} />, path: '/users', perm: 'users.create' },` | Move component styling to a separate CSS file and assign a class name. |
| 490 | **Arabic Text** | `{ label: 'إضافة مستخدم جديد', icon: <AddUserIcon sx={{ fontSize: 24 }} />, path: '/users', perm: 'users.create' },` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 498 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 506 | **Hardcoded Color** | `color: 'text.primary',` | Reference values via CSS variables or standard MUI components classes. |
| 516 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **sx={{** | `<Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 530 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 531 | **Arabic Text** | `<ReceiptIcon color="primary" /> آخر فواتير المبيعات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 533 | **sx={{** | `<Divider sx={{ mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 538 | **sx={{** | `<ListItem sx={{ py: 1, px: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 540 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{inv.invoice_number}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 541 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>{inv.outlet_name}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 541 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>{inv.outlet_name}</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 543 | **sx={{** | `<Box sx={{ textAlign: 'left' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 543 | **Left Alignment** | `<Box sx={{ textAlign: 'left' }}>` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 544 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 544 | **Hardcoded Color** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 548 | **Arabic Text** | `label={inv.payment_status === 'paid' ? 'مدفوعة' : inv.payment_status === 'partially_paid' ? 'جزئي' : inv.payment_status === 'cancelled' ? 'ملغاة' : 'غير مدفوع'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 551 | **sx={{** | `sx={{ fontSize: '0.65rem', height: 16, mt: 0.5 }}` | Move component styling to a separate CSS file and assign a class name. |
| 560 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 560 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 561 | **Arabic Text** | `لا توجد فواتير مسجلة بعد.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 569 | **sx={{** | `<Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 570 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 571 | **Arabic Text** | `<PaymentIcon color="primary" /> آخر المدفوعات المحصلة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 573 | **sx={{** | `<Divider sx={{ mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 578 | **sx={{** | `<ListItem sx={{ py: 1, px: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 580 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatCurrencyEGP(pay.amount)}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 581 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>فاتورة: {pay.invoice_number}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 581 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>فاتورة: {pay.invoice_number}</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 581 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>فاتورة: {pay.invoice_number}</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 583 | **sx={{** | `<Box sx={{ textAlign: 'left' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 583 | **Left Alignment** | `<Box sx={{ textAlign: 'left' }}>` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 584 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 584 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 585 | **Arabic Text** | `{pay.payment_method === 'cash' ? 'نقدي' : pay.payment_method === 'bank_transfer' ? 'تحويل' : pay.payment_method === 'check' ? 'شيك' : 'أخرى'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 587 | **sx={{** | `<Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 587 | **Hardcoded Color** | `<Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 597 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 597 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 598 | **Arabic Text** | `لا توجد دفعات محصلة بعد.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 606 | **sx={{** | `<Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 607 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 608 | **Arabic Text** | `<HistoryIcon color="primary" /> حركات الجرد والمخزون` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 610 | **sx={{** | `<Divider sx={{ mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 615 | **sx={{** | `<ListItem sx={{ py: 1, px: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 617 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{tx.product_title}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 618 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>SKU: {tx.product_code}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 618 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>SKU: {tx.product_code}</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 620 | **sx={{** | `<Box sx={{ textAlign: 'left' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 620 | **Left Alignment** | `<Box sx={{ textAlign: 'left' }}>` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 626 | **sx={{** | `sx={{ fontSize: '0.7rem', height: 20 }}` | Move component styling to a separate CSS file and assign a class name. |
| 628 | **sx={{** | `<Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', color: 'text.secondary', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 628 | **Hardcoded Color** | `<Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', color: 'text.secondary', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 629 | **Arabic Text** | `{tx.transaction_type === 'receipt' ? 'شراء/توريد' : tx.transaction_type === 'sale' ? 'بيع' : tx.transaction_type === 'return' ? 'مرتجع' : 'تعديل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 638 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 638 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 639 | **Arabic Text** | `لا توجد حركات مخزنية جارية.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

### [pages/Exports.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Exports.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 35 | **Arabic Text** | `title: 'دليل المنتجات والكتب',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 36 | **Arabic Text** | `description: 'تصدير كامل المنتجات والكتب المسجلة في النظام مع تفاصيل SKU والبيانات الفنية.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 37 | **sx={{** | `icon: <BookIcon sx={{ fontSize: 40, color: 'primary.main' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 37 | **Hardcoded Color** | `icon: <BookIcon sx={{ fontSize: 40, color: 'primary.main' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 42 | **Arabic Text** | `title: 'قوائم الأسعار التفصيلية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 43 | **Arabic Text** | `description: 'تصدير أسعار الكتب والمنتجات الموزعة والمخصصة لكل فئة منفذ بيع.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 44 | **sx={{** | `icon: <PriceIcon sx={{ fontSize: 40, color: 'success.main' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 44 | **Hardcoded Color** | `icon: <PriceIcon sx={{ fontSize: 40, color: 'success.main' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 49 | **Arabic Text** | `title: 'سجل وأسماء المؤلفين',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 50 | **Arabic Text** | `description: 'تصدير قائمة المؤلفين ومعلومات الاتصال وحسابات المؤلفين المرتبطة.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 51 | **sx={{** | `icon: <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 51 | **Hardcoded Color** | `icon: <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 56 | **Arabic Text** | `title: 'قائمة منافذ البيع والفروع',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 57 | **Arabic Text** | `description: 'تصدير دليل فروع ومنافذ البيع بالتفصيل مع المحافظات وأرقام الهواتف والتصنيف.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 58 | **sx={{** | `icon: <StoreIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 58 | **Hardcoded Color** | `icon: <StoreIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 63 | **Arabic Text** | `title: 'سجل الفواتير الصادرة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 64 | **Arabic Text** | `description: 'تصدير كامل فواتير البيع المصدرة متضمنة المنفذ، القيمة، والتاريخ وحالة السداد والشحن.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 65 | **sx={{** | `icon: <InvoiceIcon sx={{ fontSize: 40, color: '#e67e22' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 65 | **Hardcoded Color** | `icon: <InvoiceIcon sx={{ fontSize: 40, color: '#e67e22' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 70 | **Arabic Text** | `title: 'سجل المقبوضات والدفعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 71 | **Arabic Text** | `description: 'تصدير حركات المقبوضات المالية والدفعات المضافة للنظام ووسائل الدفع.',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 72 | **sx={{** | `icon: <PaymentIcon sx={{ fontSize: 40, color: '#9b59b6' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 72 | **Hardcoded Color** | `icon: <PaymentIcon sx={{ fontSize: 40, color: '#9b59b6' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 77 | **Arabic Text** | `title: 'دفتر حركات المخزون',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 78 | **Arabic Text** | `description: 'تصدير دفتر الأستاذ لحركات المستودعات (الوارد، الصادر، المرتجعات، التسويات المخزنية).',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 79 | **sx={{** | `icon: <LedgerIcon sx={{ fontSize: 40, color: '#1abc9c' }} />,` | Move component styling to a separate CSS file and assign a class name. |
| 79 | **Hardcoded Color** | `icon: <LedgerIcon sx={{ fontSize: 40, color: '#1abc9c' }} />,` | Reference values via CSS variables or standard MUI components classes. |
| 87 | **Arabic Text** | `showToast('ليس لديك صلاحية تصدير البيانات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 92 | **Arabic Text** | `showToast('تم إرسال طلب التصدير، جاري التنزيل...', 'success');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 97 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 98 | **sx={{** | `<Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 98 | **Hardcoded Color** | `<Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 99 | **Arabic Text** | `تصدير البيانات والنسخ الاحتياطي` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 101 | **sx={{** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 101 | **Hardcoded Color** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 102 | **Arabic Text** | `تنزيل سجلات وجداول قاعدة البيانات كملفات CSV مهيأة للعمل عليها في برامج معالجة البيانات مثل Excel.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 107 | **sx={{** | `<Alert severity="error" sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 108 | **Arabic Text** | `تنبيه: أنت لا تملك صلاحية `exports.run` لتصدير السجلات أو إجراء النسخ الاحتياطي للبيانات. يرجى مراجعة المسؤول.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 114 | **sx={{** | `<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: '0.2s', '&:hover': { boxShadow: 4 } }}>` | Move component styling to a separate CSS file and assign a class name. |
| 116 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 117 | **sx={{** | `<Box sx={{ p: 1, borderRadius: 2, bgcolor: '#f8f9fa', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 117 | **Hardcoded Color** | `<Box sx={{ p: 1, borderRadius: 2, bgcolor: '#f8f9fa', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 120 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 124 | **sx={{** | `<Divider sx={{ mb: 1.5 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 129 | **sx={{** | `<CardActions sx={{ p: 2, pt: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 137 | **Arabic Text** | `تحميل ملف CSV` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 147 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Finance.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Finance.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 56 | **sx={{** | `{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}` | Move component styling to a separate CSS file and assign a class name. |
| 62 | **Arabic Text** | `'deposit': 'إيداع نقدي الخزينة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 63 | **Arabic Text** | `'withdrawal': 'سحب نقدي من الخزينة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 64 | **Arabic Text** | `'credit_adjustment': 'تسوية خصم ذمم (إبراء)',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 65 | **Arabic Text** | `'debit_adjustment': 'تسوية إضافة ذمم (قيد مالي)'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 69 | **Arabic Text** | `'invoice_created': 'إنشاء فاتورة مبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 70 | **Arabic Text** | `'invoice_cancelled': 'إلغاء فاتورة مبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 71 | **Arabic Text** | `'invoice_updated': 'تعديل فاتورة مبيعات',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 72 | **Arabic Text** | `'payment_recorded': 'تحصيل نقدي (سداد فاتورة)',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 73 | **Arabic Text** | `'payment_reversed': 'إلغاء تحصيل نقدي (عكس سداد)',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 74 | **Arabic Text** | `'manual_adjustment': 'تسوية يدوية بالخزينة'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 140 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل ملخص البيانات المالية والخزينة', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 164 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل سجل حركات الخزينة والحسابات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 177 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل أرصدة منافذ البيع', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 190 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل أرصدة المحافظات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 203 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل أرصدة فئات منافذ التوزيع', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 240 | **Arabic Text** | `showToast('يرجى ملء جميع الحقول المطلوبة للتسوية', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 245 | **Arabic Text** | `showToast('يرجى إدخال مبلغ صحيح أكبر من الصفر', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 257 | **Arabic Text** | `showToast('تم تسجيل حركة التسوية اليدوية بالخزينة والحسابات بنجاح.', 'success');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 271 | **Arabic Text** | `showToast(err.message \|\| 'خطأ أثناء تسجيل التسوية اليدوية بالخزينة', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 278 | **Arabic Text** | `return <LoadingState message="جاري تحميل البيانات المالية وإحصائيات الخزينة..." />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 283 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 284 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 284 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 285 | **Arabic Text** | `إدارة الخزينة والحسابات المالية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 293 | **sx={{** | `sx={{ fontWeight: 'bold', borderRadius: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 295 | **Arabic Text** | `إجراء تسوية يدوية بالخزينة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 301 | **sx={{** | `<Grid container spacing={3} sx={{ mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 303 | **sx={{** | `<Card sx={{ borderLeft: '5px solid', borderColor: 'primary.main', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 304 | **sx={{** | `<CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 305 | **sx={{** | `<Box sx={{ p: 1.5, mr: 2, bg: 'primary.light', color: 'primary.main', borderRadius: 2, display: 'flex' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 305 | **Hardcoded Color** | `<Box sx={{ p: 1.5, mr: 2, bg: 'primary.light', color: 'primary.main', borderRadius: 2, display: 'flex' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 306 | **sx={{** | `<TrendingUpIcon sx={{ fontSize: 28 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 310 | **Arabic Text** | `إجمالي فواتير المبيعات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 312 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 321 | **sx={{** | `<Card sx={{ borderLeft: '5px solid', borderColor: 'success.main', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 322 | **sx={{** | `<CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 323 | **sx={{** | `<Box sx={{ p: 1.5, mr: 2, bg: 'success.light', color: 'success.main', borderRadius: 2, display: 'flex' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 323 | **Hardcoded Color** | `<Box sx={{ p: 1.5, mr: 2, bg: 'success.light', color: 'success.main', borderRadius: 2, display: 'flex' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 324 | **sx={{** | `<PaymentIcon sx={{ fontSize: 28 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 328 | **Arabic Text** | `رصيد المقبوضات النقدي (المحصل)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 330 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 330 | **Hardcoded Color** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'success.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 339 | **sx={{** | `<Card sx={{ borderLeft: '5px solid', borderColor: 'warning.main', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 340 | **sx={{** | `<CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 341 | **sx={{** | `<Box sx={{ p: 1.5, mr: 2, bg: 'warning.light', color: 'warning.main', borderRadius: 2, display: 'flex' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 341 | **Hardcoded Color** | `<Box sx={{ p: 1.5, mr: 2, bg: 'warning.light', color: 'warning.main', borderRadius: 2, display: 'flex' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 342 | **sx={{** | `<WalletIcon sx={{ fontSize: 28 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 346 | **Arabic Text** | `الذمم المدينة المتبقية (المديونيات)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 348 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'warning.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 348 | **Hardcoded Color** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'warning.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 357 | **sx={{** | `<Card sx={{ borderLeft: '5px solid', borderColor: 'error.main', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 358 | **sx={{** | `<CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 359 | **sx={{** | `<Box sx={{ p: 1.5, mr: 2, bg: 'error.light', color: 'error.main', borderRadius: 2, display: 'flex' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 359 | **Hardcoded Color** | `<Box sx={{ p: 1.5, mr: 2, bg: 'error.light', color: 'error.main', borderRadius: 2, display: 'flex' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 360 | **sx={{** | `<WarningIcon sx={{ fontSize: 28 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 364 | **Arabic Text** | `الأقساط والمبالغ المتأخرة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 366 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 366 | **Hardcoded Color** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5, color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 376 | **sx={{** | `<Paper sx={{ width: '100%', borderRadius: 3, mb: 4 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 383 | **sx={{** | `sx={{ borderBottom: 1, borderColor: 'divider' }}` | Move component styling to a separate CSS file and assign a class name. |
| 385 | **sx={{** | `<Tab label="سجل حركات الخزينة والحسابات" icon={<HistoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 385 | **Arabic Text** | `<Tab label="سجل حركات الخزينة والحسابات" icon={<HistoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 386 | **sx={{** | `<Tab label="أرصدة منافذ التوزيع" icon={<StoreIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 386 | **Arabic Text** | `<Tab label="أرصدة منافذ التوزيع" icon={<StoreIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 387 | **sx={{** | `<Tab label="المبيعات والأرصدة بالمحافظات" icon={<MapIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 387 | **Arabic Text** | `<Tab label="المبيعات والأرصدة بالمحافظات" icon={<MapIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 388 | **sx={{** | `<Tab label="أرصدة فئات منافذ البيع" icon={<CategoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 388 | **Arabic Text** | `<Tab label="أرصدة فئات منافذ البيع" icon={<CategoryIcon />} iconPosition="start" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 394 | **sx={{** | `<Box sx={{ p: 2, mb: 2, bg: 'action.hover', borderRadius: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 398 | **Arabic Text** | `<InputLabel>تصفية حسب المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 402 | **Arabic Text** | `label="تصفية حسب المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 404 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 414 | **Arabic Text** | `<InputLabel>نوع الحركة المالية</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 418 | **Arabic Text** | `label="نوع الحركة المالية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 420 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 432 | **Arabic Text** | `label="من تاريخ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 444 | **Arabic Text** | `label="إلى تاريخ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 452 | **sx={{** | `<Grid item xs={12} sm={2} sx={{ display: 'flex', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 460 | **Arabic Text** | `إعادة تعيين` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 467 | **Arabic Text** | `<LoadingState message="جاري تحميل حركات الدفتر المالي..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 470 | **sx={{** | `<TableContainer component={Paper} sx={{ boxShadow: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 471 | **sx={{** | `<Table sx={{ minWidth: 650 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 472 | **sx={{** | `<TableHead sx={{ bgcolor: 'action.selected' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 474 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التاريخ والوقت</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 474 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التاريخ والوقت</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 475 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>منفذ البيع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 475 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>منفذ البيع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 476 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>نوع الحركة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 476 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>نوع الحركة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 477 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير الخزينة (نقدي)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 477 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير الخزينة (نقدي)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 478 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير المديونيات (ذمم)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 478 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تأثير المديونيات (ذمم)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 479 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 479 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 480 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الملاحظات والبيان</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 480 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الملاحظات والبيان</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 505 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 516 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 524 | **Arabic Text** | `<TableCell align="right">{entry.user_full_name \|\| 'غير معروف'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 541 | **Arabic Text** | `labelRowsPerPage="عدد الأسطر لكل صفحة:"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 542 | **Arabic Text** | `labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 546 | **Arabic Text** | `<EmptyState message="لم يتم العثور على أي حركات مالية مسجلة بالخزينة تطابق البحث." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 553 | **Arabic Text** | `<LoadingState message="جاري تحميل أرصدة الفروع والمنافذ..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 555 | **sx={{** | `<TableContainer component={Paper} sx={{ boxShadow: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 556 | **sx={{** | `<Table sx={{ minWidth: 650 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 557 | **sx={{** | `<TableHead sx={{ bgcolor: 'action.selected' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 559 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 559 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 560 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 560 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 561 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 561 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 562 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحد الائتماني</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 562 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحد الائتماني</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 563 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 563 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 564 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 564 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 565 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 565 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 573 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.name}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 577 | **sx={{** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 577 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 580 | **sx={{** | `<TableCell align="right" sx={{ color: limitExceeded ? 'error.main' : 'warning.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 585 | **Arabic Text** | `label={limitExceeded ? 'تجاوز الحد الائتماني' : 'سليم ائتمانياً'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 598 | **Arabic Text** | `<EmptyState message="لا يوجد منافذ بيع مسجلة حالياً." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 605 | **Arabic Text** | `<LoadingState message="جاري تحميل أرصدة المحافظات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 607 | **sx={{** | `<TableContainer component={Paper} sx={{ boxShadow: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 608 | **sx={{** | `<Table sx={{ minWidth: 650 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 609 | **sx={{** | `<TableHead sx={{ bgcolor: 'action.selected' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 611 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 611 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 612 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 612 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 613 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 613 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 619 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.governorate}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 620 | **sx={{** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 620 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 623 | **sx={{** | `<TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 623 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 632 | **Arabic Text** | `<EmptyState message="لا توجد بيانات لأي محافظات." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 639 | **Arabic Text** | `<LoadingState message="جاري تحميل أرصدة الفئات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 641 | **sx={{** | `<TableContainer component={Paper} sx={{ boxShadow: 0 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 642 | **sx={{** | `<Table sx={{ minWidth: 650 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 643 | **sx={{** | `<TableHead sx={{ bgcolor: 'action.selected' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 645 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة منفذ التوزيع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 645 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة منفذ التوزيع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 646 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 646 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحصل (نقداً)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 647 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 647 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (ذمم مدينة)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 653 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>{bal.outlet_type_name}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 654 | **sx={{** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 654 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 657 | **sx={{** | `<TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 657 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'warning.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 666 | **Arabic Text** | `<EmptyState message="لا توجد فئات منافذ مسجلة." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 673 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>تسجيل حركة تسوية يدوية (الخزينة والحسابات)</DialogTitle>` | Move component styling to a separate CSS file and assign a class name. |
| 673 | **Arabic Text** | `<DialogTitle sx={{ fontWeight: 'bold' }}>تسجيل حركة تسوية يدوية (الخزينة والحسابات)</DialogTitle>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 678 | **Arabic Text** | `<InputLabel>اختر منفذ التوزيع / الفرع</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 682 | **Arabic Text** | `label="اختر منفذ التوزيع / الفرع"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 694 | **Arabic Text** | `<InputLabel>طبيعة التسوية</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 698 | **Arabic Text** | `label="طبيعة التسوية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 713 | **Arabic Text** | `label="المبلغ المالي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 720 | **Arabic Text** | `startAdornment: <InputAdornment position="start">ج.م</InputAdornment>,` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 732 | **Arabic Text** | `label="البيان وسبب التسوية (إلزامي)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 736 | **Arabic Text** | `placeholder="يرجى كتابة شرح كامل لسبب التعديل المالي..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 741 | **Arabic Text** | `<Button onClick={() => setAdjustOpen(false)} disabled={submittingAdj}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 743 | **Arabic Text** | `{submittingAdj ? 'جاري الحفظ والتسجيل...' : 'تسجيل التسوية المالي'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 756 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Inventory.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Inventory.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 57 | **sx={{** | `{value === index && <Box sx={{ pt: 2 }}>{children}</Box>}` | Move component styling to a separate CSS file and assign a class name. |
| 87 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل ملخص المخزون.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 112 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل سجل الحركات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 132 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل سجل الوارد.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 153 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل تفاصيل الوارد.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 195 | **Arabic Text** | `showToast('تاريخ الاستلام وتفاصيل جميع الأصناف مطلوبة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 210 | **Arabic Text** | `showToast('تم تسجيل إذن الوارد بنجاح وتحديث أرصدة المخزون.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 215 | **Arabic Text** | `showToast(err.message \|\| 'فشل تسجيل إذن الوارد.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 252 | **Arabic Text** | `showToast('السبب ومعرّف المنتج والكمية مطلوبة لكل صنف.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 265 | **Arabic Text** | `showToast('تم تسجيل تسوية المخزون بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 270 | **Arabic Text** | `showToast(err.message \|\| 'فشل تسجيل تسوية المخزون.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 280 | **Arabic Text** | `case 'receipt': return 'وارد';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 281 | **Arabic Text** | `case 'sale': return 'مبيعات';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 282 | **Arabic Text** | `case 'adjustment': return 'تسوية';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 283 | **Arabic Text** | `case 'return': return 'مرتجع';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 299 | **Arabic Text** | `if (stock <= 0) return <Chip label="نفد" color="error" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 300 | **Arabic Text** | `if (stock <= 10) return <Chip label="منخفض" color="warning" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 301 | **Arabic Text** | `return <Chip label="متوفر" color="success" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 307 | **sx={{** | `<Box sx={{ p: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 309 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 310 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 310 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 311 | **Arabic Text** | `إدارة المخزون والوارد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 313 | **sx={{** | `<Box sx={{ display: 'flex', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 316 | **Arabic Text** | `إذن وارد جديد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 321 | **Arabic Text** | `تسوية مخزون` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 328 | **sx={{** | `<Paper sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 336 | **Arabic Text** | `<Tab icon={<InventoryIcon />} label="ملخص المخزون" iconPosition="start" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 337 | **Arabic Text** | `<Tab icon={<SwapVertIcon />} label="سجل الحركات" iconPosition="start" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 338 | **Arabic Text** | `<Tab icon={<ReceiptIcon />} label="أذونات الوارد" iconPosition="start" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 345 | **sx={{** | `<Box sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 348 | **Arabic Text** | `placeholder="بحث بالعنوان أو الكود..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 352 | **sx={{** | `sx={{ minWidth: 300 }}` | Move component styling to a separate CSS file and assign a class name. |
| 358 | **sx={{** | `<Alert severity="error" icon={<WarningIcon />} sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 359 | **Arabic Text** | `يوجد {stockData.filter(s => s.stock <= 0).length} منتج/ات بدون رصيد (نفد المخزون).` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 363 | **sx={{** | `<Paper sx={{ overflow: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 365 | **Arabic Text** | `<LoadingState message="جاري تحميل ملخص المخزون..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 367 | **Arabic Text** | `<EmptyState title="لا يوجد بيانات مخزون" description="لم يتم العثور على منتجات نشطة أو لا توجد حركات." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 369 | **sx={{** | `<TableContainer sx={{ maxHeight: 550 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 373 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المعرّف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 373 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المعرّف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 374 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>كود المنتج</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 374 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>كود المنتج</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 375 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>اسم المنتج</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 375 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>اسم المنتج</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 376 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 376 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 377 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الرصيد الحالي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 377 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الرصيد الحالي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 378 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 378 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 383 | **sx={{** | `<TableRow key={row.id} hover sx={{ backgroundColor: row.stock <= 0 ? 'rgba(231,76,60,0.04)' : 'inherit' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 383 | **Hardcoded Color** | `<TableRow key={row.id} hover sx={{ backgroundColor: row.stock <= 0 ? 'rgba(231,76,60,0.04)' : 'inherit' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 384 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{row.id}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 385 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{row.code \|\| '—'}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 386 | **sx={{** | `<TableCell sx={{ fontWeight: 500 }}>{row.title}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 388 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **sx={{** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **Hardcoded Color** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 401 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 402 | **Arabic Text** | `<Typography variant="body2" color="textSecondary">عدد:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 403 | **sx={{** | `<Select size="small" value={stockLimit} onChange={(e) => { setStockLimit(e.target.value); setStockOffset(0); }} sx={{ minWidth: 60 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 409 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 410 | **Arabic Text** | `<Button size="small" disabled={stockOffset === 0} onClick={() => setStockOffset(stockOffset - stockLimit)}>السابق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 411 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>({stockOffset + 1} - {stockOffset + stockData.length})</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 412 | **Arabic Text** | `<Button size="small" disabled={stockData.length < stockLimit} onClick={() => setStockOffset(stockOffset + stockLimit)}>التالي</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 421 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">` | Move component styling to a separate CSS file and assign a class name. |
| 424 | **Arabic Text** | `fullWidth size="small" label="معرّف المنتج (Product ID)" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 431 | **Arabic Text** | `<InputLabel>نوع الحركة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 432 | **Arabic Text** | `<Select value={txType} onChange={(e) => { setTxType(e.target.value); setTxOffset(0); }} label="نوع الحركة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 433 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 434 | **Arabic Text** | `<MenuItem value="receipt">وارد</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 435 | **Arabic Text** | `<MenuItem value="sale">مبيعات</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 436 | **Arabic Text** | `<MenuItem value="adjustment">تسوية</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 437 | **Arabic Text** | `<MenuItem value="return">مرتجع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 443 | **Arabic Text** | `إلغاء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 448 | **sx={{** | `<Paper sx={{ overflow: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 450 | **Arabic Text** | `<LoadingState message="جاري تحميل سجل الحركات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 452 | **Arabic Text** | `<EmptyState title="لا يوجد حركات مسجلة" description="لم يتم تسجيل أي حركة مخزنية بعد." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 454 | **sx={{** | `<TableContainer sx={{ maxHeight: 550 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 458 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 459 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 459 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 460 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>نوع الحركة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 460 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>نوع الحركة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 461 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 461 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 462 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المرجع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 462 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المرجع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 463 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 463 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 464 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 464 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 470 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{row.id}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 472 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>{row.product_title}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 473 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{row.product_code}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 473 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{row.product_code}</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 478 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold', color: row.quantity >= 0 ? 'success.main' : 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 481 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 481 | **Hardcoded Color** | `<TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 494 | **sx={{** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 494 | **Hardcoded Color** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 495 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 496 | **Arabic Text** | `<Typography variant="body2" color="textSecondary">عدد:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 497 | **sx={{** | `<Select size="small" value={txLimit} onChange={(e) => { setTxLimit(e.target.value); setTxOffset(0); }} sx={{ minWidth: 60 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 503 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 504 | **Arabic Text** | `<Button size="small" disabled={txOffset === 0} onClick={() => setTxOffset(txOffset - txLimit)}>السابق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 505 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>({txOffset + 1} - {txOffset + txData.length})</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 506 | **Arabic Text** | `<Button size="small" disabled={txData.length < txLimit} onClick={() => setTxOffset(txOffset + txLimit)}>التالي</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 514 | **sx={{** | `<Paper sx={{ overflow: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 516 | **Arabic Text** | `<LoadingState message="جاري تحميل أذونات الوارد..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 519 | **Arabic Text** | `title="لا يوجد أذونات وارد"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 520 | **Arabic Text** | `description="لم يتم تسجيل أذونات وارد بعد."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 521 | **Arabic Text** | `actionLabel={hasPermission('inventory.receipts.create') ? 'إذن وارد جديد' : undefined}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 525 | **sx={{** | `<TableContainer sx={{ maxHeight: 550 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الإذن</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الإذن</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 530 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المورّد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 530 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المورّد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 531 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستلام</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 531 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستلام</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 532 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 532 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 533 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 533 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 534 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>خيارات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 534 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>خيارات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 540 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.receipt_number}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 543 | **sx={{** | `<TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 548 | **Arabic Text** | `<Tooltip title="عرض تفاصيل الإذن">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 562 | **sx={{** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 562 | **Hardcoded Color** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 563 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 564 | **Arabic Text** | `<Typography variant="body2" color="textSecondary">عدد:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 565 | **sx={{** | `<Select size="small" value={receiptsLimit} onChange={(e) => { setReceiptsLimit(e.target.value); setReceiptsOffset(0); }} sx={{ minWidth: 60 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 571 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 572 | **Arabic Text** | `<Button size="small" disabled={receiptsOffset === 0} onClick={() => setReceiptsOffset(receiptsOffset - receiptsLimit)}>السابق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 573 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>({receiptsOffset + 1} - {receiptsOffset + receipts.length})</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 574 | **Arabic Text** | `<Button size="small" disabled={receipts.length < receiptsLimit} onClick={() => setReceiptsOffset(receiptsOffset + receiptsLimit)}>التالي</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 589 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 590 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسجيل إذن وارد جديد</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 590 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسجيل إذن وارد جديد</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 591 | **Arabic Text** | `<Button onClick={() => setOpenCreateReceipt(false)} variant="outlined" size="small" color="inherit" disabled={rcSubmitting}>إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 593 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 594 | **style={{** | `<form onSubmit={handleSubmitReceipt} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 595 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 598 | **Arabic Text** | `<TextField fullWidth label="اسم المورّد (اختياري)" size="small" value={rcSupplier} onChange={(e) => setRcSupplier(e.target.value)} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 601 | **Arabic Text** | `<TextField fullWidth required label="تاريخ الاستلام" size="small" type="date" InputLabelProps={{ shrink: true }} value={rcDate} onChange={(e) => setRcDate(e.target.value)} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 604 | **Arabic Text** | `<TextField fullWidth label="ملاحظات" size="small" multiline rows={2} value={rcNotes} onChange={(e) => setRcNotes(e.target.value)} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 609 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 610 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 611 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>أصناف الوارد</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 611 | **Arabic Text** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>أصناف الوارد</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 612 | **Arabic Text** | `<Button size="small" startIcon={<AddIcon />} onClick={handleRcAddItem}>إضافة صنف</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 616 | **sx={{** | `<Grid container spacing={1} key={idx} sx={{ mb: 1 }} alignItems="center">` | Move component styling to a separate CSS file and assign a class name. |
| 618 | **Arabic Text** | `<TextField fullWidth required label="معرّف المنتج (Product ID)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 622 | **Arabic Text** | `<TextField fullWidth required label="الكمية" size="small" type="number" inputProps={{ min: 1 }}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 626 | **Arabic Text** | `<TextField fullWidth required label="تكلفة الوحدة" size="small" type="number" inputProps={{ step: '0.01', min: 0 }}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 628 | **Arabic Text** | `InputProps={{ endAdornment: <InputAdornment position="end">ج.م</InputAdornment> }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 640 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 641 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 642 | **Arabic Text** | `<Button variant="outlined" color="inherit" onClick={() => setOpenCreateReceipt(false)} disabled={rcSubmitting}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 644 | **Arabic Text** | `{rcSubmitting ? 'جاري التسجيل...' : 'تأكيد وتسجيل الوارد'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 659 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 660 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل إذن الوارد</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 660 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل إذن الوارد</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 661 | **Arabic Text** | `<Button onClick={() => setOpenReceiptDetail(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 663 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 664 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 666 | **Arabic Text** | `<LoadingState message="جاري التحميل..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 669 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 671 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم الإذن</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 672 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{receiptDetail.receipt_number}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 675 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">المورّد</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 679 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">تاريخ الاستلام</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 683 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">بواسطة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 688 | **sx={{** | `<Alert severity="info" sx={{ mb: 2 }}>{receiptDetail.notes}</Alert>` | Move component styling to a separate CSS file and assign a class name. |
| 693 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 693 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 695 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 695 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 696 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الكود</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 696 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الكود</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 697 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 697 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 698 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تكلفة الوحدة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 698 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تكلفة الوحدة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 699 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 699 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 705 | **sx={{** | `<TableCell sx={{ fontWeight: 500 }}>{item.product_title}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 706 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{item.product_code \|\| '—'}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 707 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>{item.quantity}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 709 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 720 | **Arabic Text** | `<EmptyState title="لا توجد بيانات" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 734 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 735 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسوية مخزون (زيادة / نقص)</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 735 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسوية مخزون (زيادة / نقص)</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 736 | **Arabic Text** | `<Button onClick={() => setOpenAdjust(false)} variant="outlined" size="small" color="inherit" disabled={adjSubmitting}>إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 738 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 739 | **style={{** | `<form onSubmit={handleSubmitAdjustment} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 740 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 741 | **sx={{** | `<Alert severity="info" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 742 | **Arabic Text** | `استخدم كمية موجبة لزيادة الرصيد وكمية سالبة لخصم الرصيد (مثلاً: تلف، فقدان).` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 746 | **Arabic Text** | `<TextField fullWidth required label="سبب التسوية" size="small" value={adjReason} onChange={(e) => setAdjReason(e.target.value)}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 747 | **Arabic Text** | `placeholder="مثل: جرد فعلي، تلف بضاعة، تصحيح أخطاء..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 750 | **Arabic Text** | `<TextField fullWidth label="ملاحظات" size="small" multiline rows={2} value={adjNotes} onChange={(e) => setAdjNotes(e.target.value)} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 755 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 756 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 757 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>الأصناف</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 757 | **Arabic Text** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>الأصناف</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 758 | **Arabic Text** | `<Button size="small" startIcon={<AddIcon />} onClick={handleAdjAddItem}>إضافة صنف</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 762 | **sx={{** | `<Grid container spacing={1} key={idx} sx={{ mb: 1 }} alignItems="center">` | Move component styling to a separate CSS file and assign a class name. |
| 764 | **Arabic Text** | `<TextField fullWidth required label="معرّف المنتج (Product ID)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 768 | **Arabic Text** | `<TextField fullWidth required label="الكمية (+/-)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 781 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 782 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 783 | **Arabic Text** | `<Button variant="outlined" color="inherit" onClick={() => setOpenAdjust(false)} disabled={adjSubmitting}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 785 | **Arabic Text** | `{adjSubmitting ? 'جاري التسجيل...' : 'تأكيد وتسجيل التسوية'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 793 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Invoices.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Invoices.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 59 | **Arabic Text** | `'عمان',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **Arabic Text** | `'إربد',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 61 | **Arabic Text** | `'الزرقاء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 62 | **Arabic Text** | `'البلقاء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 63 | **Arabic Text** | `'المفرق',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 64 | **Arabic Text** | `'الكرك',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 65 | **Arabic Text** | `'مادبا',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 66 | **Arabic Text** | `'جرش',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 67 | **Arabic Text** | `'عجلون',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 68 | **Arabic Text** | `'الطفيلة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 69 | **Arabic Text** | `'معان',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 70 | **Arabic Text** | `'العقبة'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 208 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل الفواتير.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 251 | **Arabic Text** | `showToast('تمت إعادة تعيين الفلاتر.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 281 | **Arabic Text** | `showToast('جاري إنشاء ملف الـ PDF...');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 300 | **Arabic Text** | `if (!rawResponse.ok) throw new Error('فشل تصدير ملف الـ PDF');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 305 | **Arabic Text** | `link.setAttribute('download', `تقرير_الفواتير_${Date.now()}.pdf`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 309 | **Arabic Text** | `showToast('تم تحميل التقرير بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 312 | **Arabic Text** | `showToast('حدث خطأ أثناء تصدير ملف الـ PDF.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 319 | **Arabic Text** | `showToast('جاري تحميل الفاتورة...');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 329 | **Arabic Text** | `if (!rawResponse.ok) throw new Error('فشل تصدير الفاتورة');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 334 | **Arabic Text** | `link.setAttribute('download', `فاتورة_${invoiceId}.pdf`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 338 | **Arabic Text** | `showToast('تم تحميل الفاتورة بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 341 | **Arabic Text** | `showToast('فشل تحميل ملف الـ PDF للفاتورة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 354 | **Arabic Text** | `showToast('فشل تحميل تفاصيل الفاتورة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 369 | **Arabic Text** | `showToast('تم توليد خطة الأقساط بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 376 | **Arabic Text** | `showToast(err.message \|\| 'فشل توليد خطة الأقساط.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 431 | **Arabic Text** | `showToast('فشل تحميل بيانات الفاتورة للتعديل.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 453 | **Arabic Text** | `showToast('يرجى اختيار المنفذ أولاً لتحديد قائمة الأسعار.', 'warning');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 514 | **Arabic Text** | `updated[index].error = 'لا يوجد سعر محدد للفئة';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 519 | **Arabic Text** | `updated[index].error = 'خطأ في جلب السعر';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 532 | **Arabic Text** | `updated[index].error = `الكمية المدخلة (${parsedQty}) تتجاوز المتوفر بالمخزن (${updated[index].stock})`;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 535 | **Arabic Text** | `if (updated[index].error && updated[index].error.includes('المتوفر')) {` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 558 | **Arabic Text** | `showToast('المنفذ مطلوب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 562 | **Arabic Text** | `showToast('يجب إضافة مادة واحدة على الأقل في الفاتورة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 569 | **Arabic Text** | `showToast('يرجى تصحيح أخطاء المواد المدرجة والتأكد من تحديد الكتب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 589 | **Arabic Text** | `showToast('تم إنشاء الفاتورة وحسم الكميات بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 592 | **Arabic Text** | `showToast('تم تحديث الفاتورة وتعديل حركة المخزون بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 599 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ الفاتورة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 609 | **Arabic Text** | `return <Chip label="مسددة" color="success" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 611 | **Arabic Text** | `return <Chip label="غير مسددة" color="error" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 613 | **Arabic Text** | `return <Chip label="مسددة جزئياً" color="warning" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 615 | **Arabic Text** | `return <Chip label="متأخرة" color="secondary" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 617 | **Arabic Text** | `return <Chip label={status \|\| 'غير معروف'} size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 624 | **Arabic Text** | `return <Chip label="قيد الانتظار" variant="outlined" color="warning" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 626 | **Arabic Text** | `return <Chip label="تم الشحن" color="primary" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 628 | **Arabic Text** | `return <Chip label="شحن جزئي" variant="outlined" color="info" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 630 | **Arabic Text** | `return <Chip label="تم التسليم" color="success" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 632 | **Arabic Text** | `return <Chip label={status \|\| 'غير معروف'} size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 639 | **Arabic Text** | `return 'نقدي';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 641 | **Arabic Text** | `return 'آجل';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 643 | **Arabic Text** | `return 'أقساط';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 645 | **Arabic Text** | `return 'مختلط';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 654 | **sx={{** | `<Box sx={{ p: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 656 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 657 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 657 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 658 | **Arabic Text** | `إدارة فواتير المبيعات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 661 | **sx={{** | `<Box sx={{ display: 'flex', gap: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 669 | **Arabic Text** | `تصدير المحددة ({selectedInvoiceIds.length}) PDF` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 680 | **Arabic Text** | `إنشاء فاتورة جديدة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 687 | **sx={{** | `<Card sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 688 | **sx={{** | `<CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>` | Move component styling to a separate CSS file and assign a class name. |
| 690 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 698 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 700 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 701 | **Arabic Text** | `خيارات البحث المتقدم والتصفية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 709 | **sx={{** | `<Collapse in={showFilters} sx={{ mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 710 | **sx={{** | `<Divider sx={{ my: 1.5 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 716 | **Arabic Text** | `label="رقم الفاتورة، المنفذ، الملاحظات"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 733 | **Arabic Text** | `<InputLabel>المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 737 | **Arabic Text** | `label="المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 739 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 752 | **Arabic Text** | `<InputLabel>فئة المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 756 | **Arabic Text** | `label="فئة المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 758 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 771 | **Arabic Text** | `<InputLabel>المحافظة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 775 | **Arabic Text** | `label="المحافظة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 777 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 790 | **Arabic Text** | `<InputLabel>حالة المتبقي</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 794 | **Arabic Text** | `label="حالة المتبقي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 796 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 797 | **Arabic Text** | `<MenuItem value="yes">يوجد متبقي ذمة مالية</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 798 | **Arabic Text** | `<MenuItem value="no">مسددة بالكامل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 807 | **Arabic Text** | `label="أدنى متبقي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 819 | **Arabic Text** | `label="أقصى متبقي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 830 | **Arabic Text** | `<InputLabel>حالة الدفع</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 834 | **Arabic Text** | `label="حالة الدفع"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 836 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 837 | **Arabic Text** | `<MenuItem value="paid">مسددة</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 838 | **Arabic Text** | `<MenuItem value="unpaid">غير مسددة</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 839 | **Arabic Text** | `<MenuItem value="partially_paid">مسددة جزئياً</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 840 | **Arabic Text** | `<MenuItem value="overdue">متأخرة</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 848 | **Arabic Text** | `<InputLabel>حالة الشحن</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 852 | **Arabic Text** | `label="حالة الشحن"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 854 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 855 | **Arabic Text** | `<MenuItem value="pending">قيد الانتظار</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 856 | **Arabic Text** | `<MenuItem value="shipped">تم الشحن</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 857 | **Arabic Text** | `<MenuItem value="partially_shipped">شحن جزئي</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 858 | **Arabic Text** | `<MenuItem value="delivered">تم التسليم</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 870 | **Arabic Text** | `renderInput={(params) => <TextField {...params} label="تصفية بحسب الكتاب" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 881 | **Arabic Text** | `renderInput={(params) => <TextField {...params} label="تصفية بحسب المؤلف" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 889 | **Arabic Text** | `label="من تاريخ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 902 | **Arabic Text** | `label="إلى تاريخ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 913 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 920 | **Arabic Text** | `إلغاء التصفية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 928 | **Arabic Text** | `تطبيق الفلاتر` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 936 | **sx={{** | `<Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 938 | **Arabic Text** | `<LoadingState message="جاري تحميل قائمة الفواتير وحساب المبالغ المتبقية..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 941 | **Arabic Text** | `title="لا يوجد فواتير"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 942 | **Arabic Text** | `description="لم يتم العثور على فواتير تطابق معايير البحث والخيارات المحددة."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 945 | **sx={{** | `<TableContainer sx={{ maxHeight: 600 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 961 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 961 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 962 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 962 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 963 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 963 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 964 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>نوع الدفع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 964 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>نوع الدفع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 965 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة الدفع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 965 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة الدفع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 966 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة الشحن</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 966 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة الشحن</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 967 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 968 | **Arabic Text** | `المجموع` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 970 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 971 | **Arabic Text** | `المسدد / المتبقي` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 973 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 150 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 974 | **Arabic Text** | `خيارات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 989 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 999 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 999 | **Hardcoded Color** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1003 | **sx={{** | `<Box sx={{ display: 'flex', flexDirection: 'column' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1004 | **sx={{** | `<Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1004 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1007 | **sx={{** | `<Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1007 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1008 | **Arabic Text** | `{formatCurrencyEGP(row.remaining_amount \|\| 0)} متبقي` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1015 | **Arabic Text** | `title="عرض التفاصيل الكاملة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1024 | **Arabic Text** | `title="تعديل الفاتورة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1034 | **Arabic Text** | `title="تحميل فاتورة PDF"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1051 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 1056 | **Hardcoded Color** | `borderTop: '1px solid rgba(224, 224, 224, 1)'` | Reference values via CSS variables or standard MUI components classes. |
| 1059 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1061 | **Arabic Text** | `عدد الفواتير المعروضة بالصفحة:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1070 | **sx={{** | `sx={{ minWidth: 70 }}` | Move component styling to a separate CSS file and assign a class name. |
| 1079 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1081 | **Arabic Text** | `السابق` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1083 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1084 | **Arabic Text** | `السجلات ({offset + 1} - {offset + invoices.length})` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1087 | **Arabic Text** | `التالي` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1104 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1105 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1106 | **Arabic Text** | `عرض تفاصيل الفاتورة: {detailsInvoice.invoice_number}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1108 | **Arabic Text** | `<Button onClick={() => setOpenDetailsModal(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1110 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1111 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1113 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1115 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">المنفذ / العميل</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1116 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{detailsInvoice.outlet_name}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1119 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">التاريخ والوقت</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1123 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">نوع الدفع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1124 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{translatePaymentType(detailsInvoice.payment_type)}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1127 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">حالة الدفع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1128 | **sx={{** | `<Box sx={{ mt: 0.5 }}>{getPaymentStatusChip(detailsInvoice.payment_status)}</Box>` | Move component styling to a separate CSS file and assign a class name. |
| 1131 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">حالة التوزيع والشحن</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1132 | **sx={{** | `<Box sx={{ mt: 0.5 }}>{getShippingStatusChip(detailsInvoice.shipping_status)}</Box>` | Move component styling to a separate CSS file and assign a class name. |
| 1135 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">تم إدخالها بواسطة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1136 | **Arabic Text** | `<Typography variant="body1">{detailsInvoice.user_full_name \|\| 'غير معروف'}</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1139 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">شروط وتفاصيل إضافية</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1140 | **Arabic Text** | `<Typography variant="body2">{detailsInvoice.notes \|\| 'لا توجد ملاحظات إضافية'}</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1145 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1146 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>أصناف الفاتورة:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1146 | **Arabic Text** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>أصناف الفاتورة:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1149 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1149 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1151 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>اسم الكتاب</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1151 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>اسم الكتاب</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1152 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المطلوبة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1152 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المطلوبة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1153 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>تم شحنها</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1153 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>تم شحنها</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1154 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1154 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1155 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>خصم الصنف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1155 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>خصم الصنف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1156 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1156 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الإجمالي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1163 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>{item.quantity}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1172 | **sx={{** | `<TableCell align="right" sx={{ color: 'error.main' }}>-{formatCurrencyEGP(item.discount \|\| 0)}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1172 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'error.main' }}>-{formatCurrencyEGP(item.discount \|\| 0)}</TableCell>` | Reference values via CSS variables or standard MUI components classes. |
| 1173 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrencyEGP(item.total_price)}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1182 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1183 | **sx={{** | `<Box sx={{ width: 300 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1184 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1185 | **Arabic Text** | `<Typography variant="body2">المجموع الفرعي:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1188 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1189 | **Arabic Text** | `<Typography variant="body2">تكلفة الشحن:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1192 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1193 | **Arabic Text** | `<Typography variant="body2">الخصم الممنوح:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1194 | **sx={{** | `<Typography variant="body2" sx={{ color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1194 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1198 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1199 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1200 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع النهائي:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1200 | **Arabic Text** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع النهائي:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1201 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1201 | **Hardcoded Color** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1205 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1205 | **Hardcoded Color** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'success.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1206 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>المجموع المسدد:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1206 | **Arabic Text** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>المجموع المسدد:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1207 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1211 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1211 | **Hardcoded Color** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1212 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>المبلغ المتبقي:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1212 | **Arabic Text** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>المبلغ المتبقي:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1213 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1221 | **sx={{** | `<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1223 | **Arabic Text** | `<Tab label="سجل التحصيلات والمدفوعات" icon={<PaymentsIcon />} iconPosition="start" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1224 | **Arabic Text** | `<Tab label="خطة وجدولة الأقساط" icon={<EventNoteIcon />} iconPosition="start" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1225 | **Arabic Text** | `<Tab label="سجل حالات الفاتورة" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1235 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1235 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1237 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم العملية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1237 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم العملية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1238 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ السداد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1238 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ السداد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1239 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>طريقة السداد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1239 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>طريقة السداد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1240 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القيمة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1240 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القيمة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1241 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>سجلت بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1241 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>سجلت بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1242 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1242 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1248 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{p.receipt_number \|\| p.id}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1251 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1251 | **Hardcoded Color** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1254 | **Arabic Text** | `<TableCell>{p.user_full_name \|\| 'غير معروف'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1262 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', p: 2, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1262 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', p: 2, textAlign: 'center' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1263 | **Arabic Text** | `لا يوجد دفعات مسددة مسجلة لهذه الفاتورة حتى الآن.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1274 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1275 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1276 | **Arabic Text** | `الأقساط المجدولة الحالية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1280 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1280 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1282 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم القسط</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1282 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم القسط</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1283 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستحقاق</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1283 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستحقاق</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1284 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القيمة المطلوبة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1284 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>القيمة المطلوبة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1285 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة القسط</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1285 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>حالة القسط</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1286 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الدفع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1286 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الدفع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1287 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1287 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1295 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1300 | **Arabic Text** | `<Chip label="مدفوع" color="success" size="small" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1302 | **Arabic Text** | `<Chip label="متأخر استحقاقه" color="error" size="small" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1304 | **Arabic Text** | `<Chip label="غير مدفوع" color="warning" size="small" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1321 | **sx={{** | `<Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#fdfefe' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1321 | **Hardcoded Color** | `<Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#fdfefe' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1322 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.dark' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1322 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.dark' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1323 | **Arabic Text** | `أداة جدولة الأقساط (توليد خطة سداد)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1329 | **Arabic Text** | `label="عدد الأقساط"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1339 | **Arabic Text** | `label="الفترة بين الأقساط (بالأيام)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1349 | **Arabic Text** | `label="تاريخ أول قسط"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1364 | **sx={{** | `sx={{ height: 40 }}` | Move component styling to a separate CSS file and assign a class name. |
| 1366 | **Arabic Text** | `{scheduleLoading ? 'جاري التوليد...' : 'توليد/تحديث الجدول'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1372 | **Arabic Text** | `label="ملاحظات الجدولة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1389 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1389 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1391 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الحركة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1391 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الحركة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1392 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>النوع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1392 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>النوع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1393 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة السابقة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1393 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة السابقة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1394 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة الجديدة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1394 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة الجديدة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1395 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1395 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1396 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>السبب / الملاحظة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 1396 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>السبب / الملاحظة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1404 | **Arabic Text** | `{h.status_type === 'payment' ? 'دفع مالية' : 'توصيل شحن'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1408 | **Arabic Text** | `<TableCell>{h.user_full_name \|\| 'غير معروف'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1418 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1419 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1427 | **Arabic Text** | `تنزيل PDF` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1431 | **Arabic Text** | `إغلاق` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1448 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1449 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1450 | **Arabic Text** | `{formMode === 'create' ? 'إنشاء فاتورة مبيعات جديدة' : 'تعديل فاتورة مبيعات'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1452 | **Arabic Text** | `<Button onClick={() => setOpenFormModal(false)} variant="outlined" size="small" color="inherit" disabled={formSubmitting}>إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1454 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1455 | **style={{** | `<form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 1456 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1457 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1461 | **Arabic Text** | `<InputLabel>المنفذ / العميل</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1465 | **Arabic Text** | `label="المنفذ / العميل"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1476 | **sx={{** | `<Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mt: 0.5, fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1476 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'secondary.main', display: 'block', mt: 0.5, fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1477 | **Arabic Text** | `فئة المنفذ المحددة: {formOutletTypeLabel} (سيتم احتساب الأسعار بناءً عليها تلقائياً)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1485 | **Arabic Text** | `<InputLabel>نوع الدفع</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1489 | **Arabic Text** | `label="نوع الدفع"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1491 | **Arabic Text** | `<MenuItem value="cash">نقدي (Cash)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1492 | **Arabic Text** | `<MenuItem value="deferred">آجل ذمم (Deferred)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1493 | **Arabic Text** | `<MenuItem value="installments">أقساط (Installments)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1494 | **Arabic Text** | `<MenuItem value="mixed">مختلط (Mixed - دفعة نقدية + أقساط)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1503 | **Arabic Text** | `label="الخصم المباشر الممنوح"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1510 | **Arabic Text** | `endAdornment: <InputAdornment position="end">ج.م</InputAdornment>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1519 | **Arabic Text** | `label="تكلفة وأجور الشحن والتوصيل"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1526 | **Arabic Text** | `endAdornment: <InputAdornment position="end">ج.م</InputAdornment>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1535 | **Arabic Text** | `label="ملاحظات وتفاصيل الفاتورة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1545 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1548 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1549 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1550 | **Arabic Text** | `المواد والكتب المباعة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1559 | **Arabic Text** | `إضافة مادة للفاتورة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1564 | **sx={{** | `<Alert severity="info" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1565 | **Arabic Text** | `لم يتم إضافة أي كتاب في الفاتورة حتى الآن. انقر على "إضافة مادة للفاتورة" للبدء.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1571 | **sx={{** | `<Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: '#fafbfc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1571 | **Hardcoded Color** | `<Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: '#fafbfc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1582 | **Arabic Text** | `renderInput={(params) => <TextField {...params} required label="الكتاب" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1590 | **Arabic Text** | `label="السعر للوحدة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1593 | **Arabic Text** | `value={item.price ? formatCurrencyEGP(item.price) : '0.00 ج.م'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1601 | **Arabic Text** | `label="الكمية المطلوبة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1613 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1614 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1614 | **Hardcoded Color** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1625 | **sx={{** | `<Grid item xs={12} sx={{ pt: '0px !important' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1626 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1628 | **sx={{** | `<Typography variant="caption" sx={{ color: item.stockPolicy === 'track' && item.stock <= 0 ? 'error.main' : 'text.secondary', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1629 | **Arabic Text** | `المتوفر في المخزن: {item.stock} {item.stockPolicy === 'ignore' && '(مخزون لا حصر له)'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1633 | **sx={{** | `<Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1633 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1648 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1649 | **sx={{** | `<Paper variant="outlined" sx={{ p: 2, width: 300, backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1649 | **Hardcoded Color** | `<Paper variant="outlined" sx={{ p: 2, width: 300, backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1650 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1651 | **Arabic Text** | `<Typography variant="body2">المجموع الفرعي:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1652 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formTotals.subtotal} ج.م</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1652 | **Arabic Text** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formTotals.subtotal} ج.م</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1654 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1655 | **Arabic Text** | `<Typography variant="body2">الشحن والتوصل:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1658 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1659 | **Arabic Text** | `<Typography variant="body2">الخصم:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1660 | **sx={{** | `<Typography variant="body2" sx={{ color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1660 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1664 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1665 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1666 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع الإجمالي:</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 1666 | **Arabic Text** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>المجموع الإجمالي:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1667 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1667 | **Hardcoded Color** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 1668 | **Arabic Text** | `{formTotals.total} ج.م` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1675 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 1676 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 1683 | **Arabic Text** | `إلغاء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1691 | **Arabic Text** | `{formSubmitting ? 'جاري الحفظ والتحقق من الكميات...' : 'حفظ وتأكيد الفاتورة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 1704 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Login.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Login.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 30 | **Arabic Text** | `setError('يرجى إدخال اسم المستخدم وكلمة المرور');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 41 | **Arabic Text** | `setError(err.message \|\| 'فشل تسجيل الدخول. يرجى التحقق من اسم المستخدم وكلمة المرور.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 49 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 60 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 72 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 78 | **Hardcoded Color** | `color: '#fff',` | Reference values via CSS variables or standard MUI components classes. |
| 86 | **sx={{** | `<StoreIcon sx={{ fontSize: 28 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 89 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 89 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 90 | **Arabic Text** | `تسجيل الدخول` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 92 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.85rem' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 92 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.85rem' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 97 | **sx={{** | `<Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 108 | **Arabic Text** | `label="اسم المستخدم"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 115 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 122 | **Arabic Text** | `label="كلمة المرور"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 129 | **sx={{** | `sx={{ mb: 3 }}` | Move component styling to a separate CSS file and assign a class name. |
| 137 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 143 | **Hardcoded Color** | `color: 'secondary.contrastText',` | Reference values via CSS variables or standard MUI components classes. |
| 149 | **Arabic Text** | `{loading ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 153 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.disabled', mt: 3, display: 'block' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 153 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.disabled', mt: 3, display: 'block' }}>` | Reference values via CSS variables or standard MUI components classes. |

### [pages/Notifications.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Notifications.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 41 | **Arabic Text** | `'stock_negative': 'رصيد سالب',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 42 | **Arabic Text** | `'stock_low': 'رصيد منخفض',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 43 | **Arabic Text** | `'outlet_credit_limit_exceeded': 'تجاوز الحد الائتماني',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 44 | **Arabic Text** | `'invoice_overdue': 'فاتورة متأخرة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 45 | **Arabic Text** | `'installment_due': 'قسط مستحق/متأخر',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 46 | **Arabic Text** | `'payment_received': 'دفعة مالية مستلمة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 47 | **Arabic Text** | `'shipment_partial': 'شحن جزئي',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 48 | **Arabic Text** | `'shipment_delayed': 'شحنة متأخرة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 49 | **Arabic Text** | `'system': 'تنبيه نظام'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 53 | **Arabic Text** | `'critical': 'حرج',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Arabic Text** | `'warning': 'تحذير',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 55 | **Arabic Text** | `'info': 'معلومة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 56 | **Arabic Text** | `'success': 'نجاح'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **Arabic Text** | `'unread': 'غير مقروء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 61 | **Arabic Text** | `'read': 'مقروء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 62 | **Arabic Text** | `'resolved': 'تم الحل'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 154 | **sx={{** | `<Box sx={{ p: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 155 | **sx={{** | `<Paper sx={{ p: 3, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 156 | **Arabic Text** | `<Typography color="error">لا تمتلك صلاحية لعرض التنبيهات.</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 164 | **sx={{** | `<Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 165 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 166 | **Arabic Text** | `مركز التنبيهات وإدارة العمليات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 171 | **sx={{** | `<Paper sx={{ p: 2.5, mb: 3, borderRadius: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 175 | **Arabic Text** | `<InputLabel>تصنيف التنبيه</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 178 | **Arabic Text** | `label="تصنيف التنبيه"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 181 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 190 | **Arabic Text** | `<InputLabel>الأهمية / الخطورة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 193 | **Arabic Text** | `label="الأهمية / الخطورة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 196 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 203 | **sx={{** | `<Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 203 | **Left Alignment** | `<Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>` | Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required. |
| 205 | **Arabic Text** | `إعادة تعيين الفلاتر` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 212 | **sx={{** | `<Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 219 | **sx={{** | `sx={{ borderBottom: 1, borderColor: 'divider' }}` | Move component styling to a separate CSS file and assign a class name. |
| 221 | **Arabic Text** | `<Tab value="all" label="جميع التنبيهات" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 222 | **Arabic Text** | `<Tab value="unread" label="غير المقروءة" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 223 | **Arabic Text** | `<Tab value="read" label="المقروءة" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 224 | **Arabic Text** | `<Tab value="resolved" label="المحلولة / المؤرشفة" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 228 | **sx={{** | `<Box sx={{ py: 8 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 229 | **Arabic Text** | `<LoadingState message="جاري تحميل التنبيهات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 233 | **sx={{** | `<Table sx={{ minWidth: 650 }} aria-label="notifications table">` | Move component styling to a separate CSS file and assign a class name. |
| 234 | **sx={{** | `<TableHead sx={{ backgroundColor: 'action.hover' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 236 | **sx={{** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={80}>الأهمية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 236 | **Arabic Text** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={80}>الأهمية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 237 | **sx={{** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={120}>التصنيف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 237 | **Arabic Text** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={120}>التصنيف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 238 | **sx={{** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }}>التفاصيل والرسالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 238 | **Arabic Text** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }}>التفاصيل والرسالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 239 | **sx={{** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={160}>التاريخ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 239 | **Arabic Text** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={160}>التاريخ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 240 | **sx={{** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={100}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 240 | **Arabic Text** | `<TableCell sx={{ textAlign: 'right', fontWeight: 'bold' }} width={100}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 241 | **sx={{** | `<TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }} width={140}>الإجراءات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 241 | **Arabic Text** | `<TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }} width={140}>الإجراءات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 247 | **sx={{** | `<TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 247 | **Hardcoded Color** | `<TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 248 | **Arabic Text** | `لا توجد تنبيهات تطابق خيارات البحث الحالية.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 253 | **sx={{** | `<TableRow key={n.id} hover sx={{ backgroundColor: n.status === 'unread' ? 'action.hover' : 'transparent' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 254 | **sx={{** | `<TableCell sx={{ textAlign: 'right' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 255 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 257 | **sx={{** | `<Typography variant="caption" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 262 | **sx={{** | `<TableCell sx={{ textAlign: 'right' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 265 | **sx={{** | `<TableCell sx={{ textAlign: 'right' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 266 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: n.status === 'unread' ? 'bold' : 'normal' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 269 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 269 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 273 | **sx={{** | `<TableCell sx={{ textAlign: 'right' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 274 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 274 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 278 | **sx={{** | `<TableCell sx={{ textAlign: 'right' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 285 | **sx={{** | `<TableCell sx={{ textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 286 | **sx={{** | `<Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 288 | **Arabic Text** | `<Tooltip title="انتقال للصفحة المصدر">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 295 | **Arabic Text** | `<Tooltip title="تحديد كمقروء">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 302 | **Arabic Text** | `<Tooltip title="تأكيد حل التنبيه">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 320 | **sx={{** | `<Box sx={{ p: 2.5, display: 'flex', justifyContent: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Outlets.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Outlets.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 45 | **Arabic Text** | `'عمان',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 46 | **Arabic Text** | `'إربد',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 47 | **Arabic Text** | `'الزرقاء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 48 | **Arabic Text** | `'البلقاء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 49 | **Arabic Text** | `'المفرق',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 50 | **Arabic Text** | `'الكرك',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 51 | **Arabic Text** | `'مادبا',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 52 | **Arabic Text** | `'جرش',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 53 | **Arabic Text** | `'عجلون',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Arabic Text** | `'الطفيلة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 55 | **Arabic Text** | `'معان',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 56 | **Arabic Text** | `'العقبة'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 117 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل بيانات المنافذ.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 141 | **Arabic Text** | `setFormGovernorate('عمان');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 167 | **Arabic Text** | `showToast('الاسم، فئة المنفذ، والمحافظة حقول مطلوبة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 185 | **Arabic Text** | `showToast('تم إضافة منفذ التوزيع بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 188 | **Arabic Text** | `showToast('تم تحديث بيانات منفذ التوزيع بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 197 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ التعديلات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 205 | **Arabic Text** | `showToast(`تم ${targetStatus === 'active' ? 'تفعيل' : 'تعطيل'} المنفذ بنجاح.`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 209 | **Arabic Text** | `showToast(err.message \|\| 'فشل تغيير حالة المنفذ.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 219 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 220 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 220 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 221 | **Arabic Text** | `إدارة منافذ التوزيع والفروع` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 229 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 231 | **Arabic Text** | `إضافة منفذ جديد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 237 | **sx={{** | `<Paper sx={{ p: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 243 | **Arabic Text** | `placeholder="البحث باسم المنفذ أو الهاتف..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 257 | **Arabic Text** | `<InputLabel id="gov-filter-label">المحافظة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 261 | **Arabic Text** | `label="المحافظة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 264 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 275 | **Arabic Text** | `<InputLabel id="type-filter-label">فئة المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 279 | **Arabic Text** | `label="فئة المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 282 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 293 | **Arabic Text** | `<InputLabel id="status-filter-label">الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 297 | **Arabic Text** | `label="الحالة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 300 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 301 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 302 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 311 | **Arabic Text** | `<EmptyState title="لا توجد منافذ بيع" description="لم نتمكن من العثور على أي منافذ توزيع مطابقة لمعايير البحث الحالية." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 315 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 315 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 317 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 317 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 318 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الفئة والسعر المعتمد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 318 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الفئة والسعر المعتمد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 319 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة والمدينة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 319 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة والمدينة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 320 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الهاتف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 320 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الهاتف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 321 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>السقف الائتماني</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 321 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>السقف الائتماني</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 322 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 322 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 323 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 323 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 329 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 500 }}>{outlet.name}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 333 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 333 | **Hardcoded Color** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 338 | **Arabic Text** | `label={outlet.status === 'active' ? 'نشط' : 'معطل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 344 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 346 | **Arabic Text** | `<IconButton color="primary" onClick={() => handleOpenEditModal(outlet)} title="تعديل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 354 | **Arabic Text** | `title={outlet.status === 'active' ? 'تعطيل' : 'تفعيل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 377 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 378 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 379 | **Arabic Text** | `{modalMode === 'create' ? 'إضافة منفذ توزيع جديد' : 'تعديل بيانات المنفذ'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 381 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 383 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 384 | **style={{** | `<form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 385 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 392 | **Arabic Text** | `label="اسم المنفذ / المعرض"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 395 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 399 | **sx={{** | `<FormControl fullWidth sx={{ mt: 1, mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **Arabic Text** | `<InputLabel id="form-type-label">فئة المنفذ التسعيرية</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 404 | **Arabic Text** | `label="فئة المنفذ التسعيرية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 416 | **sx={{** | `<FormControl fullWidth sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 417 | **Arabic Text** | `<InputLabel id="form-gov-label">المحافظة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 421 | **Arabic Text** | `label="المحافظة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 436 | **Arabic Text** | `label="رقم الهاتف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 439 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 447 | **Arabic Text** | `label="السقف الائتماني المالي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 451 | **Arabic Text** | `endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 453 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 457 | **sx={{** | `<FormControl fullWidth sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 458 | **Arabic Text** | `<InputLabel id="form-status-label">الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 462 | **Arabic Text** | `label="الحالة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 465 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 466 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 474 | **Arabic Text** | `label="تفاصيل العنوان (شارع، بناية، رقم المكتب)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 477 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 486 | **Arabic Text** | `label="ملاحظات وشروط خاصة بالمنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 493 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 494 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 495 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 496 | **Arabic Text** | `<Button type="submit" variant="contained" color="secondary">حفظ</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 508 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/OutletTypes.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/OutletTypes.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 65 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل فئات المنافذ.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 101 | **Arabic Text** | `showToast('اسم الفئة مطلوب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 114 | **Arabic Text** | `showToast('تم إضافة فئة المنفذ بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 117 | **Arabic Text** | `showToast('تم تحديث فئة المنفذ بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 123 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ التعديلات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 133 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 134 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 134 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 135 | **Arabic Text** | `إدارة فئات منافذ التوزيع` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 143 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 145 | **Arabic Text** | `إضافة فئة جديدة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 151 | **Arabic Text** | `<EmptyState title="لا توجد فئات منافذ" description="لم يتم تسجيل أي فئات منافذ توزيع في النظام بعد." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 155 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 155 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 157 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم الفئة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 157 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم الفئة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 158 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الوصف والبيانات الإضافية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 158 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الوصف والبيانات الإضافية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 159 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 159 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 160 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 160 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 166 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 500 }}>{item.name}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 170 | **Arabic Text** | `label={item.status === 'active' ? 'نشط' : 'معطل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 177 | **Arabic Text** | `<IconButton color="primary" onClick={() => handleOpenEditModal(item)} title="تعديل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 193 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 194 | **Arabic Text** | `{modalMode === 'create' ? 'إضافة فئة منفذ توزيع' : 'تعديل فئة منفذ توزيع'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 202 | **Arabic Text** | `label="اسم الفئة (مثال: جملة، مفرق، معارض خارجية)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 205 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 212 | **Arabic Text** | `label="الوصف والتفاصيل"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 215 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 217 | **sx={{** | `<FormControl fullWidth sx={{ mt: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 218 | **Arabic Text** | `<InputLabel id="status-label">الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 222 | **Arabic Text** | `label="الحالة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 225 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 226 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 231 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 232 | **Arabic Text** | `<Button type="submit" variant="contained" color="secondary">حفظ</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 244 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Payments.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Payments.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 118 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل سجل المدفوعات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 154 | **Arabic Text** | `case 'cash': return 'نقدي';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 155 | **Arabic Text** | `case 'check': return 'شيك';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 156 | **Arabic Text** | `case 'bank_transfer': return 'تحويل بنكي';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 157 | **Arabic Text** | `case 'deferred': return 'آجل';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 158 | **Arabic Text** | `default: return m \|\| 'غير محدد';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 165 | **Arabic Text** | `return <Chip label="مدفوع" color="success" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 167 | **Arabic Text** | `return <Chip label="مدفوع جزئياً" color="warning" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 169 | **Arabic Text** | `return <Chip label="متأخر" color="error" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 171 | **Arabic Text** | `return <Chip label="غير مدفوع" variant="outlined" size="small" />;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 218 | **Arabic Text** | `showToast('رقم الفاتورة والمبلغ وطريقة الدفع مطلوبة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 231 | **Arabic Text** | `showToast('تم تسجيل الدفعة بنجاح وتحديث حالة الفاتورة.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 236 | **Arabic Text** | `showToast(err.message \|\| 'فشل تسجيل الدفعة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 257 | **Arabic Text** | `showToast('تم إلغاء/عكس الدفعة وإعادة حساب رصيد الفاتورة بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 262 | **Arabic Text** | `showToast(err.message \|\| 'فشل عكس الدفعة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 274 | **Arabic Text** | `showToast(`تم التحقق من الأقساط المتأخرة بنجاح. تم تحديث ${res.updatedCount \|\| 0} قسط.`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 277 | **Arabic Text** | `showToast(err.message \|\| 'فشل التحقق من الأقساط المتأخرة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 294 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل بيانات تحصيلات الفاتورة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 304 | **sx={{** | `<Box sx={{ p: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 306 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 307 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 307 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 308 | **Arabic Text** | `سجل المدفوعات والتحصيل` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 311 | **sx={{** | `<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 320 | **Arabic Text** | `{overdueChecking ? 'جاري الفحص...' : 'فحص الأقساط المتأخرة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 331 | **Arabic Text** | `تسجيل دفعة جديدة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 338 | **sx={{** | `<Card sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 339 | **sx={{** | `<CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>` | Move component styling to a separate CSS file and assign a class name. |
| 341 | **sx={{** | `sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}` | Move component styling to a separate CSS file and assign a class name. |
| 344 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 346 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 347 | **Arabic Text** | `خيارات البحث والتصفية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 355 | **sx={{** | `<Collapse in={showFilters} sx={{ mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 356 | **sx={{** | `<Divider sx={{ my: 1.5 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 361 | **Arabic Text** | `label="رقم معرّف الفاتورة (Invoice ID)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 377 | **Arabic Text** | `تطبيق` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 382 | **Arabic Text** | `إلغاء التصفية` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 392 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 394 | **sx={{** | `<Card sx={{ backgroundColor: 'success.light', color: 'success.contrastText' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 394 | **Hardcoded Color** | `<Card sx={{ backgroundColor: 'success.light', color: 'success.contrastText' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 395 | **sx={{** | `<CardContent sx={{ py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 396 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 398 | **Arabic Text** | `<Typography variant="subtitle2">إجمالي الدفعات المعروضة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 400 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 407 | **sx={{** | `<Card sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 407 | **Hardcoded Color** | `<Card sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 408 | **sx={{** | `<CardContent sx={{ py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 409 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 411 | **Arabic Text** | `<Typography variant="subtitle2">عدد الدفعات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 413 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 420 | **sx={{** | `<Card sx={{ backgroundColor: 'warning.light', color: 'warning.contrastText' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 420 | **Hardcoded Color** | `<Card sx={{ backgroundColor: 'warning.light', color: 'warning.contrastText' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 421 | **sx={{** | `<CardContent sx={{ py: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 422 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 424 | **Arabic Text** | `<Typography variant="subtitle2">فواتير مشمولة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 426 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 436 | **sx={{** | `<Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 438 | **Arabic Text** | `<LoadingState message="جاري تحميل سجل المدفوعات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 441 | **Arabic Text** | `title="لا يوجد دفعات مسجلة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 442 | **Arabic Text** | `description="لم يتم تسجيل أي دفعات بعد، أو لا توجد دفعات تطابق معايير التصفية."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 445 | **sx={{** | `<TableContainer sx={{ maxHeight: 600 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 449 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 450 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 450 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 451 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الدفع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 451 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الدفع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 452 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>طريقة الدفع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 452 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>طريقة الدفع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 453 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 453 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 454 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المرجع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 454 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المرجع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 455 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>سجّلت بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 455 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>سجّلت بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 456 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 456 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 457 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 130 }}>خيارات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 457 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 130 }}>خيارات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 463 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{row.id}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 470 | **sx={{** | `sx={{ fontFamily: 'monospace', cursor: 'pointer' }}` | Move component styling to a separate CSS file and assign a class name. |
| 480 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 480 | **Hardcoded Color** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 483 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 483 | **Hardcoded Color** | `<TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 486 | **Arabic Text** | `<TableCell>{row.user_full_name \|\| 'غير معروف'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 487 | **sx={{** | `<TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 491 | **Arabic Text** | `<Tooltip title="عرض تفاصيل تحصيلات الفاتورة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 498 | **Arabic Text** | `<Tooltip title="تسجيل دفعة إضافية لنفس الفاتورة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 506 | **Arabic Text** | `<Tooltip title="إلغاء / عكس هذه الدفعة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 522 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 527 | **Hardcoded Color** | `borderTop: '1px solid rgba(224, 224, 224, 1)'` | Reference values via CSS variables or standard MUI components classes. |
| 530 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 531 | **Arabic Text** | `<Typography variant="body2" color="textSecondary">عدد السجلات بالصفحة:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 536 | **sx={{** | `sx={{ minWidth: 70 }}` | Move component styling to a separate CSS file and assign a class name. |
| 544 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 545 | **Arabic Text** | `<Button size="small" disabled={offset === 0} onClick={handlePrevPage}>السابق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 546 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 549 | **Arabic Text** | `<Button size="small" disabled={payments.length < limit} onClick={handleNextPage}>التالي</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 563 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 564 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسجيل دفعة جديدة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 564 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تسجيل دفعة جديدة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 565 | **Arabic Text** | `<Button onClick={() => setOpenAddPayment(false)} variant="outlined" size="small" color="inherit" disabled={payFormSubmitting}>إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 567 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 568 | **style={{** | `<form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 569 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 576 | **Arabic Text** | `label="رقم معرّف الفاتورة (Invoice ID)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 589 | **sx={{** | `<Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 589 | **Hardcoded Color** | `<Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 592 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 593 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 598 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">نوع الدفع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 599 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 604 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">إجمالي الفاتورة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 605 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 610 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">المسدد حتى الآن</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 611 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 611 | **Hardcoded Color** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 616 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 617 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 617 | **Hardcoded Color** | `<Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 618 | **Arabic Text** | `المتبقي: {formatCurrencyEGP(payFormMetrics.remainingAmount)}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 623 | **Arabic Text** | `label={`${payFormMetrics.overdueCount} أقساط متأخرة`}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 635 | **sx={{** | `sx={{ mt: 1, height: 8, borderRadius: 4 }}` | Move component styling to a separate CSS file and assign a class name. |
| 649 | **Arabic Text** | `label="مبلغ الدفعة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 656 | **Arabic Text** | `endAdornment: <InputAdornment position="end">ج.م</InputAdornment>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 660 | **Arabic Text** | `? `الحد الأقصى المسموح: ${formatCurrencyEGP(payFormMetrics.remainingAmount)}`` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 669 | **Arabic Text** | `<InputLabel>طريقة الدفع</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 673 | **Arabic Text** | `label="طريقة الدفع"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 675 | **Arabic Text** | `<MenuItem value="cash">نقدي (Cash)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 676 | **Arabic Text** | `<MenuItem value="check">شيك (Check)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 677 | **Arabic Text** | `<MenuItem value="bank_transfer">تحويل بنكي (Bank Transfer)</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 686 | **Arabic Text** | `label="تاريخ الدفع"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 699 | **Arabic Text** | `label="رقم مرجعي / رقم الإيصال"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 710 | **Arabic Text** | `label="ملاحظات"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 720 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 721 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 723 | **Arabic Text** | `إلغاء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 726 | **Arabic Text** | `{payFormSubmitting ? 'جاري التسجيل...' : 'تأكيد وتسجيل الدفعة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 739 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold', color: 'error.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 739 | **Hardcoded Color** | `<DialogTitle sx={{ fontWeight: 'bold', color: 'error.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 740 | **Arabic Text** | `إلغاء / عكس دفعة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 744 | **sx={{** | `<Box sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 745 | **sx={{** | `<Alert severity="warning" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 746 | **Arabic Text** | `سيتم حذف سجل الدفعة وإعادة حساب رصيد الفاتورة والأقساط تلقائياً. لا يمكن التراجع عن هذه العملية.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 748 | **sx={{** | `<Typography variant="body2" sx={{ mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 749 | **Arabic Text** | `<strong>رقم الدفعة:</strong> {reversePaymentTarget.id}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 751 | **sx={{** | `<Typography variant="body2" sx={{ mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 752 | **Arabic Text** | `<strong>الفاتورة:</strong> {reversePaymentTarget.invoice_number}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 754 | **sx={{** | `<Typography variant="body2" sx={{ mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 755 | **Arabic Text** | `<strong>المبلغ:</strong>{' '}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 756 | **style={{** | `<span style={{ color: '#e74c3c', fontWeight: 'bold' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 756 | **Hardcoded Color** | `<span style={{ color: '#e74c3c', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 764 | **Arabic Text** | `label="سبب الإلغاء / ملاحظات"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 772 | **sx={{** | `<DialogActions sx={{ p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 774 | **Arabic Text** | `تراجع` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 777 | **Arabic Text** | `{reverseSubmitting ? 'جاري الإلغاء...' : 'تأكيد الإلغاء وعكس الدفعة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 791 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 792 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 793 | **Arabic Text** | `تفاصيل تحصيلات وأقساط الفاتورة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 795 | **Arabic Text** | `<Button onClick={() => setOpenMetrics(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 797 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 798 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 800 | **Arabic Text** | `<LoadingState message="جاري تحميل بيانات التحصيلات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 804 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 806 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 807 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 812 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">نوع الدفع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 813 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 818 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">إجمالي الفاتورة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 819 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 819 | **Hardcoded Color** | `<Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 824 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">حالة الدفع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 825 | **sx={{** | `<Box sx={{ mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 826 | **Arabic Text** | `{metricsData.paymentStatus === 'paid' && <Chip label="مسددة بالكامل" color="success" size="small" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 827 | **Arabic Text** | `{metricsData.paymentStatus === 'unpaid' && <Chip label="غير مسددة" color="error" size="small" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 828 | **Arabic Text** | `{metricsData.paymentStatus === 'partially_paid' && <Chip label="مسددة جزئياً" color="warning" size="small" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 829 | **Arabic Text** | `{metricsData.paymentStatus === 'overdue' && <Chip label="متأخرة" color="error" size="small" />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 835 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 836 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 837 | **sx={{** | `<Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 837 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 838 | **Arabic Text** | `المسدد: {formatCurrencyEGP(metricsData.paidAmount)}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 840 | **sx={{** | `<Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 840 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 841 | **Arabic Text** | `المتبقي: {formatCurrencyEGP(metricsData.remainingAmount)}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 849 | **sx={{** | `sx={{ height: 10, borderRadius: 5 }}` | Move component styling to a separate CSS file and assign a class name. |
| 852 | **sx={{** | `<Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 854 | **Arabic Text** | `? `${((metricsData.paidAmount / metricsData.totalPrice) * 100).toFixed(1)}% مسددة`` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 860 | **sx={{** | `<Alert severity="error" icon={<WarningIcon />} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 861 | **Arabic Text** | `يوجد {metricsData.overdueCount} قسط/أقساط متأخرة عن موعد الاستحقاق.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 868 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 869 | **Arabic Text** | `جدول الأقساط ({metricsData.installments.length} قسط)` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 873 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 873 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 875 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم القسط</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 875 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم القسط</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 876 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستحقاق</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 876 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الاستحقاق</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 877 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ المطلوب</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 877 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ المطلوب</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 878 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ المسدد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 878 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبلغ المسدد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 879 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 879 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 880 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 880 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 887 | **sx={{** | `sx={{` | Move component styling to a separate CSS file and assign a class name. |
| 888 | **Hardcoded Color** | `backgroundColor: inst.status === 'overdue' ? 'rgba(231, 76, 60, 0.06)' : 'inherit'` | Reference values via CSS variables or standard MUI components classes. |
| 895 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 898 | **sx={{** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 898 | **Hardcoded Color** | `<TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 902 | **sx={{** | `<TableCell sx={{ color: 'text.secondary' }}>{inst.notes \|\| '-'}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 902 | **Hardcoded Color** | `<TableCell sx={{ color: 'text.secondary' }}>{inst.notes \|\| '-'}</TableCell>` | Reference values via CSS variables or standard MUI components classes. |
| 910 | **sx={{** | `<Alert severity="info" sx={{ mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 911 | **Arabic Text** | `لا يوجد جدول أقساط مُعدّ لهذه الفاتورة. يمكن إعداد جدول الأقساط من صفحة تفاصيل الفاتورة.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 917 | **sx={{** | `<Box sx={{ mt: 3, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 927 | **Arabic Text** | `تسجيل دفعة لهذه الفاتورة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 933 | **Arabic Text** | `<EmptyState title="لا يوجد بيانات" description="تعذر تحميل بيانات التحصيلات." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 936 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 937 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 938 | **Arabic Text** | `<Button onClick={() => setOpenMetrics(false)} variant="contained" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 949 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Products.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Products.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 109 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل المنتجات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 138 | **Arabic Text** | `showToast('فشل تحميل قائمة أسعار المنتج.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 205 | **Arabic Text** | `showToast('عنوان الكتاب ورمز SKU مطلوبان.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 223 | **Arabic Text** | `showToast('تم إنشاء المنتج بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 227 | **Arabic Text** | `showToast('تم تحديث بيانات المنتج بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 254 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ التعديلات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 267 | **Arabic Text** | `showToast('تم حذف المنتج بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 271 | **Arabic Text** | `showToast(err.message \|\| 'فشل حذف المنتج من قاعدة البيانات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 284 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 285 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 285 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 286 | **Arabic Text** | `دليل الكتب والمنشورات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 294 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 296 | **Arabic Text** | `إضافة كتاب / منتج جديد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 302 | **sx={{** | `<Paper sx={{ p: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 308 | **Arabic Text** | `placeholder="البحث بالاسم أو الرمز SKU..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 322 | **Arabic Text** | `<InputLabel id="cat-filter-label">التصنيف</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 326 | **Arabic Text** | `label="التصنيف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 329 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 340 | **Arabic Text** | `<InputLabel id="status-filter-label">حالة المنتج</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 344 | **Arabic Text** | `label="حالة المنتج"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 347 | **Arabic Text** | `<MenuItem value="">الجميع</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 348 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 349 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 358 | **Arabic Text** | `<EmptyState title="لا يوجد منتجات" description="لم نتمكن من العثور على أي كتب تطابق معايير البحث الحالية." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 362 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 362 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 364 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الرمز (SKU)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 364 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الرمز (SKU)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 365 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العنوان والكتاب</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 365 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العنوان والكتاب</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 366 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 366 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 367 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المؤلفين</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 367 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المؤلفين</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 368 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سياسة الجرد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 368 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سياسة الجرد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 369 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 369 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 370 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 370 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 376 | **sx={{** | `<TableCell align="right" sx={{ fontFamily: 'monospace' }}>{p.code}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 377 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 500 }}>{p.title}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 383 | **Arabic Text** | `p.authors.map(a => a.name).join('، ')` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 385 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير محدد</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 385 | **Arabic Text** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير محدد</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 385 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary' }}>غير محدد</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 389 | **Arabic Text** | `{p.stock_policy === 'track' ? 'تتبع الكميات' : 'تجاهل الجرد'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 393 | **Arabic Text** | `label={p.status === 'active' ? 'نشط' : 'معطل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 399 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **Arabic Text** | `<IconButton color="secondary" onClick={() => handleOpenDetails(p)} title="عرض التفاصيل والأسعار">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 404 | **Arabic Text** | `<IconButton color="primary" onClick={() => handleOpenEditModal(p)} title="تعديل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 409 | **Arabic Text** | `<IconButton color="error" onClick={() => handleDeleteProduct(p.id)} title="حذف">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 433 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 434 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الكتاب والأسعار</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 434 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الكتاب والأسعار</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 435 | **Arabic Text** | `<Button onClick={() => setOpenDetailsModal(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 437 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 438 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 442 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{detailsProduct.title}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 443 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>رمز SKU: {detailsProduct.code}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 443 | **Arabic Text** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>رمز SKU: {detailsProduct.code}</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 443 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>رمز SKU: {detailsProduct.code}</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 444 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 444 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 445 | **Arabic Text** | `التصنيف: {detailsProduct.category \|\| 'غير محدد'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 447 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 447 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 448 | **Arabic Text** | `المؤلفين: {detailsProduct.authors?.map(a => a.name).join('، ') \|\| 'غير محدد'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 453 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 454 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 455 | **Arabic Text** | `أسعار البيع المعتمدة بحسب فئات المنافذ:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 458 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>لا توجد أسعار مدخلة بعد لهذا المنتج.</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 458 | **Arabic Text** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>لا توجد أسعار مدخلة بعد لهذا المنتج.</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 458 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary' }}>لا توجد أسعار مدخلة بعد لهذا المنتج.</Typography>` | Reference values via CSS variables or standard MUI components classes. |
| 461 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 461 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 463 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 463 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 464 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>السعر المعتمد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 464 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>السعر المعتمد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 471 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 471 | **Hardcoded Color** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 496 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 497 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 498 | **Arabic Text** | `{modalMode === 'create' ? 'إضافة كتاب / منتج جديد' : 'تعديل بيانات المنتج'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 500 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 502 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 503 | **style={{** | `<form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 504 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 511 | **Arabic Text** | `label="عنوان الكتاب / المنتج"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 514 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 522 | **Arabic Text** | `label="رمز SKU / الرمز التعريفي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 525 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 532 | **Arabic Text** | `label="التصنيف (مثال: رواية، أكاديمي، فلسفة)"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 535 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 539 | **sx={{** | `<FormControl fullWidth size="small" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 540 | **Arabic Text** | `<InputLabel id="form-stock-policy-label">سياسة المخزون والجرد</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 544 | **Arabic Text** | `label="سياسة المخزون والجرد"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 547 | **Arabic Text** | `<MenuItem value="track">تتبع الجرد والكميات</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 548 | **Arabic Text** | `<MenuItem value="ignore">تجاهل الجرد ومراقبة stock</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 554 | **sx={{** | `<FormControl fullWidth size="small" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 555 | **Arabic Text** | `<InputLabel id="form-authors-label">المؤلفين المشاركين</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 560 | **Arabic Text** | `label="المؤلفين المشاركين"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 563 | **sx={{** | `<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 581 | **sx={{** | `<FormControl fullWidth size="small" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 582 | **Arabic Text** | `<InputLabel id="form-status-label">حالة المنتج</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 586 | **Arabic Text** | `label="حالة المنتج"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 589 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 590 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 596 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 597 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 597 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 598 | **Arabic Text** | `قائمة أسعار البيع المعتمدة بحسب فئات المنافذ:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 607 | **Arabic Text** | `label={`السعر لـ (${ot.name})`}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 613 | **Arabic Text** | `endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 622 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 623 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 624 | **Arabic Text** | `<Button onClick={() => setOpenModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 625 | **Arabic Text** | `<Button type="submit" variant="contained" color="secondary">حفظ التغييرات</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 637 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'Outfit, sans-serif' }}>تأكيد حذف المنتج</DialogTitle>` | Move component styling to a separate CSS file and assign a class name. |
| 637 | **Arabic Text** | `<DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'Outfit, sans-serif' }}>تأكيد حذف المنتج</DialogTitle>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 639 | **Arabic Text** | `<Typography>هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 641 | **sx={{** | `<DialogActions sx={{ px: 3, pb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 642 | **Arabic Text** | `<Button onClick={() => setConfirmOpen(false)} color="inherit">إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 644 | **Arabic Text** | `حذف` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 656 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Profile.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Profile.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 34 | **Arabic Text** | `setError('يرجى تعبئة كافة الحقول المطلوب');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 39 | **Arabic Text** | `setError('كلمة المرور الجديدة غير متطابقة مع التأكيد');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 44 | **Arabic Text** | `setError('يجب ألا تقل كلمة المرور الجديدة عن ٦ خانات');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Arabic Text** | `setSuccess('تم تغيير كلمة المرور بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **Arabic Text** | `setError(err.message \|\| 'فشل تغيير كلمة المرور. يرجى التحقق من المدخلات.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 67 | **sx={{** | `<Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 68 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 68 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 69 | **Arabic Text** | `الملف الشخصي وإعدادات الحساب` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 75 | **sx={{** | `<Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 76 | **sx={{** | `<AccountCircleIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 76 | **Hardcoded Color** | `<AccountCircleIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />` | Reference values via CSS variables or standard MUI components classes. |
| 77 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 80 | **sx={{** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 80 | **Hardcoded Color** | `<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 81 | **Arabic Text** | `اسم المستخدم: {user?.username}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 83 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 84 | **sx={{** | `<Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'right', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 84 | **Hardcoded Color** | `<Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'right', mb: 1 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 85 | **Arabic Text** | `الأدوار النشطة:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 87 | **sx={{** | `<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'flex-start' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 99 | **sx={{** | `<Paper sx={{ p: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 100 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 101 | **sx={{** | `<LockIcon color="primary" sx={{ mr: 1, ml: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 102 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 103 | **Arabic Text** | `تغيير كلمة المرور` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 106 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 108 | **sx={{** | `{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}` | Move component styling to a separate CSS file and assign a class name. |
| 109 | **sx={{** | `{success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}` | Move component styling to a separate CSS file and assign a class name. |
| 116 | **Arabic Text** | `label="كلمة المرور الحالية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 120 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 126 | **Arabic Text** | `label="كلمة المرور الجديدة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 130 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 136 | **Arabic Text** | `label="تأكيد كلمة المرور الجديدة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 140 | **sx={{** | `sx={{ mb: 3 }}` | Move component styling to a separate CSS file and assign a class name. |
| 148 | **sx={{** | `sx={{ py: 1.2, fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 150 | **Arabic Text** | `{loading ? <CircularProgress size={24} color="inherit" /> : 'تحديث كلمة المرور'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

### [pages/Reports.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Reports.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 41 | **Arabic Text** | `'دمشق',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 42 | **Arabic Text** | `'ريف دمشق',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 43 | **Arabic Text** | `'حلب',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 44 | **Arabic Text** | `'حمص',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 45 | **Arabic Text** | `'حماة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 46 | **Arabic Text** | `'اللاذقية',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 47 | **Arabic Text** | `'طرطوس',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 48 | **Arabic Text** | `'إدلب',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 49 | **Arabic Text** | `'درعا',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 50 | **Arabic Text** | `'السويداء',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 51 | **Arabic Text** | `'القنيطرة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 52 | **Arabic Text** | `'دير الزور',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 53 | **Arabic Text** | `'الحسكة',` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 54 | **Arabic Text** | `'الرقة'` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 60 | **sx={{** | `{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}` | Move component styling to a separate CSS file and assign a class name. |
| 139 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل الخلاصة المالية', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 156 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل أرصدة المنافذ', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 169 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل مبيعات المحافظات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 182 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل مبيعات فئات المنافذ', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 197 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل تقرير المخزون', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 212 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل تقرير المؤلفين', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 226 | **Arabic Text** | `showToast(err.message \|\| 'خطأ في تحميل تقرير التوريدات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 258 | **Arabic Text** | `showToast('ليس لديك صلاحية تصدير البيانات', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 264 | **Arabic Text** | `showToast('بدأ تحميل ملف التصدير...', 'info');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 269 | **sx={{** | `<Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 271 | **sx={{** | `<Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 271 | **Hardcoded Color** | `<Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 272 | **Arabic Text** | `التقارير والإحصائيات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 274 | **sx={{** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 274 | **Hardcoded Color** | `<Typography variant="body1" sx={{ color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 275 | **Arabic Text** | `متابعة الحركات المالية، المستودعية ومبيعات الفروع والمؤلفين.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 281 | **sx={{** | `<Paper sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 290 | **Arabic Text** | `<Tab label="الخلاصة المالية" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 291 | **Arabic Text** | `<Tab label="أرصدة المنافذ" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 292 | **Arabic Text** | `<Tab label="مبيعات المحافظات" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 293 | **Arabic Text** | `<Tab label="مبيعات فئات المنافذ" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 294 | **Arabic Text** | `<Tab label="حالة المخزون" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 295 | **Arabic Text** | `<Tab label="مبيعات المؤلفين" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 296 | **Arabic Text** | `<Tab label="سجل التوريدات" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 301 | **sx={{** | `<Paper sx={{ p: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 309 | **Arabic Text** | `label="تاريخ البدء"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 320 | **Arabic Text** | `label="تاريخ النهاية"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 335 | **Arabic Text** | `<InputLabel>المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 339 | **Arabic Text** | `label="المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 341 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 354 | **Arabic Text** | `<InputLabel>فئة المنفذ</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 358 | **Arabic Text** | `label="فئة المنفذ"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 360 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 369 | **Arabic Text** | `<InputLabel>المحافظة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 373 | **Arabic Text** | `label="المحافظة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 375 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 392 | **Arabic Text** | `label="بحث باسم الكتاب أو الرمز"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 399 | **Arabic Text** | `<InputLabel>الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 400 | **Arabic Text** | `<Select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} label="الحالة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 401 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 402 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 403 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 417 | **Arabic Text** | `label="بحث باسم المؤلف"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 424 | **Arabic Text** | `<InputLabel>الحالة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 425 | **Arabic Text** | `<Select value={authorStatus} onChange={(e) => setAuthorStatus(e.target.value)} label="الحالة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 426 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 427 | **Arabic Text** | `<MenuItem value="active">نشط</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 428 | **Arabic Text** | `<MenuItem value="disabled">معطل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 441 | **Arabic Text** | `label="بحث باسم المورد"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 449 | **sx={{** | `<Grid item xs={12} sm={2} sx={{ display: 'flex', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 458 | **Arabic Text** | `مسح` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 466 | **Arabic Text** | `{summaryLoading ? <LoadingState /> : !summaryData ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 469 | **sx={{** | `<Card sx={{ bgcolor: '#ebf5fb', borderRight: 6, borderColor: 'primary.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 469 | **Hardcoded Color** | `<Card sx={{ bgcolor: '#ebf5fb', borderRight: 6, borderColor: 'primary.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 470 | **sx={{** | `<TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 471 | **sx={{** | `<CardContent sx={{ py: '0 !important' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 472 | **Arabic Text** | `<Typography variant="subtitle2" color="text.secondary">إجمالي المبيعات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 473 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }}>{formatCurrencyEGP(summaryData.totalSales)}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 479 | **sx={{** | `<Card sx={{ bgcolor: '#e8f8f5', borderRight: 6, borderColor: 'success.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 479 | **Hardcoded Color** | `<Card sx={{ bgcolor: '#e8f8f5', borderRight: 6, borderColor: 'success.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 480 | **sx={{** | `<PaymentIcon color="success" sx={{ fontSize: 40, mr: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 481 | **sx={{** | `<CardContent sx={{ py: '0 !important' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 482 | **Arabic Text** | `<Typography variant="subtitle2" color="text.secondary">المبالغ المسددة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 483 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }} color="success.main">{formatCurrencyEGP(summaryData.totalPaid)}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 489 | **sx={{** | `<Card sx={{ bgcolor: '#fdf2e9', borderRight: 6, borderColor: 'warning.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 489 | **Hardcoded Color** | `<Card sx={{ bgcolor: '#fdf2e9', borderRight: 6, borderColor: 'warning.main', display: 'flex', alignItems: 'center', p: 2 }}>` | Reference values via CSS variables or standard MUI components classes. |
| 490 | **sx={{** | `<WalletIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 491 | **sx={{** | `<CardContent sx={{ py: '0 !important' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 492 | **Arabic Text** | `<Typography variant="subtitle2" color="text.secondary">المبالغ المتبقية (الديون)</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 493 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }} color="warning.main">{formatCurrencyEGP(summaryData.totalRemaining)}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 499 | **sx={{** | `<Card sx={{ p: 2, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 500 | **Arabic Text** | `<Typography variant="body2" color="text.secondary">مبيعات نقدية (كاش)</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 501 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>{summaryData.totalCashSales.toLocaleString()}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 505 | **sx={{** | `<Card sx={{ p: 2, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 506 | **Arabic Text** | `<Typography variant="body2" color="text.secondary">متبقي آجل (Deferred)</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 507 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>{summaryData.totalDeferredRemaining.toLocaleString()}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 511 | **sx={{** | `<Card sx={{ p: 2, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 512 | **Arabic Text** | `<Typography variant="body2" color="text.secondary">متبقي أقساط (Installments)</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 513 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>{summaryData.totalInstallmentsRemaining.toLocaleString()}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 517 | **sx={{** | `<Card sx={{ p: 2, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 518 | **Arabic Text** | `<Typography variant="body2" color="text.secondary">إجمالي الخصومات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 519 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }} color="error">{summaryData.totalDiscount.toLocaleString()}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 528 | **sx={{** | `<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>أرصدة وذمم الفروع ومنافذ البيع</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>أرصدة وذمم الفروع ومنافذ البيع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 531 | **Arabic Text** | `تصدير كملف Excel` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 534 | **Arabic Text** | `{balancesOutletLoading ? <LoadingState /> : balancesOutlet.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 537 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 539 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 539 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 540 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 540 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 541 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 541 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 542 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سقف الائتمان</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 542 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سقف الائتمان</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 543 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 543 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 544 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 544 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 545 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 545 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 554 | **Arabic Text** | `<TableCell align="right">{row.creditLimit ? formatCurrencyEGP(row.creditLimit) : 'مفتوح'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 557 | **sx={{** | `<TableCell align="right" sx={{ color: row.remainingAmount > 0 ? 'warning.main' : 'inherit', fontWeight: row.remainingAmount > 0 ? 'bold' : 'normal' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 570 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات المحافظات</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 570 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات المحافظات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 571 | **Arabic Text** | `{balancesGovLoading ? <LoadingState /> : balancesGov.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 574 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 576 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 576 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المحافظة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 577 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 577 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 578 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 578 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 579 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (الذمم المفتوحة)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 579 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي (الذمم المفتوحة)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 585 | **Arabic Text** | `<TableCell align="right">{row.governorate \|\| 'غير مصنف'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 599 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات فئات منافذ البيع</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 599 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>مبيعات فئات منافذ البيع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 600 | **Arabic Text** | `{balancesTypeLoading ? <LoadingState /> : balancesType.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 603 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 605 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 605 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>فئة المنفذ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 606 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 606 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي المبيعات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 607 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 607 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المسدد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 608 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 608 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المتبقي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 628 | **sx={{** | `<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 629 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير المخزون التفصيلي للكتب والمنتجات</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 629 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير المخزون التفصيلي للكتب والمنتجات</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 631 | **Arabic Text** | `تصدير كملف Excel` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 634 | **Arabic Text** | `{stockLoading ? <LoadingState /> : stockData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 637 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 639 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>رمز الكتاب (SKU)</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 639 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>رمز الكتاب (SKU)</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 640 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العنوان</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 640 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>العنوان</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 641 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 641 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التصنيف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 642 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الوارد الكلي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 642 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الوارد الكلي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 643 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبيعات الكلية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 643 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المبيعات الكلية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 644 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المرتجعات الكلية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 644 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المرتجعات الكلية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 645 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التعديلات المستودعية</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 645 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التعديلات المستودعية</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 646 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون الحالي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 646 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون الحالي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 654 | **Arabic Text** | `<TableCell align="right">{row.category \|\| 'غير محدد'}</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 659 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold', color: row.currentStock <= 5 ? 'error.main' : 'success.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 672 | **sx={{** | `<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 673 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير مبيعات وأرصدة المؤلفين</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 673 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تقرير مبيعات وأرصدة المؤلفين</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 675 | **Arabic Text** | `تصدير كملف Excel` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 678 | **Arabic Text** | `{authorLoading ? <LoadingState /> : authorData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 681 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 683 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المؤلف</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 683 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المؤلف</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 684 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 684 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 685 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد العناوين</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 685 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد العناوين</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 686 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>مبيعات كلي</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 686 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>مبيعات كلي</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 687 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي النسخ المباعة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 687 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي النسخ المباعة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 688 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون المتوفر للعناوين</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 688 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>المخزون المتوفر للعناوين</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 697 | **sx={{** | `<Alert severity="success" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>نشط</Alert>` | Move component styling to a separate CSS file and assign a class name. |
| 697 | **Arabic Text** | `<Alert severity="success" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>نشط</Alert>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 699 | **sx={{** | `<Alert severity="error" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>معطل</Alert>` | Move component styling to a separate CSS file and assign a class name. |
| 699 | **Arabic Text** | `<Alert severity="error" icon={false} sx={{ py: 0, px: 1, display: 'inline-flex' }}>معطل</Alert>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 704 | **Arabic Text** | `<TableCell align="right">{row.totalCopiesSold.toLocaleString()} نسخة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 705 | **Arabic Text** | `<TableCell align="right">{row.currentStock.toLocaleString()} نسخة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 716 | **sx={{** | `<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 717 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>سجل توريدات الموردين وتكلفتها</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 717 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>سجل توريدات الموردين وتكلفتها</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 719 | **Arabic Text** | `تصدير كملف Excel` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 722 | **Arabic Text** | `{receiptLoading ? <LoadingState /> : receiptData.length === 0 ? <EmptyState title="لا توجد بيانات" /> : (` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 725 | **sx={{** | `<TableHead sx={{ bgcolor: 'grey.100' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 727 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المورد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 727 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المورد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 728 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد حركات التوريد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 728 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>عدد حركات التوريد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 729 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي الكمية الموردة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 729 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>إجمالي الكمية الموردة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 730 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التكلفة الإجمالية للتوريد</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 730 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>التكلفة الإجمالية للتوريد</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 738 | **Arabic Text** | `<TableCell align="right">{row.totalQuantity.toLocaleString()} نسخة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 749 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Shipments.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Shipments.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 106 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل سجل الشحنات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 124 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحميل تفاصيل الشحنة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 158 | **Arabic Text** | `showToast('رقم الفاتورة ومعرّف صنف الفاتورة والكمية مطلوبة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 172 | **Arabic Text** | `showToast('تم إنشاء الشحنة بنجاح وتحديث حالة شحن الفاتورة.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 176 | **Arabic Text** | `showToast(err.message \|\| 'فشل إنشاء الشحنة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 194 | **Arabic Text** | `showToast('يجب اختيار الحالة الجديدة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 203 | **Arabic Text** | `showToast('تم تحديث حالة الشحنة بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 207 | **Arabic Text** | `showToast(err.message \|\| 'فشل تحديث حالة الشحنة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 217 | **Arabic Text** | `case 'pending': return 'قيد الانتظار';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 218 | **Arabic Text** | `case 'shipped': return 'تم الشحن';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 219 | **Arabic Text** | `case 'delivered': return 'تم التسليم';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 220 | **Arabic Text** | `case 'cancelled': return 'ملغاة';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 244 | **sx={{** | `<Box sx={{ p: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 246 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 247 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 247 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 248 | **Arabic Text** | `تتبع وإصدار الشحنات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 252 | **Arabic Text** | `إنشاء شحنة جديدة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 258 | **sx={{** | `<Card sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 259 | **sx={{** | `<CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>` | Move component styling to a separate CSS file and assign a class name. |
| 261 | **sx={{** | `sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}` | Move component styling to a separate CSS file and assign a class name. |
| 264 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 266 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>خيارات البحث والتصفية</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 266 | **Arabic Text** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>خيارات البحث والتصفية</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 273 | **sx={{** | `<Collapse in={showFilters} sx={{ mt: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 274 | **sx={{** | `<Divider sx={{ my: 1.5 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 278 | **Arabic Text** | `fullWidth label="معرّف الفاتورة (Invoice ID)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 286 | **Arabic Text** | `<InputLabel>حالة الشحنة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 287 | **Arabic Text** | `<Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="حالة الشحنة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 288 | **Arabic Text** | `<MenuItem value="">الكل</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 289 | **Arabic Text** | `<MenuItem value="pending">قيد الانتظار</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 290 | **Arabic Text** | `<MenuItem value="shipped">تم الشحن</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 291 | **Arabic Text** | `<MenuItem value="delivered">تم التسليم</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 292 | **Arabic Text** | `<MenuItem value="cancelled">ملغاة</MenuItem>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 298 | **Arabic Text** | `تطبيق` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 303 | **Arabic Text** | `إلغاء` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 313 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 324 | **sx={{** | `<Card sx={{ backgroundColor: colors[st].bg, color: colors[st].fg }}>` | Move component styling to a separate CSS file and assign a class name. |
| 325 | **sx={{** | `<CardContent sx={{ py: 1.5, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 327 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold' }}>{count}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 337 | **sx={{** | `<Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 339 | **Arabic Text** | `<LoadingState message="جاري تحميل سجل الشحنات..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 342 | **Arabic Text** | `title="لا يوجد شحنات"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 343 | **Arabic Text** | `description="لم يتم إنشاء أي شحنات بعد. يمكن إنشاء شحنة جديدة مرتبطة بفاتورة."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 344 | **Arabic Text** | `actionLabel={hasPermission('shipments.create') ? 'إنشاء شحنة جديدة' : undefined}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 348 | **sx={{** | `<TableContainer sx={{ maxHeight: 550 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 352 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الشحنة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 352 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الشحنة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 353 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 353 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم الفاتورة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 354 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>شركة الشحن</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 354 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>شركة الشحن</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 355 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم التتبع</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 355 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>رقم التتبع</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 356 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 356 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 357 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الشحن</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 357 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ الشحن</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 358 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ التسليم</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 358 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>تاريخ التسليم</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 359 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 359 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 360 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 120 }}>خيارات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 360 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 120 }}>خيارات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 366 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.shipment_number}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 368 | **sx={{** | `<Chip label={row.invoice_number} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 371 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{row.tracking_number \|\| '—'}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 379 | **Arabic Text** | `<Tooltip title="عرض التفاصيل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 385 | **Arabic Text** | `<Tooltip title="تحديث الحالة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 400 | **sx={{** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 400 | **Hardcoded Color** | `<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224,224,224,1)' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 401 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 402 | **Arabic Text** | `<Typography variant="body2" color="textSecondary">عدد:</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 403 | **sx={{** | `<Select size="small" value={limit} onChange={(e) => { setLimit(e.target.value); setOffset(0); }} sx={{ minWidth: 60 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 409 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 410 | **Arabic Text** | `<Button size="small" disabled={offset === 0} onClick={() => setOffset(offset - limit)}>السابق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 411 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 'bold' }}>({offset + 1} - {offset + shipments.length})</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 412 | **Arabic Text** | `<Button size="small" disabled={shipments.length < limit} onClick={() => setOffset(offset + limit)}>التالي</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 426 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 427 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>إنشاء شحنة جديدة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 427 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>إنشاء شحنة جديدة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 428 | **Arabic Text** | `<Button onClick={() => setOpenCreate(false)} variant="outlined" size="small" color="inherit" disabled={csSubmitting}>إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 430 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 431 | **style={{** | `<form onSubmit={handleSubmitCreate} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 432 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 433 | **sx={{** | `<Alert severity="info" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 434 | **Arabic Text** | `يجب تحديد أصناف الفاتورة (Invoice Item IDs) والكمية المراد شحنها لكل صنف.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 435 | **Arabic Text** | `يتم حساب الكمية المتبقية تلقائياً بناءً على الشحنات السابقة.` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 439 | **Arabic Text** | `<TextField fullWidth required label="معرّف الفاتورة (Invoice ID)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 443 | **Arabic Text** | `<TextField fullWidth label="شركة الشحن" size="small"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 447 | **Arabic Text** | `<TextField fullWidth label="رقم التتبع" size="small"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 453 | **sx={{** | `<Divider sx={{ my: 1 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 454 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 455 | **sx={{** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>أصناف الشحنة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 455 | **Arabic Text** | `<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>أصناف الشحنة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 456 | **Arabic Text** | `<Button size="small" startIcon={<AddIcon />} onClick={handleCsAddItem}>إضافة صنف</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 460 | **sx={{** | `<Grid container spacing={1} key={idx} sx={{ mb: 1 }} alignItems="center">` | Move component styling to a separate CSS file and assign a class name. |
| 462 | **Arabic Text** | `<TextField fullWidth required label="معرّف صنف الفاتورة (Invoice Item ID)" size="small" type="number"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 466 | **Arabic Text** | `<TextField fullWidth required label="الكمية" size="small" type="number" inputProps={{ min: 1 }}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 479 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 480 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 481 | **Arabic Text** | `<Button variant="outlined" color="inherit" onClick={() => setOpenCreate(false)} disabled={csSubmitting}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 483 | **Arabic Text** | `{csSubmitting ? 'جاري الإنشاء...' : 'تأكيد وإنشاء الشحنة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 498 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 499 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الشحنة</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 499 | **Arabic Text** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>تفاصيل الشحنة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 500 | **Arabic Text** | `<Button onClick={() => setOpenDetail(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 502 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 503 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 505 | **Arabic Text** | `<LoadingState message="جاري التحميل..." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 509 | **sx={{** | `<Grid container spacing={2} sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 511 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم الشحنة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 512 | **sx={{** | `<Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{detailData.shipment_number}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 515 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم الفاتورة</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 516 | **sx={{** | `<Chip label={detailData.invoice_number} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace', mt: 0.5 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 519 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">شركة الشحن</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 523 | **Arabic Text** | `<Typography variant="caption" color="textSecondary">رقم التتبع</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 524 | **sx={{** | `<Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{detailData.tracking_number \|\| '—'}</Typography>` | Move component styling to a separate CSS file and assign a class name. |
| 530 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 540 | **sx={{** | `<Alert severity="error" sx={{ mb: 3 }}>هذه الشحنة ملغاة.</Alert>` | Move component styling to a separate CSS file and assign a class name. |
| 540 | **Arabic Text** | `<Alert severity="error" sx={{ mb: 3 }}>هذه الشحنة ملغاة.</Alert>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 545 | **sx={{** | `<Box sx={{ mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 546 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 547 | **Arabic Text** | `أصناف الشحنة ({detailData.items.length})` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 551 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 551 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 553 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 553 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>المنتج</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 554 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>الكود</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 554 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>الكود</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 555 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المشحونة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 555 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>الكمية المشحونة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 556 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 556 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>سعر الوحدة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 562 | **sx={{** | `<TableCell sx={{ fontWeight: 500 }}>{item.product_title}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 563 | **sx={{** | `<TableCell sx={{ fontFamily: 'monospace' }}>{item.product_code \|\| '—'}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 564 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>{item.quantity}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 577 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 578 | **Arabic Text** | `سجل تغييرات الحالة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 582 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 582 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f8fafc' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 584 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>من</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 584 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>من</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 585 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>إلى</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 585 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>إلى</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 586 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 586 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>بواسطة</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 587 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 587 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 588 | **sx={{** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 588 | **Arabic Text** | `<TableCell sx={{ fontWeight: 'bold' }}>التاريخ</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 609 | **sx={{** | `<Box sx={{ mt: 3, textAlign: 'center' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 619 | **Arabic Text** | `تحديث حالة الشحنة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 625 | **Arabic Text** | `<EmptyState title="لا توجد بيانات" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 632 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>تحديث حالة الشحنة</DialogTitle>` | Move component styling to a separate CSS file and assign a class name. |
| 632 | **Arabic Text** | `<DialogTitle sx={{ fontWeight: 'bold' }}>تحديث حالة الشحنة</DialogTitle>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 634 | **sx={{** | `<Typography variant="body2" sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 635 | **Arabic Text** | `الحالة الحالية: <Chip label={statusLabel(statusCurrentStatus)} color={statusColor(statusCurrentStatus)} size="small" />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 637 | **sx={{** | `<FormControl fullWidth size="small" required sx={{ mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 638 | **Arabic Text** | `<InputLabel>الحالة الجديدة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 639 | **Arabic Text** | `<Select value={statusNewStatus} onChange={(e) => setStatusNewStatus(e.target.value)} label="الحالة الجديدة">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 640 | **Arabic Text** | `{statusCurrentStatus === 'pending' && <MenuItem value="shipped">تم الشحن (Shipped)</MenuItem>}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 641 | **Arabic Text** | `{statusCurrentStatus === 'pending' && <MenuItem value="cancelled">ملغاة (Cancelled)</MenuItem>}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 642 | **Arabic Text** | `{statusCurrentStatus === 'shipped' && <MenuItem value="delivered">تم التسليم (Delivered)</MenuItem>}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 643 | **Arabic Text** | `{statusCurrentStatus === 'shipped' && <MenuItem value="cancelled">ملغاة (Cancelled)</MenuItem>}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 646 | **Arabic Text** | `<TextField fullWidth label="ملاحظات" size="small" multiline rows={2} value={statusNotes} onChange={(e) => setStatusNotes(e.target.value)} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 648 | **sx={{** | `<DialogActions sx={{ p: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 649 | **Arabic Text** | `<Button variant="outlined" color="inherit" onClick={() => setOpenStatusDlg(false)} disabled={statusSubmitting}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 651 | **Arabic Text** | `{statusSubmitting ? 'جاري التحديث...' : 'تأكيد تحديث الحالة'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 658 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>{toastMsg}</Alert>` | Move component styling to a separate CSS file and assign a class name. |

### [pages/Users.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/pages/Users.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 117 | **Arabic Text** | `showToast(err.message \|\| 'حدث خطأ في تحميل البيانات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 136 | **Arabic Text** | `showToast('يرجى تعبئة كافة الحقول المطلوبة.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 140 | **Arabic Text** | `showToast('حقل الاسم الكامل مطلوب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 153 | **Arabic Text** | `showToast('تم إنشاء الحساب بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 159 | **Arabic Text** | `showToast('تم تعديل بيانات الحساب بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 165 | **Arabic Text** | `showToast(err.message \|\| 'فشل في حفظ البيانات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 174 | **Arabic Text** | `showToast(`تم ${targetStatus === 'active' ? 'تفعيل' : 'تعطيل'} الحساب بنجاح.`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 178 | **Arabic Text** | `showToast(err.message \|\| 'فشل تعديل حالة الحساب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 192 | **Arabic Text** | `showToast('تم أرشفة الحساب بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 196 | **Arabic Text** | `showToast(err.message \|\| 'فشل أرشفة الحساب.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 212 | **Arabic Text** | `showToast(`تم إعادة تعيين كلمة المرور للمستخدم '${resetPasswordUser.username}' بنجاح.`);` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 216 | **Arabic Text** | `showToast(err.message \|\| 'فشل تعيين كلمة المرور.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 247 | **Arabic Text** | `showToast('تم حفظ الصلاحيات للأدوار بنجاح.');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 254 | **Arabic Text** | `showToast(err.message \|\| 'فشل حفظ الصلاحيات.', 'error');` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 291 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 292 | **sx={{** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 292 | **Hardcoded Color** | `<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 293 | **Arabic Text** | `إدارة الصلاحيات والمستخدمين` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 301 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 303 | **Arabic Text** | `إضافة مستخدم جديد` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 312 | **sx={{** | `sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}` | Move component styling to a separate CSS file and assign a class name. |
| 314 | **sx={{** | `<Tab label="حسابات المستخدمين" sx={{ fontWeight: 'bold' }} />` | Move component styling to a separate CSS file and assign a class name. |
| 314 | **Arabic Text** | `<Tab label="حسابات المستخدمين" sx={{ fontWeight: 'bold' }} />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 315 | **sx={{** | `{hasPermission('roles.manage') && <Tab label="جدول صلاحيات الأدوار (RBAC)" sx={{ fontWeight: 'bold' }} />}` | Move component styling to a separate CSS file and assign a class name. |
| 315 | **Arabic Text** | `{hasPermission('roles.manage') && <Tab label="جدول صلاحيات الأدوار (RBAC)" sx={{ fontWeight: 'bold' }} />}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 324 | **Arabic Text** | `placeholder="البحث باسم المستخدم أو الاسم الكامل..."` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 327 | **sx={{** | `sx={{ mb: 3 }}` | Move component styling to a separate CSS file and assign a class name. |
| 338 | **Arabic Text** | `<EmptyState title="لا يوجد مستخدمين" description="لم نتمكن من العثور على أي حسابات مستخدمين مطابقة للبحث." />` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 342 | **sx={{** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 342 | **Hardcoded Color** | `<TableHead sx={{ backgroundColor: '#f1f5f9' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 344 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المستخدم</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 344 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>اسم المستخدم</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 345 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الاسم الكامل</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 345 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الاسم الكامل</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 346 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الأدوار</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 346 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>الأدوار</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 347 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 347 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>حالة الحساب</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 348 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تاريخ الإنشاء</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 348 | **Arabic Text** | `<TableCell align="right" sx={{ fontWeight: 'bold' }}>تاريخ الإنشاء</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 349 | **sx={{** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 349 | **Arabic Text** | `<TableCell align="center" sx={{ fontWeight: 'bold' }}>العمليات</TableCell>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 355 | **sx={{** | `<TableCell align="right" sx={{ fontWeight: 500 }}>{u.username}</TableCell>` | Move component styling to a separate CSS file and assign a class name. |
| 358 | **sx={{** | `<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 366 | **Arabic Text** | `label={u.status === 'active' ? 'نشط' : 'معطل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 375 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 377 | **Arabic Text** | `<IconButton color="primary" onClick={() => handleOpenEditModal(u)} title="تعديل">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 382 | **Arabic Text** | `<IconButton color="warning" onClick={() => handleOpenResetModal(u)} title="إعادة تعيين كلمة المرور">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 390 | **Arabic Text** | `title={u.status === 'active' ? 'تعطيل' : 'تفعيل'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 396 | **Arabic Text** | `<IconButton color="error" onClick={() => handleArchiveUser(u.id)} title="أرشفة/حذف">` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 413 | **sx={{** | `<Paper sx={{ p: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 414 | **sx={{** | `<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 415 | **sx={{** | `<FormControl sx={{ minWidth: 200 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 416 | **Arabic Text** | `<InputLabel id="select-role-label">اختر الدور الوظيفي</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 420 | **Arabic Text** | `label="اختر الدور الوظيفي"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 435 | **sx={{** | `sx={{ fontWeight: 'bold' }}` | Move component styling to a separate CSS file and assign a class name. |
| 437 | **Arabic Text** | `حفظ تغييرات الصلاحيات` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 441 | **sx={{** | `<Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 442 | **Arabic Text** | `حدد الصلاحيات الممنوحة لهذا الدور:` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 459 | **sx={{** | `<Typography variant="body2" sx={{ fontWeight: 500 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 463 | **sx={{** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 463 | **Hardcoded Color** | `<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 488 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 489 | **sx={{** | `<Typography variant="h6" sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 490 | **Arabic Text** | `{modalMode === 'create' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 492 | **Arabic Text** | `<Button onClick={() => setOpenUserModal(false)} variant="outlined" size="small" color="inherit">إغلاق</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 494 | **sx={{** | `<Divider sx={{ mb: 3 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 495 | **style={{** | `<form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto' }}>` | Move styling to a separate page/component CSS file using CSS variables. |
| 496 | **sx={{** | `<Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, pl: 1 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 501 | **Arabic Text** | `label="اسم المستخدم"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 505 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 513 | **Arabic Text** | `label="كلمة المرور"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 516 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 523 | **Arabic Text** | `label="الاسم الكامل"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 526 | **sx={{** | `sx={{ mb: 2 }}` | Move component styling to a separate CSS file and assign a class name. |
| 529 | **sx={{** | `<FormControl fullWidth sx={{ mt: 1, mb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 530 | **Arabic Text** | `<InputLabel id="form-roles-label">الأدوار الممنوحة</InputLabel>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 535 | **Arabic Text** | `label="الأدوار الممنوحة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 538 | **sx={{** | `<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 553 | **sx={{** | `<Divider sx={{ my: 2 }} />` | Move component styling to a separate CSS file and assign a class name. |
| 554 | **sx={{** | `<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 555 | **Arabic Text** | `<Button onClick={() => setOpenUserModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 557 | **Arabic Text** | `حفظ` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 565 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 566 | **Arabic Text** | `إعادة تعيين كلمة المرور` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 570 | **sx={{** | `<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>` | Move component styling to a separate CSS file and assign a class name. |
| 570 | **Hardcoded Color** | `<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>` | Reference values via CSS variables or standard MUI components classes. |
| 571 | **Arabic Text** | `سيتم تغيير كلمة المرور للمستخدم <strong>{resetPasswordUser?.username}</strong>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 577 | **Arabic Text** | `label="كلمة المرور الجديدة"` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 583 | **Arabic Text** | `<Button onClick={() => setOpenResetModal(false)}>إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 585 | **Arabic Text** | `تحديث` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 598 | **sx={{** | `<DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'Outfit, sans-serif' }}>تأكيد أرشفة الحساب</DialogTitle>` | Move component styling to a separate CSS file and assign a class name. |
| 598 | **Arabic Text** | `<DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'Outfit, sans-serif' }}>تأكيد أرشفة الحساب</DialogTitle>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 600 | **Arabic Text** | `<Typography>هل أنت متأكد من أرشفة هذا الحساب؟ لا يمكن التراجع عن هذا الإجراء.</Typography>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 602 | **sx={{** | `<DialogActions sx={{ px: 3, pb: 2 }}>` | Move component styling to a separate CSS file and assign a class name. |
| 603 | **Arabic Text** | `<Button onClick={() => setConfirmOpen(false)} color="inherit">إلغاء</Button>` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 605 | **Arabic Text** | `أرشفة` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 617 | **sx={{** | `<Alert onClose={() => setToastMsg('')} severity={toastSeverity} sx={{ width: '100%' }}>` | Move component styling to a separate CSS file and assign a class name. |

### [theme/ThemeConfig.jsx](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/theme/ThemeConfig.jsx)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 55 | **Hardcoded Color** | `main: '#1a73e8',     // Google Blue` | Reference values via CSS variables or standard MUI components classes. |
| 56 | **Hardcoded Color** | `light: '#4285f4',` | Reference values via CSS variables or standard MUI components classes. |
| 57 | **Hardcoded Color** | `dark: '#0d56b3',` | Reference values via CSS variables or standard MUI components classes. |
| 58 | **Hardcoded Color** | `contrastText: '#ffffff',` | Reference values via CSS variables or standard MUI components classes. |
| 61 | **Hardcoded Color** | `main: '#5f6368',     // Google Grey` | Reference values via CSS variables or standard MUI components classes. |
| 62 | **Hardcoded Color** | `light: '#70757a',` | Reference values via CSS variables or standard MUI components classes. |
| 63 | **Hardcoded Color** | `dark: '#3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 64 | **Hardcoded Color** | `contrastText: '#ffffff',` | Reference values via CSS variables or standard MUI components classes. |
| 67 | **Hardcoded Color** | `default: '#f8f9fa',  // Google Background Grey` | Reference values via CSS variables or standard MUI components classes. |
| 68 | **Hardcoded Color** | `paper: '#ffffff',` | Reference values via CSS variables or standard MUI components classes. |
| 71 | **Hardcoded Color** | `primary: '#202124',  // Google Dark Grey Text` | Reference values via CSS variables or standard MUI components classes. |
| 72 | **Hardcoded Color** | `secondary: '#5f6368', // Google Secondary Grey Text` | Reference values via CSS variables or standard MUI components classes. |
| 74 | **Hardcoded Color** | `divider: '#dadce0',    // Google Standard Divider` | Reference values via CSS variables or standard MUI components classes. |
| 79 | **Hardcoded Color** | `main: '#8ab4f8',     // Google Light Blue` | Reference values via CSS variables or standard MUI components classes. |
| 80 | **Hardcoded Color** | `light: '#aecbfa',` | Reference values via CSS variables or standard MUI components classes. |
| 81 | **Hardcoded Color** | `dark: '#669df6',` | Reference values via CSS variables or standard MUI components classes. |
| 82 | **Hardcoded Color** | `contrastText: '#202124',` | Reference values via CSS variables or standard MUI components classes. |
| 85 | **Hardcoded Color** | `main: '#9aa0a6',     // Google Light Grey` | Reference values via CSS variables or standard MUI components classes. |
| 86 | **Hardcoded Color** | `light: '#bdc1c6',` | Reference values via CSS variables or standard MUI components classes. |
| 87 | **Hardcoded Color** | `dark: '#70757a',` | Reference values via CSS variables or standard MUI components classes. |
| 88 | **Hardcoded Color** | `contrastText: '#202124',` | Reference values via CSS variables or standard MUI components classes. |
| 91 | **Hardcoded Color** | `default: '#121212',  // Google Dark Background` | Reference values via CSS variables or standard MUI components classes. |
| 92 | **Hardcoded Color** | `paper: '#202124',    // Google Dark Surface/Paper` | Reference values via CSS variables or standard MUI components classes. |
| 95 | **Hardcoded Color** | `primary: '#e8eaed',  // Google Light Text` | Reference values via CSS variables or standard MUI components classes. |
| 96 | **Hardcoded Color** | `secondary: '#9aa0a6', // Google Light Secondary Text` | Reference values via CSS variables or standard MUI components classes. |
| 98 | **Hardcoded Color** | `divider: '#3c4043',    // Google Dark Divider` | Reference values via CSS variables or standard MUI components classes. |
| 121 | **Arabic Text** | `borderRadius: 4, // "مش راوند" - Sharp subtle rounding for Google Design` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 135 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.04)' : 'rgba(138, 180, 248, 0.08)',` | Reference values via CSS variables or standard MUI components classes. |
| 141 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#1557b0' : '#aecbfa',` | Reference values via CSS variables or standard MUI components classes. |
| 146 | **Hardcoded Color** | `borderColor: mode === 'light' ? '#dadce0' : '#5f6368',` | Reference values via CSS variables or standard MUI components classes. |
| 148 | **Hardcoded Color** | `color: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 151 | **Hardcoded Color** | `borderColor: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 152 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.04)' : 'rgba(138, 180, 248, 0.08)',` | Reference values via CSS variables or standard MUI components classes. |
| 170 | **Hardcoded Color** | `border: mode === 'light' ? '1px solid #dadce0' : '1px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 178 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#ffffff' : '#202124',` | Reference values via CSS variables or standard MUI components classes. |
| 179 | **Hardcoded Color** | `color: mode === 'light' ? '#202124' : '#e8eaed',` | Reference values via CSS variables or standard MUI components classes. |
| 180 | **Hardcoded Color** | `borderBottom: mode === 'light' ? '1px solid #dadce0' : '1px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 188 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#ffffff' : '#202124',` | Reference values via CSS variables or standard MUI components classes. |
| 201 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.08)' : 'rgba(138, 180, 248, 0.12)',` | Reference values via CSS variables or standard MUI components classes. |
| 202 | **Hardcoded Color** | `color: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 205 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? 'rgba(26, 115, 232, 0.12)' : 'rgba(138, 180, 248, 0.16)',` | Reference values via CSS variables or standard MUI components classes. |
| 208 | **Hardcoded Color** | `color: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 219 | **Hardcoded Color** | `borderColor: mode === 'light' ? '#dadce0' : '#3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 222 | **Hardcoded Color** | `borderColor: mode === 'light' ? '#80868b' : '#9aa0a6',` | Reference values via CSS variables or standard MUI components classes. |
| 225 | **Hardcoded Color** | `borderColor: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 237 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#f1f3f4' : '#3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 238 | **Hardcoded Color** | `color: mode === 'light' ? '#3c4043' : '#bdc1c6',` | Reference values via CSS variables or standard MUI components classes. |
| 247 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#202124' : '#e8eaed',` | Reference values via CSS variables or standard MUI components classes. |
| 248 | **Hardcoded Color** | `color: mode === 'light' ? '#ffffff' : '#202124',` | Reference values via CSS variables or standard MUI components classes. |
| 258 | **Hardcoded Color** | `? '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)'` | Reference values via CSS variables or standard MUI components classes. |
| 259 | **Hardcoded Color** | `: '0 24px 38px 3px rgba(0,0,0,0.5), 0 9px 46px 8px rgba(0,0,0,0.4), 0 11px 15px -7px rgba(0,0,0,0.6)',` | Reference values via CSS variables or standard MUI components classes. |
| 267 | **Hardcoded Color** | `border: mode === 'light' ? '1px solid #dadce0' : '1px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 276 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#f8f9fa' : '#2d2f31', // Google Table header style` | Reference values via CSS variables or standard MUI components classes. |
| 280 | **Hardcoded Color** | `color: mode === 'light' ? '#202124' : '#e8eaed',` | Reference values via CSS variables or standard MUI components classes. |
| 281 | **Hardcoded Color** | `borderBottom: mode === 'light' ? '2px solid #dadce0' : '2px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 291 | **Hardcoded Color** | `borderBottom: mode === 'light' ? '1px solid #dadce0' : '1px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 299 | **Hardcoded Color** | `borderBottom: mode === 'light' ? '1px solid #dadce0' : '1px solid #3c4043',` | Reference values via CSS variables or standard MUI components classes. |
| 303 | **Hardcoded Color** | `backgroundColor: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 314 | **Hardcoded Color** | `color: mode === 'light' ? '#5f6368' : '#9aa0a6',` | Reference values via CSS variables or standard MUI components classes. |
| 316 | **Hardcoded Color** | `color: mode === 'light' ? '#1a73e8' : '#8ab4f8',` | Reference values via CSS variables or standard MUI components classes. |
| 331 | **style={{** | `<div dir="rtl" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>` | Move styling to a separate page/component CSS file using CSS variables. |

### [utils/formatters.js](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/utils/formatters.js)

| Line | Issue Type | Code Snippet | Fix Direction |
|---|---|---|---|
| 11 | **Arabic Text** | `return '0.00 ج.م';` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |
| 17 | **Arabic Text** | `return `${formatted} ج.م`;` | Move the Arabic text to client/src/locales/ar.json and reference it via standard translation. |

## Commands run

| Command | Exit code | Notes |
|---|---:|---|
| `node scripts/generate-style-inventory.js` | 0 | Ran inventory generation |
| `cmd /c npm test` | 0 | Confirmed test suite status |
| `cmd /c npm run build` | 0 | Verified build status |

## Next step

- **Step 063: CSS Extraction No Inline Styles** - Extract inline styles and replace them with standard classes in CSS files.

## Stop confirmation

Only one step was executed in this run.
