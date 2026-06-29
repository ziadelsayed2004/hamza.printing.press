# Step 133: Finance/Exports/Notifications Final QA

## Objective

Verify finance screens, exports-only flow, notification center/actions, EGP formatting and Egypt timezone rendering.

## Mandatory Reads

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/docs/FIELD_DRAWER_MUI_FINAL_AUDIT.md`
- `agent_pack/docs/FINAL_PAYMENT_SUPPLY_RETURN_SHIPPING_RULES.md`
- `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
- `agent_pack/checklists/FRONTEND_PERFECTION_CHECKLIST.md`
- `agent_pack/checklists/FINANCE_SHIPPING_RETURNS_QA_CHECKLIST.md`

## Execution Rules

- Execute this step only.
- Do not reintroduce imports or installments.
- Do not add inline styles, random heavy `sx`, or `!important`.
- Preserve RTL, EGP, Egypt timezone, and single DirectAdmin Node deployment.
- Update `agent_pack/status.json`, `agent_pack/TASK_BOARD.md`, and write a report.

## Verification

Run the relevant subset and record exit codes:

```bash
node -v
npm -v
npm run style:gate
npm run build
npm test
npm run smoke
```
