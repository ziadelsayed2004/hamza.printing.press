# Step 163 — Translation Cleanup & English-Arabic Extensible Setup

## Goal
Clean up hardcoded labels and transfer all UI literals to local JSON structures (ar.json and en.json) to prepare for bilingual localization using clean translation keys in JSX files.

## Business rules & requirements
1. **Separation of Concerns:**
   - No hardcoded strings for code fields, QR dialogues, next code generators, or scan messages inside page components.
2. **Extensible Translation Keys:**
   - Define translations under `system` namespace in both Arabic (`ar.json`) and English (`en.json`).
   - Use the `t('system.key')` notation to dynamically resolve translations.
3. **Clean CSS & Layout:**
   - Verify all elements scale, wrap, and align without inline styles or regression.

## Verification
- Checked client production build compiles successfully with no missing module dependencies.
- Verified Arabic layout matches text-flow perfectly.
