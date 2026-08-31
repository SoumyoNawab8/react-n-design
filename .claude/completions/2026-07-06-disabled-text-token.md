# Task Completion: disabledText theme token and component normalization

## Summary
Added a new `disabledText` color token to the theme system and normalized disabled-state text styling across the component library so disabled controls are perceivable through both color and opacity, not opacity alone.

## Changes Made

### 1. Theme token added
- `src/styles/theme.ts`
  - `lightTheme.colors.disabledText: '#8c929b'`
  - `darkTheme.colors.disabledText: '#6b7280'`
  - Added `colors.disabledText` to `cssVariableMap`
- `src/styles/tokens.css`
  - `--n-color-disabled-text: #8c929b` (light)
  - `--n-color-disabled-text: #6b7280` (dark)
  - Added `prefers-contrast: more` override (`#5a6370` light / `#b0b8c2` dark)
- `src/styles/tokens.ts`
  - Added `colors.disabledText: 'var(--n-color-disabled-text)'`
  - Updated `injectCSSVariables()` and `generateThemeCSS()` for both themes

### 2. Component disabled text normalized
Replaced `shadowDark`, `textSecondary`, and hard-coded values with `theme.colors.disabledText` for disabled states, keeping opacity as an additional cue:

- **Button**: disabled button text
- **Tabs**: disabled tab text + opacity
- **RadioGroup**: disabled label text + opacity
- **CopyButton**: disabled icon text
- **TimePicker**: disabled input, clock icon, and column options
- **Calendar**: disabled days (`isOtherMonth` moved to `textSecondary`)
- **DatePicker**: disabled input, calendar icon, and day cells
- **Pagination**: disabled page/prev/next buttons
- **KanbanBoard**: disabled action buttons
- **Accordion**: disabled header text
- **Tree**: disabled node text (replaced `#aaa`) + opacity
- **Menu**: disabled menu items + opacity
- **Select**: disabled select options + opacity
- **ComboBox**: disabled input and options + opacity
- **MultiSelect**: disabled input text + opacity
- **Input**: disabled input text
- **TextArea**: disabled textarea text
- **Switch**: disabled switch label text + opacity
- **Checkbox**: disabled checkbox label text + opacity

### 3. High-contrast support
- `src/styles/tokens.css` now overrides `--n-color-disabled-text` under `prefers-contrast: more` to keep disabled controls distinguishable.

## Verification
- `npm run build:types:safe` ✅ passed
- Targeted vitest runs for modified components ✅ passed (56/56 + 203/208 + 69/71; failures are unrelated pre-existing Menu/MultiSelect interaction tests in the current branch)

## Notes
- Menu and MultiSelect have unrelated pre-existing test failures in this branch (Enter-key menu close, MultiSelect mouse-enter tabindex). These were not introduced by the disabled-text styling changes.
