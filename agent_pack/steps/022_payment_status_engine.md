# Step 022: Payment Status Engine

## Goal
Build calculation engine for paid_amount, remaining_amount, payment_status, overdue installments, reversal/correction rules, and audit entries.

## Context
This project is being modernized from a simple Node/Express + static HTML/Vanilla JS system into a professional single-deployment platform with Express APIs and a React/Vite/Material UI dashboard.

Production must remain one Node.js app. The frontend build must be served by Express from `public/`, and API routes must remain under `/api/*`.

## Tasks

1. Read the mandatory docs listed in `agent_pack/prompts/ONE_PROMPT_RUNNER.md`.
2. Inspect the current repository before editing.
3. Implement only the scope of this step.
4. Keep code organized by module.
5. Add or update tests/checks if this step affects behavior.
6. Update docs when this step changes architecture, deployment, database, permissions, or business behavior.
7. Update `agent_pack/status.json`.
8. Write a report in `agent_pack/reports/022_payment_status_engine_REPORT.md`.

## Acceptance criteria

- The step objective is implemented or clearly marked blocked with reasons.
- No future steps are executed early.
- Deployment strategy remains single Node app.
- No secrets or database files are placed under `public/`.
- Verification commands are run when available.
- Step report documents all files changed and any database/API/UI impact.

## Verification hints

- Use `npm run build` if frontend or shared build config changed.
- Use `npm test` if business logic/API changed and tests exist.
- Use `npm run db:migrate` if schema changed.
- Use `/api/health` smoke test if server changed.

## Stop rule
Stop immediately after this one step and reporting are complete.