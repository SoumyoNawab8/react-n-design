# react-n-design v0.7.0 Deep Research & Implementation Plan

**Date:** 2026-05-20
**Current Version:** 0.6.0
**Target Version:** 0.7.0 (reliability + lightweight + security release)
**Workflow:** TDD (Test-Driven Development) — every feature starts with a failing test.

---

## 1. Current State Audit (Hard Numbers)

| Metric | Value | Target v0.7.0 |
|---|---|---|
| Components | 49 folders | 55+ |
| Components with tests | 15/49 (31%) | 49/49 (100%) |
| Total tests passing | 86 | 200+ |
| ESM bundle size | 360 KB | <150 KB |
| CJS bundle size | 376 KB | <160 KB |
| npm audit vulnerabilities | 5 (4 low, 1 moderate) | 0 |
| Storybook stories | 48 | 55+ |
| CI workflows | 4 (build, test, deploy, codeql) | 5+ (add size, a11y) |
| Linting | Biome configured | Enforced in CI |
| Pre-commit hooks | None | Husky + lint-staged |
| Bundle analysis | None | Integrated in CI |
| Test coverage reporting | Configured (vitest coverage) | Posted in CI + badge |
| Security sanitization | escapeHtml in Markdown only | DOMPurify on all user-rendered HTML |
| README accuracy | "40+ components", "41 tests" | "50+ components", actual test count |
| CSS runtime | styled-components v6 only | styled-components + CSS Modules path |
| RSC entry | `src/rsc.ts` exists | Verified in Next.js App Router |
| Accessibility audit | axe-core in 15 test files | axe-core in 100% of test files |

### Missing Test Files (34 components)
Accordion, AIChat, Avatar, Breadcrumbs, Calendar, Carousel, CodeBlock, ColorPicker, ComboBox, CommandPalette, DataGrid, DatePicker, Divider, Drawer, FileUpload, Form, Grid, Icon, Markdown, Menu, MultiSelect, ProgressBar, Skeleton, SkipToContent, Slider, Stack, Stepper, Tag, Toast, Tooltip, Tree, Typography, VisuallyHidden

### npm Audit Findings
- `@tootallnate/once` <3.0.1 (via `jest-environment-jsdom` → `jsdom` → `http-proxy-agent`)
- `ws` 8.0.0–8.20.0 (uninitialized memory disclosure)
- **Fix:** Upgrade `jest-environment-jsdom` to v30+ or migrate fully to Vitest/jsdom and drop Jest.

---

## 2. Competitor Gap Analysis

### vs shadcn/ui
| Feature | shadcn/ui | react-n-design 0.6.0 | Gap |
|---|---|---|---|
| Distribution model | Copy-paste primitives | npm package | Both valid — we should add CLI copy-paste too |
| Checkbox | ✅ | ❌ **MISSING** | Add Checkbox + RadioGroup |
| Popover | ✅ | ❌ **MISSING** | Add Popover (anchor + floating) |
| Collapsible | ✅ | ❌ **MISSING** | Add Collapsible |
| ScrollArea | ✅ | ❌ **MISSING** | Add ScrollArea |
| Toggle/ToggleGroup | ✅ | ❌ **MISSING** | Add Toggle + ToggleGroup |
| Resizable | ✅ | ❌ **MISSING** | Add Resizable panels |
| CLI installer | `npx shadcn add` | ❌ | Add `npx react-n-design add <Component>` |
| Figma kit | ✅ | ❌ | Create Figma community file |
| Tailwind-only | ✅ | styled-components | Add CSS-variables-only mode |
| Dark mode | Native | ThemeContext | Verify dark theme in all stories |

