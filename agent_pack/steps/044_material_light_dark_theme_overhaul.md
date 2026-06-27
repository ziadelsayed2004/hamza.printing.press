# 044 — Material Light/Dark Theme Overhaul

## Status
open/pending until executed by the runner.

## Purpose
Build a premium Material UI theme system with light/dark mode, RTL tokens, typography, spacing, elevations, form/table/card standards, and persistent mode toggle.

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
- Implement a full MUI theme system for light and dark modes.
- Add persistent theme mode toggle using localStorage and optional system preference detection.
- Define tokens for palette, typography, shadows, border radius, spacing, cards, tables, forms, buttons, chips, alerts, and layout surfaces.
- Ensure RTL is enabled and typography is readable in Arabic.
- Make all pages consume the theme consistently instead of page-level random styles.
- Update login, layout, sidebar, topbar, dashboard cards, DataGrids, forms, dialogs/drawers, and reports to use the unified theme.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Light/dark mode works and persists.
- Theme is applied globally.
- RTL and Arabic typography are clean.

## Report
Write `agent_pack/reports/044_material_light_dark_theme_overhaul_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
