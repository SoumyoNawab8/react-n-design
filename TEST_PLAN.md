# react-n-design Test Plan

> Target coverage: every component has happy-path, edge-case, and accessibility (axe-core) tests.
> Runner: **Vitest** with `jsdom` environment.
> Framework: `@testing-library/react` + `user-event` + `axe-core`.
> Theme wrapper: `renderWithTheme(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>)`.
> Motion mocking: already handled in `vitest.setup.ts` (framer-motion proxy).

---

## 1. Components Under Construction (WAIT before writing tests)

The following components are being built by other agents. **Do NOT write test files until they are complete.**

- `SuggestionChips`
- `Charts` (`BarChart`, `LineChart`, `AreaChart`)
- `VirtualList`

After they land:
1. Read their source files and stories.
2. Update this plan with exact prop tables.
3. Write their `.test.tsx` files following the patterns below.

---

## 2. Existing Components — Test Inventory

### 2.1 AIChat
**Stories:** `Default`, `EmptyState`, `Loading`, `Interactive`  
**Current tests:** None  
**Priority:** High

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | `messages` prop with mixed user/assistant roles |
| | Basic props work correctly | `placeholder`, `isLoading` reflected in DOM |
| | User interactions work — click send | Clicking send button calls `onSend` with trimmed text |
| | User interactions work — Enter key | Pressing Enter in input calls `onSend` |
| | Visual output matches expected | Assistant messages render Markdown; user messages render plain text |
| | Copy button appears on assistant messages | Clicking copy writes text to clipboard, shows "Copied" feedback |
| **Edge Cases** | Empty data / no items | `messages={[]}` renders empty-state UI ("How can I help you today?") |
| | Very long content | Message with 5,000 chars renders without crash; scroll anchor present |
| | Maximum limits | Send disabled when input is only whitespace |
| | Disabled state | `isLoading=true` disables input and send button |
| | Loading state | Typing indicator dots visible; `aria-label="Assistant is typing"` |
| | Error state (if applicable) | N/A — errors are consumer-side |
| | Keyboard navigation | Tab moves focus from messages to input to send button |
| | Focus management | Input re-focused after a new assistant message arrives |
| | Resize / responsive behavior | Wrapper has `overflow: auto` or equivalent (CSS assert optional) |
| **Accessibility** | Zero axe violations on each story | Run axe on `Default`, `EmptyState`, `Loading` |
| | ARIA roles and labels correct | `role="log"`, `aria-live="polite"`, `aria-label="Chat messages"` on messages container |
| | Keyboard-only navigation works | Tab / Enter / Space flow works without mouse |
| | Color contrast passes | Let axe verify; no manual contrast asserts needed |
| | Screen reader friendly | `aria-label="Send message"`, `aria-busy` on loading button, `aria-label` on copy button |

---

### 2.2 AIThinking
**Stories:** `Default`, `Thinking`, `Collapsed`, `Streaming`  
**Current tests:** `AIThinking.test.tsx` (partial)  
**Priority:** Medium

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | Steps visible when `defaultExpanded=true` |
| | Basic props work correctly | `title`, `showElapsed`, `startTime` reflected |
| | User interactions work — click toggle | Clicking header toggles expand/collapse |
| | Visual output matches expected | Step numbers render in order; active dot shows when `isThinking=true` |
| **Edge Cases** | Empty data / no items | `steps={[]}` renders fallback text ("Analyzing your request...") when thinking |
| | Very long content | Step text of 2,000 chars renders without truncation crash |
| | Maximum limits | N/A |
| | Disabled state | N/A |
| | Loading state | `isThinking=true` starts elapsed timer; timer stops/cleans up on unmount |
| | Error state (if applicable) | N/A |
| | Keyboard navigation | Header is clickable; ensure keyboard activation (Enter/Space) toggles if focusable |
| | Focus management | Focus stays on toggle after expand/collapse |
| | Resize / responsive behavior | Wrapper width adapts (optional CSS assert) |
| **Accessibility** | Zero axe violations on each story | `Default`, `Thinking`, `Collapsed`, `Streaming` |
| | ARIA roles and labels correct | `role="region"`, `aria-label="AI reasoning steps"`, `aria-live="polite"` |
| | Keyboard-only navigation works | Focusable header; toggle via Enter/Space |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | `aria-label` on elapsed time reads formatted duration |

---

