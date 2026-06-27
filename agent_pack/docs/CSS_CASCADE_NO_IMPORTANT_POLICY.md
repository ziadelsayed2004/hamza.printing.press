# CSS Cascade & MUI Override Policy — No Important Abuse

## Goal
Stop the exhausting cycle of fixing UI piece by piece with `!important` and random overrides.

## Hard rules
- No inline styles: no `style={{...}}`.
- No random `sx={{...}}` for permanent styling.
- No new `!important` unless there is a written exception comment and a cleanup ticket.
- Component styles must live beside the component or in the shared style system.
- MUI library styling must be handled from theme tokens, component classes, slotProps/classes, and scoped CSS modules/global layers.
- The app must not depend on fighting MUI CSS order with `!important`.

## Required style structure

```txt
client/src/styles/
  variables.css
  reset.css
  rtl.css
  layout.css
  forms.css
  tables.css
  drawers.css
  dialogs.css
  material-overrides.css

client/src/components/<component>/<Component>.jsx
client/src/components/<component>/<Component>.css

client/src/pages/<page>/<Page>.jsx
client/src/pages/<page>/<Page>.css
```

Flat page files are allowed temporarily, but final step must move heavy page-specific style to page CSS.

## Design tokens
All repeated values must come from CSS variables or MUI theme:

- colors.
- spacing.
- border radius.
- shadows.
- typography.
- z-index.
- drawer widths.
- sidebar widths.
- content max widths.

## Forms
Every form must use consistent field layout:

- labels above or inside MUI fields without overlap.
- min width suitable for Arabic labels.
- grid gaps not less than the design token minimum.
- mobile one column.
- desktop 2/3 columns only when fields have enough width.
- helper/error text must not break layout.

## MUI DataGrid/Tables
- RTL alignment.
- Arabic headers.
- toolbar and filters aligned correctly.
- no clipped text.
- row actions in a stable column.

## Drawer/dialog
- Entity drawers for create/edit details.
- Confirmation dialogs only for destructive actions.
- drawers must have header, content, actions, and predictable widths.
- mobile full-screen drawer if needed.

## Verification
The agent must scan and report:

- count of `style={{`.
- count of `!important`.
- count of `sx={{`.
- files that still use global override hacks.
- field/label layout pages inspected.

No style step can close as done if it increases these counts without documented reason.
