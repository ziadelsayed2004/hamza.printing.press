# Step 146: User Form Dropdowns, Placeholder Min-Widths, Layout Polish, & Dummy Data Purge

## Objective

Polish layout elements across the Bookstore Manager Modernized system, fix Select dropdown collapsing, enforce placeholder min-widths, flat/sharp border-radii on drawers/dialogs, remove gaps, make the Data Export page premium, and confirm full dummy data removal.

## Mandatory Reads

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/status.json`
- `agent_pack/TASK_BOARD.md`
- `agent_pack/docs/FINAL_BUSINESS_RULES_CURRENT.md`

## Non-Negotiable Rules

- Execute exactly this one step, then stop.
- Enforce the flat/sharp border-radius theme on AppBars, Drawers, and Dialogs.
- Do not keep any dummy/mock entries in the active codebase or seeds. Seeding must strictly populate Super Admin account, roles, standard permissions, and standard outlet types only.
- Fix all multiple-select dropdown height collapses by configuring a minimum height.
- Set minimum width for all text search fields to prevent placeholder truncation.
- Polish the Data Export page layout.

## Required Verification

Run the test suite, linting, style gate, and build checks:

```bash
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```
