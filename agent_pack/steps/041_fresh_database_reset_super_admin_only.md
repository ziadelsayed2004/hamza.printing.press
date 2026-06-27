# 041 — Fresh Database Reset + Super Admin Only

## Status
open/pending until executed by the runner.

## Purpose
Hard reset SQLite for fresh production start. Seed permissions and a single super_admin account only; no demo data, no staff, no outlet types, no books, no outlets, no invoices.

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
- Update database reset/seed behavior so a reset deletes existing SQLite state and creates a clean schema.
- Seed the permission catalog required by the platform.
- Seed only one role: `super_admin` or a minimal required role that grants all permissions.
- Seed only one active user: the super admin.
- Read initial username/password from `.env` when available, with safe documented defaults only for local development.
- Remove/disable seeding of admin/staff/visitor/demo users.
- Remove/disable seeding of outlet types, books, authors, outlets, invoices, payments, receipts, or reports sample data.
- Update `.env.example`, README notes, and reset docs to state that first production start creates only the super admin.
- Ensure dashboard counts are zero-friendly and do not look broken on an empty database.

## Verification requirements
- Run relevant tests/build/lint commands available in the repo.
- Run database reset/migrate commands when this step touches database or paths.
- Verify `/api/health` and login path when practical.
- Verify the app still follows one Node.js deployment.
- Document commands and exit codes in the report.

## Done criteria
- `npm run db:reset` creates clean DB with only permissions + super admin role/user.
- No business demo records are present.
- Super admin can login.
- Docs mention fresh-start behavior and credentials source.

## Report
Write `agent_pack/reports/041_fresh_database_reset_super_admin_only_REPORT.md` using `agent_pack/templates/STEP_COMPLETION_REPORT.md`.
