# Step 161 — Sequential SKU/Code Generation Backend & Migration

## Goal
Enforce true sequential code generation (prefixed with 3 characters representing the type and followed by 7-digit serialized padding) for books (BOK-), outlets (OUT-), and invoices (INV-) with a database migration.

## Business rules & requirements
1. **Migration & Schema Update:**
   - Add `code TEXT` column to `outlets` table.
   - Enforce uniqueness by establishing a unique index `idx_outlets_code` on `outlets(code)`.
   - Backfill existing outlets in migrations with codes matching the `OUT-000000X` format.
2. **Backend Services & Routes:**
   - Expose the API endpoint `/api/system/next-code?type=product|outlet|invoice`.
   - Calculate next code dynamically by matching prefix, parsing the maximum digit part, and incrementing it sequentially.
   - Update outlets and invoices services to accept custom codes/numbers and backfill default sequential ones if omitted.
3. **UI Integration:**
   - Add "Generate" (توليد تلقائي) buttons next to inputs in products, outlets, and invoices forms.

## Verification
- Applied migrations script successfully.
- Asserted `apiClient.get('/system/next-code')` calls fetch matching sequential patterns.
