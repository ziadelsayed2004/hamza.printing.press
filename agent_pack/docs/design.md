# design.md — نظام التصميم الموحد لمنصة مطبعة حمزة

**اسم المنصة:** مطبعة حمزة  
**المطور:** Ziad Elsayed CodzHub  
**لغة الواجهة:** العربية فقط  
**اتجاه الواجهة:** RTL بالكامل  
**العملة:** جنيه مصري EGP / ج.م  
**التوقيت:** توقيت مصر Africa/Cairo  
**الهدف:** تحويل النظام إلى منصة تشغيل وماليات ومخزون احترافية بدون أي عيوب تصميمية أو منطقية، وباستخدام Material UI / Google Material Design كأساس بصري وسلوكي.

---

## 1. قاعدة إلزامية

هذا الملف ليس توصية. هذا الملف هو **Design Contract** ملزم لكل خطوة قادمة في الـ Agent Pack.

أي كود Frontend جديد أو قديم يتم تعديله يجب أن يلتزم بهذه القواعد:

1. ممنوع ترك Inline Style داخل JSX.
2. ممنوع استخدام `style={{...}}`.
3. ممنوع استخدام `sx={{...}}` للتصميم العام أو المسافات أو الألوان أو التخطيط.
4. يسمح باستخدام `sx` فقط في حالات صغيرة جدًا ومؤقتة أثناء refactor، ويجب تسجيلها في التقرير كـ debt، ثم إزالتها في خطوة التنظيف.
5. كل صفحة لها ملف JSX وملف CSS مستقل.
6. كل Component له ملف JSX وملف CSS مستقل.
7. كل المتغيرات العامة في CSS Variables داخل ملف واحد.
8. كل النصوص العربية داخل ملف JSON واحد.
9. الاتجاه RTL يجب أن يبدأ من `html`, `body`, MUI theme, Emotion cache, كل layouts, كل forms.
10. لا يوجد نص بمحاذاة يسار إلا للأرقام التقنية أو الأكواد أو المعرفات التي تحتاج LTR.
11. كل Form يجب أن يستخدم Grid منظم، ولا يسمح بأن تكون labels أو fields ملتصقة أو مقصوصة.
12. كل Drawer/Dialog يجب أن يكون له عرض ثابت نسبي، responsive، وفواصل ومسافات واضحة.
13. كل جدول يجب أن يكون قابل للقراءة، responsive، وله sticky header عند الحاجة.
14. لا يتم إخفاء مشكلة تصميمية بتصغير الخط أو ضغط المسافات.
15. لا يتم ترك Legacy UI أو Legacy CSS مستخدمًا في النظام النهائي.
16. لا يتم استخدام هوية أو اسم قديم؛ الاسم الرسمي هو **مطبعة حمزة**.

---

## 2. فلسفة التصميم

النظام يجب أن يكون أقرب إلى:

- Google Material Design.
- Google Cloud Console من حيث وضوح التبويبات، البطاقات، الجداول، وأزرار الإجراءات.
- نظام ERP مصغر لإدارة كتب ومخزون وماليات، وليس صفحة Dashboard بسيطة.
- واجهة عربية RTL طبيعية، وليست واجهة LTR تم قلبها فقط.

المظهر المطلوب:

- بسيط.
- نظيف.
- احترافي.
- أبيض / Light Mode بشكل أساسي.
- Dark Mode كامل بدون تباين مزعج.
- مساحات مريحة.
- حقول Forms واضحة.
- Sidebar مضبوط ناحية اليمين.
- Topbar ثابت ومتوازن.
- Dashboard غني لكنه غير مزدحم.
- أرقام مالية واضحة.
- إشعارات واضحة وقابلة للفهم.
- لا يوجد ديالوجز كثيرة تزعج المستخدم.

---

## 3. هيكل الملفات المطلوب

يجب الوصول تدريجيًا إلى هذا الشكل:

