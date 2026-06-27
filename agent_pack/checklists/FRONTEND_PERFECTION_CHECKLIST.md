# Frontend Perfection Checklist — Mandatory

استخدم هذه القائمة في كل خطوة Frontend أو Business Flow.

## A. Style Scan

- [ ] لا يوجد `style={{`.
- [ ] لا يوجد inline CSS.
- [ ] لا يوجد `sx={{` جديد.
- [ ] كل styles في CSS files.
- [ ] كل صفحة لها CSS.
- [ ] كل Component له CSS.
- [ ] CSS variables مستخدمة من `client/src/styles/variables.css`.

## B. RTL

- [ ] `html dir="rtl"`.
- [ ] MUI theme direction rtl.
- [ ] Emotion RTL cache.
- [ ] Sidebar في اليمين.
- [ ] النصوص العربية يمين.
- [ ] Inputs labels يمين.
- [ ] Tables cells يمين.
- [ ] لا يوجد LTR إلا للأكواد والأرقام الفنية.

## C. Layout

- [ ] لا يوجد horizontal overflow للصفحة.
- [ ] Sidebar لا يغطي content.
- [ ] Topbar لا يغطي content.
- [ ] المحتوى موزع بشكل صحيح.
- [ ] الصفحة تعمل على desktop/tablet/mobile.
- [ ] بعد login لا تحتاج refresh.

## D. Forms

- [ ] الحقول غير ملتصقة.
- [ ] labels غير مقصوصة.
- [ ] Drawer responsive.
- [ ] Action buttons ثابتة وواضحة.
- [ ] Errors تحت الحقول.
- [ ] كل Select/Autocomplete readable.

## E. Business Logic

- [ ] المؤلف يرى فواتير كتبه فقط عند وجود حساب.
- [ ] المنفذ يرى فواتيره فقط عند وجود حساب.
- [ ] سعر الكتاب يأتي من نوع المنفذ.
- [ ] invoice snapshots لا تتغير بعد تعديل السعر.
- [ ] payments تحدث remaining.
- [ ] ledger يحدث balance.
- [ ] inventory receipts تزيد المخزون.
- [ ] invoices تخصم المخزون.
- [ ] shipping لا يكسر الدفعات.
- [ ] notifications تتولد للأحداث المهمة.

## F. Localization

- [ ] كل النصوص من `client/src/locales/ar.json`.
- [ ] العملة EGP / ج.م.
- [ ] الوقت Africa/Cairo.
- [ ] اسم النظام مطبعة حمزة.
- [ ] اسم المطور Ziad Elsayed CodzHub في docs فقط أو footer عند الحاجة.

## G. Verification

- [ ] npm install
- [ ] npm test
- [ ] npm run build
- [ ] npm run smoke إن أمكن
- [ ] Step report مكتوب
- [ ] status.json محدث
