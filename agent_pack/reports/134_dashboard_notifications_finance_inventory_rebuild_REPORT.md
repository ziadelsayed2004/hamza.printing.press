# Step Report: 134_dashboard_notifications_finance_inventory_rebuild

## 1. Selected Step & Status
- **Step ID**: 134
- **Slug**: `dashboard_notifications_finance_inventory_rebuild`
- **Title**: `Dashboard Notifications + Finance/Inventory Rebuild`
- **Status**: Completed (`done`)

## 2. Files Changed
- `server/modules/finance/financeService.js`:
  - Updated `getFinanceSummary` to count and expose `unreviewedCount` of receipts/payments pending review.
- `client/src/pages/Dashboard.jsx`:
  - Exposed `unreviewedCountVal` and `unreviewedAmountVal` from the summary context.
  - Swapped the generic "إجمالي الديون المتأخرة" (overdue debt) stat box for a dedicated "إيصالات قيد المراجعة" (receipts pending review) widget.
  - Appended `cleanUrl` mapping replacements for `/finance/ledger` (routes to `/finance`) and `/operations/shipments` (routes to `/shipments`).
- `client/src/pages/Notifications.jsx`:
  - Aligned preview navigation (`cleanUrl`) replacements with new routes.

## 3. Database Schema Changes
- None.

## 4. API Changes
- `getFinanceSummary` now outputs `unreviewedCount` and `unreviewed_count`.

## 5. UI Changes
- Home Dashboard:
  - Added a dedicated "إيصالات قيد المراجعة" (receipts pending review) widget to the Financial panel.
  - Clicking "معاينة" for shipments/ledger alerts now correctly redirects to the Shipments and Finance pages.

## 6. Business-Rule Verification
- Verified that dashboard alerts use the required `معاينة` and `تجاهل` buttons with correct paths.
- Verified that widgets summarize unreviewed receipts, stock warnings, returns, and shipments correctly.

## 7. Verification Executed
- Executed `npm run test` (171 assertions, 26 test suites). All tests passed with exit code 0.
- Executed `npm run style:gate` and `npm run lint`. Passed successfully.
- Executed `npm run build` to package assets. Compiled successfully.

## 8. Risks/Blockers
- None.

## 9. Next Step
- Step 135: `backend_cleanup_cancelled_terms_deadcode`
