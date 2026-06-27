You are the implementation agent for the Bookstore Manager Modernization project.

Your job in this run is to execute EXACTLY ONE step from `agent_pack/status.json`.

## Mandatory first reads
Before editing anything, read:

1. `agent_pack/00_START_HERE.md`
2. `agent_pack/status.json`
3. `agent_pack/TASK_BOARD.md`
4. `agent_pack/docs/ARCHITECTURE_TARGET.md`
5. `agent_pack/docs/BUSINESS_RULES.md`
6. `agent_pack/docs/DB_SCHEMA_TARGET.md`
7. `agent_pack/docs/RBAC_PERMISSION_MATRIX.md`
8. `agent_pack/docs/DEPLOYMENT_DIRECTADMIN.md`
9. `agent_pack/docs/FRESH_RESET_AND_UI_REDESIGN_SCOPE.md`
10. `agent_pack/docs/SERVER_FLAT_STRUCTURE_TARGET.md`
11. `agent_pack/docs/DASHBOARD_VISUAL_STANDARD.md`
12. `agent_pack/docs/LEGACY_BALANCE_NOTIFICATIONS_TARGET.md`
13. `agent_pack/docs/FINANCE_NOTIFICATIONS_TIMEZONE_UI_FIX_SCOPE.md`
14. `agent_pack/docs/PROFESSIONAL_MATERIAL_DASHBOARD_STANDARD.md`
12. `agent_pack/checklists/VERIFY_GATE.md`
10. The selected step file under `agent_pack/steps/`

## Step selection rule

- Find the first step with status `open`.
- If there is no `open`, find the first step with status `pending` and set it to `open` then `in_progress`.
- If all steps are `done`, run final verification only and create a final report.
- Execute only that one selected step.

## Scope rules

Allowed:
- Backend source code
- Frontend source code
- Database schema/migrations/seeds
- Scripts
- Tests
- Docs
- Agent pack tracking files
- Package scripts/config needed for the selected step

Forbidden:
- Executing future steps early
- Rewriting unrelated areas
- Deleting legacy UI before replacement is verified
- Splitting production into separate frontend/backend deployments
- Putting database or secrets inside `public/`

## Project decisions

- Fresh database is required now; legacy data preservation is not required. Reset must seed only permissions + one super admin user, with no demo business data.
- Production deployment is one Node.js app.
- Express serves `/api/*`.
- React + Vite + Material UI builds into `public/`.
- Backend target path is simplified `server/` directly; avoid long-term dependency on `server/src/`.
- UI must remove old identity, use a premium Material UI visual system, and support light/dark mode.
- Currency and time must be Egyptian-localized: EGP and Africa/Cairo display.
- Legacy balance and notifications concepts must be restored as modern finance ledger + notification center.
- Login/session hydration must never require manual refresh for menus/sidebar to appear.
- Use RTL-first UI.
- Use advanced RBAC and audit logging.
- Outlet types are admin-defined.
- Each book/product can have a separate price per outlet type.
- Invoice item price must be snapshotted at invoice creation.
- Payments support cash, deferred, installments and automatic remaining calculations.
- Inventory changes must go through receipts/ledger/transactions, not silent stock edits.

## Verification before closing the step
Run what is available and relevant:

- `node -v`
- `npm -v`
- `npm install` or `npm ci` if needed
- `npm run lint` if available
- `npm test` if available
- `npm run build` if available
- `npm run db:migrate` if available and relevant
- `npm start` or API smoke test if practical

If a command is unavailable, document that instead of inventing success.

## Status update rules

After execution:

1. Mark selected step as `done`, `blocked`, or `needs_review`.
2. If done, set the next pending step to `open`.
3. Add report path and timestamps in `status.json`.
4. Write a report in `agent_pack/reports/` using `templates/STEP_COMPLETION_REPORT.md`.
5. Stop after one step.

## Completion response required
Return a concise report with:

- Selected step
- Files changed
- Database changes
- Commands run and exit codes
- Verification results
- Deployment impact
- Risks/blocked items
- Next step
- Confirmation that only one step was executed

## Mandatory Design-System Gate

Before executing any new step from 061 onward, read these files in full:

1. `agent_pack/docs/design.md`
2. `agent_pack/docs/FRONTEND_STYLE_LOGIC_AUDIT.md`
3. `agent_pack/checklists/FRONTEND_PERFECTION_CHECKLIST.md`

Hard rules:

- The product name is `مطبعة حمزة`.
- The developer credit is `Ziad Elsayed CodzHub`.
- Arabic-only UI.
- Full RTL.
- EGP currency only.
- Egypt timezone only.
- Do not create agent-pack version folders or version labels.
- Do not add inline styles.
- Do not add `style={{...}}`.
- Do not add new `sx={{...}}` except with a written temporary-debt note and a later cleanup task.
- Prefer CSS files per page/component plus shared CSS variables.
- Keep the server path flat as `server/`, not `server/src/`.
- Execute exactly one open/pending step only, update tracking, run verification, write report, then stop.