```txt
client/src/
  app/
    AuthContext.jsx
    AppRoutes.jsx

  components/
    app-shell/
      AppShell.jsx
      AppShell.css
      Sidebar.jsx
      Sidebar.css
      Topbar.jsx
      Topbar.css
      BreadcrumbTrail.jsx
      BreadcrumbTrail.css

    forms/
      FormSection.jsx
      FormSection.css
      FieldGrid.jsx
      FieldGrid.css
      FormActions.jsx
      FormActions.css

    drawers/
      EntityDrawer.jsx
      EntityDrawer.css

    dialogs/
      ConfirmDialog.jsx
      ConfirmDialog.css

    data/
      DataTable.jsx
      DataTable.css
      FilterBar.jsx
      FilterBar.css
      EmptyState.jsx
      EmptyState.css
      LoadingState.jsx
      LoadingState.css

    finance/
      MoneyStatCard.jsx
      MoneyStatCard.css
      BalanceBadge.jsx
      BalanceBadge.css

    notifications/
      NotificationBell.jsx
      NotificationBell.css
      NotificationCenter.jsx
      NotificationCenter.css

  pages/
    dashboard/
      Dashboard.jsx
      Dashboard.css

    products/
      Products.jsx
      Products.css
      ProductFormDrawer.jsx
      ProductFormDrawer.css

    authors/
      Authors.jsx
      Authors.css
      AuthorFormDrawer.jsx
      AuthorFormDrawer.css

    outlet-types/
      OutletTypes.jsx
      OutletTypes.css

    outlets/
      Outlets.jsx
      Outlets.css
      OutletFormDrawer.jsx
      OutletFormDrawer.css

    invoices/
      Invoices.jsx
      Invoices.css
      InvoiceForm.jsx
      InvoiceForm.css
      InvoiceDetails.jsx
      InvoiceDetails.css

    payments/
      Payments.jsx
      Payments.css

    finance/
      Finance.jsx
      Finance.css

    inventory/
      Inventory.jsx
      Inventory.css

    shipments/
      Shipments.jsx
      Shipments.css

    reports/
      Reports.jsx
      Reports.css

    notifications/
      Notifications.jsx
      Notifications.css

    users/
      Users.jsx
      Users.css

  styles/
    variables.css
    reset.css
    material-overrides.css
    rtl.css
    layout.css
    forms.css
    tables.css
    drawers.css
    dialogs.css
    print.css

  locales/
    ar.json

  theme/
    ThemeConfig.jsx

  services/
    apiClient.js

  utils/
    formatters.js
```

---

## 4. CSS Architecture

### 4.1 ملف المتغيرات

كل الألوان والمسافات والحواف والظلال يجب أن تكون في:

```txt
client/src/styles/variables.css
```

مثال:

```css
:root {
  --app-font-family: "Cairo", "Roboto", "Arial", sans-serif;

  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-alt: #f1f5f9;

  --color-text: #111827;
  --color-text-muted: #64748b;

  --color-primary: #1a73e8;
  --color-primary-hover: #1558b0;
  --color-primary-soft: #e8f0fe;

  --color-success: #188038;
  --color-warning: #f29900;
  --color-danger: #d93025;
  --color-info: #1a73e8;

  --border-color: #e5e7eb;
  --border-strong: #cbd5e1;

  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  --shadow-sm: 0 1px 2px rgba(15, 23, 42, .08);
  --shadow-md: 0 8px 24px rgba(15, 23, 42, .10);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  --sidebar-width: 288px;
  --sidebar-collapsed-width: 76px;
  --topbar-height: 64px;
  --content-max-width: 1440px;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #111827;
  --color-surface-alt: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #cbd5e1;
  --border-color: #334155;
}
```

### 4.2 ممنوعات CSS

ممنوع:

```jsx
<Box sx={{ p: 3, display: 'flex' }}>
```

ممنوع:

```jsx
<div style={{ marginTop: 20 }}>
```

مطلوب:

```jsx
<Box className="dashboard-page">
```

وفي CSS:

```css
.dashboard-page {
  padding: var(--space-6);
}
```

### 4.3 تسمية الكلاسات

استخدم BEM مبسط:

```css
.invoice-page {}
.invoice-page__header {}
.invoice-page__filters {}
.invoice-page__table {}
.invoice-page__summary-card {}
```

---

## 5. RTL Rules

### 5.1 إعداد عام

يجب التأكد من:

```jsx
document.documentElement.lang = "ar";
document.documentElement.dir = "rtl";
```

ويجب أن يحتوي ThemeConfig على:

```js
direction: "rtl"
```

ويجب استخدام Emotion RTL cache.

