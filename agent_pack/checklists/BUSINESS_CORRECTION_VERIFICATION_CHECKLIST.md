# Business Correction Verification Checklist

Use this checklist before closing steps 081–095.

## Forbidden features
- [ ] No installment/payment plan UI.
- [ ] No installment/payment plan active API.
- [ ] No import page.
- [ ] No `/api/imports` active route.
- [ ] No import permission visible.

## Finance
- [ ] Pending balance calculated from uncollected invoice amounts.
- [ ] Collected balance calculated from payments/collections.
- [ ] Supplied collected balance calculated from supplied collections.
- [ ] Unsupplied collected balance calculated from collected-not-supplied.
- [ ] Payment reversal uses ledger entry.
- [ ] Supply action uses permission and audit log.

## Invoice
- [ ] Outlet-first invoice creation.
- [ ] Product price resolved by outlet type.
- [ ] Price snapshot saved.
- [ ] Partial collection works.
- [ ] Full collection works.
- [ ] Collected payment can be supplied/not supplied.

## Shipping
- [ ] Partial shipment by invoice item quantity.
- [ ] Cannot over-ship.
- [ ] Shipping does not alter finance math.
- [ ] Invoice shipping status calculated correctly.

## Exports
- [ ] Arabic headers.
- [ ] EGP formatting.
- [ ] Egypt timezone.
- [ ] Filter metadata.
- [ ] Audit log.

## Style
- [ ] No new inline styles.
- [ ] No new `!important`.
- [ ] No new random `sx` debt.
- [ ] RTL alignment.
- [ ] Fields/labels are not cramped.
