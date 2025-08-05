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

```bash
npm install react-n-design styled-components react-icons
```

**Note:** This package requires `styled-components` and `react-icons` as peer dependencies.

## 📖 Usage

### Basic Setup

Wrap your app with the ThemeProvider to enable theming:

```tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, Button } from 'react-n-design';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        <Button variant="primary">Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### With Custom Theme Context

For better theme management with dark/light mode support:

```tsx
import React from 'react';
import { 
  ThemeContextProvider, 
  useThemeContext, 
  Button, 
  Switch 
} from 'react-n-design';

function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeContext();
  
  return (
    <Switch 
      checked={isDark} 
      onChange={toggleTheme}
      label={isDark ? 'Dark Mode' : 'Light Mode'}
    />
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <div>
        <ThemeToggle />
        <Button variant="primary">Hello World</Button>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
```

## 🧩 Components

### Button
```tsx
import { Button } from 'react-n-design';

<Button variant="primary" size="medium">
  Primary Button
</Button>
```

### Input
```tsx
import { Input } from 'react-n-design';

<Input 
  label="Email"
  placeholder="Enter your email"
  inputSize="medium"
  allowClear
/>
```

### Card
```tsx
import { Card } from 'react-n-design';

<Card variant="default" padding="20px">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

### Alert
```tsx
import { Alert } from 'react-n-design';

<Alert 
  type="success" 
  message="Success!" 
  description="Your action was completed successfully."
  showIcon
  closable
/>
```

## 🎨 Theming

The library comes with light and dark themes out of the box:

```tsx
import { lightTheme, darkTheme, Theme } from 'react-n-design';

// You can also create custom themes
const customTheme: Theme = {
  name: 'custom',
  colors: {
    primary: '#your-color',
    background: '#your-bg',
    // ... other color properties
  },
  shadows: {
    soft: 'your-shadow',
    softInset: 'your-inset-shadow',
  },
  borderRadius: '8px',
};
```

## 📦 Tree Shaking

The library supports tree shaking. Import only what you need:

```tsx
// Import individual components
import { Button } from 'react-n-design';

// Or import multiple components
import { Button, Input, Card } from 'react-n-design';
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

## 📋 Requirements

- React >= 18.0.0
- styled-components >= 5.0.0
- react-icons >= 4.0.0

## 🐛 Issues & Feature Requests

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/SoumyoNawab8/react-n-design/issues).

## 📄 License

MIT © [SoumyoNawab8](https://github.com/SoumyoNawab8)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

---

**Made with ❤️ by [SoumyoNawab8](https://github.com/SoumyoNawab8)**
* **Animated & Accessible:** Fluid animations powered by `framer-motion` and a focus on accessibility.
* **Well Documented:** Explore every component interactively with Storybook.

---

### ## 🚀 Installation

`react-n-design` has peer dependencies on `react` and `styled-components`.

```bash
npm install react-n-design styled-components
# or
yarn add react-n-design styled-components
```

---

### ## 💻 Quick Start

To start using the components, wrap your application's root with the `ThemeProvider`.

```jsx
import React from 'react';
import { Button, Card, theme } from 'react-n-design';
import { ThemeProvider } from 'styled-components';

const App = () => (
  <ThemeProvider theme={theme}>
    <div style={{ background: theme.colors.background, padding: '2rem' }}>
      <Card>
        <h3>Welcome to react-n-design!</h3>
        <p>This is a card component containing a button.</p>
        <Button 
          leftIcon="🎉" 
          onClick={() => alert('Welcome!')}
        >
          Get Started
        </Button>
      </Card>
    </div>
  </ThemeProvider>
);

export default App;
```

---
### ## 🌳 Tree Shaking & Performance

`react-n-design` is optimized for performance and supports tree shaking out of the box. For the best possible bundle size, you can import components directly.

**Standard Import (Good):**
Your bundler will do its best to remove unused components.
```jsx
import { Button, Card, Input } from 'react-n-design';
```

---
### ## 🎨 Interactive Docs with Storybook

The best way to explore the entire component library is with our interactive Storybook documentation. It allows you to view every component, see all its variations, and play with its props in a live environment.

To run Storybook locally, clone the repository and run:

```bash
npm run dev
```

---

### ## 📦 Component Overview

`react-n-design` comes packed with a wide range of components to build a complete application.

| Component      | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| **Button** | A highly customizable button with multiple variants and states.  |
| **Card** | A neomorphic container for grouping content.                |
| **Input** | An advanced input with icons, addons, and validation states. |
| **Select** | A feature-rich dropdown for single and multiple selections. |
| **Switch** | An animated toggle for boolean states, with icons and sizes. |
| **Table** | A data table with sorting and pagination.                   |
| **Modal** | A dialog window that appears over the main content.         |
| **Tooltip** | A small pop-up label with multiple triggers and positions.  |
| **Tabs** | A component for organizing content into switchable views.   |
| **Accordion** | A set of vertically stacked, collapsible panels.            |
| **Alert** | A component for displaying contextual feedback messages.    |
| **ProgressBar**| A visual indicator for task completion.                     |
| **Tag** | A small component for keywords, categories, or labels.      |
| **Skeleton** | A placeholder preview for content while it's loading.       |


---

### ## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

### ## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.