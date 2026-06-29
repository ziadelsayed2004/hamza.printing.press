# Step Report: 146_dashboard_roles_layout_export_cleanup

## 1. Selected Step & Status
- **Step ID**: 146
- **Slug**: `dashboard_roles_layout_export_cleanup`
- **Title**: `User Form Dropdowns, Placeholder Min-Widths, Layout Polish, & Dummy Data Purge`
- **Status**: Completed (`done`)

## 2. Files Changed

### CSS
- **`client/src/styles/material-overrides.css`**: Added `min-height: 27px` and `align-items: center` to the `.roles-chip-container` class to prevent the multi-select input boxes (like the "الأدوار الممنوحة" field in Add User) from collapsing/flattening when empty.
- **`client/src/components/EntityDrawer.css`**: Configured `border-radius: 0 !important` for `.entity-drawer-paper` to make the side drawer sharp/flat without any rounded corners.

### Pages / UI Layouts
- **`client/src/layouts/MainLayout.jsx`**:
  - Added `top: 0` to the inline style of `<AppBar>` to guarantee zero spacing/gap from the top viewport edge.
- **`client/src/theme/ThemeConfig.jsx`**:
  - Set `borderRadius: 0` for `MuiAppBar`, `MuiDrawer`, and `MuiDialog` components to make them fully flat and sharp.
- **`client/src/pages/Exports.jsx`**:
  - Re-designed the Data Export card grid: reduced the icon size to a clean `28`, wrapped the icons in soft colored background boxes, replaced standard margins with correct RTL spacing (`ml: 2`), added a translateY hover transform animation, and polished the action button copy to "تصدير ملف CSV" with modern shadows.
- **`client/src/pages/Users.jsx`, `client/src/pages/Products.jsx`, `client/src/pages/Outlets.jsx`, `client/src/pages/Authors.jsx`**:
  - Set a minimum width (`sx={{ minWidth: 280 }}`) on search TextFields to ensure placeholders (e.g. "البحث باسم المنفذ أو الهاتف...") are fully visible and not truncated/clipped on small or medium screens.

### Database / Seeding
- **`server/db/seeds/dev_seed.js`**: Verified that no dummy data (such as dummy outlets, books, authors, or invoices) is generated during seeding. Running `npm run db:reset` cleanly deletes `database.sqlite` and seeds strictly:
  - System permission rows.
  - Active commercial roles.
  - Linking super_admin role with all permissions.
  - Seeding standard commercial outlet types config (`Wholesale`, `Retail`, `Special Outlets`).
  - Creating a single active Super Admin user account (credentials: `admin` / `912Isk912`).

## 3. API Changes
- None.

## 4. Business-Rule Verification
- No dummy data exists in the seeds.
- Flat/sharp border radius policies are fully applied on the layout shell (AppBar, Side Drawer) and side action drawers.
- Placeholder clip problems are fixed using min-width constraints.

## 5. Verification Executed
- Executed `npm run style:gate` and `npm run lint`. Passed successfully.
- Executed `npm run build`. Compiled successfully.
- Executed `npm run smoke`. Health check healthy.

## 6. Next Step
- None (All modernization pack deliverables fully verified and delivered).
