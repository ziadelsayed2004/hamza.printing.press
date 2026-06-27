# 083 — Invoice Builder Owned Dynamic Workflow

## Goal
Rebuild invoice creation into a professional owned workflow connected to outlet type pricing, inventory, collection, supply, and validation.

## Scope
- Read `agent_pack/docs/INVOICE_CREATION_PARTIAL_SHIPPING_RULES.md`.
- Make invoice creation outlet-first.
- Show outlet type, governorate, phone, address, balance summary, and credit status.
- Product picker resolves price by outlet type.
- Product rows show stock and available quantity.
- Totals update live.
- Collection section supports no/partial/full collection only.
- Collected amount can be supplied/not supplied.
- Validate all amounts and quantities.
- Use page/drawer design with clean RTL forms and no cramped fields.

## Acceptance
- User can create invoice without touching raw IDs.
- Prices snapshot correctly.
- Partial/full/no collection works.
- Supplied/not supplied saved correctly.
- No installment UI appears.
