# Manual Changes Understood — سجل فهم آخر تعديلات يدوية

هذا الملف يسجل ما فهمناه من آخر نسخة رفعها المستخدم بعد تعديلات يدوية في الكود والداتا بيز.

## المعنى التجاري الحالي

- **توريد الكتب / واردات الكتب** = حركة مخزون فقط.
- **توريد المال / توريد للخزينة** = حالة مالية على المدفوعات فقط.
- **الدفع الجزئي** مسموح، لكنه ليس تقسيط.
- **التقسيط ملغي** من الواجهة ومن اللوجيك المطلوب.
- **Import ملغي**، والتصدير فقط هو المعتمد.
- **الاسترجاع** موجود كعملية مستقلة مرتبطة بالفاتورة وبنودها.
- **الشحن الجزئي** موجود كاختيار كميات من بنود الفاتورة.
- **إيصال الدفع** يمكن رفعه مع عملية الدفع، والكود الحالي يعتمد Auto Approval للإيصال.

## آخر قرارات UI التي ظهرت في الكود

- الواجهة عربية RTL.
- يوجد Light/Dark mode.
- يوجد Material UI theme وملفات CSS كثيرة منفصلة.
- EntityDrawer موجود ويستخدم كقاعدة للـ drawers.
- يوجد SideBar/TopBar حديث، لكن الـ notification menu ما زال يستخدم Mark as read / Resolve في الكود الحالي، وليس معاينة/تجاهل بشكل كامل.

## آخر قرارات backend التي ظهرت في الكود

- `server/` flat structure مع modules مباشرة.
- `routes.js` يجمع كل الموديولات.
- Roles/Permissions/Users/RBAC موجودة.
- Author account scope وOutlet account scope مدعومين في عدة routes.
- Finance ledger موجود ويحسب ملخصات وأرصدة.
- Returns تدخل finance ledger وتزيد المخزون.
- Shipments تتحقق من الكمية المتبقية للشحن.
- Inventory receipts لا تستدعي finance ledger.

## نقاط لا تعتبر خطوات مفتوحة الآن

النقاط التالية مسجلة فقط، ولا تنفذ إلا بعد طلب جديد:

- إصلاح بقايا Import tables من fresh schema.
- إزالة category `installment_due` من notifications migrations.
- تحويل storage path من hardcoded Windows path إلى config.
- تصفير style gate المتبقي.
- توحيد أزرار الإشعار إلى معاينة/تجاهل في كل الواجهات.
