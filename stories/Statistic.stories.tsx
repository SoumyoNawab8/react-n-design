import type { Meta, StoryObj } from '@storybook/react';
import { Statistic } from '../src/components/Statistic';

const meta: Meta<typeof Statistic> = {
  title: 'react-n-design/Statistic',
  component: Statistic,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Statistic>;

export const Default: Story = {
  args: {
    title: 'Active Users',
    value: 8846,
  },
};

export const WithPrefix: Story = {
  args: {
    title: 'Revenue',
    value: 128450,
    prefix: '$',
    precision: 2,
  },
};

export const WithSuffix: Story = {
  args: {
    title: 'Growth Rate',
    value: 15.6,
    suffix: '%',
    precision: 1,
  },
};

export const WithTrendUp: Story = {
  args: {
    title: 'New Customers',
    value: 284,
    trend: 'up',
  },
};

export const WithTrendDown: Story = {
  args: {
    title: 'Churn Rate',
    value: 2.4,
    suffix: '%',
    precision: 1,
    trend: 'down',
  },
};

export const Combined: Story = {
  args: {
    title: 'Sales Amount',
    value: 45235.75,
    prefix: '$',
    suffix: 'M',
    precision: 2,
    trend: 'up',
  },
};

export const NoAnimation: Story = {
  args: {
    title: 'Static Value',
    value: 100,
    animate: false,
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Custom',
    value: <span style={{ color: 'green' }}>Custom Content</span>,
  },
};
