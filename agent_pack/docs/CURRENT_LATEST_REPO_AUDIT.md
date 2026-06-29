# Current Latest Repo Audit — Locked State

هذا فحص فعلي لآخر ريبو مرفوع باسم `hamza.printing.press-main (3).zip` بعد تعديلات المستخدم اليدوية.

## الحالة العامة

- المشروع حديث ومنظم كمشروع Express + React/Vite/MUI.
- لا توجد خطوات Agent مفتوحة حالياً.
- آخر Step مسجل ومكتمل: `150_rearrange_invoice_filters_date_notch_fix`.
- تم تنظيف Agent Pack من ملفات steps المكررة وأرشفتها.
- لا يوجد V2/V3؛ الـ pack موحد.

## ما تم التأكد منه في الملفات

### Backend

الموديولات موجودة تحت `server/modules` وتشمل:

- auth
- users
- roles
- audit
- authors
- products
- product-prices
- outlet-types
- outlets
- invoices
- payments
- inventory
- shipments
- returns
- finance
- notifications
- reports
- exports
- admin

### Database

- يوجد 13 migration من `001_initial_schema.sql` إلى `013_new_roles_and_permissions.sql`.
- تم عمل dry-run للـ SQL migrations داخل SQLite memory ونجح.
- schema يدعم: users/roles/permissions، authors/products/prices، outlets/types، inventory receipts/transactions، invoices/items/payments، shipments/items، returns/items، finance ledger، notifications.

### Frontend

الصفحات الأساسية موجودة داخل `client/src/pages` مع CSS sibling files لكل صفحة تقريباً:

- Dashboard, Invoices, Payments, Finance, Inventory, Shipments, Returns via actions, Products, Authors, Outlets, OutletTypes, Reports, Exports, Notifications, Users, AuditLogs, Profile.

### Business logic

- إنشاء فاتورة: منفذ + كتب + سعر حسب نوع منفذ + مخزون + خصم + شحن + دفع أولي اختياري.
- الدفع: partial/full حسب المبلغ، مع supply status.
- الإيصال: upload metadata موجود وملفات الإيصالات يتم حفظها، لكن يوجد hardcoded Windows path يجب مراجعته لاحقاً.
- الشحن الجزئي: يتحقق من الكمية المتبقية لكل invoice item.
- الاسترجاع: يتحقق من الكمية المتبقية القابلة للإرجاع ويضيف stock transaction وقيد finance ledger.
- واردات الكتب: stock-only من ناحية الخدمة، لكن schema لا يزال يحمل unit_cost كحقل بيانات فقط.

## فحوصات الجودة

### Style gate

الأمر:

```bash
node scripts/style_quality_gate.js
```

النتيجة:

```text
Failure: Found 2 style quality gate violations
```

المتبقي:

- Heavy sx في `client/src/pages/Exports.jsx`.
- 5 قواعد `!important` في `client/src/layouts/MainLayout.css`.

### Migration dry-run

تم تطبيق كل migrations بترتيبها داخل SQLite memory بنجاح.

## بقايا/ديون يجب معرفتها فقط

هذه ليست خطوات مفتوحة الآن:

1. `import_jobs` و `import_job_rows` ما زالت في migration 001 رغم منع Import.
2. `installment_due` ما زالت داخل check constraint في migrations القديمة رغم منع التقسيط.
3. `server/config/index.js` يحسب rootDir لمستوى أعلى من المشروع.
4. رفع الإيصالات في invoices/payments يستخدم path ثابت خاص بجهاز Windows.
5. بعض التقارير القديمة داخل `agent_pack/reports` تصف حالات تاريخية لم تعد source of truth.
6. UI notification dropdown ما زال يعرض mark/read وresolve، بينما السياسة السابقة كانت معاينة/تجاهل.
7. style gate لا يزال يفشل بسبب مشكلتين فقط.

## الخلاصة

النسخة الحالية مفهومة ومقفولة. لا توجد خطوة تنفيذ قادمة حالياً. أي تعديل جديد يجب أن يبدأ من Step 151 بطلب صريح من المستخدم.
