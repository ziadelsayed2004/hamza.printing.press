# Change Requests — مطبعة حمزة

هذا الملف يجمع طلبات التطوير داخل Agent Pack واحد موحد بدون تقسيمات إصدارات.

## Current priority

- Design system كامل.
- RTL كامل.
- إزالة inline styles.
- CSS منظم لكل صفحة وComponent.
- ترجمة عربية في JSON واحد.
- إصلاح sidebar/layout/login refresh.
- Dashboard احترافي.
- حسابات مؤلفين ومنافذ بصلاحيات scoped.
- Balance/Finance Ledger كامل.
- Payments/Installments/Shipping/Inventory/Notifications مترابطة.


---

## Inventory/Payments/Notifications Correction Phase — 2026-06-28

Opened current steps 121–145 to correct the latest business rules:

- Book inventory receipts are stock-only, not finance.
- Payment creation selects outlet then invoice and supports receipt upload for every payment, including partial payments.
- Payment receipts have a review queue.
- Dashboard notifications use `معاينة` and `تجاهل` only.
- Insufficient stock previews route to product/inventory context.
- Partial shipping selects invoice item quantities.
- Returns affect stock, outlet return balance/credit, limit, statements, notifications, and exports.
- No imports and no installments remain allowed.
