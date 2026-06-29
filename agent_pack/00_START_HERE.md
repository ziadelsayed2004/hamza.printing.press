# 00 START HERE — مطبعة حمزة

الـ Agent Pack موحد حاليًا ولا يحتوي إصدارات منفصلة. استخدم البرومبت الموجود في:

`agent_pack/prompts/COPY_THIS_PROMPT_AR.md`

أول خطوة مفتوحة حاليًا هي 096.

قبل أي تنفيذ يجب قراءة:

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/docs/CURRENT_LATEST_REPO_AUDIT.md`
- `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
- `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
- `agent_pack/TASK_BOARD.md`
- `agent_pack/status.json`

القواعد النهائية:

- لا تقسيط.
- لا Import.
- Export فقط.
- دفع: مؤجل كلي / مدفوع جزئي / مدفوع كلي.
- التوريد منفصل عن التحصيل.
- شحن جزئي حسب منتجات الفاتورة.
- استرجاع مرتبط بالمخزون والرصيد والليميت.
- Material UI احترافي، RTL، EGP، Africa/Cairo.
- لا inline style ولا `!important` جديد.


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
