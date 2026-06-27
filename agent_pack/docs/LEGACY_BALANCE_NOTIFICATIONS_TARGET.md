# Legacy Balance + Notifications Target

This document captures the legacy behavior that must be restored and upgraded in the modern Material UI system. The old app had important operational finance and alert behavior that must not be lost during the React/MUI rebuild.

## Legacy balance behavior to preserve conceptually

Old repo concepts:

- `balances` table contained:
  - `total_balance`: actual/paid collected balance.
  - `pending_balance`: pending/unpaid invoice balance.
  - `last_updated`.
- `total_balance_history` tracked deposits, withdrawals, and paid invoice changes.
- `pending_balance_history` tracked pending invoice movements.
- Invoice creation updated balances:
  - Paid invoices increased total balance.
  - Pending invoices increased pending balance.
- Invoice status changes moved value between total and pending.
- Invoice deletion reversed the previous balance impact.
- Manual deposit/withdrawal adjusted total balance and required a note.
- Store credit-limit checks used unpaid invoices excluding shipping cost.

## Modern target

Do NOT copy the old implementation directly. Rebuild it as a proper finance ledger:

- Add a finance module under `server/modules/finance`.
- Use EGP only.
- Store all money as integer minor units where practical (`amount_piasters`) or consistently rounded numeric EGP if the current schema is numeric. Pick one approach and apply consistently.
- Keep invoice totals, paid totals, remaining totals, receivables, and cash collected connected.
- Provide derived balances from source-of-truth records, and optionally maintain a ledger for auditable movements.

### Required balance definitions

- **Cash/Collected Balance**: confirmed paid money from invoice payments plus manual deposits minus withdrawals/reversals.
- **Receivables/Pending Balance**: invoice remaining amount for active unpaid/partially paid invoices invoices.
- **Overdue Balance**: due collections or invoices past due date.
- **Outlet Balance**: receivable amount grouped by outlet.
- **Governorate Balance**: receivable amount grouped by governorate.
- **Outlet Type Balance**: receivable amount grouped by outlet type.

### Required APIs

- `GET /api/finance/summary`
- `GET /api/finance/balances/history`
- `POST /api/finance/manual-adjustments`
- `GET /api/finance/outlets`
- `GET /api/finance/governorates`
- `GET /api/finance/outlet-types`

### Required UI

- Dashboard finance cards:
  - إجمالي الفواتير
  - المحصل
  - المتبقي / المديونيات
  - المتأخر
  - رصيد نقدي/محصل
- Finance page:
  - balance summary
  - total/receivable history
  - manual deposit/withdrawal/adjustment with required reason
  - filters by date/outlet/governorate/payment status

## Legacy notification behavior to preserve conceptually

Old repo concepts:

- Book notifications:
  - Created when book stock went below zero.
  - Removed when stock became positive again.
- Store notifications:
  - Created when unpaid invoices total exceeded store limit.
  - Removed when within limit again.
- Admin/staff dashboards showed book and store notifications.

## Modern target

Create one professional notification engine:

### Notification categories

- `stock_negative`
- `stock_low`
- `outlet_credit_limit_exceeded`
- `invoice_overdue`
- `collection_unsupplied`
- `payment_received`
- `shipment_partial`
- `shipment_delayed`
- `system`

### Notification fields

- `id`
- `category`
- `severity`: `info`, `warning`, `critical`, `success`
- `title`
- `message`
- `source_type`
- `source_id`
- `dedupe_key`
- `status`: `unread`, `read`, `resolved`
- `action_url`
- `created_at`
- `updated_at`
- `resolved_at`

### Required behavior

- Deduplicate active alerts by `dedupe_key`.
- Do not spam duplicate notifications on every page refresh.
- Resolve stock alert automatically when stock returns above threshold.
- Resolve credit-limit alert automatically when receivables return under limit.
- Notifications should be role-aware.
- Dashboard should show high-priority active notifications.
- Topbar should show unread count.

## UI expectation

Use new premium Material UI style, not legacy tables/popups.

- Notification bell in topbar.
- Notification drawer or popover.
- Dedicated Notifications page/center if needed.
- Dashboard alert cards.
- Badges by severity.
- Filters: all/unread/resolved, category, severity.
- Action link opens product/outlet/invoice/payment page.
