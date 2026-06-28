# 115 — Reports/Dashboard Finance Command Center Final

## الهدف
اضبط الداش بورد والتقارير بشكل نهائي.

المطلوب:
- dashboard مالي/تشغيلي متكامل.
- cards: pending, collected, supplied, unsupplied, returns, invoices, partial shipments, stock alerts.
- charts/tables بسيطة وواضحة.
- reports تعتمد business rules الحالية.

قبول الخطوة:
- الداش بورد يشرح حالة المنصة بدون دخول صفحات كثيرة.

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
