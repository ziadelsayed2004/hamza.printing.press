# 104 — Finance Model Final No-Installments With Supply

## الهدف
نظف الباك إند المالي نهائيًا.

المطلوب:
- حذف/إزالة الاعتماد على payment_installments من schema/services/tests/reports.
- statuses النهائية للدفع فقط.
- كل payment له supply_status.
- ledger entries واضحة لكل: invoice_created, payment_recorded, payment_supplied, payment_reversed, return_created, manual_adjustment.
- summary APIs تعرض: pending, collected, supplied, unsupplied, returns.

قبول الخطوة:
- لا يوجد installment active في source/runtime.
- كل أرقام المالية reconciled.

## ملفات يجب قراءتها قبل التنفيذ

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/docs/CURRENT_LATEST_REPO_AUDIT.md`
- `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
- `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
- `agent_pack/docs/UNIFIED_AGENT_PACK_CLEANUP_POLICY.md`
- `agent_pack/checklists/VISUAL_RTL_MATERIAL_QA_CHECKLIST.md`
- `agent_pack/checklists/FINANCE_SHIPPING_RETURNS_QA_CHECKLIST.md`
- الكود الحالي المرتبط بهذه الخطوة فقط.

## قواعد ثابتة

- نفذ خطوة واحدة فقط.
- لا تضف إصدارات Agent Pack.
- لا تضف import features.
- لا تضف installments/payment plans.
- لا تضف `!important` أو inline style جديد.
- حافظ على RTL وEGP وAfrica/Cairo.
- حسن القديم ولا تقلل قيمته.
- اكتب تقرير step بعد التنفيذ.

## أوامر تحقق مقترحة

```bash
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```

إن لم تعمل بعض الأوامر، اذكر السبب بدقة في التقرير.
