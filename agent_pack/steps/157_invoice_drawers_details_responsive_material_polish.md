# Step 157 — Invoice Drawers/Details Responsive Material UI Polish

## Goal
Make invoice dialogs, invoice details, action drawers, and generated/export UI visually consistent, responsive, and aligned with Google Material UI style.

## Scope
This is a frontend quality pass focused on Invoices and related operational drawers.

## Required frontend inspection
- `client/src/pages/Invoices.jsx`
- `client/src/pages/Invoices.css`
- `client/src/pages/Payments.jsx`
- `client/src/pages/Shipments.jsx`
- `client/src/pages/Exports.jsx`
- `client/src/components/EntityDrawer.*`
- `client/src/components/forms/*`
- `client/src/styles/*`
- `client/src/theme/*`

## Implementation requirements
1. Make invoice create/edit/detail flows use the same design language as polished Book/Outlet drawers.
2. Fix all field labels RTL alignment.
3. Fix cramped fields and broken label notches.
4. Ensure responsive behavior:
   - desktop: elegant multi-column layout
   - tablet: two columns where safe
   - mobile: single column with proper spacing
5. Avoid new inline styles and avoid `!important` abuse.
6. Use `EntityDrawer`, `FieldGrid`, `FormSection`, `FormActions` consistently.
7. Generated/export file UI cards should be polished and aligned.
8. Detail view must be readable with summary cards, item tables, payments, shipments, returns, and audit-style timeline where available.

## Tests
- Run style gate.
- Build frontend.
- Manually inspect form layout paths from code if browser not available.

## Verification
- `npm run style:gate`
- `npm run build`

## Acceptance
- Invoice drawer/details are no longer visually worse than Book/Outlet drawers.
- RTL alignment is consistent.
- Layout is responsive and readable across devices.
