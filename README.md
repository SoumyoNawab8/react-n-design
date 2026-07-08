<div align="center">
  <br />
  <img src="logo.png" alt="react-n-design logo" width="160" />
  <br />
</div>

<h1 align="center">react-n-design</h1>

<p align="center">
  <strong>The AI-native, Neomorphic React component library.</strong><br/>
  89+ accessible components, zero-config install, RSC-ready, and built for the future of UI.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-n-design">
    <img src="https://img.shields.io/npm/v/react-n-design.svg?style=flat-square&color=cb3837" alt="npm version" />
  </a>
  <a href="https://bundlephobia.com/package/react-n-design">
    <img src="https://img.shields.io/bundlephobia/minzip/react-n-design?style=flat-square&color=brightgreen" alt="bundle size" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/SoumyoNawab8/react-n-design/main.yml?style=flat-square&color=blue" alt="build status" />
  </a>
  <a href="#testing">
    <img src="https://img.shields.io/badge/tests-348%20passing-brightgreen.svg?style=flat-square" alt="test coverage" />
  </a>
  <a href="#accessibility">
    <img src="https://img.shields.io/badge/a11y-axe--core-blueviolet.svg?style=flat-square" alt="accessibility" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-n-design.svg?style=flat-square&color=yellow" alt="license" />
  </a>
  <a href="#components">
    <img src="https://img.shields.io/badge/components-89+-blue.svg?style=flat-square" alt="components" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-n-design">
    <img src="https://img.shields.io/badge/NPM-View%20Package-cb3837?style=for-the-badge&cacheBuster=dsadad" alt="View on NPM" />
  </a>
  <a href="https://SoumyoNawab8.github.io/react-n-design/">
    <img src="https://img.shields.io/badge/Docs-Live%20Site-0070f3?style=for-the-badge&cacheBuster=dsadad" alt="Documentation Site" />
  </a>
</p>

---

## Installation

Zero-config. One command. Works out of the box.

```bash
npm install react-n-design
# or
yarn add react-n-design
# or
pnpm add react-n-design
```

No extra setup, no Tailwind config, no CSS imports needed. Just install and import.

**Peer dependencies required:**

| Package | Version |
| --- | --- |
| `react` | >=18.0.0 |
| `react-dom` | >=18.0.0 |

---

## Features

| Feature | Description |
| --- | --- |
|| 🎨 **Neomorphic Design** | Soft UI with realistic shadows, light diffusion, and tactile depth. No flat boredom. |
|| 🤖 **AI-Native Components** | Drop-in `AIChat`, `CommandPalette`, and Markdown renderers for LLM-powered apps. |
|| ⚡ **Zero-Config Install** | No build plugins, no CSS resets, no global style leakage. It just works. |
|| ⚙️ **RSC-Ready** | Dual entry point (`react-n-design` and `react-n-design/rsc`) for Next.js App Router compatibility. |
|| ♿ **Accessibility First** | axe-core validated, ARIA compliant, keyboard navigable, screen-reader friendly. |
|| 🔥 **Styled-Components** | No runtime CSS injection conflicts. Zero-runtime CSS variable fallbacks available. |
||| 📦 **Tree Shakable** | `sideEffects: false` ensures modern bundlers drop everything you do not use. |
||| 89 Components | Complete library with Form, Tour, Steps, Timeline, Stepper, Empty, FloatButton |
|| Full TypeScript | Strict mode, complete type declarations |
|| Tree Shakable | `sideEffects: false` for optimal bundling |
|| Battle Tested | 348+ tests across Vitest + axe-core |
|| RSC Ready | Dual entry point for Server Components |

---

## Why react-n-design?

| | react-n-design | shadcn/ui | MUI | Ant Design |
| --- | :---: | :---: | :---: | :---: |
| Neomorphic UI | :white_check_mark: | :x: | :x: | :x: |
| Zero-config install | :white_check_mark: | :x: (copy-paste) | :x: (theme setup) | :x: (CSS import) |
| AI-native components | :white_check_mark: | :x: | :x: | :x: |
| RSC / Next.js App Router | :white_check_mark: | :white_check_mark: | :x: | :x: |
| No Tailwind dependency | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: |
| Runtime bundle size | Small | Minimal* | Large | Large |
| Accessibility (axe-core) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| TypeScript | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

