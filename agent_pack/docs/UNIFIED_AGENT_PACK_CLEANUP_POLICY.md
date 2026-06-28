# Unified Agent Pack Cleanup Policy

الـ Agent Pack موحد الآن. لا يوجد V1/V2/V3/V4 داخل الملفات. أي ملفات قديمة تظل فقط كأثر تاريخي إن لم يتم حذفها، ولا تعتبر مصدرًا للحقيقة.

## مصدر الحقيقة الحالي

1. `agent_pack/status.json`
2. `agent_pack/TASK_BOARD.md`
3. `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
4. `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
5. `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
6. ملفات الخطوات المفتوحة من 096 فصاعدًا.

## خطوات/ملفات ملغاة أو مستبدلة

لا يتم تنفيذ أو الاعتماد على أي خطوة قديمة تتعلق بـ:

- Installments / Payment Plans.
- Excel/CSV Import.
- Final gates قديمة قبل الخطوات الجديدة.
- أي step duplicate يحمل نفس الرقم بمعنى مختلف.
- أي خطوة تقترح تقليل القديم بدل تحسينه.

## Delete / Ignore Manifest

هذه الملفات يجب حذفها أو تركها مؤرشفة بشرط عدم اعتمادها:

- `agent_pack/steps/027_excel_import_templates.md`
- `agent_pack/steps/035_payments_installments_ui.md`
- `agent_pack/steps/073_payments_installments_shipping_logic_integrity.md`
- أي routes/pages/import UI تم إنشاؤها سابقًا.
- أي schema/table/service/test باسم `payment_installments` بعد migration cleanup.

## قاعدة مهمة

إذا تعارض تقرير قديم مع القواعد الحالية، يتم تجاهل التقرير القديم واعتماد القواعد الحالية فقط.
