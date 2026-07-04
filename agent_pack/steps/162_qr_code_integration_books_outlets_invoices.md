# Step 162 — QR Code Integration for Books, Outlets, and Invoices

## Goal
Integrate visible QR codes for books, outlets, and invoices that, when scanned, trigger a quick action redirecting the user to the specific entity details in the app.

## Business rules & requirements
1. **Dynamic Generation:**
   - Render QR code images dynamically on the client side using a lightweight, public, standard API (`https://api.qrserver.com/v1/create-qr-code/`).
2. **Redirect & Search actions:**
   - Encode the target URL pointing back to the application domain path:
     - Books: `/products?search={code}`
     - Outlets: `/outlets?search={code}`
     - Invoices: `/invoices?search={invoice_number}`
   - Scanning these QR codes automatically filters and focuses the quick action on the specific item.
3. **UI Placements:**
   - Books: Displayed in the details drawer of the product.
   - Outlets: Displayed in a modal dialog via a "View QR Code" action button in the actions column.
   - Invoices: Displayed as a dedicated 5th KPI column card inside the details drawer.

## Verification
- Verified image rendering and resolution on desktop and mobile viewports.
- Tested redirect URL parameters.
