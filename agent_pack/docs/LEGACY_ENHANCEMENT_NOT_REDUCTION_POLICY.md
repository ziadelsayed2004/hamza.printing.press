# Legacy Enhancement, Not Reduction Policy

The modernization must improve the old platform, not make it smaller or weaker.

## Keep from old system if present
- balances/financial tracking.
- notifications/alerts.
- inventory/stock warnings.
- invoice workflows.
- shipment status tracking.
- exports.
- user roles/visibility.
- operational dashboard value.

## Remove only what is explicitly unnecessary
- Excel/CSV import is removed by business decision.
- Installments/payment plans are removed by business decision.
- old visual identity and weak styles are removed.
- duplicated legacy HTML/SweetAlert UI is removed only after MUI equivalent works.

## Upgrade principles
Every replacement must be better than old behavior:

- clearer UI.
- stronger permissions.
- audit logs.
- better calculations.
- better reports.
- RTL-first design.
- EGP and Egypt timezone.
- no hidden disconnected logic.

## Required cross-module connection
The final system must connect:

Outlet type → outlet → book price → invoice item snapshot → inventory movement → collection/payment → supply/remittance → balance → notification → export/report.
