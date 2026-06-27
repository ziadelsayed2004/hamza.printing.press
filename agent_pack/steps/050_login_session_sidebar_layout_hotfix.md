# 050 — Login Session Hydration + Sidebar/Layout Hotfix

## Objective
Fix the immediate UX bug: after login, menu/sidebar options must appear without manual refresh. Also fix the RTL sidebar/topbar/content layout positioning so the dashboard shell is usable before deeper redesign steps.

## Required first reads
- `agent_pack/prompts/ONE_PROMPT_RUNNER.md`
- `agent_pack/docs/FINANCE_NOTIFICATIONS_TIMEZONE_UI_FIX_SCOPE.md`
- `agent_pack/docs/PROFESSIONAL_MATERIAL_DASHBOARD_STANDARD.md`
- `client/src/app/AuthContext.jsx`
- `client/src/layouts/MainLayout.jsx`
- `client/src/App.jsx`
- `server/modules/auth/authRoutes.js`
- `server/modules/auth/authService.js`
- `server/modules/roles/rolesService.js`

## Tasks
1. Fix auth response shape consistency:
   - `POST /api/auth/login` and `GET /api/auth/me` must return user data in a consistent normalized shape.
   - Include `roles`, `permissions`, `isSuperAdmin` or equivalent.
   - Ensure super admin bypass works whether roles are strings or objects.
2. Fix React auth hydration:
   - `login()` must set the same normalized user shape that `restoreSession()` uses.
   - Menus must render immediately after `setUser()` without page refresh.
   - Add a safe `refreshUser()` helper if needed after login.
3. Fix role-aware nav:
   - MainLayout must not hide all menu items because of stale/incorrect permissions.
   - Super Admin must see all operational pages.
4. Fix RTL layout basics:
   - Desktop Drawer anchored right.
   - AppBar and main content offset correctly from right-side drawer.
   - Mobile drawer opens from right.
   - No overlap, wrong blank offset, or sidebar on wrong side.
5. Keep changes scoped to this hotfix only; deeper visual redesign is step 051/058.

## Verification
- Fresh login with super admin opens dashboard and sidebar options immediately.
- Hard refresh while logged in restores session and menus.
- Logout then login again works.
- Desktop and mobile sidebar positions are correct in RTL.
- Run available tests/build.

## Report
Write `agent_pack/reports/050_login_session_sidebar_layout_hotfix_REPORT.md`.
