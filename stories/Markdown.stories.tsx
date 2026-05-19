import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from '../src/components/Markdown';

const meta: Meta<typeof Markdown> = {
  title: 'AI / Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A safe markdown renderer supporting headings, paragraphs, lists, code blocks, tables, links, emphasis, and inline code.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const fullDoc = `# react-n-design Markdown

This is a **bold** statement and this is *italic*. You can also ~~strikethrough~~ text.

## Code Example

Inline code: \`npm install react-n-design\`

\`\`\`typescript
import { AIChat } from 'react-n-design';

function App() {
  return <AIChat messages={[]} onSend={(msg) => console.log(msg)} />;
}
\`\`\`

## Lists

### Unordered
- AIChat component
- CommandPalette
- Calendar

### Ordered
1. Install the package
2. Wrap with ThemeContextProvider
3. Import components

## Table

| Feature | Status |
|---------|--------|
| AI Chat | ✅ Shipped |
| RSC | ✅ Supported |
| Dark Mode | ✅ Built-in |

## Blockquote

> The only React component library with a complete Neomorphic design system, AI-native components, full RSC support, and enterprise-grade accessibility.

---

[View on GitHub](https://github.com/SoumyoNawab8/react-n-design)`;

export const FullDocument: Story = {
  args: {
    children: fullDoc,
  },
};

export const Headings: Story = {
  args: {
    children: '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6',
  },
};

export const InlineFormatting: Story = {
  args: {
    children: 'This is **bold**, *italic*, \`code\`, and ~~strikethrough~~.',
  },
};

export const TableOnly: Story = {
  args: {
    children: '| Name | Version |\n|------|---------|\n| react | 18+ |\n| react-n-design | 0.4.3 |',
  },
};

export const Empty: Story = {
  args: {
    children: '',
  },
};
