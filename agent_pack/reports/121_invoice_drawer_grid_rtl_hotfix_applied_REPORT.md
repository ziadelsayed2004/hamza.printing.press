# Step 121 Report — Invoice Drawer/Grid/RTL Hotfix Applied

## Selected Step

121_invoice_drawer_grid_rtl_hotfix_applied

## Files Changed

- `client/src/components/EntityDrawer.css`
- `client/src/styles/forms.css`
- `client/src/styles/layout.css`
- `client/src/styles/variables.css`
- `client/src/theme/ThemeConfig.jsx`
- `client/src/App.jsx`
- `client/src/App.css`
- Multiple `client/src/pages/*.jsx` files: migrated old `inputProps` and `InputLabelProps` to `slotProps` where detected.
- `client/src/pages/Invoices.jsx`
- `scripts/style_quality_gate.js`
- `agent_pack/docs/FIELD_DRAWER_MUI_FINAL_AUDIT.md`
- `agent_pack/docs/FINAL_PAYMENT_SUPPLY_RETURN_SHIPPING_RULES.md`

## Changes Completed

- Restored responsive layout for old MUI Grid syntax using CSS compatibility selectors.
- Updated invoice operation drawers to use the unified entity drawer visual contract.
- Fixed the invoice creation form container by replacing inline layout style with CSS class.
- Added stronger RTL field/label/input/select/textarea alignment rules.
- Migrated detected deprecated `inputProps` / `InputLabelProps` usages to `slotProps`.
- Updated EntityDrawer widths/header/content/sticky footer styles.
- Updated style gate to allow `.ltr-value` technical alignment while rejecting wrong left alignment.

## Verification

- `npm run style:gate` — passed.
- `npm run build` — passed.
- `npm test` — blocked in this sandbox because `sqlite3` native binding could not compile/download Node headers in the offline environment.

## Next Step

122_full_drawer_component_parity_scan
