# Current Repo Audit — مطبعة حمزة

هذا الملف هو لقطة تحقق من آخر ريبو مرفوع قبل فتح خطوات التصحيح الجديدة. هو ليس تقرير نجاح؛ هو قائمة مشاكل مؤكدة يجب حلها خطوة بخطوة.

## 1. نتيجة فحص التصميم الحالية

تم تشغيل:

```bash
npm run style:gate
```

والنتيجة: **فشل**.

المخرجات الأساسية:

```text
❌ Failure: Found 21 style quality gate violations:

[Missing Sibling CSS] at components/ConfirmDialog.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at components/EntityDrawer.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at components/forms/FieldGrid.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at components/forms/FormActions.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at components/forms/FormSection.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/AuditLogs.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Authors.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Exports.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Finance.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Inventory.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Invoices.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Login.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Notifications.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/OutletTypes.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Outlets.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Payments.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Products.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Profile.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Reports.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Shipments.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.

[Missing Sibling CSS] at pages/Users.jsx:File-level
  Message: Missing matching .css stylesheet beside this component/page.
```

## 2. ديون ستايل مؤكدة في `client/src`

- عدد `style={...}` الحالي: **30** موضع تقريبًا.
- عدد `sx={...}` الحالي: **847** موضع تقريبًا.
- عدد `!important` الحالي في CSS: **184** موضع تقريبًا.
- ملفات كثيرة لا تملك CSS sibling مستقل رغم وجود JSX pages/components.
- توجد محاذاة يسار في حقول ونصوص عربية يجب تحويلها RTL/right alignment إلا القيم التقنية فقط.
- بعض الـ dialogs/drawers غير موحدة، والمسافات والأبعاد ليست بنظام واحد.
- يوجد اعتماد كبير على overrides عامة بدل theme/components/classes منظمة.

## 3. ديون بيزنس/باك إند مؤكدة

- يوجد بقايا installment/payment plan في schema/tests/services/docs رغم أن التقسيط ملغي نهائيًا.
- يوجد بقايا import jobs في schema/docs رغم أن الاستيراد ملغي نهائيًا.
- الفواتير تحتاج Actions مباشرة من قائمة الفواتير/تفاصيل الفاتورة: تسجيل دفع، تعليم مدفوع، توريد مدفوع، شحن، استرجاع.
- الشحن الجزئي موجود كفكرة لكنه يحتاج تحقق نهائي: اختيار item من الفاتورة + كمية مشحونة لا تتجاوز المتبقي.
- الاسترجاع غير مكتمل كمنظومة: محتاج return records، return items، تأثير على المخزون، تأثير على رصيد مسترجعات المنفذ، تأثير على limit والحسابات والإشعارات.
- الماليات يجب أن تعتمد على قواعد نهائية فقط:
  - رصيد معلق = قيمة فواتير/أجزاء لم يتم تحصيلها من المنافذ.
  - رصيد فعلي = ما تم تحصيله فعليًا.
  - الرصيد الفعلي متقسم إلى: تم توريده / لم يتم توريده.
  - رصيد مسترجعات = قيمة مسترجعات مرتبطة بالمنفذ، تدخل في كشف الحساب والـ limit.

## 4. ديون Agent Pack

- `TASK_BOARD.md` غير متزامن مع `status.json` في بعض الخطوات.
- توجد خطوات قديمة أصبحت ملغاة أو متناقضة مع القرار النهائي، مثل import pipeline وinstallments.
- توجد أكثر من final gate قديمة؛ يجب تجاهلها والاعتماد على Final واحد جديد في آخر الخطوات الجديدة.
- يجب أن يصبح المصدر الوحيد للحقيقة هو:
  - `agent_pack/status.json`
  - `agent_pack/TASK_BOARD.md`
  - ملفات الخطوات المفتوحة من 096 فصاعدًا.

## 5. قرار التنفيذ

لا يتم تقليل إمكانيات النظام القديم. المطلوب هو:

1. الحفاظ على قيمة النظام القديم وتحسينها.
2. إزالة ما تم إلغاؤه فقط: التقسيط، Import Excel/CSV، override العشوائي، الهوية القديمة، الديون المتضاربة.
3. إضافة المطلوب الجديد: توريد، تحصيل، أرصدة، شحن جزئي، استرجاع، حسابات منافذ/مؤلفين، إشعارات وأكشنز، UI Google Material احترافي.
