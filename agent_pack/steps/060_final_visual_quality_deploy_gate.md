# 060 — Final Visual Quality + Deploy Gate

## Objective
Final gate after the new requested fixes: UI polish, finance, notifications, Egypt localization, connected flows, and simple DirectAdmin deployment.

## Required reads
- all docs/checklists
- `agent_pack/checklists/VERIFY_GATE.md`
- `agent_pack/checklists/SMOKE_TEST_CHECKLIST.md`
- `agent_pack/docs/DEPLOYMENT_DIRECTADMIN.md`

## Tasks
1. Run full verification:
   - install
   - lint
   - tests
   - build
   - db reset/migrate/seed if available
   - smoke tests
2. Verify UI manually or with screenshots if possible:
   - login no refresh bug fixed
   - sidebar layout correct
   - light/dark mode
   - dashboard quality
   - finance cards/history
   - notifications
3. Verify deployment docs still match one Node app on DirectAdmin.
4. Update README/DEPLOY docs if needed.
5. Do not introduce new features in this final gate unless needed to fix verification failures.

## Report
Write `agent_pack/reports/060_final_visual_quality_deploy_gate_REPORT.md`.
