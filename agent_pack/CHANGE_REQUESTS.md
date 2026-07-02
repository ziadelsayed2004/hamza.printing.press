# Change Requests — مطبعة حمزة

## Current state

كل طلبات التطوير حتى آخر ريبو مرفوع مقفولة داخل Agent Pack موحد. لا توجد خطوات مفتوحة حالياً.

## Locked baseline understood

- المشروع باسم: مطبعة حمزة.
- المطور: Ziad Elsayed CodzHub.
- Monolith Node.js على DirectAdmin.
- Backend Express + SQLite.
- Frontend React/Vite/Material UI.
- لا يوجد تقسيط.
- لا يوجد Import.
- Export فقط.
- واردات الكتب مخزون فقط.
- الدفع جزئي/كامل/غير مدفوع.
- التوريد المالي يخص الخزينة فقط.
- إيصالات الدفع موجودة، والكود الحالي يعتمد Auto Approval.
- الشحن الجزئي حسب بنود الفاتورة.
- الاسترجاع حسب بنود الفاتورة ويرجع مخزون ويقلل مديونية.

## Future changes

أي طلب جديد يتم فتحه كـ Step جديدة بعد 150 داخل نفس الـ Agent Pack، بدون V2/V3 وبدون إنشاء باك منفصل.

---

# Change Request — Open Scope 151–158

User requested a new controlled phase with 5–8 steps covering:

- From invoices page, payment action must route to Payments with selected outlet/invoice and full payment form.
- Payment receipts are uploaded with payments and shown in payment lists; no receipt review queue UX.
- Invoice actions must include shipping and delivered/status flow handoff.
- Shipping must support partial invoice item quantities.
- Exports must become professional filtered Excel sheets, including courier delivery sheets with addresses and shipment details.
- Invoice item may include free/complimentary quantity.
- Returns must support full invoice or partial items and recalculate stock, outlet balance/credit, statements, and what each side owes.
- Invoice views/drawers/details must be responsive and polished with Material UI RTL.
- Payment, shipping, returns, creation/editing of outlets/outlet types/books, inventory, and related actions must be permission-protected.
- Admin must be able to create custom roles, not just assign predefined ones.

Opened Steps: 151–158.
