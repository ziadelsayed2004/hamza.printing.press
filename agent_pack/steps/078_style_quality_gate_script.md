# 078 — Style Quality Gate Script

## Goal
Add automated style/design checks to prevent regressions.

## Scope
- Add script `scripts/style_quality_gate.js`.
- It checks:
  - `style={{`
  - heavy `sx={{`
  - missing CSS file for page/component
  - hardcoded old identity
  - hardcoded currency other than EGP
  - direct ISO date display patterns
  - `text-align:left` outside allowed CSS
- Add npm script:
  - `npm run style:gate`

## Acceptance
- Gate fails on violations.
- Gate prints file and line.
- Agent must run it in future verification.
