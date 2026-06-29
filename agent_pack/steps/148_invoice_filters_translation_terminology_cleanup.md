# Step 148: Invoice Filters Layout Restore, Stock Error Translation, Supply Alert MUI Styling, and Terminology Simplification

## Objective
Polish the visual layout and user experience:
1. Restore the advanced filter panel in the Invoices screen back to a single flat container, and resize fields (`xs={12} sm={4} md={3}`) to avoid clipping.
2. Translate backend stock validation error messages to Arabic.
3. Replace browser native `window.confirm` for payments treasury supply with a custom styled MUI Dialog modal.
4. Add payment receipt view triggers directly to the payments table inside the invoice details drawer.
5. Simplify payment and shipping status terminology across the interface.
6. Completely remove the payments receipt review queue tab and review views.

## Required Verification
Run quality gates and test suites:
```bash
npm run style:gate
npm run lint
npm test
npm run build
npm run smoke
```
