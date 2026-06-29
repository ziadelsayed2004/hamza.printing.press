# Notifications Actions Policy — تجاهل / معاينة

## Final UI action rule

Dashboard/home notifications must have exactly these main actions:

- `معاينة`
- `تجاهل`

Do not show `حل المشكلة` as a generic action.

## Ignore behavior

`تجاهل` marks the notification as ignored/dismissed for the current user or globally according to the notification type. It must not silently change business data.

## Preview behavior

`معاينة` must route to the related module/entity with enough context to act manually.

Examples:

| Notification | Preview target |
|---|---|
| Insufficient stock for product | Product details / inventory movement / invoice builder context if available |
| Low stock | Product inventory page |
| Outlet limit exceeded | Outlet statement / outlet profile |
| Unreviewed receipt | Receipt review queue filtered to that receipt |
| Invoice overdue/unpaid | Invoice details/payment drawer |
| Partial shipment pending | Invoice shipping drawer/details |
| Return created | Return details/outlet statement |

## Insufficient stock example

Bad raw message:

`Insufficient stock for product "Book without prices". Available: 0, Requested: 1`

Required Arabic UI:

`المخزون غير كافٍ للكتاب "Book without prices" — المتاح: 0، المطلوب: 1.`

Actions:

- `معاينة`: opens product/inventory context and optionally highlights the invoice item that requested the stock.
- `تجاهل`: dismisses only this notification instance.

## Dedupe/severity

Notifications must avoid duplicates where possible and classify severity:

- danger: insufficient stock, limit exceeded
- warning: low stock, overdue receivable, unreviewed receipt
- info: shipment/return events
