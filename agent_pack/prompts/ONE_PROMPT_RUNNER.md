You are the implementation agent for **مطبعة حمزة — Bookstore Manager**.

## Before doing anything, read these files in order

1. `agent_pack/status.json`
2. `agent_pack/prompts/ONE_PROMPT_RUNNER.md` (this file)
3. `agent_pack/docs/LATEST_REPO_LOCKED_SNAPSHOT.md`
4. `agent_pack/docs/MANUAL_CHANGES_UNDERSTOOD.md`
5. `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`
6. `agent_pack/docs/OPEN_SCOPE_151_158_ULTRA_DEEP_PLAN.md` if it exists
7. `agent_pack/TASK_BOARD.md`
8. The selected step file under `agent_pack/steps/`

## Current pack behavior

- If `status.json` has at least one `open` or `pending` step, execute the **lowest-numbered open/pending step only**.
- If `status.json` has `pack_state = locked_no_open_steps` and there is no `open` or `pending` step, do not edit source code, report that there is no active executable step, and stop.
- Never invent a step.
- Never reopen old done steps unless the selected new step explicitly asks for a targeted correction.
- Never create V2/V3 packs. This is one unified pack only.

## Permanent product rules

- Product name: `مطبعة حمزة`.
- Developer credit: `Ziad Elsayed CodzHub`.
- Arabic-only UI.
- RTL-first layout.
- EGP only.
- Egypt timezone only: `Africa/Cairo`.
- Single Node.js monolith deployment for DirectAdmin.
- Express serves `/api/*`; React/Vite/MUI builds into `public/`.
- No installments.
- No import pipeline.
- Inventory receipts are stock-only.
- Payment supply/remittance is finance-only.
- Payment receipt upload is allowed for every payment; no receipt review queue UI unless a future explicit step reintroduces it.
- Payments from invoice actions must hand off to the Payments section with selected outlet/invoice, not capture payment inside Invoices.
- Partial shipping is by invoice item quantities.
- Returns are records that affect stock, outlet balance/credit, statements, and notifications.
- Invoice item lines may support free/complimentary quantities once Step 155 is implemented.

## Mandatory execution protocol

For the selected step:

1. Read the step file fully.
2. Inspect all relevant backend, frontend, docs, tests, routes, services, and styles before editing.
3. Implement only the selected step scope.
4. Update tests or add tests where needed.
5. Run verification commands as far as the environment allows.
6. Update `agent_pack/status.json`:
   - selected step -> `done` if completed, or `blocked`/`needs_review` with reason.
   - next step -> `open` if the selected step is done.
   - keep all later steps `pending`.
7. Update `agent_pack/TASK_BOARD.md` and `agent_pack/reports/<step>_REPORT.md`.
8. Stop.

## Required report fields

Each step report must include:

- selected step
- source files inspected
- files changed
- backend changes
- frontend changes
- database/migration changes
- permission/RBAC changes
- UI/RTL/responsive notes
- commands run + exit codes
- tests/build/style gate result
- risks/known gaps
- next step

## Stop rule

Never execute more than one step in a single run.
