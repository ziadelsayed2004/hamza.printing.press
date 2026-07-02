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


---

# Open Scope 151–158 Addendum

## Invoice actions

- Invoice list/details payment action must redirect to `/payments` with selected outlet/invoice and open the payment creation form there.
- The invoice page must not silently create payment records.
- Invoice page actions may deep-link to shipping and returns workflows with the selected invoice.

## Payment receipts

- Receipt upload belongs to the Payments workflow.
- Receipts are uploaded and displayed/downloadable; they are not reviewed by a queue in the UI.
- Existing review backend artifacts should not drive UX unless future explicit scope asks for it.

## Free books / complimentary quantities

- Invoice lines may contain free quantity.
- Physical quantity affects stock.
- Billable quantity affects money.
- Details, exports, and PDFs must show free quantity separately.

## Returns recalculation

- Full and partial returns must update stock, finance ledger, outlet statement, and remaining exposure.
- Return credit must never exceed the billable amount eligible for return.

## Exports

- Exports must become filter-first and professional.
- Courier sheets are required for shipping/delivery operations.

## Custom roles

- Users must be able to create and manage roles, not only assign predefined roles.
