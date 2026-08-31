# Dark-mode component styling fixes

## Summary

Fixed low-contrast / "dark-on-dark" rendering for documentation-site component examples by replacing component-level `theme.colors.shadowDark` usages that were being applied to foreground text/icons with `theme.colors.textSecondary`, and by correcting a broken Accordion example.

## What changed

### Component styles (`src/components/`)

Replaced `theme.colors.shadowDark` with `theme.colors.textSecondary` for text/icon colors in:

- `Accordion` – disabled header text
- `Alert` – close icon
- `Calendar` – disabled / other-month day numbers
- `Carousel` – empty-slide placeholder text
- `CodeBlock` – line numbers
- `ComboBox` – disabled option text
- `CopyButton` – disabled icon color
- `FileUpload` – hint, file-size, remove-icon, progress-track
- `Form` – compact layout label + extra help text (and fixed its inline `theme` type annotation)
- `Input` – prefix/suffix/clear/password icons
- `KanbanBoard` – disabled action-button color
- `ModelSelector` – chevron + empty-state color
- `Pagination` – disabled page buttons + ellipsis
- `RadioGroup` – disabled label
- `Rating` – unfilled stars
- `Result` – subtitle
- `Select` – placeholder, clear button, search icon/input placeholder, empty state, group header; also replaced hardcoded disabled-option colors (`#aaa`/`#f8f9fa`) with theme colors
- `Statistic` – title, prefix, suffix
- `Table` – sort icons + empty-state icon
- `Tabs` – disabled tab text
- `AIThinking` – elapsed time text

### JSX source

- `src/components/Select/Select.tsx` – group header used non-existent CSS variable `var(--colors-shadowDark)`; changed to `var(--n-color-text-secondary)`.

### Documentation examples (`site/src/data/componentExamples.tsx`)

- Fixed `Accordion` examples: they were passing `title`/`content` instead of the component's expected `label`/`children`, so accordion headers rendered empty.
- Updated `Carousel` example slide backgrounds from semi-transparent grays to `var(--n-color-card-bg)` and added `var(--n-color-text)` so slides are visible in both themes.
- Fixed fallback example CSS variable names from `--colors-text-secondary` to `--n-color-text-secondary`.

## Verification

- `npm run build:site` passes.
- `npm run build` (library build) passes with only pre-existing warnings.
- Captured component screenshots in both light and dark themes from the running site; components such as Select, Accordion, Pagination, Rating, Statistic, Result, FileUpload, CodeBlock, and Table now show readable text/icons in dark mode without breaking light-mode appearance.

## Notes

- `Toggle` was already theme-aware (`theme.colors.background` + `theme.colors.text`) and did not require changes.
- Full `npm run test:vitest` has pre-existing failures unrelated to these styling changes (e.g., duplicate `role="img"` elements, missing accessible names, memory exhaustion); no new test failures were introduced by the color-only edits.
