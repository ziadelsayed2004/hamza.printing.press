# Step 149: Finance Drawer Conversion, Exports Redesign, Input Widths Fix, Breadcrumbs translation, and Roles Translation

## Objective

Implement structural, localization, and role-based changes:

1. Convert the manual adjustment popup dialog in the Finance page to a modern slide-out `EntityDrawer` component.
2. Group the 9 CSV data export modules into 3 logical sectors (Financials & Sales, Inventory & Logistics, Core Data & Definitions) and style the page for a premium sectors-based look.
3. Establish permission boundaries in the database for the `assistant` (مساعد) and `visitor` (زائر) roles.
4. Set up dynamic `max-content` widths and appropriate padding for select inputs in RTL direction to prevent text clipping and overlapping with the dropdown arrow.
5. Add navigation path translation for `/finance` in the breadcrumbs component.
6. Translate roles and permissions names/descriptions to Arabic in the Users and Roles manager page.
7. Reorder Express userRoutes routing to prevent endpoint parameter collisions on `/roles` and `/audit-logs`.
8. Remove the Paper shadow wrapping wrapper from the Tabs component on the Inventory page.

## Required Verification

Run quality gates and test suites:

```bash
node scripts/style_quality_gate.js
node node_modules/jest/bin/jest.js server/modules/users/userRoutes.test.js
```
