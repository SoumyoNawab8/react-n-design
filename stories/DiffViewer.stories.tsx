import type { Meta, StoryObj } from '@storybook/react';
import { DiffViewer } from '../src/components/DiffViewer';

const meta: Meta<typeof DiffViewer> = {
  title: 'AI / DiffViewer',
  component: DiffViewer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A side-by-side or unified diff viewer for comparing text changes. Useful for code reviews, document revisions, and AI output diffs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    oldValue: { control: 'text' },
    newValue: { control: 'text' },
    mode: { control: 'select', options: ['split', 'unified'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const oldCode = `function greet(name) {
  console.log("Hello, " + name + "!");
}

function add(a, b) {
  return a + b;
}

const users = ["Alice", "Bob"];
users.forEach((user) => greet(user));`;

const newCode = `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

function add(a: number, b: number): number {
  return a + b;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach((user) => greet(user));`;

export const Default: Story = {
  args: {
    oldValue: oldCode,
    newValue: newCode,
    mode: 'split',
  },
};

export const Unified: Story = {
  args: {
    oldValue: oldCode,
    newValue: newCode,
    mode: 'unified',
  },
};

export const AddedLines: Story = {
  args: {
    oldValue: `import React from 'react';`,
    newValue: `import React from 'react';
import { useState } from 'react';`,
    mode: 'split',
  },
};

export const RemovedLines: Story = {
  args: {
    oldValue: `const API_KEY = "sk-1234567890abcdef";
const BASE_URL = "https://api.example.com";`,
    newValue: `const BASE_URL = "https://api.example.com";`,
    mode: 'split',
  },
};

export const DocumentDiff: Story = {
  args: {
    oldValue: `Project Proposal v1

Introduction
Our team will build a new dashboard.

Timeline
Q1: Design\nQ2: Development`,
    newValue: `Project Proposal v2

Introduction
Our team will build a new analytics dashboard with real-time updates.

Timeline
Q1: Design & Research\nQ2: Development\nQ3: Testing`,
    mode: 'split',
  },
};