### 2.3 CommandPalette
**Stories:** `Default`, `NoResults`, `Interactive`  
**Current tests:** None  
**Priority:** High

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | `open=true`, list of items visible |
| | Basic props work correctly | `placeholder` shown in input; items render label + shortcut |
| | User interactions work — click item | Clicking item calls its `onSelect` and `onClose` |
| | User interactions work — keyboard select | ArrowDown/ArrowUp changes selected item; Enter triggers `onSelect` |
| | Visual output matches expected | Selected item has `aria-selected="true"`; search input shows `FaSearch` icon |
| **Edge Cases** | Empty data / no items | `items={[]}` shows "No results found" status |
| | Very long content | Item label of 500 chars renders; list scrolls (optional) |
| | Maximum limits | N/A |
| | Disabled state | N/A |
| | Loading state | N/A |
| | Error state (if applicable) | N/A |
| | Keyboard navigation | ArrowDown/Up wraps around; Escape closes palette; focus trap inside dialog |
| | Focus management | Input auto-focused on open; focus restored on close |
| | Resize / responsive behavior | Overlay covers viewport; wrapper centers |
| **Accessibility** | Zero axe violations on each story | `Default`, `NoResults`, `Interactive` |
| | ARIA roles and labels correct | `role="dialog"`, `aria-modal="true"`, `aria-label="Command palette"`, `role="listbox"`, `aria-activedescendant` |
| | Keyboard-only navigation works | Full flow: open → type query → arrow → Enter → close |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | `aria-autocomplete="list"`, `aria-controls="command-palette-list"`, empty-state `role="status"` |

---

### 2.4 Calendar
**Stories:** None yet  
**Current tests:** None  
**Priority:** Medium

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | Current month + 42-day grid visible |
| | Basic props work correctly | `value` highlights selected date; `events` render dots |
| | User interactions work — click day | Clicking day calls `onChange` with that date |
| | User interactions work — keyboard nav | ArrowLeft/Right/Up/Down, Home/End, PageUp/PageDown, Enter/Space navigate/select |
| | Visual output matches expected | Today date, selected date, other-month days styled correctly |
| **Edge Cases** | Empty data / no items | `events=[]` renders no dots; still shows grid |
| | Very long content | N/A |
| | Maximum limits | N/A |
| | Disabled state | `disabledDate` prevents click and marks `aria-disabled=true` |
| | Loading state | N/A |
| | Error state (if applicable) | N/A |
| | Keyboard navigation | Full gridcell keyboard nav per table above |
| | Focus management | Tab reaches header buttons or selected/today day |
| | Resize / responsive behavior | Grid columns fit wrapper (optional) |
| **Accessibility** | Zero axe violations on each state | Default, with events, with disabled dates, with selected value |
| | ARIA roles and labels correct | `role="application"`, `aria-label="Calendar"`, days `role="gridcell"`, `aria-selected`, `aria-disabled`, `aria-label={day.toDateString()}` |
| | Keyboard-only navigation works | Full month navigation without mouse |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | Month/year `aria-live="polite"` announces changes |

---

### 2.5 CodeBlock
**Stories:** `TypeScript`, `Python`, `WithoutLineNumbers`, `NotCopyable`, `NoLanguage`  
**Current tests:** None  
**Priority:** Medium

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | Code visible; header shows language tag |
| | Basic props work correctly | `language` sets color badge; `showLineNumbers` renders line numbers; `copyable` shows button |
| | User interactions work — copy click | Clicking copy writes `code` to clipboard, toggles to checkmark icon |
| | Visual output matches expected | Syntax highlighting applies spans with colors for supported languages |
| **Edge Cases** | Empty data / no items | `code=""` renders blank block without crash |
| | Very long content | 1,000-line code block renders without crash; line numbers still print |
| | Maximum limits | N/A |
| | Disabled state | N/A |
| | Loading state | N/A |
| | Error state (if applicable) | N/A |
| | Keyboard navigation | Copy button is focusable and actionable via Enter/Space |
| | Focus management | Focus returns after copy click (optional) |
| | Resize / responsive behavior | Pre element overflows with scroll (optional CSS assert) |
| **Accessibility** | Zero axe violations on each story | `TypeScript`, `Python`, `WithoutLineNumbers`, `NotCopyable`, `NoLanguage` |
| | ARIA roles and labels correct | Copy button `aria-label` toggles between "Copy code to clipboard" and "Copied to clipboard" |
| | Keyboard-only navigation works | Tab to copy button, Enter to activate |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | `aria-hidden="true"` on line numbers is acceptable since code is still readable as text |

---

### 2.6 Markdown
**Stories:** `FullDocument`, `Headings`, `InlineFormatting`, `TableOnly`, `Empty`  
**Current tests:** None  
**Priority:** High

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | All node types from `FullDocument` render |
| | Basic props work correctly | `children` parsed; `components` overrides applied |
| | User interactions work — link click | External links have `target="_blank"` and `rel="noopener noreferrer"` |
| | Visual output matches expected | Headings `h1–h6`, lists, code blocks, tables, blockquotes, hr, inline formatting |
| **Edge Cases** | Empty data / no items | `children=""` renders empty `MarkdownRoot` without crash |
| | Very long content | 10,000-char markdown renders without crash |
| | Maximum limits | N/A |
| | Disabled state | N/A |
| | Loading state | N/A |
| | Error state (if applicable) | Malformed markdown (unclosed backticks) renders gracefully without throwing |
| | Keyboard navigation | Tab moves through interactive elements (links) |
| | Focus management | Focus outline on links (styled-components) |
| | Resize / responsive behavior | Tables scroll horizontally if needed (optional CSS assert) |
| **Accessibility** | Zero axe violations on each story | `FullDocument`, `Headings`, `InlineFormatting`, `TableOnly`, `Empty` |
| | ARIA roles and labels correct | No special roles needed; semantic HTML (headings, lists, table) |
| | Keyboard-only navigation works | Tab through links inside markdown |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | Headings hierarchy must be logical (axe flag if skipped); `escapeHtml` prevents raw HTML injection |

