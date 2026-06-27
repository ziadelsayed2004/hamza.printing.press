# Frontend Style & Logic Audit — مطبعة حمزة

تم إنشاء هذا الملف كمدخل إلزامي للخطوات الجديدة. الهدف ليس الاكتفاء بالملاحظة، بل فتح خطوات تنفيذية تمنع ترك أي مشكلة تصميم أو RTL أو Layout أو Logic بدون معالجة.

## 1. نتيجة الفحص السريع الحالية

- عدد ملفات JSX داخل `client/src`: **26**
- عدد ملفات CSS داخل `client/src`: **2**
- إجمالي استخدام `sx=` داخل JSX: **1011**
- إجمالي استخدام `style={...}` داخل JSX: **18**

## 2. ملفات تحتاج Refactor تصميمي

- `client/src/App.jsx`: `sx=` 5 مرة، `style={...}` 0 مرة.
- `client/src/components/Breadcrumbs.jsx`: `sx=` 5 مرة، `style={...}` 0 مرة.
- `client/src/components/EmptyState.jsx`: `sx=` 6 مرة، `style={...}` 0 مرة.
- `client/src/components/ErrorBoundary.jsx`: `sx=` 0 مرة، `style={...}` 6 مرة.
- `client/src/components/LoadingState.jsx`: `sx=` 10 مرة، `style={...}` 0 مرة.
- `client/src/layouts/MainLayout.jsx`: `sx=` 66 مرة، `style={...}` 0 مرة.
- `client/src/pages/AuditLogs.jsx`: `sx=` 15 مرة، `style={...}` 1 مرة.
- `client/src/pages/Authors.jsx`: `sx=` 21 مرة، `style={...}` 0 مرة.
- `client/src/pages/Dashboard.jsx`: `sx=` 100 مرة، `style={...}` 1 مرة.
- `client/src/pages/Exports.jsx`: `sx=` 18 مرة، `style={...}` 0 مرة.
- `client/src/pages/Finance.jsx`: `sx=` 78 مرة، `style={...}` 0 مرة.
- `client/src/pages/Inventory.jsx`: `sx=` 101 مرة، `style={...}` 2 مرة.
- `client/src/pages/Invoices.jsx`: `sx=` 134 مرة، `style={...}` 1 مرة.
- `client/src/pages/Login.jsx`: `sx=` 11 مرة، `style={...}` 0 مرة.
- `client/src/pages/Notifications.jsx`: `sx=` 32 مرة، `style={...}` 0 مرة.
- `client/src/pages/Outlets.jsx`: `sx=` 29 مرة، `style={...}` 1 مرة.
- `client/src/pages/OutletTypes.jsx`: `sx=` 14 مرة، `style={...}` 0 مرة.
- `client/src/pages/Payments.jsx`: `sx=` 99 مرة، `style={...}` 2 مرة.
- `client/src/pages/Products.jsx`: `sx=` 49 مرة، `style={...}` 1 مرة.
- `client/src/pages/Profile.jsx`: `sx=` 20 مرة، `style={...}` 0 مرة.
- `client/src/pages/Reports.jsx`: `sx=` 81 مرة، `style={...}` 0 مرة.
- `client/src/pages/Shipments.jsx`: `sx=` 77 مرة، `style={...}` 1 مرة.
- `client/src/pages/Users.jsx`: `sx=` 40 مرة، `style={...}` 1 مرة.
- `client/src/theme/ThemeConfig.jsx`: `sx=` 0 مرة، `style={...}` 1 مرة.

## 3. مشاكل مؤكدة من طلب العميل والصورة الحالية

1. بعد تسجيل الدخول تحتاج الواجهة Refresh حتى تظهر خيارات الـ sidebar.
2. مكان الـ sidebar وتوزيع الـ layout غير مرضي.
3. توجد مشاكل في محاذاة RTL ومواقع components.
4. الحقول والـ labels في بعض الشاشات ملتصقة أو مقصوصة أو مزدحمة.
5. الستايل الحالي لا يصل للمستوى المطلوب كـ Material UI احترافي.
6. توجد هوية قديمة يجب حذفها نهائيًا واستبدالها باسم **مطبعة حمزة**.
7. مطلوب إرجاع Balance/Notifications القديمين لكن بمنطق وواجهة جديدة.
8. مطلوب ربط الماليات، المخزون، التسعير، المنافذ، الفواتير، المدفوعات، الشحن، التوريدات، والإشعارات ببعض.
9. مطلوب حسابات مؤلفين ومنافذ بصلاحيات scoped data.
10. مطلوب منع inline styles ونقل الستايل إلى CSS لكل صفحة/Component.
11. مطلوب ملف ترجمة عربي واحد `client/src/locales/ar.json`.
12. مطلوب Design System واضح قبل الاستمرار.

## 4. مشاكل منطقية يجب تأكيدها في الخطوات القادمة

### المؤلفون
- يجب أن يكون المؤلف مرتبطًا بكتاب أو أكثر.
- يجب أن يكون الكتاب مرتبطًا بمؤلف أو أكثر.
- إذا تم إنشاء حساب للمؤلف، يرى فقط فواتير تحتوي كتبه.

### المنافذ
- يجب دعم حساب منفذ.
- حساب المنفذ يرى فواتيره وأرصده وشحناته فقط.

### Balance
- لا يكفي حقل رصيد بسيط.
- يجب الاعتماد على Finance Ledger.
- كل فاتورة/دفعة/عكس دفعة/تعديل يدوي/رسوم شحن يجب أن ينتج عنها أثر مالي قابل للتتبع.

### Payments
- cash/deferred/installments/mixed.
- paid/remaining/overdue محسوبة تلقائيًا.
- لا حذف دفعة بدون reversal.

### Inventory & Receipts
- الاستلامات تزود المخزون.
- الفواتير تخصم المخزون.
- الإلغاء أو التعديل يعمل delta.
- لا تعديل مباشر بدون حركة ledger.

### Shipping
- شحن جزئي مسموح، لكنه لا يكسر حساب الفاتورة والدفعات.
- shipping cost يظل جزءًا من إجمالي الفاتورة.

## 5. نتيجة التحقق الآلي في هذه البيئة

تمت محاولة تشغيل `npm test` من نسخة zip المفكوكة، وفشل التشغيل بسبب عدم وجود dependencies داخل بيئة الفحص:

```txt
Cannot find module 'dotenv'
```

هذا لا يعني فشل المشروع بعد `npm install`، لكنه يعني أن كل خطوة قادمة يجب أن تشغل:

```bash
npm install
npm test
npm run build
```

وتسجل النتيجة الفعلية في تقرير الخطوة.
