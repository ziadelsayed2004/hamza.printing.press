# Step 160 — Dynamic Categories Management for Books

## Goal
Implement a dynamic categories management module where users can CRUD categories (e.g., grades, terms, genres) and associate books with multiple categories simultaneously through a multi-select UI.

## Business rules & requirements
1. **Database Schema:**
   - Create a `categories` table with columns: `id`, `name`, `description`, `created_at`, `updated_at`.
   - Create a `product_categories` junction table mapping products to categories with columns: `product_id`, `category_id`.
   - Migrate existing category strings from `products.category` into the new tables on startup.
2. **Backend APIs:**
   - Expose CRUD endpoints under `/api/categories` with RBAC permissions (`products.view`, `products.create`, `products.update`, `products.delete`).
   - Log categories creation, update, and deletion in audit logs.
   - Update products routes and services to accept `categoryIds` (array of category IDs) and link products to multiple categories.
   - Set a comma-separated string of category names in the legacy `products.category` column for backward-compatibility.
3. **Frontend UI (React):**
   - Add localization label in `ar.json`.
   - Add categories management link in the sidebar menu under "Catalog & Pricing".
   - Create `Categories.jsx` page displaying categories table and editing forms.
   - Update `Products.jsx` to render categories as MUI Chips, filter by category ID, and support multiple selection in book creation/edit forms.

## Verification
- Run `node scripts/test_runner.js` to assert all tests (including new integration tests) pass.
- Build the client app using `npm run build` to confirm zero compilation errors.
