# Step 147: Payment Receipt Instant Approval, Redesigned Invoice Filters, Supply Cost Removal, and Full Returns Shortcut

## Objective

Polish the user flows and visual representations by:
1. Setting the payment receipt status to `approved` immediately when a payment receipt is uploaded, avoiding `pending_review` queue constraints entirely.
2. Removing unit cost/price configuration fields completely from the book supply receipts form and detailed view, making inventory strictly stock-only.
3. Aligning and grouping search filters in the Invoices management screen into three premium styled panels to avoid cluttered field wrapping.
4. Implementing a "Full Return" button in the returns drawer to automatically fill all remaining returnable quantities in one click.

## Mandatory Reads

- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/status.json`
- `agent_pack/TASK_BOARD.md`

## Non-Negotiable Rules

- Execute exactly this one step, then stop.
- Enforce clean layout margins and RTL friendliness.
- Validate that all tests pass.

## Required Verification

Run the test suite:

```bash
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```
