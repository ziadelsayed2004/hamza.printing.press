# 00 START HERE — مطبعة حمزة

هذا هو الـ Agent Pack الموحد لمنصة **مطبعة حمزة**.

المطور: **Ziad Elsayed CodzHub**

## طريقة التشغيل مع الـ coding agent

استخدم هذا البرومبت فقط كل مرة:

```txt
You are working on the Hamza Printing Press Bookstore Manager repo. Read `agent_pack/prompts/ONE_PROMPT_RUNNER.md` and follow it exactly. Execute exactly one open/pending step from `agent_pack/status.json`, update tracking, run verification, write the step report, then stop. Do not execute more than one step.
```

## قبل أي خطوة Frontend

يجب قراءة:

1. `agent_pack/docs/design.md`
2. `agent_pack/docs/FRONTEND_STYLE_LOGIC_AUDIT.md`
3. `agent_pack/checklists/FRONTEND_PERFECTION_CHECKLIST.md`

## قواعد ثابتة

- لا إصدارات منفصلة للـ agent pack؛ كل الخطوات داخل نفس الباك الموحد.
- السيرفر في `server/` مباشرة وليس `server/src/`.
- الواجهة React + Material UI + CSS منظم.
- ممنوع inline styles.
- ممنوع ترك مشاكل RTL أو layout.
- العملة جنيه مصري.
- التوقيت توقيت مصر.
- كل مرة خطوة واحدة فقط.
