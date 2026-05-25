import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Stack } from '../src/components/Stack';

const meta: Meta<typeof Stack> = {
  title: 'react-n-design/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column'],
    },
    gap: { control: 'number' },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'radio',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
    wrap: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: 60,
      height: 60,
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

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 16,
    align: 'start',
    justify: 'start',
    children: [<Box key="1">1</Box>, <Box key="2">2</Box>, <Box key="3">3</Box>],
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 16,
    align: 'center',
    justify: 'start',
    children: [<Box key="1">1</Box>, <Box key="2">2</Box>, <Box key="3">3</Box>],
  },
};

export const JustifyBetween: Story = {
  args: {
    direction: 'row',
    gap: 16,
    align: 'center',
    justify: 'between',
    children: [<Box key="1">1</Box>, <Box key="2">2</Box>, <Box key="3">3</Box>],
  },
};

export const Wrapped: Story = {
  args: {
    direction: 'row',
    gap: 12,
    align: 'center',
    justify: 'start',
    wrap: true,
    children: Array.from({ length: 12 }).map((_, i) => <Box key={i}>{i + 1}</Box>),
  },
};
