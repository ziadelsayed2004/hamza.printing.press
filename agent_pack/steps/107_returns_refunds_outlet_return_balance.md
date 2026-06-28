# 107 — Returns/Refunds + Outlet Return Balance

## الهدف
أضف نظام الاسترجاع وربطه بالرصيد.

المطلوب:
- backend returns module: return records + return items.
- return linked to invoice/outlet/products/quantities.
- return value calculated from invoice item snapshots.
- return increases inventory when applicable.
- return creates return_balance for outlet.
- return affects credit limit exposure.
- UI drawer لإنشاء استرجاع من الفاتورة.
- reports/notifications for returns.

قبول الخطوة:
- لا يمكن إرجاع أكثر من المسموح.
- كشف حساب المنفذ يظهر المسترجعات.

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
