import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Rating } from '../src/components/Rating';

const meta: Meta<typeof Rating> = {
  title: 'react-n-design/Rating',
  component: Rating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Rating>;

const RatingDemo = (args: any) => {
  const [value, setValue] = useState(args.value);
  return <Rating {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    value: 3,
  },
};

export const HalfPrecision: Story = {
  render: RatingDemo,
  args: {
    value: 3.5,
    precision: 0.5,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rating value={3} size="small" readOnly />
      <Rating value={3} size="medium" readOnly />
      <Rating value={3} size="large" readOnly />
    </div>
  ),
};

export const Interactive: Story = {
  render: RatingDemo,
  args: {
    value: 0,
    max: 5,
    precision: 1,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on stars to set the rating value.',
      },
    },
  },
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 10,
    readOnly: true,
  },
};

export const WithLabel: Story = {
  args: {
    value: 4.5,
    precision: 0.5,
    readOnly: true,
    label: 'Product Rating',
  },
};
