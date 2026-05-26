# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-XX

### Stable Release - Production Ready

**This is the first stable major release of react-n-design. After 9+ months of development, the API is now finalized and production-ready.**

### Added

- **67 Components** - Complete component library
  - **General**: Button, Card, Icon, Tag, Badge, Avatar, Skeleton, VisuallyHidden, SkipToContent, Toast, Divider
  - **Layout**: Stack, Grid, Drawer, Modal, Tooltip, Resizable, FloatButton, AppBar, ScrollArea, VirtualList
  - **Navigation**: Tabs, Accordion, Breadcrumbs, Menu, Carousel, Stepper, Steps, Timeline, Tree, Tour, Pagination, Popover, Collapsible
  - **Forms**: Input, Select, Switch, Slider, ComboBox, DatePicker, ColorPicker, FileUpload, MultiSelect, Form
  - **Data Display**: Table, DataGrid, Alert, ProgressBar, Typography, Empty, Result, Statistic, Rating, Segmented, Charts
  - **AI & Productivity**: AIChat, AIThinking, CommandPalette, Markdown, Calendar, CodeBlock, PromptInput, SuggestionChips, Checkbox, RadioGroup, Toggle, Skeleton

- **New Components in v1.0.0**
  - `Empty` - Empty state placeholder component
  - `FloatButton` - Floating action button with menu support
  - `Form` - Complete form state management with validation
  - `Tour` - Onboarding tour with spotlight and steps
  - `Steps` - Horizontal step indicator
  - `Timeline` - Vertical timeline component

- **Developer Experience**
  - 348+ unit tests across all components (Vitest)
  - Full TypeScript strict mode compliance
  - Storybook documentation for all 67 components
  - axe-core accessibility validation
  - E2E tests with Playwright (Form, Tour)
  - ROADMAP.md and PLAN-v1.1.0.md documentation

- **AI-Native Components Suite**
  - `AIChat` - Full chat interface with markdown and typing indicators
  - `AIThinking` - Configurable thinking state display
  - `PromptInput` - Rich prompt input with command history
  - `SuggestionChips` - AI-powered suggestion chips

### Fixed

- **TypeScript Errors** - Resolved all type errors in:
  - `Empty` component (theme integration)
  - `FloatButton` component (style types)
  - `Form` component (context types, validation)
  - `Tour` component (spotlight types)
  - `AIThinking` index exports
  - `theme.ts` getThemeCSS function
  - `lazyMotion.tsx` type compatibility

- **Testing**
  - 51 new unit tests added for previously skipped components
  - Form validation tests (required, email, pattern rules)
  - Empty state rendering tests
  - FloatButton interaction tests
  - Tour navigation and callback tests

### Changed

- **Documentation**
  - Updated README with accurate component count (67)
  - Updated test badge to 348+ passing tests
  - Added Roadmap section with v1.1.0 and v2.0.0 plans
  - Complete component categorization in documentation
  - Added PLAN-v1.1.0.md with detailed 12-week implementation plan

### Compatibility

- React 18+ (peer dependency)
- React Server Components (RSC) ready
- styled-components 6+ required
- TypeScript 6+ strict mode

### Known Issues

- AIChat auto-scroll test fails in JSDOM (works in browser)
- 92 Biome lint warnings to address in v1.1.0
- Bundle size ~180KB (target: <150KB in v1.1.0)

---

## [0.9.1] - 2026-05-XX

### Fixed

- Resolved Biome lint errors in 6 components:
  - Checkbox
  - Collapsible
  - Popover
  - RadioGroup
  - ScrollArea
  - Toggle

---

## [0.9.0] - 2026-05-XX

### Added

- New components:
  - Steps
  - Timeline
  - Empty
  - FloatButton
  - Tour
  - Segmented
- Initial Storybook documentation for new components

---

## [0.8.0] and earlier

### Added

- Initial 50+ component library
- AIChat, CommandPalette, and AI-native features
- Dual entry point for RSC support
- Theme system with light/dark modes
- CLI for component scaffolding

---

## Upcoming Releases

- **v1.1.0** (Q3 2026) - Performance & Accessibility
- **v2.0.0** (Q4 2026) - API Modernization

See [ROADMAP.md](./ROADMAP.md) for details.
