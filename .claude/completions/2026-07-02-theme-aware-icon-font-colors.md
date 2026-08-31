# Theme-aware icon and font colors

## Summary

Made fonts/icons in buttons and other components respond to the active theme by ensuring SVG icons inherit their parent’s text color and by replacing hardcoded placeholder/disabled text colors with theme-derived values.

## Changes

- Added a reusable styled-components mixin `src/styles/iconColor.ts` that forces child SVG elements to use `currentColor` for both `fill` and `stroke`.
- Applied the mixin to icon wrappers in:
  - Button, Input, Select, DatePicker, TimePicker, ComboBox, MultiSelect
  - Alert, Accordion, Collapsible, Toast, Tag, CopyButton, FileUpload
  - Modal, Menu, FloatButton, Switch, Result, DataGrid, Table, Drawer, Form
  - AIThinking, Icon, ImageGallery, ModelSelector, PromptBuilder, Terminal, ThinkingBlock, ToolCallCard
- Replaced hardcoded placeholder/disabled colors (`#aaa`, `#a0a5b0`) with `theme.colors.textSecondary` in:
  - Button spinner, DatePicker/TimePicker disabled inputs, ComboBox/MultiSelect/ColorPicker placeholders, Select disabled option, Toast close button
- Replaced hardcoded white text (`#fff`, `#ffffff`) on theme-colored backgrounds with `theme.colors.background` in:
  - Badge, Steps, Stepper, DatePicker/Calendar selected dates, AIThinking icon, ThinkingBlock icons, PromptBuilder add button, Menu checkbox/badge, Form validation tooltip
- Replaced hardcoded error reds (`#e53e3e`) with `theme.colors.error` in Form error text, required mark, and validation icon.

## Verification

- `npx tsc --noEmit -p tsconfig.json` passes with no errors.
- `npm run build:rollup` produces `dist/cjs/index.js` and `dist/esm/index.js` successfully.
- `npm run build:types:safe` completes without type errors.
- Targeted component tests render correctly (full suite has pre-existing test-isolation issues unrelated to these changes).

## Files touched

- `src/styles/iconColor.ts` (new)
- `src/components/Button/Button.styles.ts`
- `src/components/Input/Input.styles.ts`
- `src/components/Select/Select.styles.ts`
- `src/components/ComboBox/ComboBox.styles.ts`
- `src/components/MultiSelect/MultiSelect.styles.ts`
- `src/components/DatePicker/DatePicker.styles.ts`
- `src/components/TimePicker/TimePicker.styles.ts`
- `src/components/Calendar/Calendar.styles.ts`
- `src/components/ColorPicker/ColorPicker.styles.ts`
- `src/components/Alert/Alert.styles.ts`
- `src/components/Accordion/Accordion.styles.ts`
- `src/components/Collapsible/Collapsible.styles.ts`
- `src/components/Toast/Toast.styles.ts`
- `src/components/Tag/Tag.styles.ts`
- `src/components/CopyButton/CopyButton.styles.ts`
- `src/components/FileUpload/FileUpload.styles.ts`
- `src/components/Modal/Modal.styles.ts`
- `src/components/Menu/Menu.styles.ts`
- `src/components/FloatButton/FloatButton.styles.ts`
- `src/components/Switch/Switch.styles.ts`
- `src/components/Result/Result.styles.ts`
- `src/components/DataGrid/DataGrid.styles.ts`
- `src/components/Table/Table.styles.ts`
- `src/components/Drawer/Drawer.styles.ts`
- `src/components/Form/Form.styles.ts`
- `src/components/AIThinking/AIThinking.styles.ts`
- `src/components/Icon/Icon.styles.ts`
- `src/components/ImageGallery/ImageGallery.styles.ts`
- `src/components/ModelSelector/ModelSelector.styles.ts`
- `src/components/PromptBuilder/PromptBuilder.styles.ts`
- `src/components/Terminal/Terminal.styles.ts`
- `src/components/ThinkingBlock/ThinkingBlock.styles.ts`
- `src/components/ToolCallCard/ToolCallCard.styles.ts`
- `src/components/Badge/Badge.styles.ts`
- `src/components/Steps/Steps.styles.ts`
- `src/components/Stepper/Stepper.styles.ts`
- `src/components/Statistic/Statistic.styles.ts`
