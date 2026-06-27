# 063 — CSS Extraction No Inline Styles

## Goal
Remove inline CSS and move styles into structured CSS files.

## Scope
- Start with shared components and layout:
  - `MainLayout.jsx`
  - `Breadcrumbs.jsx`
  - `EmptyState.jsx`
  - `LoadingState.jsx`
  - `ErrorBoundary.jsx`
- Create CSS files beside each component.
- Replace `style={{...}}` with className.
- Replace layout-heavy `sx={{...}}` with className.
- Keep only semantic MUI props.

## Acceptance
- No `style={{` in shared components/layout.
- New CSS files are imported.
- Layout still works.
- RTL remains correct.
