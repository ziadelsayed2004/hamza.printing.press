# 100 — Sidebar + Topbar Layout Final Fix

## الهدف
أصلح السايد بار والـ layout نهائيًا.

المطلوب:
- sidebar يمين دائمًا في RTL.
- topbar لا يغطي sidebar ولا يترك فراغ غلط.
- collapse/expand لا يكسر المحتوى.
- mobile drawer من اليمين.
- بعد login لا يحتاج refresh لظهور القوائم.
- role-aware menu hydrated من session correctly.

قبول الخطوة:
- login -> dashboard -> sidebar menus تظهر فورًا.
- desktop/tablet/mobile tested.
- لا يوجد horizontal overflow.

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
