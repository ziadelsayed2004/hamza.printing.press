# Step 151 — Post-Locked Ultra Deep Repo Audit + Scope Contract

## Goal
Perform an ultra-deep current-state audit before implementation, then update the project source-of-truth so Steps 152–158 execute against the real current repo, not outdated assumptions.

## Required reads
- `agent_pack/docs/OPEN_SCOPE_151_158_ULTRA_DEEP_PLAN.md`
- `agent_pack/docs/LATEST_REPO_LOCKED_SNAPSHOT.md`
- `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
- `agent_pack/docs/MANUAL_CHANGES_UNDERSTOOD.md`
- `server/modules/invoices/*`
- `server/modules/payments/*`
- `server/modules/shipments/*`
- `server/modules/returns/*`
- `server/modules/exports/*`
- `server/modules/users/*`
- `server/modules/roles/*`
- `server/db/migrations/*`
- `client/src/pages/Invoices.jsx`, `Payments.jsx`, `Shipments.jsx`, `Exports.jsx`, `Users.jsx`
- `client/src/components/EntityDrawer.*`
- `client/src/components/forms/*`
- `client/src/styles/*`

## Work
1. Produce a current-state implementation report at `agent_pack/docs/CURRENT_STATE_AUDIT_151_IMPLEMENTATION_BASELINE.md`.
2. Confirm what already exists and what is still missing for:
   - invoice action handoff to payments/shipping/returns
   - payment receipt upload/display/download
   - no receipt review UI
   - partial shipping lifecycle
   - full/partial returns recalculation
   - free/complimentary invoice quantities
   - export filters and courier sheets
   - custom roles creation/edit/archive
   - responsive Material UI drawer/details quality
3. Update the later step files only if the audit finds exact file paths or constraints that should be captured.
4. Do not implement feature code in this step except docs/tracking updates.

## Verification
- Run `npm run style:gate` if possible.
- Run `npm run build` if possible.
- Do not fail the step only because old known issues exist; record them precisely.

## Acceptance
- `CURRENT_STATE_AUDIT_151_IMPLEMENTATION_BASELINE.md` exists and is specific to the current repo.
- The step report names source files inspected.
- `status.json` marks Step 151 done and Step 152 open.
