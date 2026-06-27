# Test Plan

## Priority tests

1. Auth login/logout/me.
2. Disabled user cannot login.
3. RBAC denies missing permission.
4. Super admin bypass works.
5. Outlet type creation/update/disable.
6. Outlet creation with governorate/address/phone/type.
7. Product creation and price per outlet type.
8. Invoice price snapshot by outlet type.
9. Payment auto-calculation: cash/deferred/installments.
10. Inventory receipt increases stock.
11. Invoice decreases stock via ledger.
12. Partial shipment does not alter payment remaining.
13. Filters by book/governorate/outlet/author/status/date.
14. Excel export returns valid file.
15. React build passes.

## Manual QA

- Login as each role and check menu visibility.
- Attempt forbidden API action manually and confirm 403.
- Create product with 3 outlet prices.
- Create outlet with one type.
- Create invoice and verify selected price.
- Add partial payment and verify remaining.
- Create receipt and verify stock.
- Export invoices/report.