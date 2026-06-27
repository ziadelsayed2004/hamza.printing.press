# 062 — Frontend Style Inventory Line By Line

## Goal
Create a concrete line-by-line frontend style debt inventory before refactoring pages.

## Scope
- Scan all `client/src/**/*.jsx`.
- Record every:
  - `style={{`
  - `sx={{`
  - hardcoded color
  - hardcoded spacing
  - hardcoded Arabic text
  - left alignment
  - layout width that can cause overflow
- Produce `agent_pack/reports/062_frontend_style_inventory_line_by_line_REPORT.md`.

## Do not
- Do not fix everything in this step.
- Do not mark done until the inventory is factual.

## Acceptance
- Report includes file, line, issue type, and fix direction.
- The next steps have enough detail to clean every page/component.
