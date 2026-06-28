# 096 — Agent Pack Unified Cleanup + Obsolete Purge

## الهدف
نظف الـ agent pack الحالي واجعله موحدًا بالفعل. لا تنفذ business code إلا إذا كان مطلوبًا للتنظيف.

المطلوب:
- اقرأ `CURRENT_LATEST_REPO_AUDIT.md` و`UNIFIED_AGENT_PACK_CLEANUP_POLICY.md`.
- صلح عدم التزامن بين `status.json` و`TASK_BOARD.md`.
- تأكد أن أول خطوة مفتوحة بعد هذه الخطوة هي 097.
- علّم الخطوات المتناقضة كـ obsolete/cancelled في board أو انقلها إلى archive إن أمكن بدون كسر التقارير.
- لا تعتمد على أي V2/V3/V4 أو أسماء إصدارات.
- اجعل prompt runner يقرأ docs النهائية الجديدة.
- اكتب تقرير يوضح ما تم تجاهله/إلغاؤه ولماذا.

قبول الخطوة:
- `status.json` و`TASK_BOARD.md` متزامنين.
- لا توجد خطوة final مفتوحة قبل الخطوة الأخيرة الجديدة.
- لا توجد خطوة import/installments مفتوحة أو قابلة للتنفيذ.

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
