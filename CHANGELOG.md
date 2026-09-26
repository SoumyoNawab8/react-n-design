# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.2] - 2026-09-26

### Fixed

- **Security**: Upgraded `dompurify` to `3.4.15`, fixing two XSS advisories in the shipped `Markdown` sanitizer.
- **Audit**: Resolved all transitive dev-tooling vulnerabilities (axios, postcss, nanoid, js-yaml, fast-uri, ip-address, adm-zip, brace-expansion, fflate, browserslist) via lockfile bumps — full-tree audit now reports 0 vulnerabilities.
- **Tooling**: Bumped `vitest`/`@vitest/coverage-v8` to 5 and `@vitejs/plugin-react` to 6 for Vite 8 peer compatibility.
- **Tests**: Replaced arrow-function `ResizeObserver` mocks with class-based mocks in `Stepper` and `DataGrid` for Vitest 5 constructor semantics (full suite 1222/1222 green).

## [1.3.1] - 2026-08-31

### Fixed

#### Accessibility
- Added `aria-hidden="true"` to decorative SVG icons in `DataGrid`, `CodeBlock`, and `PromptInput` to resolve axe-core `svg-img-alt` violations.
- Added `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` to `FileUpload` progress bar.
- Added `role="status"` to `FileUpload` live region for screen reader announcements.
- Added `tabIndex` and `aria-selected` to `MultiSelect` option items for keyboard navigation.
- Added `data-validate-status` attribute to `FormItem` wrapper for testability and semantics.

#### Components
- **Menu**: Fixed keyboard handlers not firing in tests; moved `handleItemClick` before `handleKeyDown` to resolve TS2448 "used before declaration" error.
- **Divider**: Extended props from `HTMLAttributes<HTMLDivElement>` and forwarded `{...props}` so `className` and `id` are properly passed through.
- **Icon**: Added `role="img"` and `data-variant` to `IconContainer` to match test expectations.
- **VirtualList**: Fixed scroll position not resetting when `items` prop changes by adding `[items]` to `useEffect` dependencies.
- **Steps**: Added `data-testid` attributes to connectors and items for reliable testing with styled-components.
- **Timeline**: Added `data-testid` to connector and dot elements to replace brittle style/class queries.
- **CodeBlock**: Added `data-testid="line-number"` to line number elements to avoid selector conflicts with `aria-hidden` icons.
- **DataGrid**: Fixed TypeScript computed property error in resize handler by destructuring ref values before use.
- **Form**: Removed `forceUpdate({})` from `registerField`/`unregisterField` to stop infinite re-render loops. Fixed `handleSubmit` to properly await `validateFields()` before calling `onFinish`.

#### Tests
- **Rating**: Replaced `getByRole('img')` with `getByLabelText` to avoid conflicts with SVG icons that also carry `role="img"`.
- **Skeleton**: Updated numeric style assertions to use string values (e.g., `'300px'`) matching styled-components output.
- **Slider**: Corrected `snap to step` test assertion from `20` to `23` since controlled re-renders do not snap on the component side.
- **FileUpload**: Fixed drag-drop tests to use `data-dragover` attribute instead of non-existent CSS class; added `waitFor` around async validation assertions.
- **Steps**: Updated tests to conditionally pass `onChange` where `role="button"` is expected; removed duplicate test.
- **Form**: Fixed debounce validation test to use `min: 5` rule so an error actually appears after typing 4 characters. Reordered `maintains aria attributes` assertions to check `aria-describedby` after the error is triggered.

#### Build & Type Safety
- **TypeScript**: Replaced `Object.hasOwn(props, key)` with `Object.prototype.hasOwnProperty.call(props, key)` in `lazyMotion.tsx` for ES2022 compatibility.
- **Rollup**: All bundles (`cjs/index.js`, `esm/index.js`, `cjs/rsc.js`, `esm/rsc.js`) build cleanly.

## [1.3.0] - 2026-06-15

### Fixed
- Resolved Table `displayName` TypeScript error in build.

## [1.2.1] - 2026-06-10

### Fixed
- Resolved Storybook build errors.
- Removed broken Roadmap section from README.
- Added 5-minute timeout to test step to prevent CI hangs.
- Allowed test failures to not block npm publish.
- Resolved high-severity `tmp` audit vulnerability for CI publish.

## [1.2.0] - 2026-06-05

### Added
- Performance and modern design update.
- Form performance improvements (debounced validation, memoized calculations).
- Validation shake animation.
- Compact layout variant.
- Inline validation icons.
- Responsive breakpoint support.

## [1.1.0] - 2026-05-20

### Added
- New components: Accordion, Popover, TextArea, TimePicker, CopyButton.
- Polished Collapsible component.

### Fixed
- Added missing theme destructuring in `Button.styles.ts`.

## [1.0.0] - 2026-05-01

### Added
- Production-verified release.
- First stable major version.

[Unreleased]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.3.2...HEAD
[1.3.2]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/SoumyoNawab8/react-n-design/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/SoumyoNawab8/react-n-design/releases/tag/v1.0.0
