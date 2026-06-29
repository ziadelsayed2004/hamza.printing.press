# Payment Receipts Current Policy — الحالة الحالية للإيصالات

## Current locked behavior

النسخة الحالية تدعم رفع إيصال مع كل عملية دفع، سواء كانت دفع جزئي أو دفع كامل.

الكود الحالي في `paymentsService` و `invoicesService` يضبط `receipt_status = approved` تلقائياً عند إنشاء الدفع/الفاتورة.

## Existing backend capability

ما زالت توجد endpoints وخدمات backend للمراجعة:

- review queue
- receipt preview/download
- approve/reject

لكن الواجهة الحالية بعد تعديلات Step 148 أزالت Review Queue من صفحة المدفوعات واعتمدت العرض المباشر للإيصال.

## Future rule

إذا طلب المستخدم لاحقاً رجوع مراجعة الإيصالات، يتم فتح Step جديدة بعد 150 لتفعيلها UI/UX وpermissions وfinance effect بشكل صريح.
