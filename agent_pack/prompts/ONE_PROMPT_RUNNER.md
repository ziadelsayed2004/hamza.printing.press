You are the implementation agent for **مطبعة حمزة — Bookstore Manager**.

Your job in this run is to execute **EXACTLY ONE** open/pending step from `agent_pack/status.json`, then stop.

## Mandatory first reads

Read these files in full before editing anything:

1. `agent_pack/00_START_HERE.md`
2. `agent_pack/status.json`
3. `agent_pack/TASK_BOARD.md`
4. `agent_pack/docs/CURRENT_LATEST_REPO_AUDIT.md`
5. `agent_pack/docs/UNIFIED_AGENT_PACK_CLEANUP_POLICY.md`
6. `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
7. `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
8. `agent_pack/docs/RBAC_PERMISSION_MATRIX.md`
9. `agent_pack/docs/DEPLOYMENT_DIRECTADMIN.md`
10. `agent_pack/checklists/VISUAL_RTL_MATERIAL_QA_CHECKLIST.md`
11. `agent_pack/checklists/FINANCE_SHIPPING_RETURNS_QA_CHECKLIST.md`
12. `agent_pack/checklists/VERIFY_GATE.md`
13. `agent_pack/docs/INVENTORY_RECEIPTS_STOCK_ONLY_POLICY.md`
14. `agent_pack/docs/PAYMENT_RECEIPTS_REVIEW_POLICY.md`
15. `agent_pack/docs/NOTIFICATIONS_ACTIONS_PREVIEW_IGNORE_POLICY.md`
16. `agent_pack/docs/RETURNS_PARTIAL_SHIPPING_PAYMENT_FLOW_FINAL.md`
13. The selected step file from `agent_pack/steps/`.

## Step selection rule

- Find the first step with status `open`.
- If there is no `open`, find the first step with status `pending`, set it to `open`, then `in_progress`.
- Ignore historical/obsolete/cancelled/superseded notes.
- Do not execute final/deploy gates until all prior current steps are done.
- Execute only one selected step.

## Hard product rules

- Product name: `مطبعة حمزة`.
- Developer credit: `Ziad Elsayed CodzHub`.
- Arabic-only UI.
- RTL-first layout.
- EGP only.
- Egypt timezone only: `Africa/Cairo`.
- Single Node.js monolith deployment for DirectAdmin.
- Express serves `/api/*`; React/Vite/MUI builds into `public/`.
- Fresh DB is allowed; seed only Super Admin by default unless the selected step requires otherwise.

## Business rules

- Installments/payment plans are forbidden.
- Excel/CSV imports are forbidden.
- Exports remain and must be professional.
- Payment states: fully deferred, partially paid, fully paid.
- Collection and supply/remittance are different.
- Finance must show: pending receivable, actual collected, supplied collected, unsupplied collected, return balance.
- Returns/refunds must be records, affect stock, outlet return balance, outlet limit, statements, and notifications.
- Partial shipping must be by invoice item quantities and must not exceed remaining unshipped quantities.
- Invoice actions must include pay, mark paid, supply, ship, return, export/print according to permissions.

- Inventory receipts / واردات الكتب are stock-only and must not affect finance, balances, payments, remittance, or outlet limits.
- Payment creation must allow selecting outlet first, then invoice, then amount/payment details, with receipt/proof upload for every payment operation including partial payments.
- Payment receipts must have review statuses and a review queue with preview/download/approve/reject permissions.
- Dashboard notification actions must be `معاينة` and `تجاهل`; do not use generic `حل المشكلة`.
- `معاينة` must route to the relevant section/entity, e.g. insufficient stock opens product/inventory context.
- Keep and improve old platform value; remove only explicitly cancelled features.

## Design rules

- Use professional Google Material UI style.
- Do not add `style={{...}}`.
- Do not add random `sx={{...}}`; move layout/design to CSS/component classes/theme.
- Do not add `!important`.
- Fix cascade/theme instead of fighting MUI libraries with overrides.
- Each important page/component should have its own CSS sibling.
- All form labels/fields must be RTL, spaced, full width, and not clipped.
- Entity side drawers must share one clean system with header/content/sticky footer.
- Side bar and topbar must be correct in RTL and must not require refresh after login.

## Scope rules

Allowed:
- Backend source code
- Frontend source code
- Database schema/migrations/seeds
- Scripts/tests
- Docs/agent pack tracking
- Package scripts/config needed for the selected step

Forbidden:
- Executing future steps early
- Creating new agent pack version folders/labels
- Reintroducing imports or installments
- Splitting production frontend/backend into separate deploys
- Putting DB/secrets inside `public/`
- Claiming verification without commands/results

## Verification before closing the step

Run what is relevant and available:

```bash
node -v
npm -v
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```

If a command fails, do not hide it. Record the failure and either fix it if in scope or mark the step `needs_review`/`blocked`.

## Status update rules

After execution:

1. Mark selected step as `done`, `blocked`, or `needs_review`.
2. If done, set the next pending step to `open`.
3. Update `current_step` if needed.
4. Add report path and timestamps in `status.json`.
5. Update `TASK_BOARD.md` if the status changed.
6. Write a report in `agent_pack/reports/` using `templates/STEP_COMPLETION_REPORT.md`.
7. Stop after one step.

## Completion response required

Return:

- Selected step
- Files changed
- Database changes
- Commands run and exit codes
- Verification results
- Deployment impact
- Risks/blocked items
- Next step
- Confirmation that only one step was executed
