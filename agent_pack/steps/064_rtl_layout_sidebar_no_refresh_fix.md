# 064 — RTL Layout Sidebar No Refresh Fix

## Goal
Fix the login/session/sidebar issue and rebuild the RTL layout distribution.

## Current problem
After login, user needs browser refresh for sidebar options to appear. Sidebar placement and page content distribution are wrong.

## Scope
- Inspect `AuthContext`, route guards, `MainLayout`, navigation permission rendering.
- Ensure `login()` updates user object with roles/permissions immediately.
- Ensure protected layout re-renders after login without refresh.
- Fix desktop sidebar on the right.
- Fix content offset and no overlap.
- Fix mobile drawer from right.
- Fix active navigation item.
- Add a visible loading skeleton instead of broken/empty shell.

## Acceptance
- Login → Dashboard → Sidebar appears immediately.
- No manual refresh.
- Desktop sidebar right.
- Mobile drawer right.
- No horizontal overflow.
