# Final Material UI + RTL Design System — مطبعة حمزة

هذا الملف هو العقد النهائي للتصميم. المطلوب ليس مجرد ألوان؛ المطلوب نظام UI كامل ومتسق على مستوى التطبيق كله.

## 1. الهوية

- اسم النظام الظاهر: **مطبعة حمزة**.
- اعتماد المطور في الملفات/التقارير: **Ziad Elsayed CodzHub**.
- لا يتم عرض هويات قديمة أو أسماء مشاريع تجريبية.
- اللغة: عربي فقط.
- الاتجاه: RTL كامل.
- العملة: جنيه مصري فقط.
- التوقيت: Africa/Cairo فقط.

## 2. قاعدة Google Material UI

يستخدم التطبيق Material UI كطبقة مكونات، لكن لا يتم خلط الأنماط عشوائيًا.

المسموح:

- ThemeConfig يحتوي tokens وcomponent overrides الرسمية.
- CSS variables مشتركة في `client/src/styles/variables.css`.
- CSS reset/rtl/layout/forms/tables/drawers/dialogs منفصلة.
- CSS sibling لكل صفحة وكل component مهم.
- className semantic لكل جزء.

الممنوع:

- `style={{...}}`.
- `sx={{...}}` لتصميم layout كامل.
- `!important` كحل عشوائي.
- محاذاة يسار لنص عربي.
- Dialog/Drawer لكل صفحة بتصميم مختلف.
- حقول فورم لازقة أو label مقصوص.
- إخفاء مشاكل MUI بـ overrides عامة.

## 3. التعامل مع MUI بدون `!important`

الترتيب الصحيح:

1. Theme component overrides في `ThemeConfig.jsx` للأشياء العامة.
2. CSS classes مخصصة للعناصر الخاصة.
3. CSS variables للألوان والمسافات.
4. selectors دقيقة وليست global عمياء.
5. عدم استعمال `!important` إلا في حالة موثقة ومؤقتة داخل ملف technical debt.

## 4. Layout النهائي

### Desktop

- Sidebar ثابت يمين الشاشة.
- Topbar يأخذ المساحة المتبقية ولا يغطي السايد بار.
- المحتوى يبدأ بعد الـ sidebar وداخل container منظم.
- لا توجد scrollbars أفقية.
- الـ sidebar collapse لا يكسر المحتوى.

### Tablet/Mobile

- Sidebar يتحول Drawer كامل من اليمين.
- Topbar ثابت.
- الجداول تتحول إلى cards أو horizontal scroll منظم.
- الأزرار المهمة تظل واضحة.

## 5. Side Drawer Standard

كل side drawer مثل: إنشاء كتاب، إنشاء منفذ، إنشاء فئة منفذ، إنشاء فاتورة، شحن جزئي، استرجاع، توريد، إضافة واردات — يجب أن يكون بنفس النظام:

```text
Header ثابت:
  العنوان
  وصف صغير
  زر إغلاق

Content scrollable:
  Sections واضحة
  Form grid responsive
  labels فوق الحقول
  helper/error text تحت الحقل

Footer ثابت:
  زر حفظ رئيسي
  زر إلغاء ثانوي
  حالة loading/submitting
```

### أبعاد drawer

- Small form: 520px.
- Normal form: 720px.
- Invoice/Shipment/Return complex flow: 960px أو full-screen responsive.
- على الموبايل: 100vw.

## 6. Form Field Standard

كل label يجب أن يكون:

- فوق الحقل.
- محاذي يمين.
- غير ملتصق بالحقل.
- لا يقص النص.

كل field يجب أن يكون:

- full width داخل grid cell.
- min-width: 0.
- height ثابت نسبيًا.
- helper/error أسفل الحقل.
- numbers technical يمكن أن تكون LTR داخل value فقط، لكن label يبقى RTL.

Grid:

- صفحة عادية: 2 columns على desktop.
- forms كثيفة: 3 columns فقط لو العرض يسمح.
- mobile: عمود واحد.
- الحقول الطويلة مثل العنوان/ملاحظات: full span.

## 7. Tables/DataGrids

- Headers RTL.
- النص العربي يمين.
- الأرقام المالية يمكن أن تكون واضحة مع EGP.
- actions في عمود ثابت ومنظم.
- filters فوق الجدول أو في filter drawer.
- لا يوجد جدول يكسر الصفحة.

## 8. Dialogs

Dialogs للتأكيد فقط:

- حذف.
- إلغاء.
- عكس دفع.
- اعتماد توريد.
- اعتماد استرجاع.

العمليات الكبيرة تكون Drawers/Pages وليس Dialog صغير.

## 9. Dashboard

الداش بورد يجب أن يكون command center:

- ملخص مالي: معلق، محصل، محصل مورد، محصل غير مورد، مسترجعات.
- ملخص عمليات: فواتير، شحن جزئي، مخزون، واردات.
- إشعارات وأكشنز.
- charts/cards نظيفة.
- لا توجد كروت عشوائية أو توزيع ناقص.

## 10. Quality Gate النهائي

لا تقفل أي خطوة UI إلا بعد:

- تشغيل style gate.
- عدم وجود inline style جديد.
- عدم وجود !important جديد.
- فحص RTL في كل صفحة touched.
- فحص drawer touched.
- فحص labels/fields.
- فحص dark/light.
- فحص mobile/tablet/desktop.
