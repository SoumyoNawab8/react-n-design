# react-n-design Roadmap

## Current Status: v1.0.0 (Stable)

- **67 Components** shipped
- **400+ Unit Tests** (348 passing)
- **TypeScript-first** with full type declarations
- **Storybook Documentation** live at https://soumyonawab8.github.io/react-n-design/
- **Zero Breaking Changes** API is stable

---

## Release History

| Version | Date | Highlights |
|---------|------|------------|
| v0.9.1 | May 2026 | Biome lint fixes, production polish |
| **v1.0.0** | June 2026 | Production stable, 67 components, full TS coverage |
| v1.1.0 | Q3 2026 | *(planned)* Performance + Accessibility |
| v2.0.0 | Q4 2026 | *(planned)* Breaking API refresh, new theming |

---

## v1.1.0 Roadmap (Next Minor Release)

**Target:** Q3 2026 | **Theme:** Performance & Accessibility

### P0 - Critical
- [ ] Fix remaining AIChat auto-scroll test (JSDOM compatibility)
- [ ] Resolve Biome lint warnings (92 errors, 185 warnings)
- [ ] Bundle size audit: target <150KB gzipped total

### P1 - Performance
- [ ] Tree-shaking optimization audit
- [ ] Code-splitting for heavy components (Charts, DatePicker, DataGrid)
- [ ] React Compiler compatibility testing
- [ ] Server Component compatibility (RSC) expansion

### P2 - Accessibility
- [ ] WCAG 2.1 AA compliance audit on all components
- [ ] Screen reader testing (NVDA, VoiceOver, JAWS)
- [ ] Keyboard navigation coverage gaps
- [ ] Color contrast verification (minimum 4.5:1)
- [ ] Focus management improvements

### P3 - DX/Developer Experience
- [ ] CLI documentation improvements
- [ ] Migration guides for major versions
- [ ] Interactive playground in Storybook
- [ ] Visual regression testing with Chromatic

---

## v2.0.0 Roadmap (Next Major Release)

**Target:** Q4 2026 | **Theme:** API Modernization

### Breaking Changes (Planned)
- [ ] Theme v2: CSS-only theming (drop styled-components runtime)
- [ ] React 19+ requirement (drop React 18 support)
- [ ] Component consolidation: merge similar components
- [ ] Remove deprecated props (marked in v1.x)

### New Architecture
- [ ] CSS variables for dynamic theming
- [ ] Unstyled primitive components
- [ ] Headless UI layer for maximum flexibility
- [ ] Zero-JS option for static sites

### New Components (Planned)
- [ ] DataTable v2: Virtual scrolling + sorting built-in
- [ ] CommandPalette v2: Fuzzy search improvements
- [ ] RichText: Slate.js integration option
- [ ] Kanban: Drag-and-drop board component

---

## Proposed v1.1.0 Implementation Plan

I'll create the detailed implementation plan for v1.1.0. This includes:

1. **Phase 1: Foundation** - Lint fixes, test stability
2. **Phase 2: Performance** - Bundle audit, code-splitting  
3. **Phase 3: A11y** - WCAG audit, screen reader testing
4. **Phase 4: Polish** - Documentation, examples, release

Shall I proceed with creating the detailed v1.1.0 implementation plan with specific tasks, timelines, and test strategies?

---

## Component Request Backlog

| Component | Priority | Notes |
|-----------|----------|-------|
| RichText Editor | Medium | Tiptap/Quill integration |
| Gantt Chart | Low | Enterprise feature |
| Heatmap | Low | Data visualization |
| Masonry Grid | Medium | Pinterest-style layout |
| Resizable Panels | Medium | VS Code-style splits |
| Command K v2 | High | Fuse.js integration |

---

## Maintenance Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Security audit | Monthly | CI/CD |
| Dependency updates | Weekly | Automated |
| Visual regression | Per PR | Playwright |
| Performance budgets | Per release | Bundle analyzer |
| Accessibility audit | Quarterly | Manual QA |

---

## Metrics Dashboard

```
Target v1.1.0:
├── Bundle Size: <150KB (currently ~180KB)
├── Components: 70+ (currently 67)
├── Test Coverage: >95% (currently ~92%)
├── A11y Score: 100% (currently ~85%)
└── TypeScript: Strict mode enabled
```

---

## Decision Log

- **v1.0.0**: Keep styled-components (decided June 2026) - ecosystem momentum
- **v2.0.0**: Evaluate CSS-in-JS alternatives (Panda, StyleX, Tailwind)
- **RSC Support**: Gradual adoption, mark heavy components accordingly

---

*Last Updated: June 2026 | Maintainer: SoumyoNawab8*
