<div align="center">
  <br />
  <h1>🎨 react-n-design</h1>
  <br />
</div>

<p align="center">
  A stunning, lightweight, and modern React component library built with TypeScript and styled-components, based on <strong>Neomorphic</strong> design principles.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-n-design">
    <img src="https://img.shields.io/badge/NPM-View%20Package-cb3837?style=for-the-badge&cacheBuster=dsadad" alt="View on NPM" />
  </a>
  <a href="https://SoumyoNawab8.github.io/react-n-design/">
    <img src="https://img.shields.io/badge/Storybook-Live%20Demo-ff4785?style=for-the-badge&cacheBuster=dsadad" alt="Storybook Live Demo" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-n-design">
    <img src="https://img.shields.io/npm/v/react-n-design.svg?style=flat-square" alt="NPM Version" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/SoumyoNawab8/react-n-design/main.yml?style=flat-square&cacheBuster=dsadad" alt="Build Status" />
  </a>
  <a href="https://bundlephobia.com/package/react-n-design">
    <img src="https://img.shields.io/bundlephobia/minzip/react-n-design?style=flat-square&cacheBuster=dsadad" alt="Bundle Size" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-n-design.svg?style=flat-square&cacheBuster=1234" alt="License" />
  </a>
</p>

## 🚀 Installation

Install the package along with its required peer dependencies:

```bash
npm install react react-dom react-n-design styled-components framer-motion react-icons
# or
yarn add react react-dom react-n-design styled-components framer-motion react-icons
```

**Peer dependencies required:**

| Package | Version |
| --- | --- |
| `react` | >=18.0.0 |
| `react-dom` | >=18.0.0 |
| `styled-components` | >=5.0.0 |
| `framer-motion` | >=6.0.0 |
| `react-icons` | >=4.0.0 |

## 💻 Quick Start

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
      onChange={toggleTheme}
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

## 🎨 Theming

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

## 🧩 Components

| Component | Description |
| --- | --- |
| **Button** | Customizable button with multiple variants and states |
| **Card** | Neomorphic container for grouping content |
| **Input** | Advanced input with icons, addons, and validation states |
| **Select** | Feature-rich dropdown for single and multiple selections |
| **Switch** | Animated toggle for boolean states |
| **Table** | Data table with sorting and pagination |
| **Modal** | Dialog window that appears over the main content |
| **Tooltip** | Small pop-up label with multiple triggers and positions |
| **Tabs** | Organizes content into switchable views |
| **Accordion** | Vertically stacked, collapsible panels |
| **Alert** | Contextual feedback messages |
| **ProgressBar** | Visual indicator for task completion |
| **Tag** | Small label for keywords or categories |
| **Skeleton** | Placeholder preview while content loads |

### Examples

```tsx
import { Button, Input, Card, Alert } from 'react-n-design';

// Button
<Button variant="primary" size="medium">Primary Button</Button>

// Input
<Input label="Email" placeholder="Enter your email" inputSize="medium" allowClear />

// Card
<Card variant="default" padding="20px">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// Alert
<Alert
  type="success"
  message="Success!"
  description="Your action was completed successfully."
  showIcon
  closable
/>
```

## 📦 Tree Shaking

`sideEffects: false` is set in `package.json`, so modern bundlers (webpack, Vite, Rollup) will automatically remove any components you do not import.

```tsx
// Only Button and Input end up in your bundle
import { Button, Input } from 'react-n-design';
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/SoumyoNawab8/react-n-design.git

# Install dependencies
npm install

# Start Storybook for development
npm run dev

# Build the library
npm run build
```

## 🐛 Issues & Feature Requests

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/SoumyoNawab8/react-n-design/issues).

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [SoumyoNawab8](https://github.com/SoumyoNawab8)