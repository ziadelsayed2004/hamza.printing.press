# TASK BOARD — مطبعة حمزة

Status values: `pending`, `open`, `in_progress`, `done`, `blocked`, `needs_review`.

| # | Step | Status | Main output |
|---|---|---|---|
| 001 | `001_repo_reality_audit` | done | Audit the current repository, detect framework, database, routes, views, static assets, package scripts, deployment assumptions, and risks. Produce a factual audit report only; do not refactor yet. |
| 002 | `002_target_architecture_plan` | done | Create/confirm target architecture for a single deployable Node.js monolith with Express API and React/Vite/MUI client built into public/. Define server/client/storage structure. |
| 003 | `003_repo_structure_bootstrap` | done | Create the organized folders: server/src modules, client scaffold if missing, storage folders, scripts, docs. Do not delete legacy UI yet. |
| 004 | `004_env_config_security_bootstrap` | done | Add .env.example, config loader, NODE_ENV/PORT/session/database paths, secure defaults, health endpoint, and storage safety rules. |
| 005 | `005_fresh_database_schema` | done | Since the project is allowed to start from scratch, design and create fresh SQLite schema/migrations for all core modules without preserving old records. |
| 006 | `006_database_runner_and_seed` | done | Implement migration runner, reset/dev seed command, initial admin seed, outlet type seed examples, and safe database initialization. |
| 007 | `007_auth_users_roles_schema` | done | Implement users, roles, permissions, role_permissions, user_role assignments, password hashing, account status, and session/auth tables where needed. |
| 008 | `008_advanced_rbac_middleware` | done | Build advanced permission middleware: role permissions, optional user overrides, page/menu permissions, action-level API guards, super_admin bypass, and consistent 403 responses. |
| 009 | `009_audit_log_system` | done | Add audit log model/service/middleware for login, create, update, delete, disable, payment, inventory, invoice, export, and permission actions. |
| 010 | `010_auth_api_and_sessions` | done | Create auth APIs: login, logout, me, change password, reset password by admin, session validation, account disable handling, and secure cookie/session config. |
| 011 | `011_user_management_api` | done | Create user management APIs for creating, editing, disabling, enabling, archiving/deleting users, assigning roles, and listing permissions. |
| 012 | `012_outlet_types_module` | done | Create admin-managed outlet types module. Admin can add/edit/disable outlet types dynamically; these types drive product prices. |
| 013 | `013_outlets_module` | done | Create outlets module with outlet type, governorate, detailed address, phone, credit limit, status, notes, and filters. |
| 014 | `014_authors_module` | done | Create authors module and optional author accounts: author profile, linked user account, status, and author-book relationships. |
| 015 | `015_products_books_module` | done | Create normalized books/products module with title, code/SKU, author links, category, status, stock policy, and metadata. |
| 016 | `016_product_prices_by_outlet_type` | done | Implement product_prices so one book has a separate active price per outlet type. Invoice creation must resolve price from selected outlet type and save snapshots. |
| 017 | `017_inventory_ledger_schema` | done | Implement inventory ledger schema: receipts, receipt items, inventory transactions, stock summaries, stock adjustments, and opening balances. |
| 018 | `018_inventory_receipts_logic` | done | Implement receiving books as inventory receipts that automatically increase stock and create ledger transactions. |
| 019 | `019_invoice_schema` | done | Create invoice v2 schema: invoice header, items, snapshots, totals, statuses, history, notes, created_by, and immutable financial snapshots. |
| 020 | `020_invoice_create_pricing_stock` | done | Implement invoice create/update logic: selected outlet -> outlet type -> price per book, validate stock, calculate totals, decrement stock via ledger. |
| 021 | `021_payments_cash_deferred_installments` | done | Implement payments: cash, deferred, installments, mixed; invoice_payments; installment schedule; paid/remaining auto-calculation. |
| 022 | `022_payment_status_engine` | done | Build calculation engine for paid_amount, remaining_amount, payment_status, overdue installments, reversal/correction rules, and audit entries. |
| 023 | `023_shipments_partial_model` | done | Add shipments and shipment_items. Allow partial shipment operationally while keeping payment/fees on invoice level unless explicitly configured later. |
| 024 | `024_filters_search_api` | done | Implement advanced filters for invoices/products/outlets/authors: by book, author, outlet, outlet type, governorate, date, payment status, shipping status, remaining amount. |
| 025 | `025_reports_api` | done | Create reports APIs: sales, paid, remaining, deferred, balances by outlet/governorate/outlet type, stock reports, author reports, receipt reports. |
| 026 | `026_excel_export_system` | done | Implement Excel export for products, prices, authors, outlets, invoices, payments, inventory, reports, outstanding balances. |
| 027 | `027_excel_import_templates` | done | Implement Excel templates/import pipeline with preview, validation, accepted/rejected rows, and error sheet generation. |
| 028 | `028_pdf_invoice_reports_cleanup` | done | Standardize PDF generation for invoices/reports, remove unused PDF dependencies if safe, and ensure RTL Arabic rendering works. |
| 029 | `029_react_vite_mui_bootstrap` | done | Create React + Vite + Material UI frontend, RTL theme, routing, API client, auth context, error boundaries, and build output to public/. |
| 030 | `030_mui_layout_navigation` | done | Build professional dashboard layout: responsive sidebar, topbar, breadcrumbs, role-aware menus, mobile drawer, loading states, and empty states. |
| 031 | `031_login_users_roles_ui` | done | Build login, profile, users, roles, permissions matrix, account enable/disable, password reset, and audit view UI. |
| 032 | `032_products_authors_prices_ui` | done | Build UI for authors, books/products, product details, price per outlet type, DataGrid, filters, and forms. |
| 033 | `033_outlets_outlet_types_ui` | done | Build UI for outlet types and outlets with governorate/address/phone/status/credit limit filters. |
| 034 | `034_invoices_ui` | done | Build invoices UI: list, advanced filters, create invoice flow, item selection, automatic outlet-type prices, totals, details page. |
| 035 | `035_payments_installments_ui` | done | Build payments UI inside invoice and standalone: add payment, create installment plan, view remaining, overdue, and payment history. |
| 036 | `036_inventory_shipments_ui` | done | Build inventory receipts, stock ledger, adjustments, stock alerts, shipments, partial shipment status, and shipment items UI. |
| 037 | `037_reports_exports_ui` | done | Build dashboard/reports/excel/pdf export UI with cards, charts, filters, and permission-aware actions. |
| 038 | `038_legacy_ui_deprecation` | done | After new MUI screens are verified, deprecate old HTML/SweetAlert-heavy pages, keep fallback only if necessary, and clean routes/assets. |
| 039 | `039_test_suite_and_quality_gate` | done | Add automated tests for auth/RBAC/pricing/invoices/payments/inventory/reports plus lint/build checks and API smoke tests. |
| 040 | `040_directadmin_deploy_docs_final_verify` | blocked | Finalize DirectAdmin single Node app deployment docs, build scripts, smoke test checklist, final verification report, and handoff notes. |
| 041 | `041_fresh_database_reset_super_admin_only` | done | Hard reset SQLite for fresh production start. Seed permissions and a single super_admin account only; no demo data, no staff, no outlet types, no books, no outlets, no invoices. |
| 042 | `042_flatten_server_structure_no_src` | done | Refactor backend from server/src/* to simpler server/* paths. Update app.js, scripts, package scripts, tests, imports, and docs. Keep one Node.js monolith deployment. |
| 043 | `043_remove_old_identity_visual_system` | done | Remove old warehouse/bookstore identity, legacy colors, and inconsistent branding from the React UI. Move app name/brand to configurable settings and create a clean neutral professional visual baseline. |
| 044 | `044_material_light_dark_theme_overhaul` | done | Build a premium Material UI theme system with light/dark mode, RTL tokens, typography, spacing, elevations, form/table/card standards, and persistent mode toggle. |
| 045 | `045_dashboard_redesign_executive_experience` | done | Replace the current weak dashboard with a professional executive dashboard: KPIs, quick actions, charts/insights, recent activity, alerts, and responsive layout. |
| 046 | `046_navigation_information_architecture_polish` | done | Rebuild sidebar/topbar navigation into clear grouped sections for operations/catalog/finance/inventory/reports/admin with role-aware visibility and mobile usability. |
| 047 | `047_forms_tables_dialog_cleanup_ux` | done | Reduce dialog-heavy flows. Convert major create/edit/detail flows to pages or drawers. Standardize DataGrid filters, empty states, loading states, validations, confirmations, and snackbars. |
| 048 | `048_fresh_start_quality_smoke_verification` | done | Run full fresh-start verification: db reset, super-admin login, CRUD smoke paths, light/dark toggle, build, tests, lint, API health, and DirectAdmin deploy readiness. |
| 049 | `049_directadmin_deploy_docs_final_verify` | done | Finalize simple deployment docs after the new structure and UI reset: one Node app, React build into public, storage safety, env, npm commands, restart, and handoff notes. |
| 050 | `050_login_session_sidebar_layout_hotfix` | done | Fix the post-login refresh bug, normalize auth/user permission hydration, and correct RTL sidebar/topbar/content layout positioning. |
| 051 | `051_professional_material_shell_rebuild` | done | Replace the current weak shell with a premium Material Design style app shell: right sidebar, topbar, content grid, responsive drawer, grouped navigation, active states, and polished spacing. |
| 052 | `052_egypt_currency_timezone_localization` | done | Standardize all money as Egyptian Pound and all displayed dates/times as Egypt time, with shared server/client formatting utilities and tests. |
| 053 | `053_finance_balance_engine_egp` | done | Rebuild the legacy balance concept as an advanced finance ledger connected to invoices, payments, credit limits, and manual adjustments in EGP. |
| 054 | `054_finance_balance_ui_dashboard_history` | done | Add professional finance balance cards, history tables, manual adjustment UI, and dashboard financial overview using the new balance engine. |
| 055 | `055_notifications_engine_legacy_plus` | done | Restore and upgrade legacy stock/store-limit notifications into a unified advanced notification engine for stock, credit limits, invoices, payments, shipments, and system events. |
| 056 | `056_notifications_ui_center_badges` | done | Add a polished notification center, topbar badge, dashboard alerts, unread/read/resolved workflow, filters, and action links. |
| 057 | `057_legacy_feature_parity_merge_audit` | done | Compare the old repo behavior with the modern app, document all remaining functional gaps, and open/implement only critical parity fixes needed for a complete professional system. |
| 058 | `058_dashboard_executive_ops_finance_perfection` | done | Rebuild the dashboard as a high-value operations + finance command center with KPIs, alerts, cash/receivables, stock risk, latest invoices, payments, and quick actions. |
| 059 | `059_business_flow_integrity_e2e` | done | Verify and fix connected flows across outlet types, outlets, products, prices, inventory receipts, invoices, payments, balances, shipments, notifications, and reports. |
| 060 | `060_final_visual_quality_deploy_gate` | done | Run final quality gate for UI polish, light/dark mode, responsive layout, EGP/Egypt time, finance, notifications, tests, build, and simple DirectAdmin deployment. |
| 061 | `061_unified_design_system_contract` | done | Convert `agent_pack/docs/design.md` into the active design contract for the repo and prepare the frontend structure needed to apply it. |
| 062 | `062_frontend_style_inventory_line_by_line` | done | Create a concrete line-by-line frontend style debt inventory before refactoring pages. |
| 063 | `063_css_extraction_no_inline_styles` | done | Remove inline CSS and move styles into structured CSS files. |
| 064 | `064_rtl_layout_sidebar_no_refresh_fix` | done | Fix the login/session/sidebar issue and rebuild the RTL layout distribution. |
| 065 | `065_material_shell_light_dark_perfection` | done | Create a polished Google Material-inspired app shell with Light/Dark mode. |
| 066 | `066_single_ar_translation_json` | done | Move UI labels to one Arabic JSON dictionary. |
| 067 | `067_forms_fields_labels_spacing_overhaul` | done | Fix all form fields, labels, drawers, and cramped layouts. |
| 068 | `068_entity_drawers_dialogs_professional_ui` | done | Standardize side drawers and confirmation dialogs. |
| 069 | `069_dashboard_command_center_redesign` | done | Rebuild Dashboard as a professional operations + finance command center. |
| 070 | `070_author_accounts_invoice_scope` | done | Complete author account logic. |
| 071 | `071_outlet_accounts_invoice_scope` | open | Add outlet accounts. |
| 072 | `072_balance_finance_ledger_full_reconciliation` | pending | Make balance/finance system complete, auditable, and tied to invoices/payments. |
| 073 | `073_payments_installments_shipping_logic_integrity` | pending | Verify and complete cash/deferred/installments/shipping logic. |
| 074 | `074_inventory_receipts_stock_ledger_integrity` | pending | Make inventory, receipts, invoice stock deduction, and adjustments fully reliable. |
| 075 | `075_notifications_legacy_plus_advanced_rules` | pending | Bring back old notification value and expand it professionally. |
| 076 | `076_pricing_outlets_products_end_to_end` | pending | Verify product pricing by outlet type and invoice snapshots end-to-end. |
| 077 | `077_legacy_feature_parity_deep_audit` | pending | Ensure the new platform covers the old system and adds the requested upgrades. |
| 078 | `078_style_quality_gate_script` | pending | Add automated style/design checks to prevent regressions. |
| 079 | `079_visual_regression_manual_qa_pack` | pending | Create a practical visual QA checklist and fix high-priority visual defects found. |
| 080 | `080_final_business_design_deploy_gate` | pending | Run the final gate after the new design and logic steps. |
