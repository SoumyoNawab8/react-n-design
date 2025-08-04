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
    <img src="https://img.shields.io/npm/v/react-n-design.svg?style=flat-square&cacheBuster=dsadad" alt="NPM Version" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/SoumyoNawab8/react-n-design/main.yml?branch=master&style=flat-square&cacheBuster=dsadad" alt="Build Status" />
  </a>
  <a href="https://bundlephobia.com/package/react-n-design">
    <img src="https://img.shields.io/bundlephobia/minzip/react-n-design?style=flat-square&cacheBuster=dsadad" alt="Bundle Size" />
  </a>
  <a href="https://github.com/SoumyoNawab8/react-n-design/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-n-design.svg?style=flat-square&cacheBuster=1234" alt="License" />
  </a>
</p>



---

### ## 🤔 Why `react-n-design`?

Tired of the same flat UI components? `react-n-design` offers a fresh, tactile, and visually appealing alternative. Based on the principles of **Neomorphism**, our components use soft shadows and highlights to create an illusion of depth, making your UI feel like it's extruding from the background. It's modern, clean, and a joy to interact with.

---

### ## ✨ Features

* **Beautiful Design:** Soft, modern UI based on Neomorphism.
* **Highly Customizable:** Components come with a rich set of props for easy customization.
* **Fully Typed:** Written entirely in **TypeScript** for a superb developer experience.
* **Lightweight & Performant:** Optimized for a small bundle size with tree-shaking support.
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