*shadcn/ui is a collection of copy-paste components, so it ships no runtime itself. react-n-design ships a polished, maintained runtime with CLI scaffolding and design cohesion out of the box.

---

## Quick Start

### Option A — Built-in theme context (recommended)

The `ThemeContextProvider` handles theme state and injects the theme into styled-components automatically. Use `useThemeContext` to read or toggle the active theme.

```tsx
import React from 'react';
import {
  ThemeContextProvider,
  useThemeContext,
  Button,
  Switch,
} from 'react-n-design';

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={() => toggleTheme()}
      label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
    />
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <ThemeToggle />
      <Button variant="primary">Hello World</Button>
    </ThemeContextProvider>
  );
}

export default App;
```

### Option B — Manual styled-components ThemeProvider

If you already have a `ThemeProvider` in your app, pass one of the built-in themes directly:

```tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, Button } from 'react-n-design';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}

export default App;
```

---

## Key Components

### Button

A tactile, Neomorphic button with multiple variants and full keyboard support.

```tsx
import { Button } from 'react-n-design';

<Button variant="primary" size="medium">
  Get Started
</Button>

<Button variant="secondary" size="small" disabled>
  Loading...
</Button>
```

### AIChat

Drop-in chat interface for AI conversations. Supports markdown rendering, typing indicators, auto-scroll, copy-to-clipboard, and ARIA live regions.

```tsx
import { AIChat } from 'react-n-design';

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    const reply = await fetchReply(text);
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setIsLoading(false);
  };

  return (
    <AIChat
      messages={messages}
      onSend={handleSend}
      isLoading={isLoading}
      placeholder="Ask anything..."
    />
  );
}
```

### CommandPalette

A Cmd+K spotlight-style command palette with fuzzy search, keyboard navigation, and accessible focus management.

```tsx
import { CommandPalette } from 'react-n-design';
import { useState, useEffect } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    { id: 'home', label: 'Go to Home', shortcut: 'G H', onSelect: () => navigate('/') },
    { id: 'settings', label: 'Open Settings', shortcut: 'G S', onSelect: () => navigate('/settings') },
    { id: 'logout', label: 'Log Out', onSelect: () => logout() },
  ];

  return (
    <CommandPalette
      open={open}
      onClose={() => setOpen(false)}
      items={items}
      placeholder="Search commands..."
    />
  );
}
```

---

## React Server Components

`react-n-design` provides a dual entry point for compatibility with React Server Components (RSC):

- **Client components** (default entry): `import { Button, Modal } from 'react-n-design'`
  - Includes interactive and animated components that require a client environment.
- **Server-safe exports** (RSC entry): `import { Badge, Divider, Skeleton } from 'react-n-design/rsc'`
  - Includes only components that can safely render in a server context (no `'use client'` directive).

Use the `/rsc` entry when you need to import components inside Server Components without adding a `"use client"` boundary.

```tsx
// In a Server Component (e.g., Next.js App Router)
import { Badge, Divider, Skeleton } from 'react-n-design/rsc';

export default function Page() {
  return (
    <div>
      <h1>Server-rendered content</h1>
      <Badge status="success">Live</Badge>
      <Divider />
      <Skeleton rows={3} />
    </div>
  );
}
```

---

## Theming

The library ships with `lightTheme` and `darkTheme` out of the box. Both are typed against the `Theme` type so your editor will autocomplete all tokens.

```tsx
import { lightTheme, darkTheme, Theme } from 'react-n-design';

// Create a custom theme
const customTheme: Theme = {
  name: 'custom',
  borderRadius: '8px',
  colors: {
    primary: '#0070f3',
    background: '#fafafa',
    white: '#ffffff',
    text: '#333333',
    shadowDark: '#d0d0d0',
    shadowLight: '#ffffff',
    hoverBg: '#e8e8e8',
    skeletonBg: '#e0e0e0',
    knobBg: '#f5f5f5',
    cardBg: '#f0f0f0',
  },
  shadows: {
    soft: '7px 7px 14px #d0d0d0, -7px -7px 14px #ffffff',
    softInset: 'inset 7px 7px 14px #d0d0d0, inset -7px -7px 14px #ffffff',
  },
};
```

