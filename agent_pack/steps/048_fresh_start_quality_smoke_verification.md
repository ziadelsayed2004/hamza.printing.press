# 048 — Fresh Start Quality Smoke Verification

## Status
open/pending until executed by the runner.

## Purpose
Run full fresh-start verification: db reset, super-admin login, CRUD smoke paths, light/dark toggle, build, tests, lint, API health, and DirectAdmin deploy readiness.

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
- Run a complete fresh-start smoke test after the reset/UI/path updates.
- Verify database reset creates only super admin and no business records.
- Verify login/logout/me/change password.
- Verify admin can create roles/users from inside the platform.
- Verify admin can create outlet types then outlets then products and prices by outlet type.
- Verify invoice creation uses selected outlet type price snapshot.
- Verify payments update paid/remaining.
- Verify light/dark mode, sidebar, dashboard, and responsive screens.
- Run lint/tests/build/smoke where available and fix small issues inside this step.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- Fresh-start smoke test report proves the core flow works from zero data.

## Report
Write `agent_pack/reports/048_fresh_start_quality_smoke_verification_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