### vs MUI (Material-UI)
| Feature | MUI | react-n-design 0.6.0 | Gap |
|---|---|---|---|
| AppBar / Navbar | ✅ | ❌ **MISSING** | Add AppBar |
| Pagination | ✅ | ❌ **MISSING** | Add Pagination |
| Rating / Stars | ✅ | ❌ **MISSING** | Add Rating |
| SpeedDial | ✅ | ❌ **MISSING** | Add SpeedDial |
| Timeline | ✅ | ❌ **MISSING** | Add Timeline |
| BottomNavigation | ✅ | ❌ **MISSING** | Add BottomNav |
| Autocomplete | ✅ | ❌ **MISSING** | Enhance ComboBox or add Autocomplete |
| DataGrid Pro | Paid | DataGrid (basic) | Add column resizing, export |

### vs Ant Design
| Feature | Ant Design | react-n-design 0.6.0 | Gap |
|---|---|---|---|
| Descriptions (key-value display) | ✅ | ❌ **MISSING** | Add Descriptions |
| Result (success/error/empty states) | ✅ | ❌ **MISSING** | Add Result |
| Statistic (big number display) | ✅ | ❌ **MISSING** | Add Statistic |
| QRCode | ✅ | ❌ **MISSING** | Add QRCode |
| Watermark | ✅ | ❌ **MISSING** | Add Watermark |
| Tour / Onboarding | ✅ | ❌ **MISSING** | Add Tour |
| FloatButton | ✅ | ❌ **MISSING** | Add FloatButton |

---

## 3. Strategic Pillars for v0.7.0

### Pillar 1: Zero-Gap Test Coverage (TDD Workflow)
**Goal:** Every component has a `.test.tsx` file before v0.7.0 ships.
**TDD Rule:** For every missing component, write the test file *first*, watch it fail, then implement/fix the component until it passes.

**Priority order (impact × complexity):**
1. **AIChat** — highest visibility, needs message rendering, streaming, accessibility
2. **CommandPalette** — keyboard navigation, filtering, modal trap
3. **Markdown** — XSS vectors, link handling, code blocks
4. **CodeBlock** — copy button, syntax highlight stubs, accessibility
5. **DataGrid** — sorting, pagination, keyboard nav
6. **DatePicker / Calendar** — date math, locale, keyboard
7. **Toast / ToastProvider** — queue management, auto-dismiss, aria-live
8. **ComboBox** — autocomplete, aria-expanded, active descendant
9. **Tooltip** — positioning, hover delay, escape dismissal
10. **Drawer** — focus trap, body scroll lock, backdrop
11. **Form / FormField** — validation states, error messages
12. **Slider** — keyboard increments, aria-valuenow
13. **Accordion** — single vs multi expand, keyboard arrows
14. **Avatar** — image fallback, group stacking
15. **Breadcrumbs** — current page aria, collapsible overflow
16. **Menu / ContextMenu** — nested submenus, hover intent
17. **Carousel** — autoplay pause, swipe, pagination dots
18. **MultiSelect** — tag removal, dropdown checkbox
19. **Tree** — expand/collapse, lazy loading, keyboard
20. **FileUpload** — drag-drop, validation, progress
21. **ColorPicker** — hex input, preset swatches, a11y
22. **ProgressBar / Tag / Badge / Divider / Skeleton / VisuallyHidden / SkipToContent** — simple, fast to test
23. **Typography / Stack / Grid / Icon** — presentational but need snapshot/a11y tests
24. **Modal** — has tests but needs more edge cases (focus restoration)

### Pillar 2: Security Hardening
**Goal:** Zero known vulnerabilities, zero XSS vectors.

1. **Fix npm audit vulnerabilities**
   - Remove `jest` and `jest-environment-jsdom` entirely (we use Vitest)
   - Upgrade `ws` to 8.21.0+
   - Verify `jsdom` v26 doesn't pull in vulnerable `http-proxy-agent`

