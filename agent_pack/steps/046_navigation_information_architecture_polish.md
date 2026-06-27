# 046 — Navigation Information Architecture Polish

## Status
open/pending until executed by the runner.

## Purpose
Rebuild sidebar/topbar navigation into clear grouped sections for operations/catalog/finance/inventory/reports/admin with role-aware visibility and mobile usability.

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
- Rebuild sidebar navigation into grouped sections:
  - Overview
  - Catalog: books, authors, outlet types, product prices
  - Operations: outlets, invoices, shipments
  - Finance: payments, installments, balances
  - Inventory: receipts, ledger, stock alerts
  - Reports & Exports
  - Administration: users, roles, audit, settings
- Make menu items role/permission aware.
- Add compact/collapsed sidebar behavior and mobile drawer.
- Make active route state clear.
- Keep logout/account actions in a polished topbar/account menu.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Navigation is grouped, permission-aware, responsive, and polished.

## Report
Write `agent_pack/reports/046_navigation_information_architecture_polish_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
