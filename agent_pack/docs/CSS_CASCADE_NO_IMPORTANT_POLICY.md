# CSS Cascade Policy — No Random Overrides

- لا تستخدم `!important` كحل افتراضي.
- لا تستخدم `style={{...}}`.
- لا تستخدم `sx={{...}}` لتصميم الصفحة أو layout.
- انقل الأنماط إلى CSS sibling files أو shared styles.
- استخدم MUI Theme component overrides للأشياء العامة.
- أي `!important` موجود يجب أن تتم إزالته تدريجيًا ضمن خطوات التصحيح الجديدة، ولا يسمح بإضافة واحد جديد.
- يجب إصلاح مشكلة المكتبات من الـ theme/cascade وليس بزيادة specificity عشوائي.
