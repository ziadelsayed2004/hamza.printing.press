# 097 — Latest Repo Deep Style + Logic Audit

## الهدف
اعمل audit فعلي للكود الحالي، لا تعتمد على تقارير قديمة.

المطلوب:
- افحص frontend line-by-line للـ inline styles و`sx` و`!important` وRTL ومشاكل drawers/forms.
- افحص backend للـ installments/import/dead code/payment/shipping/returns/finance.
- افحص أن القديم لم يتم تقليله: balance, notifications, invoice actions, stock, reports.
- حدّد قائمة ملفات يجب إصلاحها بالأولوية.
- لا تصلح كل شيء هنا؛ فقط audit تفصيلي وخطة تنفيذ دقيقة.

قبول الخطوة:
- تقرير audit جديد في `agent_pack/reports` يحتوي counts, files, exact problems, priorities.
- قائمة acceptance criteria للخطوات التالية.

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
