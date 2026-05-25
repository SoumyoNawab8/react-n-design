import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from '../src/components/VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'react-n-design/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  args: {
    children: 'This text is visually hidden but accessible to screen readers.',
  },
};

export const WithVisibleLabel: Story = {
  render: () => (
    <button>
      <span role="img" aria-hidden="true">
        🔔
      </span>
      <VisuallyHidden>3 unread notifications</VisuallyHidden>
    </button>
  ),
};
