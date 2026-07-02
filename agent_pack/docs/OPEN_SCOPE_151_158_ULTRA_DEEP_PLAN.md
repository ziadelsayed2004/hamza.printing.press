# Open Scope 151–158 — Ultra Deep Planning & Implementation Contract

**Project:** مطبعة حمزة — Bookstore Manager  
**Developer:** Ziad Elsayed CodzHub  
**Pack mode:** Unified pack only — no V2/V3, no duplicate packs.  
**Opened after:** Locked Step 150.  
**Current objective:** Open a controlled 8-step implementation phase that fixes invoice actions, payment receipts, shipping, returns, free invoice items, exports, responsive Material UI polishing, and advanced custom role management.

---

## 1. Current repo understanding from the latest uploaded build

The current repo is already a modernized single Node.js monolith:

- `app.js` runs Express.
- Backend modules live directly under `server/modules/*`.
- React/Vite/MUI client lives under `client/` and builds into `public/`.
- UI is Arabic-only and RTL-first.
- Currency is EGP only.
- Timezone is Egypt / `Africa/Cairo`.
- No installments.
- No import pipeline in the product direction.
- Inventory receipts are stock-only.
- Financial supply/remittance is finance-only and belongs to payment collection.

### Current backend capabilities observed

- `invoices`: list/filter/create/update/details/cancel/PDF and item-level invoice logic.
- `payments`: record payments, supply/reverse supply, metrics, receipt file metadata/download, old review endpoints still exist.
- `shipments`: create shipments by invoice item quantities and update shipment status.
- `returns`: create full/partial returns by invoice item quantities and update stock/finance.
- `exports`: CSV exports exist for products, prices, authors, outlets, invoices, payments, inventory, returns, shipments, and reports.
- `roles/users`: roles and permissions exist; role permission matrix exists, but full custom role CRUD UX/API needs to be elevated.

### Current frontend capabilities observed

- Pages exist for Dashboard, Invoices, Payments, Shipments, Finance, Inventory, Exports, Users/Roles, etc.
- `EntityDrawer`, `FieldGrid`, `FormSection`, `FormActions` already exist and should be reused.
- Invoice page contains local pay/mark paid/return/shipping-related states, but the new direction requires payment action to hand off to Payments page, not capture payment inside Invoices.
- Payments page supports route/query deep linking and receipt upload work, but it needs to become the only place where payment entry and receipt upload happen.
- Shipments page supports deep linking from invoices via `?invoiceId=...&action=create` and item quantity loading, but it needs a complete shipped/delivered workflow polish.
- Exports page and backend are CSV-oriented; new direction requires professional filtered Excel sheets, including courier delivery sheets.

---

## 2. New business rules to preserve

### Payment actions

- From the invoice list/details, the user must be able to choose an invoice and press a payment action.
- This action must **not** create a payment inside the invoice page.
- It must navigate to the Payments section with outlet and invoice preselected.
- The payment drawer/form in Payments must contain the full payment details and optional receipt upload.
- Receipt upload is available for every payment, including partial payments.
- Receipts are uploaded only; there is no receipt review queue workflow in the UI.

### Payment states

The displayed payment states remain exactly:

1. مؤجل كلياً / غير مدفوع.
2. مدفوع جزئياً.
3. مدفوع كلياً.

No installments and no payment plans.

### Supply/remittance

- Payment can be `supplied` or `not_supplied`.
- `supplied` means money reached treasury/main office.
- This is separate from book inventory receipts.

### Shipping

- Shipping is by invoice item quantity.
- Invoice actions must allow going to the shipping workflow with the invoice selected.
- The shipping workflow must support item selection, partial quantities, and status movement such as created/ready/shipped/delivered where supported by the existing schema.
- Shipping does not change finance.

### Free invoice items / complimentary quantity

- A line in an invoice may include free quantity for the same book.
- Example: quantity 10, free quantity 2, billable quantity 8.
- Stock must decrease by the full physical quantity 10.
- Invoice totals must charge only billable quantity 8.
- The UI must show free quantity clearly per line.
- Exports/PDF/details must expose total quantity, free quantity, billable quantity, unit price, and line total.

### Returns

- Return can be full invoice or partial items.
- Return must recalculate balances and outlet statement correctly.
- Return must increase stock for returned physical quantities.
- Return credit must not exceed billable value remaining for that item.
- Returns must be visible in invoices, finance, outlet statement, notifications, and exports.

### Exports

- Export must be filter-first.
- User can filter before export.
- Export must cover all important detail, not just summary rows.
- Courier/shipping sheet must include invoice number, outlet/customer, governorate, detailed address, phone, shipment status, item quantities, notes, and delivery-relevant data.
- Exports should be professional Excel workbooks where possible, not just raw CSV.

### Roles and permissions

- The system must support creating custom roles, not only selecting existing roles.
- Permissions must cover all important operations:
  - invoice view/create/update/cancel/pay/ship/return/export
  - payments view/create/reverse/supply/receipt/download
  - shipments view/create/update/deliver/export
  - returns view/create/export
  - inventory view/receipts/adjustments/export
  - products, authors, outlets, outlet types
  - users, roles, permissions
  - reports and exports

---

## 3. Implementation phase map

| Step | Purpose |
|---|---|
| 151 | Re-audit current repo and write source-of-truth implementation report. |
| 152 | Invoice actions hand off to Payments/Shipping/Returns correctly. |
| 153 | Payments page becomes the single payment + receipt upload source; no review UI. |
| 154 | Shipping workflow supports item quantities and shipped/delivered lifecycle polish. |
| 155 | Free item quantities + robust full/partial return recalculation. |
| 156 | Professional filtered Excel export center including courier sheets. |
| 157 | Material UI responsive invoice/dialog/details polish across desktop/tablet/mobile. |
| 158 | Custom role creation and advanced permissions management. |

---

## 4. Mandatory verification across all steps

Every implementation step must run the strongest possible subset of:

```bash
npm run style:gate
npm run build
npm test
npm run smoke
npm run test:e2e
```

If any command cannot run because of environment limitations, the report must say exactly why and include what was validated manually from source.

---

## 5. Non-negotiable stop rule

Every agent run executes exactly one step, writes exactly one step report, updates `status.json`, then stops.
