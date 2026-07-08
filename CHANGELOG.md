# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.3.0] - 2026-07-08

### Changed

- Removed Storybook in favor of the new Vite-based documentation site.
- `npm run dev` now starts the documentation site instead of Storybook.
- GitHub Pages deploy workflow now publishes `site/dist`.

## [1.1.0] - 2026-05-26

### Added

#### New Components
- **Accordion** - Collapsible panels with keyboard navigation (Arrows, Home, End), ARIA support (tablist/tabpanel), single/multiple expansion modes
- **Popover** - Portal-based floating content with positioning (top/left/right/bottom/center), trigger modes (click/hover/focus), focus trap
- **TextArea** - Multi-line input with auto-resize, character counter, min/max rows, Form integration
- **TimePicker** - Time selection with 12h/24h format support, configurable minute intervals (:00/:15/:30/:45), AM/PM toggle, time restrictions
- **CopyButton** - Clipboard utility with icon toggle (copy → checkmark), tooltip feedback, size variants

#### Component Improvements
- **Collapsible** - Polished with smooth animations, full ARIA attributes (aria-expanded, aria-controls), disabled state support

### Testing

- **164 new unit tests** added across 6 components
- **Visual regression tests** for all new components
- **Storybook stories** for all new components

| Component | Unit Tests | Visual Tests |
|-----------|------------|--------------|
| Accordion | 35 | ✅ |
| Popover | 36 | ✅ |
| Collapsible | 30 | ✅ |
| TextArea | 20 | ✅ |
| TimePicker | 29 | ✅ |
| CopyButton | 14 | ✅ |

### Developer Experience
- Improved TypeScript generics support in Accordion
- Better focus management across components
- Consistent ARIA patterns throughout

### Notes
- Total components: 70+
- Bundle size optimized with tree-shaking support

## [1.0.0] - 2026-05-26

### Initial Stable Release

#### Complete Component Library (65+ Components)
- **Layout**: Grid, Stack, Divider, VirtualList, ScrollArea, Resizable, Space
- **Data Display**: Card, Table, Calendar, Tree, Steps, Timeline, Statistic, Badge, Tag, Avatar, Empty, Result, Skeleton, Chart
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, ColorPicker, FileUpload, Form, ComboBox, MultiSelect, Segmented, Rating, PromptInput, SuggestionChips, CommandPalette
- **Feedback**: Alert, Modal, Drawer, Toast, Tour
- **Navigation**: Menu, Tabs, Breadcrumb, Stepper, Pagination, FloatButton
- **AI Components**: AIChat, AIThinking

#### Features
- Full TypeScript support
- 348+ unit tests
- 165+ Playwright visual tests
- Storybook documentation
- Dark/light theme support
- Neomorphic design system
- React 18+ support
- Server Components (RSC) support

#### Security
- Fixed all ReDoS vulnerabilities in Form validation
- Secure regex patterns implemented

#### Documentation
- README with comprehensive examples
- Storybook deployed to GitHub Pages