### 5.2 محاذاة النصوص

القاعدة الافتراضية:

```css
body {
  direction: rtl;
  text-align: right;
}
```

داخل Material UI:

```css
.MuiInputBase-input,
.MuiFormLabel-root,
.MuiTableCell-root,
.MuiTypography-root {
  text-align: right;
}
```

### 5.3 عناصر يجب ألا تُقلب

الأكواد والأرقام الفنية فقط:

```css
.ltr-value {
  direction: ltr;
  text-align: left;
  unicode-bidi: plaintext;
}
```

تستخدم مع:

- invoice numbers
- SKU
- username
- email
- phone if formatted LTR

---

## 6. App Shell Layout

### 6.1 تخطيط الصفحة

المطلوب:

```txt
┌──────────────────────────────────────────────┐
│ Topbar                                       │
├──────────────┬───────────────────────────────┤
│ Sidebar RTL  │ Page Content                  │
│ right side   │                               │
└──────────────┴───────────────────────────────┘
```

في RTL:

- الـ Sidebar على اليمين.
- المحتوى يبدأ بعده ناحية اليسار.
- لا يحدث overlap.
- لا يوجد scroll أفقي.
- عند الموبايل الـ Sidebar يتحول Drawer من اليمين.
- عند تسجيل الدخول تظهر القائمة فورًا بدون Refresh.

### 6.2 قواعد Sidebar

- العرض الأساسي: 288px.
- collapsed width: 76px.
- المكان: right.
- لا يغطي المحتوى على desktop.
- `position: fixed` مسموح لكن يجب ضبط `padding-inline-start/end` للمحتوى.
- العنصر النشط واضح.
- تقسيم القائمة إلى مجموعات:
  - التشغيل
  - الماليات
  - المخزون
  - النظام
  - التقارير

### 6.3 Topbar

يحتوي على:

- اسم الصفحة.
- Breadcrumb.
- زر الوضع Light/Dark.
- Notification Bell.
- User Menu.
- Quick search لاحقًا إن لزم.

---

## 7. Forms Design

### 7.1 قاعدة الحقول

كل Form يجب أن يكون بهذا الشكل:

```txt
Form Header
Description
Section 1
  Field Grid 2 أو 3 أعمدة حسب الشاشة
Section 2
  Field Grid
Actions
```

### 7.2 Grid

Desktop:

```css
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: var(--space-5);
}
```

Large forms:

```css
.form-grid--three {
  grid-template-columns: repeat(3, minmax(240px, 1fr));
}
```

Mobile:

```css
@media (max-width: 768px) {
  .form-grid,
  .form-grid--three {
    grid-template-columns: 1fr;
  }
}
```

### 7.3 Field Labels

ممنوع labels مقصوصة أو لاصقة.

مطلوب:

```css
.form-field {
  min-width: 0;
}

.form-field .MuiFormLabel-root {
  right: 14px;
  left: auto;
  transform-origin: top right;
}

.form-field .MuiInputBase-root {
  min-height: 48px;
}
```

### 7.4 Form validation

- Error تحت الحقل.
- لا تعرض error في toast فقط.
- الحقول المطلوبة عليها علامة واضحة.
- لا تحفظ form فيه خطأ.

---

## 8. Drawers & Dialogs

### 8.1 Drawer من الجنب

استخدم Drawer للإضافة والتعديل:

- إضافة كتاب.
- تعديل كتاب.
- إضافة منفذ.
- تعديل منفذ.
- إضافة مؤلف.
- إضافة دفعة.
- إضافة استلام مخزون.

المواصفات:

```css
.entity-drawer {
  width: min(720px, 100vw);
  direction: rtl;
}

.entity-drawer__header {
  padding: var(--space-5);
  border-bottom: 1px solid var(--border-color);
}

.entity-drawer__content {
  padding: var(--space-5);
  overflow-y: auto;
}

.entity-drawer__actions {
  position: sticky;
  bottom: 0;
  background: var(--color-surface);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border-color);
}
```

### 8.2 Dialog

Dialog فقط للحالات التالية:

- تأكيد حذف.
- تأكيد إلغاء فاتورة.
- تأكيد عكس دفعة.
- تحذير حدود ائتمان.

لا تستخدم Dialog كصفحة كاملة.

