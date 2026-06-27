# 042 — Flatten Server Structure No src

## Status
open/pending until executed by the runner.

## Purpose
Refactor backend from server/src/* to simpler server/* paths. Update app.js, scripts, package scripts, tests, imports, and docs. Keep one Node.js monolith deployment.

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
- Refactor backend paths from `server/src/...` to a simpler `server/...` structure.
- Target structure: `server/config`, `server/db`, `server/middleware`, `server/modules`, `server/utils`, `server/routes.js`.
- Update `app.js` imports.
- Update package scripts from `server/src/db/...` to `server/db/...`.
- Update all `require` paths in server modules and tests.
- Update agent docs and deployment docs to reflect the simpler path.
- Keep old path only as temporary compatibility if needed, but final code should not depend on `server/src`.
- Ensure tests and reset/migrate scripts still work.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- App runs without relying on `server/src` imports.
- package scripts point to simplified server paths.
- Tests/build pass or failures are documented with exact causes.
- Docs match the simplified layout.

## Report
Write `agent_pack/reports/042_flatten_server_structure_no_src_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
