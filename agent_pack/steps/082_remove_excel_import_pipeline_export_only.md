# 082 — Remove Excel Import Pipeline Export Only

## Goal
Remove import features completely and keep/export-only system professional.

## Scope
- Read `agent_pack/docs/EXPORT_ONLY_NO_IMPORT_POLICY.md`.
- Remove import page/menu/buttons/routes/permissions/modules/tests.
- Remove `/api/imports/*` from route map or return 410 temporarily only if deletion requires another step.
- Keep exports and improve export metadata if quick and safe.
- Update docs/translations/navigation.

## Acceptance
- No user-facing import feature exists.
- No import permission appears in UI.
- Export screens still work.
- Tests/build updated.