2. **XSS Sanitization**
   - Install `dompurify` as a dependency
   - Wrap `Markdown` rendered HTML through DOMPurify
   - Wrap `AIChat` message content through DOMPurify before `dangerouslySetInnerHTML`
   - Escape user-provided chart labels in `Charts` to prevent SVG XSS
   - Add `rel="noopener noreferrer"` to all external links in Markdown
   - Validate `ColorPicker` hex input against regex

3. **Content Security Policy (CSP) compatibility**
   - Document CSP headers required for styled-components (nonce support)
   - Ensure no inline `eval` or `Function()` calls in built code
   - Add `nonce` prop to ThemeProvider for CSP environments

### Pillar 3: Bundle Size & Performance
**Goal:** <150 KB ESM, verified tree-shaking, optional CSS Modules path.

1. **Bundle analysis**
   - Add `@size-limit/preset-small-lib` to CI
   - Set size-limit config in `package.json`: `limit: "150 KB"`
   - Add CI step that fails PRs exceeding size budget

2. **Tree-shaking verification**
   - Verify `import { Button } from 'react-n-design'` only bundles Button + styles
   - Fix any side-effect imports in barrel files
   - Add `sideEffects: ["*.css", "*.styles.ts"]` to package.json

3. **Dependency diet**
   - `framer-motion`: Only used in AnimatePresence/motion components. Consider lazy-loading or replacing simple transitions with CSS.
   - `react-icons`: Imports entire Fa* icon sets. Switch to tree-shakeable per-icon imports or inline SVGs for commonly used icons.
   - `styled-components`: Runtime CSS-in-JS adds ~30KB. Add CSS Modules alternative build.

4. **CSS Modules migration path (experimental)**
   - Create `src/styles/css-modules/` with `.module.css` files for core tokens
   - Add `src/index.css-modules.ts` entry point
   - Document: `import { Button } from 'react-n-design/css-modules'`

### Pillar 4: Critical Missing Components
**Goal:** Close the gap with shadcn/ui primitives. These are the most-requested missing pieces.

**Phase 1 (must-have for v0.7.0):**
1. **Checkbox** — Tri-state support, indeterminate, group
2. **RadioGroup** — Horizontal/vertical, card-style option
3. **Popover** — Anchor + floating positioning, focus management, click-outside
4. **Collapsible** — Animated expand/collapse, unmount on exit option
5. **ScrollArea** — Custom scrollbar (no native), auto-hide, horizontal
6. **Toggle / ToggleGroup** — Pressed state, single/multi, icon+label

**Phase 2 (v0.8.0):**
7. **AppBar / Navbar** — Responsive hamburger, sticky, elevation on scroll
8. **Pagination** — Ellipsis truncation, jump to page, size variants
9. **Rating** — Half-star, read-only, custom icon
10. **Result** — Success, error, 404, info preset layouts
11. **Statistic** — Count-up animation, prefix/suffix, trend indicator
12. **Resizable** — Drag handles, min/max constraints, persistence

### Pillar 5: Searchability & Discoverability
**Goal:** Top 10 npm search results for "react ui", "react components", "ai chat ui".

1. **npm SEO**
   - Update description: "50+ accessible, AI-native React components with zero-config install, RSC support, and neumorphic design."
   - Add 10 more keywords: `checkbox`, `radio`, `popover`, `scrollarea`, `timeline`, `rating`, `resizable`, `figma`, `cli`, `copy-paste`
   - Verify README keywords match package.json keywords

2. **GitHub**
   - Manually add topics (in repo settings): `react-components`, `ui-library`, `design-system`, `neumorphism`, `accessible-components`, `ai-ui`, `chatbot-ui`, `rsc`, `nextjs`, `typescript`, `storybook`, `zero-config`, `lightweight`
   - Create GitHub Releases with auto-generated changelogs
   - Enable "Sponsor this project" if applicable

