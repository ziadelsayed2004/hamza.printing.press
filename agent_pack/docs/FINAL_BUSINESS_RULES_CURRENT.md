# Final Business Rules Current — مطبعة حمزة Locked State

هذا هو ملف القواعد الحالي بعد آخر تعديلات يدوية. عند وجود تعارض مع تقارير قديمة، هذا الملف ومعه `LATEST_REPO_LOCKED_SNAPSHOT.md` هما المصدر الأحدث.

## 1. قرارات نهائية

- لا يوجد تقسيط.
- لا يوجد Import Excel/CSV في المنتج الحالي.
- التصدير Export فقط.
- العملة جنيه مصري فقط.
- التوقيت Africa/Cairo.
- المشروع Monolith واحد للنشر على DirectAdmin.

## 2. الدفع والتحصيل

حالات الدفع المعروضة للمستخدم:

- غير مدفوع / آجل.
- مدفوع جزئياً.
- مدفوع بالكامل.

الدفع الجزئي ليس تقسيطاً؛ هو عملية دفع مستقلة.

كل Payment يحتوي:

- invoice_id
- amount
- method
- date
- reference
- notes
- supply_status: supplied / not_supplied
- receipt metadata عند وجود إيصال

## 3. التوريد المالي

`تم توريده` تعني أن المبلغ المحصل دخل الخزينة.

`لم يورد` تعني أن المبلغ تم تحصيله من المنفذ لكنه لم يدخل الخزينة.

هذا لا علاقة له بواردات الكتب أو المخزون.

## 4. واردات الكتب والمخزون

واردات الكتب هي حركة مخزون فقط:

- تزيد المخزون.
- تنشئ inventory transaction.
- لا تنشئ payment.
- لا تغير رصيد المنفذ.
- لا تؤثر على الليميت.

## 5. الفواتير

الفاتورة تعتمد على:

- منفذ.
- نوع منفذ.
- كتب/منتجات.
- أسعار حسب نوع المنفذ.
- خصم.
- شحن.
- دفع أولي اختياري.
- إيصال دفع اختياري مع الدفع.

## 6. الشحن الجزئي

الشحن يتم على بنود الفاتورة وكمياتها. لا يمكن شحن كمية أكبر من المتبقي غير المشحون وغير المرتجع.

## 7. الاسترجاع

الاسترجاع:

- مرتبط بالفاتورة.
- مرتبط ببنود وكميات.
- يزيد المخزون للمنتجات المتتبعة.
- يضيف قيد مالي يقلل receivable.
- يدخل في كشف الحساب والليميت.

## 8. الإيصالات

الكود الحالي يحفظ إيصالات الدفع ويجعلها approved تلقائياً في سيناريوهات الإنشاء الحالية. توجد endpoints لمراجعة الإيصالات في backend، لكن الواجهة الحالية تم تبسيطها وإزالة review queue منها في آخر التعديلات.

أي عودة لنظام review queue تحتاج Step جديدة.

## 9. الإشعارات

الإشعارات موجودة للمخزون والأسعار والمدفوعات والماليات والفواتير. توجد policy سابقة للمعاينة/التجاهل، لكن الكود الحالي في TopBar لا يزال يستخدم mark as read / resolve. هذا مسجل كـ Known Issue فقط ولا توجد خطوة مفتوحة له.


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
