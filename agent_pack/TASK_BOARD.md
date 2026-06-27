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
| 041 | `041_fresh_database_reset_super_admin_only` | done | Fresh Database Reset + Super Admin Only |
| 042 | `042_flatten_server_structure_no_src` | done | Flatten Server Structure No src |
| 043 | `043_remove_old_identity_visual_system` | done | Remove Old Identity + Visual System |
| 044 | `044_material_light_dark_theme_overhaul` | done | Material Light/Dark Theme Overhaul |
| 045 | `045_dashboard_redesign_executive_experience` | done | Dashboard Redesign Executive Experience |
| 046 | `046_navigation_information_architecture_polish` | done | Navigation Information Architecture Polish |
| 047 | `047_forms_tables_dialog_cleanup_ux` | done | Forms Tables Dialog Cleanup UX |
| 048 | `048_fresh_start_quality_smoke_verification` | done | Fresh Start Quality Smoke Verification |
| 049 | `049_directadmin_deploy_docs_final_verify` | done | DirectAdmin Deploy Docs Final Verify |
| 050 | `050_login_session_sidebar_layout_hotfix` | done | Login Session Hydration + Sidebar/Layout Hotfix |
| 051 | `051_professional_material_shell_rebuild` | done | Professional Material Shell Rebuild |
| 052 | `052_egypt_currency_timezone_localization` | done | Egypt Currency + Timezone Localization |
| 053 | `053_finance_balance_engine_egp` | done | Finance Balance Engine EGP |
| 054 | `054_finance_balance_ui_dashboard_history` | done | Finance Balance UI + Dashboard History |
| 055 | `055_notifications_engine_legacy_plus` | done | Notifications Engine Legacy Plus |
| 056 | `056_notifications_ui_center_badges` | done | Notifications UI Center + Badges |
| 057 | `057_legacy_feature_parity_merge_audit` | done | Legacy Feature Parity Merge Audit |
| 058 | `058_dashboard_executive_ops_finance_perfection` | done | Dashboard Executive Ops/Finance Perfection |
| 059 | `059_business_flow_integrity_e2e` | done | Business Flow Integrity E2E |
| 060 | `060_final_visual_quality_deploy_gate` | done | Final Visual Quality + Deploy Gate |
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
| 072 | `072_balance_finance_ledger_full_reconciliation` | pending | Make the finance/balance system complete, auditable, EGP-only, Egypt-timezone-aware, and tied to invoices, collections, and supply/remittance. |
| 073 | `073_payments_collection_supply_shipping_logic_integrity` | pending | Verify and complete no-installment payment collection, supply/remittance, and partial shipping logic. |
| 074 | `074_inventory_receipts_stock_ledger_integrity` | pending | Make inventory, receipts, invoice stock deduction, and adjustments fully reliable. |
| 075 | `075_notifications_legacy_plus_advanced_rules` | pending | Bring back old notification value and expand it professionally. |
| 076 | `076_pricing_outlets_products_end_to_end` | pending | Verify product pricing by outlet type and invoice snapshots end-to-end. |
| 077 | `077_legacy_feature_parity_deep_audit` | pending | Ensure the new platform covers the old system and adds the requested upgrades. |
| 078 | `078_style_quality_gate_script` | pending | Add automated style/design checks to prevent regressions. |
| 079 | `079_visual_regression_manual_qa_pack` | pending | Create a practical visual QA checklist and fix high-priority visual defects found. |
| 080 | `080_final_business_design_deploy_gate` | blocked | Run the final gate after the new design and logic steps. |
| 081 | `081_finance_supply_model_purge_installments` | pending | Purge installment/payment-plan behavior from code and replace it with supply-aware finance rules. |
| 082 | `082_remove_excel_import_pipeline_export_only` | pending | Remove import features completely and keep/export-only system professional. |
| 083 | `083_invoice_builder_owned_dynamic_workflow` | pending | Rebuild invoice creation into a professional owned workflow connected to outlet type pricing, inventory, collection, supply, and validation. |
| 084 | `084_partial_shipping_by_invoice_items` | pending | Implement or verify partial shipment by selecting specific invoice products and quantities. |
| 085 | `085_supply_remittance_finance_ui` | pending | Create a professional finance UI for pending, collected, supplied, and unsupplied balances. |
| 086 | `086_professional_exports_arabic_reports` | pending | Upgrade exports into client-ready Arabic reports. |
| 087 | `087_css_cascade_no_important_refactor` | pending | Stop using repeated `!important` and random override hacks; fix the style cascade properly. |
| 088 | `088_mui_library_style_conflict_cleanup` | pending | Fix MUI component styling conflicts from the root instead of fighting library CSS. |
| 089 | `089_legacy_parity_enhancement_not_reduction` | pending | Verify that modernization improves the old platform and does not reduce core value. |
| 090 | `090_end_to_end_business_chain_verification` | pending | Verify the whole connected chain works as one system. |
| 091 | `091_permissions_for_finance_supply_shipping_exports` | pending | Finalize advanced RBAC for the corrected business model. |
| 092 | `092_reports_finance_statement_polish` | pending | Make reports and statements reflect corrected finance and shipping rules. |
| 093 | `093_full_code_logic_dead_feature_audit` | pending | Audit source code for dead/conflicting features after removing imports and installments. |
| 094 | `094_visual_design_regression_cleanup_no_overrides` | pending | Final visual cleanup pass focused on real UI defects: layout, spacing, RTL, fields, labels, drawers, dialogs, and tables. |
| 095 | `095_final_unified_quality_gate` | pending | Run final verification after all corrected finance/design/business changes. |
