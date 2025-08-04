import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { Tag } from '../src/components/Tag';

const meta: Meta<typeof Card> = {
  title: 'react-n-design/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outset', 'inset'] },
    padding: { control: 'select', options: ['none', 'small', 'medium', 'large'] },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is the basic card content.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the main content area, sitting between the header and footer.',
    footer: <Button size="small">Action</Button>,
  },
};

export const WithCoverImage: Story = {
  args: {
    padding: 'medium',
    cover: <img alt="example" src="https://picsum.photos/id/12/400/200" />,
    header: 'Europe Street',
    children: 'A neomorphic card with a cover image is great for articles or posts.',
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    bordered: true,
    children: 'This card lifts up when you hover over it.',
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    header: 'Loading Content...',
    children: 'This content is blurred while the spinner is active.',
  },
};