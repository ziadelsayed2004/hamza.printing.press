# 087 — CSS Cascade No Important Refactor

## Goal
Stop using repeated `!important` and random override hacks; fix the style cascade properly.

## Scope
- Read `agent_pack/docs/CSS_CASCADE_NO_IMPORTANT_POLICY.md`.
- Count `!important`, `style={{`, and `sx={{` before changes.
- Identify why MUI/library styles are conflicting.
- Move stable styling into theme tokens, classes, or scoped CSS.
- Remove unnecessary `!important` gradually.
- Do not break layout while removing overrides.

## Acceptance
- Counts do not increase.
- At least the highest-impact pages/components are cleaned.
- Any remaining `!important` has a reason and target cleanup note.
- Build passes.
