# Step 150: Invoice Filters Grid Rearrangement, Customer Statement Full Width, Product/Invoice ID Dynamic Widths, and Date Notch Behavior Fix

## Objective
Rearrange the invoices filter grid, ensure date inputs notches behave correctly on focus, make customer statement selector full-width, and optimize the dynamic widths of text inputs.

## Requirements
1. **Invoice Filter Grid Rearrangement**: Group and position the 13 invoice filter inputs logically into rows inside `Invoices.jsx`.
2. **Date Notch Behavior Fix**:
   - Set `InputLabelProps={{ shrink: true }}` and `InputProps={{ notched: true }}` on all Date fields.
   - Set solid background and padding overrides in `rtl.css` for date fields so they create a clean visual notch cutout that transitions natively on focus.
3. **Customer Statement Selector Full Width**: Remove `field-fit` class overrides and add `fullWidth` attribute to the Outlet select dropdown under the "كشف حساب عميل" tab of `Finance.jsx`.
4. **Dynamic Input Widths via standard HTML**:
   - Replace React inline style calculations with HTML native `size` attributes and `className="field-fit"` on search, min/max remaining, product, and invoice ID filters.
   - Use `size = text.length + 8` to account for start/end adornments, dropdown arrows, clear buttons, and input paddings to completely prevent truncation and clipping.
   - Ensure these rules pass the `style_quality_gate.js` successfully (no inline styles or raw `!important` counts).

## Verification Plan
1. Run `node scripts/style_quality_gate.js` to ensure the layout rules pass verification.
2. Visit Localhost 5173 to visually confirm layout behavior.
