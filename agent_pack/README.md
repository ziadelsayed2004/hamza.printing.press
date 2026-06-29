# مطبعة حمزة — Unified Agent Pack

هذا الـ Agent Pack يدير تحديث منصة مطبعة حمزة من خلال خطوات واحدة تلو الأخرى.

## البرومبت الموحد

```text
You are working on the Hamza Printing Press Bookstore Manager repo. Read `agent_pack/prompts/ONE_PROMPT_RUNNER.md` and follow it exactly. Execute exactly one open/pending step from `agent_pack/status.json`, update tracking, run verification, write the step report, then stop. Do not execute more than one step.
```

## مصدر الحقيقة

- `status.json`
- `TASK_BOARD.md`
- `prompts/ONE_PROMPT_RUNNER.md`
- `docs/FINAL_BUSINESS_RULES_CURRENT.md`
- `docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`

## الحالي

الخطوات الجديدة من 096 إلى 120 تعالج:

- تنظيف الـ agent pack.
- إصلاح التصميم وRTL وMUI.
- توحيد side drawers.
- إلغاء التقسيط والاستيراد.
- الماليات: معلق، محصل، مورد، غير مورد، مسترجعات.
- الشحن الجزئي حسب بنود الفاتورة.
- الاسترجاع والرصيد والليميت.
- الفواتير كـ مركز أكشنز.
- تنظيف backend/tests/dead code.
- final deploy/smoke gate.


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
