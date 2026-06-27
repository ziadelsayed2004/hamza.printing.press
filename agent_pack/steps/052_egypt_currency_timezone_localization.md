# 052 — Egypt Currency + Timezone Localization

## Objective
Standardize money as Egyptian Pound and displayed dates/times as Egypt time across backend responses, frontend UI, exports, reports, and PDFs where practical.

## Required reads
- `agent_pack/docs/FINANCE_NOTIFICATIONS_TIMEZONE_UI_FIX_SCOPE.md`
- `server/config/index.js`
- `server/utils/` files
- `client/src/services/apiClient.js`
- pages that render money/dates

## Tasks
1. Add shared backend constants/helpers:
   - currency: `EGP`
   - timezone: `Africa/Cairo`
   - formatting helpers if needed
2. Add shared frontend helpers:
   - `formatCurrencyEGP(value)`
   - `formatEgyptDateTime(value)`
   - `formatEgyptDate(value)`
3. Replace scattered `.toFixed(2)` and raw date rendering in main pages with helpers.
4. Ensure invoices, payments, reports, dashboard, exports/PDF labels use EGP / ج.م.
5. Avoid changing actual business amounts beyond formatting unless needed for consistency.

## Verification
- Money appears consistently as EGP/ج.م.
- Dates display in Egypt time.
- No broken render on null/undefined date or amount.
- Build/tests pass.

## Report
Write `agent_pack/reports/052_egypt_currency_timezone_localization_REPORT.md`.
