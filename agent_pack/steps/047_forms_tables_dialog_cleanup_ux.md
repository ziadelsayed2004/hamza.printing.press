# 047 — Forms Tables Dialog Cleanup UX

## Status
open/pending until executed by the runner.

## Purpose
Reduce dialog-heavy flows. Convert major create/edit/detail flows to pages or drawers. Standardize DataGrid filters, empty states, loading states, validations, confirmations, and snackbars.

## Change-request context
The client approved a full fresh-start direction. Legacy database preservation is no longer required. The current UI screenshot was rejected because it still feels close to the old identity and lacks the required premium Material UI polish. The platform must be cleaner, lighter, more elegant, and simpler to deploy.

## Hard rules
- Execute this step only; do not execute later steps.
- Keep production as one Node.js app for DirectAdmin.
- Keep React build output inside `public/`.
- Do not put database, uploads, exports, backups, or secrets inside `public/`.
- No demo users except the single seeded super admin.
- No seeded books/outlets/invoices/payments/receipts/demo business data.
- Outlet types must be created by admin from inside the platform, not hardcoded as business records.
- Keep RBAC advanced and permission based.
- Use clear Arabic RTL UI copy and professional Material UI components.

## Required reads before implementation
- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/status.json`
- `agent_pack/docs/FRESH_RESET_AND_UI_REDESIGN_SCOPE.md`
- `agent_pack/docs/SERVER_FLAT_STRUCTURE_TARGET.md`
- `agent_pack/docs/DASHBOARD_VISUAL_STANDARD.md`
- `agent_pack/docs/RBAC_PERMISSION_MATRIX.md`
- `agent_pack/checklists/VERIFY_GATE.md`

## Implementation requirements
- Audit every page for excessive dialogs and weak UX.
- Convert major create/edit/detail workflows into pages or right-side drawers where appropriate.
- Keep dialogs only for confirmations, small warnings, and irreversible actions.
- Standardize form validation messages, required fields, submit/loading states, disabled states, and error handling.
- Standardize tables with search, filters, pagination, export actions, empty state, and row actions.
- Ensure the UI feels fast and smooth through skeleton loaders and optimistic/predictable feedback where safe.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Major flows are no longer dialog-heavy.
- Tables/forms share consistent UX patterns.

## Report
Write `agent_pack/reports/047_forms_tables_dialog_cleanup_ux_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
