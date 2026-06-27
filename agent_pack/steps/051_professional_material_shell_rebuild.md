# 051 — Professional Material Shell Rebuild

## Objective
Replace the current weak app shell with a professional Material Design RTL shell while keeping functionality intact.

## Required reads
- `agent_pack/docs/PROFESSIONAL_MATERIAL_DASHBOARD_STANDARD.md`
- `client/src/layouts/MainLayout.jsx`
- `client/src/theme/ThemeConfig.jsx`
- `client/src/config/appConfig.js`

## Tasks
1. Rebuild the shell layout:
   - right sidebar
   - topbar
   - content container
   - responsive temporary drawer
   - collapsed desktop mode if already supported
2. Build a cleaner grouped navigation IA:
   - الرئيسية
   - الكتالوج والتسعير
   - المنافذ والتوزيع
   - الفواتير والمبيعات
   - المالية والحسابات
   - المخزون والاستلامات
   - الشحن والمتابعة
   - التقارير والتصدير
   - الإدارة والصلاحيات
3. Polish topbar:
   - page title / breadcrumbs
   - theme toggle
   - notification placeholder/bell if notification engine is not ready yet
   - user menu
4. Remove remaining old identity styling and weak legacy look.
5. Keep app deployment unchanged.

## Verification
- Layout looks correct in light and dark mode.
- Navigation works and active states are clear.
- No horizontal scroll on common widths.
- Build passes.

## Report
Write `agent_pack/reports/051_professional_material_shell_rebuild_REPORT.md`.
