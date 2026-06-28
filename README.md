# مطبعة حمزة — Bookstore Manager (Modernized Monolith)

نظام إدارة المبيعات، الفواتير، المخازن، والمالية الموحد لـ **مطبعة حمزة**.

تم تطوير وتحديث هذا النظام بواسطة المطور: **Ziad Elsayed CodzHub**.

---

## 1. بنية النظام (Architecture Overview)

يعمل النظام ككتلة واحدة (Single Node.js Monolith) لتسهيل الاستضافة وإدارة السيرفر:
- **الخلفية (Express.js Backend):** تقدم خدمات API على المسارات `/api/*` (المصادقة، الكتالوج، المبيعات، الشحن، المرتجعات، الخزينة والمالية، التصدير، والتقارير).
- **الواجهة الأمامية (Vite React + MUI Frontend):** يتم بناؤها داخل مجلد `public/` الرئيسي ليقوم سيرفر Express بتقديمها كملفات ثابتة تلقائيًا.
- **قاعدة البيانات (SQLite):** ملف قاعدة البيانات وملفات النسخ الاحتياطي تُحفظ بالكامل خارج مجلد `public/` لحماية البيانات من الوصول الخارجي المباشر.

---

## 2. هيكلية المجلدات الرئيسية (Directory Structure)

```txt
├── app.js                          # نقطة دخول خادم Node.js
├── package.json                    # مهام وسكريبتات المشروع
├── server/                         # كود الباك إند (Express)
│   ├── config/                     # إعدادات البيئة
│   ├── db/                         # قاعدة البيانات والـ Migrations والـ Seeds
│   └── modules/                    # موديولات النظام (auth, invoices, finance, etc.)
├── client/                         # كود الفرونت إند (React + Material UI)
├── public/                         # مخرجات بناء الفرونت إند (ملفات ثابتة)
└── storage/                        # مجلد التخزين الآمن لقاعدة البيانات والملفات المصدرة
```

---

## 3. التشغيل المحلي (Local Development)

لتشغيل المشروع محليًا لأول مرة:

1. قم بتثبيت المكونات الأساسية للباك إند والفرونت إند:
   ```bash
   npm install
   npm install --prefix client
   ```
2. قم بإعداد ملف المتغيرات البيئية `.env` بالاعتماد على `.env.example`.
3. قم بتهيئة قاعدة البيانات وزرع البيانات الأولية:
   ```bash
   npm run db:reset
   ```
4. قم بتشغيل خوادم التطوير بالتوازي للباك إند والفرونت إند:
   ```bash
   npm run dev
   ```

---

## 4. النشر على DirectAdmin (Production Deployment)

للنشر والترقية على سيرفر DirectAdmin (Phusion Passenger):

### أول مرة (Fresh Deployment)
1. ارفع مجلد المشروع على السيرفر (مع استبعاد `node_modules` و `client/node_modules`).
2. قم بإنشاء تطبيق Node.js App من لوحة DirectAdmin واجعل ملف الدخول هو `app.js`.
3. أضف متغيرات البيئة (`NODE_ENV=production`, `PORT`, `SESSION_SECRET`, `DATABASE_PATH`).
4. اتصل بالسيرفر عبر SSH ونفذ:
   ```bash
   npm install --production=false
   npm install --prefix client
   npm run db:reset
   npm run build
   ```
5. قم بعمل إعادة تشغيل (Restart) للتطبيق من لوحة DirectAdmin.

### التحديثات اللاحقة (Upgrade Deployments)
1. خذ نسخة احتياطية من قاعدة البيانات الحالية:
   ```bash
   npm run backup
   ```
2. اسحب التحديثات الجديدة أو ارفع الملفات المعدلة.
3. ثبّت أي حزم جديدة وأجرِ الـ Migrations ثم ابنِ الواجهة:
   ```bash
   npm install
   npm install --prefix client
   npm run db:migrate
   npm run build
   ```
4. أعد تشغيل التطبيق بلمس ملف الريستارت:
   ```bash
   touch tmp/restart.txt
   ```

---

## 5. التحقق والاختبارات (Verification & Quality Gates)

لضمان جودة الكود واستقراره قبل التسليم، يرجى تشغيل الأوامر التالية:
- **بوابة جودة التصميم (Style Gate):** `npm run style:gate`
- **الفحص البرمجي (Linter):** `npm run lint`
- **الاختبارات المتكاملة (Unit/Integration Tests):** `npm test`
- **بناء الفرونت إند (Vite Build):** `npm run build`
- **اختبار التدفقات الكامل (E2E Business Chain):** `npm run test:e2e`
- **اختبار الصحة السريع (Smoke Test):** `npm run smoke`