3. **Content Marketing**
   - Publish dev.to article: "Building AI-Native UIs in React: A Deep Dive into react-n-design"
   - Publish Hashnode article: "Why I Moved from shadcn/ui to react-n-design"
   - Create 3-minute Loom video walkthrough of Storybook
   - Post on Reddit r/reactjs and r/webdev (follow sub rules)
   - Post on Hacker News Show HN (after v0.7.0)

4. **Documentation**
   - Auto-generate API docs from TypeScript interfaces (TypeDoc)
   - Add "Component Status" page showing test coverage per component
   - Add migration guide from MUI / Ant Design / Chakra
   - Add Next.js App Router integration guide

### Pillar 6: Developer Experience
**Goal:** Frictionless adoption, fewer GitHub issues, faster PR reviews.

1. **CLI Tool**
   - `npx react-n-design add Button` — downloads single component + styles to user project
   - `npx react-n-design init` — sets up ThemeProvider in user's app
   - Like shadcn but with our design tokens

2. **Figma Design Kit**
   - Publish free community file with all components
   - Match styled-components tokens exactly
   - Include light/dark mode frames

3. **VS Code Extension**
   - Snippets for each component: `rnd-button` → `<Button variant="primary">...</Button>`
   - Auto-import from `react-n-design`

4. **Pre-commit enforcement**
   - Husky + lint-staged: run Biome on staged files
   - Commit message linting (Conventional Commits)
   - Prevent commits with `console.log` or `debugger`

5. **CI Improvements**
   - Add bundle size check to PR workflow
   - Add accessibility audit to CI (axe-core on built Storybook)
   - Add Chromatic visual regression testing
   - Auto-publish canary releases from PRs

6. **TypeScript Strictness**
   - Enable `strict: true` in `tsconfig.json`
   - Fix all `any` types (especially in styled-components theme usage)
   - Add `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`

---

## 4. TDD Implementation Plan

### Sprint 1: Security + Infrastructure (Week 1)
**TDD Rule:** Write a security test first, then patch.

1. **Audit fix tests**
   - Write test: `npm audit` exits 0
   - Remove Jest deps, keep Vitest only
   - Upgrade `ws` via `npm audit fix`

2. **XSS sanitization tests**
   - `Markdown.test.tsx`: `<script>alert(1)</script>` → renders escaped text, not executed script
   - `AIChat.test.tsx`: message with `<img src=x onerror=alert(1)>` → sanitized
   - `Charts.test.tsx`: label with `</text><script>...` → renders as text, not SVG script

3. **Bundle size test**
   - Add `.size-limit.json`: `path: "dist/esm/index.js", limit: "150 KB"`
   - CI step runs `npx size-limit` and fails on exceed
   - *Test first:* `expect(bundleSize).toBeLessThan(150 * 1024)`

4. **Pre-commit hook test**
   - Install husky, lint-staged
   - Test: staged `.tsx` file with Biome error → commit blocked

### Sprint 2: Missing Primitives (Week 2)
**TDD Rule:** Write component interface + tests before any `.tsx` implementation.

| Component | Tests to Write First |
|---|---|
| Checkbox | renders checked/unchecked, tri-state indeterminate, group name, keyboard space, axe |
| RadioGroup | renders options, only one checked, keyboard arrows, aria-checked, axe |
| Popover | opens on click, closes on escape/click-outside, focus trap, portal, axe |
| Collapsible | expands/collapses, unmount option, animated height, axe |
| ScrollArea | renders custom scrollbar, auto-hide, horizontal mode, axe |
| Toggle | pressed state, toggle group single/multi selection, keyboard, axe |

**Implementation order:**
1. Define interfaces in `types.ts`
2. Write `.test.tsx` (all tests fail)
3. Implement `.tsx` + `.styles.ts`
4. Run tests until green
5. Write `.stories.tsx`
6. Add to `src/components/index.ts` barrel export

### Sprint 3: Test Backfill — AI & Data Components (Week 3)
**TDD Rule:** For existing untested components, write tests that expose bugs, then fix.

