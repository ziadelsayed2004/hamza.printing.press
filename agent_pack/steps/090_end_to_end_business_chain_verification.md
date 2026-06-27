# 090 — End To End Business Chain Verification

## Goal
Verify the whole connected chain works as one system.

## Required chain
Outlet type → outlet → book → outlet-type price → stock receipt → invoice → partial/full/no collection → supplied/not supplied → pending/actual balance → partial shipment → notification → export/report.

## Scope
- Create or simulate fresh data.
- Execute the whole flow through API and/or UI smoke tests.
- Verify all calculated fields.
- Verify permissions and audit logs.
- Verify no installment/import surfaces appear.

## Acceptance
- One complete happy path passes.
- One partial payment + unsupplied path passes.
- One partial shipment path passes.
- One stock/balance notification path passes.