---

## Form Validation

Built-in support for schema-based validation and popular form libraries.

### Zod Schema Validation

Pass a Zod schema to the `Form` component for automatic validation and error messaging:

```tsx
import { Form } from 'react-n-design';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

<Form zodSchema={schema} onSubmit={(data) => console.log(data)}>
  <Form.Input name="email" label="Email" />
  <Form.Input name="password" label="Password" type="password" />
  <Button type="submit">Submit</Button>
</Form>
```

### React Hook Form Adapter

Use the `withReactHookForm` adapter to plug react-n-design components into React Hook Form:

```tsx
import { withReactHookForm } from 'react-n-design';
import { useForm } from 'react-hook-form';

const { Input, Select } = withReactHookForm();

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="username" control={control} />
      <Select name="role" control={control} options={roles} />
    </form>
  );
}
```

---

## Glassmorphism & Visual Effects

Add modern glass-like depth and animated borders to your UI.

### Glassmorphism Variants

Card, Modal, and Drawer support a `variant="glass"` prop for frosted-glass aesthetics:

```tsx
<Card variant="glass">
  <Typography.Text>See-through elegance</Typography.Text>
</Card>

<Modal variant="glass" open={isOpen} onClose={handleClose}>
  <p>Glassmorphic dialog</p>
</Modal>
```

### GradientBorder

An animated conic-gradient border for eye-catching highlights:

```tsx
import { GradientBorder } from 'react-n-design';

<GradientBorder>
  <Card>Highlighted content</Card>
</GradientBorder>
```

### Enhanced Dark Mode

The built-in `darkTheme` now uses deep space blues (`#0f172a`) for a richer, more immersive night-time experience.

---

## Components

### General

| Component | Description |
| --- | --- |
| **Button** | Customizable button with multiple variants and states |
| **Card** | Neomorphic container for grouping content |
| **Icon** | Wrapper for react-icons with consistent sizing and color |
| **Tag** | Small label for keywords or categories |
| **Badge** | Status indicators and count badges |
| **Avatar** | User avatar with image fallback and grouping |
| **Skeleton** | Placeholder preview while content loads |
| **VisuallyHidden** | Hides content visually but keeps it accessible to screen readers |
| **SkipToContent** | Accessibility link to skip to main content |
| **Toast** | Notification system with positions and promise support |
| **Divider** | Horizontal or vertical separator line |

### Layout

| Component | Description |
| --- | --- |
| **Stack** | Flexbox-based vertical/horizontal layout with gap support |
| **Grid** | CSS Grid layout wrapper with responsive props |
| **Drawer** | Slide-over panel with focus trap and scroll lock |
| **Modal** | Dialog window that appears over the main content |
| **Tooltip** | Small pop-up label with multiple triggers and positions |
| **Resizable** | Resizable panel containers |
| **FloatButton** | Floating action button |
| **AppBar** | Application header/navigation bar |
| **ScrollArea** | Custom scrollbar container |
| **VirtualList** | Virtualized list for large datasets |
| **KanbanBoard** | Task board with columns and reordering |
| **ImageGallery** | Masonry grid with lightbox and lazy loading |

### Navigation

| Component | Description |
| --- | --- |
| **Tabs** | Organizes content into switchable views |
| **Accordion** | Vertically stacked, collapsible panels |
| **Breadcrumbs** | Navigation path with ARIA support |
| **Menu** | Dropdown menu with keyboard navigation |
| **Carousel** | Touch-friendly image/content slider |
| **Stepper** | Multi-step wizard with navigation |
| **Steps** | Horizontal step indicator |
| **Timeline** | Vertical timeline with events |
| **Tree** | Hierarchical tree view with expand/collapse |
| **Tour** | Onboarding tour with spotlight |
| **Pagination** | Page navigation with jump controls |
| **Popover** | Floating content panel with trigger |
| **Collapsible** | Expand/collapse content section |

### Forms

