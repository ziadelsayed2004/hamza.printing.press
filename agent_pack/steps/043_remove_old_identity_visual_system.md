# 043 — Remove Old Identity + Visual System

## Status
open/pending until executed by the runner.

## Purpose
Remove old warehouse/bookstore identity, legacy colors, and inconsistent branding from the React UI. Move app name/brand to configurable settings and create a clean neutral professional visual baseline.

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
- Remove old visual identity references from the UI header/sidebar/dashboard, including old warehouse/project brand text unless it is loaded from config.
- Introduce app identity through configurable constants/settings: app name, short name, company name, optional logo.
- Replace legacy color palette with neutral professional tokens aligned with Material UI.
- Remove cheap gradients, inconsistent card colors, weak borders, old sidebar styling, and mismatched icons.
- Create a clean premium baseline that works in both Arabic RTL and responsive screens.
- Do not hardcode client-specific branding in multiple files.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Old identity is removed from visible UI or moved to config.
- UI has a clean neutral professional baseline.
- No repeated hardcoded brand strings across pages.

## Report
Write `agent_pack/reports/043_remove_old_identity_visual_system_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
