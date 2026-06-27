# 061 — Unified Design System Contract

## Goal
Convert `agent_pack/docs/design.md` into the active design contract for the repo and prepare the frontend structure needed to apply it.

## Required reads
- `agent_pack/docs/design.md`
- `agent_pack/docs/FRONTEND_STYLE_LOGIC_AUDIT.md`
- `agent_pack/checklists/FRONTEND_PERFECTION_CHECKLIST.md`
- `client/src/theme/ThemeConfig.jsx`
- `client/src/index.css`
- `client/src/App.css`

## Scope
- Create `client/src/styles/` if missing.
- Add shared CSS files:
  - `variables.css`
  - `reset.css`
  - `rtl.css`
  - `layout.css`
  - `forms.css`
  - `tables.css`
  - `drawers.css`
  - `dialogs.css`
  - `material-overrides.css`
- Import these shared styles once from the app entry.
- Ensure app name is `مطبعة حمزة`.
- Ensure developer reference is `Ziad Elsayed CodzHub` in docs/config only where appropriate.
- Do not redesign every page in this step.

## Acceptance
- Shared style foundation exists.
- No old identity text remains in app config.
- RTL global rules are active.
- Report current inline style/sx count.
- Run `npm test` and `npm run build` after dependencies are installed.