| Component | Description |
| --- | --- |
| **Input** | Advanced input with icons, addons, and validation states |
| **Select** | Feature-rich dropdown for single and multiple selections |
| **Switch** | Animated toggle for boolean states |
| **Slider** | Range input with keyboard and touch support |
| **ComboBox** | Autocomplete with filtering, multi-select, and async loading |
| **DatePicker** | Single/range date selection with keyboard navigation |
| **ColorPicker** | Color selection with preset swatches and custom input |
| **FileUpload** | Drag-and-drop file upload with image previews, progress, and validation |
| **MultiSelect** | Multiple selection dropdown with chips and search |
| **Form** | Form state management with validation |

### Input

| Component | Description |
| --- | --- |
| **OTPInput** / **PinInput** | One-time password digit input |
| **RichTextEditor** | Basic rich text editor with formatting toolbar |

### Data Display

| Component | Description |
| --- | --- |
| **Table** | Data table with sorting and pagination |
| **DataGrid** | Virtualized table with sorting, filtering, and pagination |
| **Alert** | Contextual feedback messages |
| **ProgressBar** | Visual indicator for task completion |
| **Typography** | Text primitives: **Text**, **Title**, and **Paragraph** |
| **Empty** | Empty state placeholder |
| **Result** | Result page with status |
| **Statistic** | Statistic value display |
| **Rating** | Star rating component |
| **Segmented** | Segmented control |
| **Charts** | Chart components with Recharts integration |
| **HeatmapCalendar** | GitHub-style contribution calendar |
| **GanttChart** | Project timeline chart |

### Visualization

| Component | Description |
| --- | --- |
| **OrgChart** | Hierarchical tree diagram |
| **Terminal** | Styled shell output for AI code execution |
| **AudioWaveform** | Voice input/output visualization |
| **GradientBorder** | Animated conic-gradient border component |

### AI & Productivity

| Component | Description |
| --- | --- |
| **AIChat** | Full chat interface with markdown, typing indicators, and copy actions |
| **AIThinking** | AI thinking state indicator |
| **CommandPalette** | Spotlight-style Cmd+K search with fuzzy matching and keyboard nav |
| **Markdown** | Secure markdown renderer for assistant messages and docs |
| **Calendar** | Interactive date grid with selection modes and keyboard nav |
| **CodeBlock** | Syntax-highlighted code display with copy button |
| **PromptInput** | Rich prompt input with history |
| **SuggestionChips** | AI suggestion chips |
| **Checkbox** | Checkbox with indeterminate state |
| **RadioGroup** | Radio button group |
| **Toggle** | Simple toggle switch |
| **StreamingText** | Typewriter effect with Markdown rendering |
| **ThinkingBlock** | Collapsible LLM reasoning chain visualization |
| **ToolCallCard** | AI tool call loading/success/error states |
| **PromptBuilder** | Few-shot prompt editor with variable highlighting |
| **ModelSelector** | AI model dropdown with context window, pricing, latency |
| **DiffViewer** | Side-by-side or inline diff for code/document comparison |
| **MentionInput** | @ mention support for users/documents/agents |

---

## Tree Shaking

`sideEffects: false` is set in `package.json`, so modern bundlers (webpack, Vite, Rollup) will automatically remove any components you do not import.

```tsx
// Only Button and Input end up in your bundle
import { Button, Input } from 'react-n-design';
```

---

## Testing

The library is tested with **Vitest** and **React Testing Library**. Every component is run against **axe-core** for accessibility violations.

```bash
# Run the full test suite (Vitest)
npm run test:vitest

# Run in watch mode  
npm run test:vitest:watch
```

---

## CLI

A small CLI is included to scaffold new components into your project:

```bash
# Initialize react-n-design in your project (sets up config and theme)
npx react-n-design init

# Add a component to your project (copies source to your local codebase)
npx react-n-design add <ComponentName>

# Example
npx react-n-design add Button
```

---

## Development

```bash
# Clone the repository
git clone https://github.com/SoumyoNawab8/react-n-design.git

# Install dependencies
npm install --legacy-peer-deps

# Start the documentation site for development
npm run dev

# Build the library
npm run build

# Build the documentation site for static deployment
npm run build:site
```

---

## Contributing

We love contributions. Here is how to get started:

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please make sure your code passes the existing test suite and includes axe-core accessibility coverage where applicable.

---

## Issues & Feature Requests

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/SoumyoNawab8/react-n-design/issues).

---

## License

MIT &copy; [SoumyoNawab8](https://github.com/SoumyoNawab8)