---

### 2.7 PromptInput
**Stories:** `Default`, `WithSlashCommands`, `WithMentions`, `WithTokenCount`, `Loading`, `MaxLength`  
**Current tests:** `PromptInput.test.tsx` (partial)  
**Priority:** High

| Category | Test | Notes |
|----------|------|-------|
| **Happy Path** | Renders without errors | Textarea + send button visible |
| | Basic props work correctly | `placeholder`, `value`, `disabled`, `isLoading` reflected |
| | User interactions work — send on click | Clicking send calls `onSend` with trimmed text |
| | User interactions work — send on Enter | Pressing Enter (no shift) calls `onSend` |
| | Visual output matches expected | Token counter, character counter, slash menu, mention menu visible when configured |
| **Edge Cases** | Empty data / no items | `value=""` → send button disabled; no menu shown |
| | Very long content | `value` of 5,000 chars + `maxLength` disabled send at limit; counter shows `5000 / 5000` |
| | Maximum limits | `maxLength` disables send; `maxTokens` near-limit warning via `aria-describedby` |
| | Disabled state | `disabled=true` disables textarea; `isLoading=true` disables textarea and send button |
| | Loading state | Button text changes to "Sending..."; button disabled |
| | Error state (if applicable) | N/A |
| | Keyboard navigation | Tab to textarea; arrow keys navigate slash/mention menus; Escape closes menus |
| | Focus management | Menus close on Escape; focus stays in textarea |
| | Resize / responsive behavior | Textarea auto-resizes up to 200px height |
| **Accessibility** | Zero axe violations on each story | `Default`, `WithSlashCommands`, `WithMentions`, `WithTokenCount`, `Loading`, `MaxLength` |
| | ARIA roles and labels correct | `aria-label="Prompt input"`, `aria-describedby` near-limit warning, menus `role="listbox"`, items `role="option"`, `aria-selected` |
| | Keyboard-only navigation works | Full slash-command selection via arrows+Enter; mention selection; send via Enter |
| | Color contrast passes | Axe handles |
| | Screen reader friendly | `aria-live` on token counter optional; near-limit warning announced via `aria-describedby` |

---

## 3. Upcoming Components — Planned Test Matrix

### 3.1 SuggestionChips
*Awaiting implementation.*

| Category | Planned Tests |
|----------|---------------|
| Happy Path | Render chips from `suggestions` array; click chip calls `onSelect`; keyboard navigation Left/Right/Enter |
| Edge Cases | Empty array renders nothing or placeholder; very long chip text truncates; single chip; disabled chip |
| Accessibility | Zero axe violations; `role="listbox"` or `role="list"`; chips `role="option"` or `button`; `aria-selected`; focus management |

### 3.2 Charts (BarChart, LineChart, AreaChart)
*Awaiting implementation.*

| Category | Planned Tests |
|----------|---------------|
| Happy Path | Render SVG with correct number of bars/points/areas; `data` prop drives geometry; `onClick` on data point |
| Edge Cases | Empty `data` renders empty SVG or placeholder; single data point; negative values; zero values; very large dataset; responsive resize |
| Accessibility | Zero axe violations; chart wrapped in `figure` with `figcaption`; data points have `role="img"` with `aria-label` describing value; keyboard focus on interactive points; color contrast for axes/labels |

### 3.3 VirtualList
*Awaiting implementation.*

| Category | Planned Tests |
|----------|---------------|
| Happy Path | Render visible window of items; scroll updates visible window; `itemHeight`/`itemCount` props respected |
| Edge Cases | Empty list renders placeholder or zero-height container; single item; very large `itemCount` (1M); dynamic item heights (if supported); scroll to index |
| Accessibility | Zero axe violations; list container `role="list"`; items `role="listitem"`; `aria-setsize`, `aria-posinset` on visible items; keyboard scroll via ArrowDown/Up |

---

## 4. Test File Template

Use this header for every new `.test.tsx`:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ComponentName } from './ComponentName';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
```

Every component test suite **must** include:
1. `it('renders and is accessible', async () => { ... })` using `axe.run(container)`.
2. At least one interaction test with `userEvent`.
3. At least one edge-case test (empty, disabled, loading, or overflow).
4. All tests wrapped in `renderWithTheme`.

---

## 5. Execution Checklist

- [ ] Write `TEST_PLAN.md` (this file).
- [ ] Wait for other agents to finish `SuggestionChips`, `Charts`, and `VirtualList`.
- [ ] Read their source + stories.
- [ ] Write test files for every component in Sections 2 and 3.
- [ ] Run `npx vitest run` and fix failures.
- [ ] Run `npm run build-storybook` and verify no story errors.
- [ ] Update `/Users/macworld/Desktop/test-react-app/` to import and render all new components for visual QA.