---

## 9. Tables & DataGrid

كل جداول النظام يجب أن تكون:

- readable.
- لها filters واضحة.
- بها empty state.
- بها loading state.
- بها error state.
- لا تنكسر على mobile.
- يمكن scroll أفقي داخل الجدول فقط وليس الصفحة كلها.

### 9.1 أعمدة مالية

الأموال:

- دائمًا `ج.م`
- محاذاة مالية موحدة.
- الأرقام تستخدم formatCurrencyEGP.
- لا تعرض أرقام خام.

### 9.2 التواريخ

- formatEgyptDateTime.
- توقيت مصر.
- لا تعرض ISO string خام.

---

## 10. Dashboard المطلوب

Dashboard الحالي يجب إعادة بنائه كـ Command Center.

### 10.1 أقسام Dashboard

1. Header ترحيبي بسيط:
   - "مرحبًا، [اسم المستخدم]"
   - "لوحة تشغيل مطبعة حمزة"

2. KPI Cards:
   - إجمالي الكتب النشطة.
   - إجمالي المنافذ النشطة.
   - فواتير اليوم.
   - إجمالي مبيعات اليوم.
   - إجمالي المتبقي.
   - إجمالي الرصيد المستحق.
   - إشعارات حرجة.

3. Finance Snapshot:
   - إجمالي الفواتير.
   - إجمالي المدفوع.
   - إجمالي المتبقي.
   - حدود الائتمان المتجاوزة.
   - دفعات مستحقة.

4. Inventory Snapshot:
   - مخزون منخفض.
   - مخزون بالسالب.
   - استلامات اليوم.
   - أكثر الكتب حركة.

5. Notifications:
   - آخر 5 إشعارات.
   - تصنيف severity.

6. Quick Actions:
   - إضافة فاتورة.
   - إضافة كتاب.
   - إضافة منفذ.
   - إضافة استلام مخزون.
   - إضافة دفعة.

---

## 11. Business Logic Rules

### 11.1 المنتجات / الكتب

- كل كتاب Product.
- كل كتاب يمكن ربطه بمؤلف أو أكثر.
- كل مؤلف يمكن ربطه بكتاب أو أكثر.
- لا يسمح بكتاب بدون مؤلف إلا بصلاحية خاصة أو مؤلف "غير محدد" مؤقت.
- سعر الكتاب لا يوضع داخل اسمه.
- السعر يتم تحديده حسب نوع المنفذ.

### 11.2 أنواع المنافذ

- الأدمن ينشئ أنواع المنافذ.
- الأدمن ينشئ المنافذ ويحدد نوع كل منفذ.
- لكل كتاب سعر لكل نوع منفذ.
- عند إنشاء فاتورة لمنفذ، النظام يجلب السعر حسب نوع المنفذ.
- السعر يتسجل snapshot في الفاتورة.

### 11.3 حسابات المؤلفين

- يمكن إنشاء حساب مستخدم للمؤلف.
- المؤلف يرى كتبه فقط.
- المؤلف يرى الفواتير التي تحتوي كتبه فقط.
- لا يرى فواتير لا تحتوي كتبه.
- لا يرى بيانات حساسة إلا إذا تم منحه صلاحية.
- تقارير المؤلف تعتمد على invoice_items المرتبطة بكتبه.

### 11.4 حسابات المنافذ

- يمكن إنشاء حساب لمنفذ.
- المنفذ يرى فواتيره فقط.
- يرى المدفوع والمتبقي الخاص به.
- يرى حالة الشحنات الخاصة بفواتيره.
- لا يرى أسعار أو فواتير منافذ أخرى.
- يمكنه تحميل كشف حسابه إذا لديه صلاحية.

### 11.5 الفواتير

- الفاتورة تحتوي على Outlet.
- كل Item له product_id وunit_price snapshot.
- حساب الإجمالي:
  - subtotal = مجموع السطور.
  - total = subtotal + shipping - discount.
  - paid = مجموع المدفوعات المعتمدة.
  - remaining = total - paid.
- حالة الدفع تحدث تلقائيًا:
  - unpaid
  - partially_paid
  - paid
  - overdue
  - cancelled

### 11.6 الدفعات

