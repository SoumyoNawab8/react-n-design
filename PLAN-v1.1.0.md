# v1.1.0 Implementation Plan

**Theme:** Performance & Accessibility  
**Target:** Q3 2026 | **Status:** Draft

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Test Stability
**Goal:** Green CI, reliable builds

| Task | Effort | Owner | Tests |
|------|--------|-------|-------|
| Fix AIChat auto-scroll test | 2h | Dev | JSDOM compat |
| Address Biome lint warnings | 4h | Dev | `npx biome check --write src` |
| Stabilize flaky E2E tests | 4h | Dev | Playwright retries |
| Verify all 67 components in CI | 2h | QA | Visual baseline |

**Success Criteria:**
- [ ] 0 failing tests in CI
- [ ] <20 Biome warnings remaining
- [ ] Build time <60s

---

## Phase 2: Performance (Week 3-5)

### 2.1 Bundle Size Audit
**Goal:** <150KB gzipped total

| Component | Current | Target | Action |
|-----------|---------|--------|--------|
| Charts | ~45KB | ~25KB | Code-split dynamic import |
| DatePicker | ~35KB | ~20KB | Tree-shake unused locales |
| DataGrid | ~40KB | ~25KB | Virtual scroll lazy load |
| Icons | ~25KB | ~10KB | Remove unused icon sets |

**Tasks:**
1. [ ] Run `npm run build && npm run test:size`
2. [ ] Analyze with `npx size-limit --why`
3. [ ] Implement dynamic imports for heavy components
4. [ ] Verify tree-shaking with esbuild-visualizer

**Success Criteria:**
- [ ] Total bundle <150KB gzipped
- [ ] Individual imports work (test `import { Button }`)

### 2.2 Code Splitting
```typescript
// Before: Static import
import { Charts } from 'react-n-design';

// After: Dynamic import with loading state
const Charts = lazy(() => import('react-n-design/Charts'));
```

Components to split:
- [ ] Charts (bar, line, pie charts)
- [ ] DatePicker + Calendar
- [ ] DataGrid with all features
- [ ] Tour (uses framer-motion heavily)

### 2.3 React Compiler
**Goal:** Verify compatibility

- [ ] Test with React Compiler (v19 RC)
- [ ] Add `useMemo`, `useCallback` audit
- [ ] Document Compiler-ready status

---

## Phase 3: Accessibility (Week 6-8)

### 3.1 WCAG 2.1 AA Audit

| Component | Audit Status | Priority |
|-----------|--------------|----------|
| Button | ✅ Pass | P1 |
| Form | ⚠️ Review | P0 |
| Modal | ⚠️ Focus trap | P0 |
| Tour | ⚠️ ARIA labels | P0 |
| DataGrid | ⚠️ Keyboard nav | P0 |
| Charts | ⚠️ Alt text | P1 |

**Tasks:**
- [ ] Run axe-core on all Storybook stories
- [ ] Fix missing `aria-label` attributes
- [ ] Add `role="dialog"` to Modals
- [ ] Implement focus trap with `react-focus-lock`

### 3.2 Screen Reader Testing

**Platforms to test:**
- [ ] NVDA + Chrome (Windows)
- [ ] VoiceOver + Safari (macOS)
- [ ] JAWS + Edge (Windows - enterprise)

**Components to validate:**
- [ ] Form validation announcements
- [ ] Toast notifications (live regions)
- [ ] Tour step announcements
- [ ] Modal focus management

### 3.3 Keyboard Navigation

| Component | Tab Order | Enter/Space | Arrow Keys | Esc |
|-----------|-----------|-------------|------------|-----|
| Modal | ✅ | ✅ | N/A | ✅ Close |
| Menu | ⚠️ | ✅ | ✅ | ✅ Close |
| Select | ✅ | ✅ | ✅ | ✅ Close |
| Tour | ⚠️ | ✅ | N/A | ✅ Skip |
| DataGrid | ⚠️ | ✅ | ⚠️ | N/A |

**Gaps to address:**
- [ ] Menu: Arrow key navigation
- [ ] Tour: Tab trap in step content
- [ ] DataGrid: Cell arrow navigation

---

## Phase 4: Developer Experience (Week 9-10)

### 4.1 Documentation
- [ ] Migration guide from v0.9.x
- [ ] Performance best practices guide
- [ ] Accessibility guidelines per component
- [ ] Storybook interactive controls

### 4.2 Visual Testing
- [ ] Set up Chromatic for Storybook
- [ ] Snapshot all 67 components
- [ ] PR checks for visual diffs

### 4.3 CLI Improvements
- [ ] `npx react-n-design add Button` - individual component install
- [ ] `npx react-n-design doctor` - health check
- [ ] Tree-shaking diagnostics

---

## Deliverables

### v1.1.0 Release Checklist

- [ ] All P0 tasks complete
- [ ] Bundle size <150KB
- [ ] A11y score >95%
- [ ] 0 failing tests
- [ ] Updated CHANGELOG.md
- [ ] Migration guide published
- [ ] Storybook redeployed
- [ ] NPM publish

### Artifacts
1. `CHANGELOG.md` - all changes documented
2. `MIGRATION-v1.1.md` - upgrade guide
3. `PERFORMANCE.md` - optimization tips
4. `ACCESSIBILITY.md` - a11y testing guide

---

## Timeline Summary

```
Week 1-2:  Foundation      [Lint fixes, test stability]
Week 3-5:  Performance     [Bundle audit, code-splitting]
Week 6-8:  Accessibility   [WCAG audit, screen readers]
Week 9-10: DX              [Docs, Chromatic, CLI]
Week 11:   Buffer          [Bug fixes, polish]
Week 12:   Release         [v1.1.0 launch]
```

---

## Resource Allocation

| Phase | Dev Hours | QA Hours | Design Hours |
|-------|-----------|----------|--------------|
| 1. Foundation | 12 | 4 | 0 |
| 2. Performance | 20 | 8 | 4 |
| 3. A11y | 24 | 16 | 8 |
| 4. DX | 16 | 4 | 4 |
| **Total** | **72** | **32** | **16** |

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| A11y takes longer | High | Start Phase 3 earlier, parallel tracking |
| Bundle split breaks tree-shake | Medium | Verify with `agadoo` before merge |
| React Compiler bugs | Medium | Use feature flag, fallback to current bundle |
| Screen reader testing | Medium | Use axe-core + manual spot checks |

---

## Success Metrics

```
Pre-v1.1.0          Post-v1.1.0 Target
─────────────       ────────────────────
Bundle: ~180KB      Bundle: <150KB
Tests: 348 passing  Tests: 400+ passing
A11y: ~85%          A11y: >95%
Build: 90s          Build: <60s
Lint: 92 errors     Lint: 0 errors
```

---

*Plan created: June 2026 | Review: Monthly*