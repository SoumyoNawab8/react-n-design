import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from '../src/components/Empty';

const meta: Meta<typeof Empty> = {
  title: 'react-n-design/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    description: {
      control: 'text',
      description: 'The description text to display below the empty image',
    },
    image: {
      description: 'Custom image or icon to display (ReactNode)',
    },
    children: {
      description: 'Additional content to display below the description (ReactNode)',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    description: 'No Data',
  },
};

export const CustomDescription: Story = {
  args: {
    description: 'No search results found',
  },
};

export const WithAction: Story = {
  args: {
    description: 'No projects yet',
    children: (
      <button
        style={{
          marginTop: '16px',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          background: '#6d5dfc',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Create Project
      </button>
    ),
  },
};

export const CustomImage: Story = {
  args: {
    description: 'No notifications',
    image: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="16" fill="#f5f5f5" />
        <path
          d="M20 28C20 28 24 36 32 36C40 36 44 28 44 28"
          stroke="#d9d9d9"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="#d9d9d9" />
        <circle cx="40" cy="24" r="3" fill="#d9d9d9" />
      </svg>
    ),
  },
};

export const EmptyWithLongDescription: Story = {
  args: {
    description:
      "No matching records found. Try adjusting your search criteria or filters to find what you're looking for.",
  },
};