| Component | Critical Tests |
|---|---|
| AIChat | message list renders, streaming dots, send on enter, scroll to bottom, axe |
| CommandPalette | opens on Cmd+K, filters results, arrow navigation, Enter selects, Escape closes, axe |
| Markdown | headings, lists, links, code blocks, XSS sanitization, axe |
| CodeBlock | renders code, copy button copies, line numbers optional, syntax highlight stub, axe |
| DataGrid | renders rows, sort toggle, pagination, checkbox selection, axe |
| DatePicker | opens calendar, selects date, keyboard nav, min/max dates, axe |
| Calendar | renders month, prev/next, selected date, today highlight, axe |
| Toast | queue multiple toasts, auto-dismiss, pause on hover, aria-live polite, axe |

### Sprint 4: Test Backfill — Layout & Navigation (Week 4)

| Component | Critical Tests |
|---|---|
| Tooltip | appears on hover/focus, positions correctly, disappears on escape, axe |
| Drawer | opens/closes, focus trap, body scroll lock, axe |
| Accordion | expands single, expands multi, keyboard arrows, axe |
| Menu | opens on click, nested hover, click-outside closes, axe |
| Carousel | next/prev buttons, autoplay pause on hover, pagination dots, axe |
| Tree | expand/collapse, lazy load, keyboard arrows/enter, axe |
| Breadcrumbs | renders links, current page aria-current, collapsible overflow, axe |
| Slider | renders track, keyboard increments, min/max, aria-valuenow, axe |
| MultiSelect | select multiple, tag removal, dropdown checkbox, axe |
| FileUpload | drag-drop zone, file validation, progress bar, axe |
| ColorPicker | hex input, preset swatches, RGB output, axe |

### Sprint 5: DX + Searchability (Week 5)
**No TDD here — pure tooling and docs.**

1. TypeDoc API generation
2. README refresh (accurate counts, new components, comparison table)
3. GitHub topics update
4. dev.to article draft
5. Figma kit (if time permits, else v0.8.0)

---

## 5. Release Roadmap

### v0.7.0 — "Reliable" (Target: 4 weeks)
- **Theme:** Security, tests, and missing primitives
- All 49 components have test files
- 200+ passing tests
- 0 npm audit vulnerabilities
- 6 new primitives: Checkbox, RadioGroup, Popover, Collapsible, ScrollArea, Toggle
- Bundle size <150 KB
- Biome enforced in CI
- Husky pre-commit hooks
- Size-limit CI gate
- DOMPurify on Markdown + AIChat

### v0.8.0 — "Lightweight" (Target: 6 weeks after v0.7.0)
- CSS Modules experimental entry point
- `npx react-n-design add` CLI
- Replace react-icons with inline SVGs (reduce bundle by ~40KB)
- Lazy-load framer-motion (reduce initial bundle)
- 6 more components: AppBar, Pagination, Rating, Result, Statistic, Resizable
- Chromatic visual regression
- Auto-generated API docs site

### v1.0.0 — "Complete" (Target: Q3 2026)
- All planned components shipped
- 100% test coverage
- Verified in 3+ production apps
- Figma design kit published
- VS Code extension published
- Stable CSS Modules path
- First major blog feature (dev.to, CSS-Tricks, Smashing Magazine)
- Community Discord/Slack

---

## 6. Immediate Action Items (Today)

1. [ ] Create task list in project board for v0.7.0
2. [ ] Start Sprint 1: Remove Jest deps, fix `npm audit`
3. [ ] Write `Checkbox.test.tsx` (TDD kickoff)
4. [ ] Add `.size-limit.json` and size-limit CI step
5. [ ] Install `dompurify` + `@types/dompurify`
6. [ ] Update README component count (40+ → 50+)
7. [ ] Update README test count (41 → 86)
8. [ ] Enable Biome in CI test workflow

---

*This document is a living plan. Update it as priorities shift or new competitor features emerge.*
