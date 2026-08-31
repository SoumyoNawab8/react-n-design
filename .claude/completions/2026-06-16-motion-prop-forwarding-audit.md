# Motion Prop Forwarding Audit Completion

**Date**: 2026-06-16
**Task**: Find all occurrences in `src/components/` where Framer Motion props are passed to styled-components or DOM elements, causing React 19 console warnings.

## Approach

1. Read project docs per session protocol (`.claude/COMMON_MISTAKES.md`, `.claude/QUICK_START.md`, `.claude/ARCHITECTURE_MAP.md`).
2. Grepped for `styled(motion.*)` in all `src/components/**/*.styles.ts` files.
3. Grepped for `as={motion.*}` in all `src/components/**/*.tsx` files.
4. Read every matching `.styles.ts` and corresponding `.tsx` file to determine:
   - Whether `withConfig({ shouldForwardProp: ... })` is present.
   - Custom styling props passed to the component.
   - Motion props (`initial`, `animate`, `exit`, `transition`, `whileTap`, `whileHover`, `layoutId`, `variants`, etc.) passed to the component.
5. Compiled structured findings report for the parent agent.

## Key Findings

- 27 styled-motion components lack `shouldForwardProp` and forward custom props to the DOM.
- 7 additional components use `as={motion.*}` and receive custom styling props without `shouldForwardProp`.
- Most common custom props: `$isMobile`, `$mobileFullscreen`, `$active`, `$size`, `$block`, `$position`, `$placement`, `isOpen`, `isAssistant`, `size`, `isExpanded`, etc.
- Most common motion props: `initial`, `animate`, `exit`, `transition`, `whileHover`, `whileTap`, `layoutId`, `variants`, `layout`, `custom`.

## Files Audited

- `src/components/Tabs/Tabs.styles.ts` + `Tabs.tsx`
- `src/components/Tree/Tree.styles.ts` + `Tree.tsx`
- `src/components/FileUpload/FileUpload.styles.ts` + `FileUpload.tsx`
- `src/components/TimePicker/TimePicker.styles.ts` + `TimePicker.tsx`
- `src/components/Tooltip/Tooltip.styles.ts`
- `src/components/Accordion/Accordion.styles.ts` + `Accordion.tsx`
- `src/components/DatePicker/DatePicker.styles.ts` + `DatePicker.tsx`
- `src/components/Toast/Toast.styles.ts`
- `src/components/Stepper/Stepper.styles.ts` + `Stepper.tsx`
- `src/components/ComboBox/ComboBox.styles.ts` + `ComboBox.tsx`
- `src/components/Popover/Popover.styles.ts`
- `src/components/ModelSelector/ModelSelector.styles.ts` + `ModelSelector.tsx`
- `src/components/Collapsible/Collapsible.styles.ts` + `Collapsible.tsx`
- `src/components/Menu/Menu.styles.ts` + `Menu.tsx`
- `src/components/Switch/Switch.styles.ts`
- `src/components/Select/Select.styles.ts` + `Select.tsx`
- `src/components/ThinkingBlock/ThinkingBlock.styles.ts` + `ThinkingBlock.tsx`
- `src/components/CommandPalette/CommandPalette.styles.ts` + `CommandPalette.tsx`
- `src/components/Modal/Modal.styles.ts`
- `src/components/MultiSelect/MultiSelect.styles.ts`
- `src/components/Alert/Alert.styles.ts`
- `src/components/Input/Input.styles.ts`
- `src/components/FloatButton/FloatButton.styles.ts` + `FloatButton.tsx`
- `src/components/Empty/Empty.styles.ts` + `Empty.tsx`
- `src/components/Segmented/Segmented.styles.ts` + `Segmented.tsx`
- `src/components/AIChat/AIChat.styles.ts` + `AIChat.tsx`
- `src/components/Tour/Tour.styles.ts` + `Tour.tsx`
- `src/components/SuggestionChips/SuggestionChips.styles.ts` + `SuggestionChips.tsx`

## Deliverable

Structured report returned to parent agent containing file paths, component names, `withConfig` status, custom props, motion props, and recommended `shouldForwardProp` lists.
