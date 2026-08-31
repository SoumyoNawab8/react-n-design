# Document Component Props with JSDoc

## Task
Add JSDoc comments to the props interfaces/types of the most-used components so `react-docgen-typescript` can extract descriptions for the documentation props tables.

## Components Documented
- Button (`src/components/Button/Button.tsx`)
- Input (`src/components/Input/Input.tsx`)
- Card (`src/components/Card/Card.tsx`)
- Modal (`src/components/Modal/Modal.tsx`)
- Badge (`src/components/Badge/Badge.tsx`)
- Tabs (`src/components/Tabs/Tabs.tsx`)
- Select (`src/components/Select/Select.tsx`)
- Tooltip (`src/components/Tooltip/Tooltip.tsx`)
- Toast (`src/components/Toast/Toast.tsx`)
- Toggle (`src/components/Toggle/Toggle.tsx`)

Note: Table (`src/components/Table/Table.tsx`) already had JSDoc comments on all props, so no changes were needed.

## Approach
- Added one concise sentence per exported prop/interface field.
- Kept comments directly above each property using `/** ... */` so `react-docgen-typescript` can parse them.
- Normalized existing multi-line JSDoc blocks into concise single-sentence comments for consistency.
- Also documented supporting interfaces (`Responsive<T>`, `AnimationConfig`, `TabBadgeConfig`, `ToastAvatarData`, `RichContentData`) where they are exported or consumed by documented props.

## Verification
Ran `npm run build:site` successfully:
- Vite build completed without errors.
- No `react-docgen-typescript` parsing failures.
- Output emitted to `../storybook-static/`.

## Patterns Worth Noting
1. **Responsive props** (Button, Input, Modal, Select) accept either a plain value or a breakpoint mapping; comments clarify both modes.
2. **Icon/button props** (Button, Input, Badge) distinguish decorative vs. interactive content (e.g., `leftIcon` vs. `addonBefore`).
3. **Controlled/uncontrolled pairs** (Modal, Tabs, Select, Toggle, Toast) are documented with "controlled" vs. "initial/uncontrolled" wording.
4. **Accessibility props** (`aria-label`, `aria-describedby`, `role`) are called out explicitly where they are part of the public interface.
5. **Internal-only types** (e.g., virtual list item data) were left undocumented since they are not part of the public API surface.