- كل دفعة مرتبطة بفاتورة.
- كل دفعة تحدث الرصيد تلقائيًا.
- لا يمكن حذف دفعة بدون reversal entry.
- installments لها due dates.
- عند دفع جزء من قسط، يصبح partially_paid.
- عند تجاوز تاريخ القسط وهو غير مدفوع، يصبح overdue.

### 11.7 Balance / Finance Ledger

النظام المالي المطلوب ليس مجرد حقل balance.

يجب وجود Ledger:

- invoice_created: يزيد المستحق.
- payment_recorded: يقلل المستحق.
- payment_reversed: يرجع المستحق.
- manual_adjustment: تصحيح يدوي بصلاحية.
- shipment_fee_update: عند تغيير رسوم الشحن.
- invoice_cancelled: يعكس أثر الفاتورة.

يجب أن يكون هناك:

- outlet current balance.
- total receivable.
- paid amount.
- pending amount.
- overdue amount.
- credit limit usage.
- statement per outlet.
- finance dashboard.

### 11.8 المخزون والاستلامات

- الاستلام يزود المخزون.
- الفاتورة تخصم المخزون.
- إلغاء الفاتورة يرجع المخزون.
- تعديل الفاتورة يعمل delta فقط.
- المخزون لا يتعدل مباشرة إلا بحركة adjustment.
- كل حركة لها source.

### 11.9 الشحن

- الشحن مرتبط بالفاتورة.
- يمكن شحن جزء من الفاتورة.
- الشحن الجزئي لا يكسر الحساب المالي.
- رسوم الشحن ضمن الفاتورة.
- حالة الشحن تحدث الإشعارات.

### 11.10 الإشعارات

الإشعارات يجب أن تغطي:

- مخزون بالسالب.
- مخزون منخفض.
- منفذ تجاوز حد الائتمان.
- فاتورة متأخرة.
- قسط مستحق قريبًا.
- قسط متأخر.
- دفعة جديدة.
- شحن جزئي.
- شحنة متأخرة.
- خطأ في التسعير.
- كتاب بدون سعر لنوع منفذ.

---

## 12. Permissions Matrix

### 12.1 Super Admin

يرى كل شيء ويدير كل شيء.

### 12.2 Admin

إدارة التشغيل والبيانات الأساسية بدون صلاحيات خطرة مثل restore backup أو حذف دائم.

### 12.3 Accountant

- فواتير.
- دفعات.
- أرصدة.
- تقارير مالية.
- لا يعدل المخزون إلا بصلاحية.

### 12.4 Inventory Manager

- الكتب.
- الاستلامات.
- حركات المخزون.
- تنبيهات المخزون.
- لا يضيف دفعات.

### 12.5 Sales / Staff

- إنشاء فواتير.
- رؤية المنافذ.
- رؤية الكتب والأسعار.
- لا يغير أسعار بدون صلاحية.

### 12.6 Author Account

- رؤية كتبه.
- رؤية الفواتير التي تحتوي كتبه.
- رؤية تقاريره.
- لا يرى بيانات باقي المؤلفين.

### 12.7 Outlet Account

- رؤية فواتيره.
- رؤية المتبقي والمدفوع الخاص به.
- رؤية الشحنات الخاصة به.
- لا يعدل أسعار أو مخزون.

### 12.8 Viewer

قراءة فقط حسب النطاق المحدد.

---

## 13. Material UI Rules

### 13.1 ماذا نستخدم من MUI

- Button
- TextField
- Select
- Autocomplete
- Drawer
- Dialog
- Table/DataGrid
- Card
- Chip
- Alert
- Snackbar
- Tabs
- Menu
- AppBar
- Drawer
- Breadcrumbs

### 13.2 ماذا لا نتركه عشوائيًا

- لا يتم تخصيص MUI بـ `sx` في كل صفحة.
- يتم تخصيصه عبر:
  - Theme overrides.
  - CSS classes.
  - shared components.

### 13.3 Theme Overrides

يجب أن تغطي:

- MuiButton
- MuiTextField
- MuiInputLabel
- MuiOutlinedInput
- MuiSelect
- MuiTableCell
- MuiDrawer
- MuiDialog
- MuiChip
- MuiCard
- MuiMenu

---

## 14. Translation JSON

المطلوب ملف واحد:

```txt
client/src/locales/ar.json
```

الشكل:

```json
{
  "app.name": "مطبعة حمزة",
  "app.developer": "Ziad Elsayed CodzHub",
  "nav.dashboard": "الرئيسية",
  "nav.products": "الكتب",
  "nav.authors": "المؤلفون",
  "nav.outlets": "المنافذ",
  "nav.invoices": "الفواتير",
  "nav.payments": "الدفعات",
  "nav.finance": "الأرصدة والماليات",
  "nav.inventory": "المخزون",
  "nav.notifications": "الإشعارات",
  "common.save": "حفظ",
  "common.cancel": "إلغاء",
  "common.delete": "حذف",
  "common.edit": "تعديل"
}
```

ممنوع كتابة نصوص عربية مباشرة داخل JSX بعد خطوة الترجمة.

استخدم helper:

```js
import ar from "../locales/ar.json";

export const t = (key, fallback = key) => ar[key] || fallback;
```

---

## 15. Verification Gate

كل خطوة Frontend يجب أن تثبت:

1. لا يوجد `style={{`.
2. لا يوجد استخدام جديد لـ `sx={{` في الصفحة المعدلة.
3. لا يوجد text-align left إلا داخل `.ltr-value`.
4. لا يوجد CSS خارج الملفات المخصصة.
5. كل صفحة لها CSS.
6. كل component له CSS.
7. كل النصوص الجديدة داخل ar.json.
8. لا يوجد overflow أفقي على 1366px.
9. لا يوجد label مقصوص.
10. لا يوجد field ملتصق بحقل آخر.
11. لا يوجد sidebar يغطي المحتوى.
12. لا يوجد احتياج للـ refresh بعد login.
13. Light mode وDark mode شغالين.
14. npm run build ينجح.
15. npm test ينجح أو يكتب سبب واضح ومحدد.
16. npm run smoke ينجح إن كان السيرفر متاحًا.

---

## 16. Manual QA Screens

يجب اختبار هذه الشاشات يدويًا بعد كل مجموعة تغييرات:

- Login
- Dashboard
- Users
- Authors
- Products
- Outlet Types
- Outlets
- Invoices
- Payments
- Finance
- Inventory
- Shipments
- Notifications
- Reports
- Exports

لكل شاشة اختبر:

- Desktop 1366x768
- Desktop 1920x1080
- Tablet 768px
- Mobile 390px
- Light mode
- Dark mode
- Empty state
- Loading state
- Error state
- Data filled state

---

## 17. Definition of Done

لا تعتبر أي خطوة مكتملة إلا إذا:

- الكود يعمل.
- الواجهة لا تحتاج refresh.
- RTL مضبوط.
- لا يوجد inline styles.
- CSS مقسم.
- ar.json محدث.
- forms سليمة.
- sidebar مضبوط.
- dashboard احترافي.
- الحسابات/الأرصدة/الإشعارات مرتبطة.
- التقارير تعرض أرقام EGP.
- التاريخ بتوقيت مصر.
- report مكتوب داخل agent_pack/reports.
- status.json محدث.

## Active design correction: no important overrides and owner-grade invoice builder

The current design goal is not just “make it look better.” The frontend must become an owner-grade business system for مطبعة حمزة.

### Styling correction

- Stop solving MUI/library conflicts with repeated `!important`.
- Fix cascade order, theme tokens, component classes, and scoped CSS structure.
- Scan all JSX/CSS line by line and reduce inline/sx/important debt.
- Field labels must never collide with field values.
- Fields must have natural widths and consistent grid spacing.
- RTL alignment is the default for every text, table, form, drawer, menu, and page.

### Invoice builder design

Invoice creation must feel like a complete proprietary workflow:

- Select outlet first.
- Show outlet type and balance context.
- Add books with dynamic outlet-type price.
- Show stock/available quantities.
- Support partial/full/no collection at creation.
- Support supplied/not-supplied for collected money.
- Show sticky totals and validation.
- Allow partial shipment later by invoice item quantities.

### Finance design

Dashboards must separate:

- الرصيد المعلق: غير محصل من المنافذ.
- الرصيد الفعلي: محصل فعليًا.
- محصل ومورد.
- محصل ولم يورد.

No installment widgets, due installments, or payment plan cards.
