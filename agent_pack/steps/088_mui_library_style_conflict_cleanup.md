# 088 — MUI Library Style Conflict Cleanup

## Goal
Fix MUI component styling conflicts from the root instead of fighting library CSS.

## Scope
- Audit ThemeConfig and global CSS import order.
- Standardize MUI component defaults for TextField, Button, Drawer, Dialog, DataGrid/Table, Card, Chip, Menu.
- Use RTL cache/provider correctly if present.
- Fix label alignment and field sizing for Arabic.
- Remove page-level hacks that should be theme-level.

## Acceptance
- Forms and tables look consistent across pages.
- Drawer/dialog styles are professional without hacks.
- Sidebar/topbar/content components align correctly in RTL.
