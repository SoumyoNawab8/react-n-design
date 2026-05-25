import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Grid } from '../src/components/Grid';

const meta: Meta<typeof Grid> = {
  title: 'react-n-design/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'text' },
    gap: { control: 'number' },
    minChildWidth: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: 80,
      background: '#6d5dfc',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

export const DefaultThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: Array.from({ length: 6 }).map((_, i) => <Box key={i}>{i + 1}</Box>),
  },
};

export const CustomTemplate: Story = {
  args: {
    columns: '1fr 2fr 1fr',
    gap: 16,
    children: Array.from({ length: 6 }).map((_, i) => <Box key={i}>{i + 1}</Box>),
  },
};

export const ResponsiveAutoFit: Story = {
  args: {
    gap: 16,
    minChildWidth: 120,
    children: Array.from({ length: 9 }).map((_, i) => <Box key={i}>{i + 1}</Box>),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 24,
    children: Array.from({ length: 4 }).map((_, i) => <Box key={i}>{i + 1}</Box>),
  },
};
