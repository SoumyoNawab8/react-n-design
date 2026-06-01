import type { Meta, StoryObj } from '@storybook/react';
import { Terminal } from '../src/components/Terminal';

const meta: Meta<typeof Terminal> = {
  title: 'AI / Terminal',
  component: Terminal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A terminal emulator component for displaying command output, logs, and AI tool call results with copy-to-clipboard support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lines: { control: 'object' },
    title: { control: 'text' },
    showTimestamps: { control: 'boolean' },
    maxHeight: { control: 'text' },
    autoScroll: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoLines = [
  { content: 'npm install react-n-design', type: 'command' as const },
  { content: '', type: 'output' as const },
  { content: 'added 42 packages in 3.2s', type: 'output' as const },
  { content: '', type: 'output' as const },
  { content: 'npx storybook@latest init', type: 'command' as const },
  { content: '', type: 'output' as const },
  { content: '╭────────────────────────────────────────╮', type: 'output' as const },
  { content: '│                                        │', type: 'output' as const },
  { content: '│   Storybook 8.0 for React+Vite         │', type: 'output' as const },
  { content: '│                                        │', type: 'output' as const },
  { content: '╰────────────────────────────────────────╯', type: 'output' as const },
  { content: '', type: 'output' as const },
  { content: '✔ Do you want to run the eslintPlugin automation? · Yes', type: 'output' as const },
  { content: '✔ What do you want to use for TypeScript? · tsc', type: 'output' as const },
  { content: '', type: 'output' as const },
  { content: 'To run your Storybook, type: npm run storybook', type: 'info' as const },
];

const errorLines = [
  { content: 'npm run build', type: 'command' as const },
  { content: '', type: 'output' as const },
  { content: '> react-n-design@0.4.0 build', type: 'output' as const },
  { content: '> rollup -c', type: 'output' as const },
  { content: '', type: 'output' as const },
  { content: 'src/components/Button/Button.tsx:42:10 - error TS2322: Type string is not assignable to type boolean.', type: 'error' as const },
  { content: '', type: 'output' as const },
  { content: 'Found 1 error. Watching for file changes.', type: 'error' as const },
];

const aiToolLines = [
  { content: 'Running tool: read_file', type: 'command' as const },
  { content: 'Reading /src/components/Terminal/Terminal.tsx...', type: 'output' as const },
  { content: '97 lines read successfully.', type: 'info' as const },
  { content: '', type: 'output' as const },
  { content: 'Running tool: edit_file', type: 'command' as const },
  { content: 'Applied edit to Terminal.tsx', type: 'info' as const },
  { content: '', type: 'output' as const },
  { content: 'Running tool: run_tests', type: 'command' as const },
  { content: '✓ 12 tests passed (42ms)', type: 'info' as const },
];

export const Default: Story = {
  args: {
    lines: demoLines,
    title: 'Terminal',
    showTimestamps: false,
    autoScroll: true,
  },
};

export const WithTimestamps: Story = {
  args: {
    lines: [
      { content: 'git commit -m "feat: add Terminal component"', type: 'command', timestamp: '10:42:05' },
      { content: '[main 3f4a2b1] feat: add Terminal component', type: 'output', timestamp: '10:42:06' },
      { content: ' 3 files changed, 97 insertions(+)', type: 'output', timestamp: '10:42:06' },
      { content: 'git push origin main', type: 'command', timestamp: '10:42:18' },
      { content: 'Enumerating objects: 15, done.', type: 'output', timestamp: '10:42:19' },
    ],
    title: 'Git Log',
    showTimestamps: true,
    autoScroll: false,
  },
};

export const Errors: Story = {
  args: {
    lines: errorLines,
    title: 'Build Output',
    autoScroll: true,
  },
};

export const AIToolCalls: Story = {
  args: {
    lines: aiToolLines,
    title: 'AI Agent',
    autoScroll: true,
  },
};

export const Empty: Story = {
  args: {
    lines: [],
    title: 'Terminal',
  },
};

export const Scrolled: Story = {
  args: {
    lines: Array.from({ length: 50 }, (_, i) => ({
      content: `Log line ${i + 1}: Processing batch ${Math.floor(i / 10) + 1}`,
      type: 'output' as const,
    })),
    title: 'Server Logs',
    maxHeight: '300px',
    autoScroll: true,
  },
};
