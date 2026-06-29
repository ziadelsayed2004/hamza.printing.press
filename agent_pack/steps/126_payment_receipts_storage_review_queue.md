# Step 126: Payment Receipts Storage + Review Queue

## Objective

Implement receipt storage, metadata, review statuses, permissions, and a review screen. Receipts must be reviewable, previewable, downloadable/exportable, approvable/rejectable with notes, and linked to payment, outlet, invoice, user, and timestamp.

## Mandatory Reads

Read these files before editing anything for this step:

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/status.json`
- `agent_pack/TASK_BOARD.md`
- `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
- `agent_pack/docs/INVENTORY_RECEIPTS_STOCK_ONLY_POLICY.md`
- `agent_pack/docs/PAYMENT_RECEIPTS_REVIEW_POLICY.md`
- `agent_pack/docs/NOTIFICATIONS_ACTIONS_PREVIEW_IGNORE_POLICY.md`
- `agent_pack/docs/RETURNS_PARTIAL_SHIPPING_PAYMENT_FLOW_FINAL.md`
- `agent_pack/docs/FINAL_MATERIAL_RTL_DESIGN_SYSTEM.md`
- `agent_pack/checklists/FINANCE_SHIPPING_RETURNS_QA_CHECKLIST.md`
- `agent_pack/checklists/VISUAL_RTL_MATERIAL_QA_CHECKLIST.md`
- `agent_pack/checklists/VERIFY_GATE.md`

## Non-Negotiable Rules

- Execute exactly this one step, then stop.
- Do not create versioned agent packs or V2/V3 folders/labels.
- Do not reintroduce installments/payment plans.
- Do not reintroduce Excel/CSV imports.
- Exports stay professional and Arabic.
- `واردات الكتب` / `استلام كتب` / inventory receipts are stock-only. They must not affect financial balances, paid amounts, collected amounts, remittance, or outlet limits.
- Payment/collection operations are separate from inventory receipts.
- Every payment operation can have a receipt/proof attachment, including partial payments.
- Payment flow must allow selecting outlet first, then invoice, then amount/payment details/receipt.
- Notifications must use `تجاهل` and `معاينة`, not `حل المشكلة`.
- Preview must route to the related entity/module, not a dead/general action.
- Partial shipping must be by invoice item quantities and cannot exceed remaining shippable quantity.
- Returns must affect stock, outlet return balance/credit, outlet limit/statement, notifications, and audit logs.
- Preserve and enhance old platform value; remove only explicitly cancelled/dead features.
- UI is Arabic-only, RTL-first, EGP-only, Egypt timezone `Africa/Cairo`.
- Keep single Node monolith deployment for DirectAdmin.
- No inline `style={{...}}`, no random heavy `sx`, no new `!important`.

## Expected Implementation Notes

- Inspect the current repo first; do not assume the old docs are correct if the code differs.
- Update backend and frontend together when the selected step touches business logic.
- Update Arabic copy in the unified locale/source of truth.
- Update tests/smoke checks where relevant.
- Update `agent_pack/status.json`, `agent_pack/TASK_BOARD.md`, and write a report in `agent_pack/reports/`.

## Required Verification

Run the relevant subset and record exact commands and exit codes:

```bash
node -v
npm -v
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```

If a command is unavailable or fails because of environment constraints, document the exact reason and do not claim it passed.

## Completion Report Must Include

- Selected step and status.
- Files changed.
- Database/schema changes.
- API changes.
- Frontend/UI changes.
- Business-rule verification.
- Commands run with exit codes.
- Risks or blocked items.
- Next step.
