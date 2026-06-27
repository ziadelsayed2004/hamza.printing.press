# Finance, Notifications, Egypt Localization, and UI Fix Scope

## Current client-reported issues

- After login, sidebar/menu options do not appear until manual refresh.
- Sidebar placement/layout is wrong in RTL and the page grid does not feel professionally distributed.
- Dashboard visual style is not acceptable and still feels weak/old.
- Balance/financial summary from the old system is missing and must return in a better professional way.
- Notifications from the old system are missing and must return with modern Material UI styling.
- Currency must be Egyptian Pound.
- Displayed time must follow Egypt time.
- The system must feel connected end-to-end: outlet types, outlets, products, pricing, stock, invoices, payments, balances, notifications, reports.

## Non-negotiable design constraints

- RTL-first Arabic interface.
- Premium Material UI / Google-like design system.
- Light and dark modes.
- Clean app shell: right sidebar, topbar, content area, responsive drawer.
- No old identity/colors/visual leftovers.
- No scattered dialog-heavy UX; use pages/drawers/forms/tables with clear flows.
- Dashboard must communicate value immediately.
- DirectAdmin deployment remains simple: one Node app.

## Required connection rules

### Outlet type -> product price -> invoice

- Admin creates outlet types.
- Admin creates outlets and assigns outlet type.
- Admin creates product/book.
- Admin defines product price per outlet type.
- Invoice creation selects outlet.
- System resolves outlet type and product price automatically.
- Invoice line stores unit price snapshot.

### Invoice/payment -> finance balance

- Invoice creation affects receivables if unpaid/deferred/installment.
- Confirmed payment increases collected balance and reduces receivables.
- Payment reversal/correction updates finance ledger and invoice remaining amount.
- Manual deposit/withdrawal requires note and audit log.

### Inventory -> notifications

- Receipt increases stock via inventory ledger.
- Invoice decreases stock via inventory ledger.
- Stock below threshold/negative creates or updates notification.
- Stock recovery resolves notification.

### Outlet credit limit -> notifications

- Outlet has credit limit.
- Receivables for outlet are calculated from unpaid/partial/deferred/installment invoices.
- If receivables exceed credit limit, notification is created.
- If receivables return within limit, notification is resolved.

### Time/currency

- Money displays as `ج.م` / `EGP` consistently.
- Use Egypt timezone display: `Africa/Cairo`.
- Store timestamps consistently and display in Egypt timezone.
- Exports/PDF should use EGP and Egypt date/time labels.

## Verification goals

- Login -> dashboard -> sidebar appears immediately without refresh.
- Sidebar stays on correct RTL side in desktop and mobile.
- Appbar/content margins are correct with no overlap or wrong blank spaces.
- Light/dark mode works and persists.
- Finance summary works after creating invoice + payment.
- Notification appears for negative stock and credit limit exceeded.
- Notification resolves after fixing stock/credit situation.
- Reports and dashboard use same financial values.
- Build/test/lint pass or documented failures are tied to the selected step only.
