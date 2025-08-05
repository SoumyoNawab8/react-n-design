import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { FaBeer, FaSpinner, FaArrowRight } from 'react-icons/fa'; // Example icons

const meta: Meta<typeof Button> = {
  title: 'react-n-design/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // ... existing argTypes for variant, size, etc.
    shape: {
      control: 'radio',
      options: ['default', 'circle'],
      description: 'The overall shape of the button',
    },
    loading: {
      control: 'boolean',
      description: 'If `true`, shows a loading spinner',
    },
    loadingText: {
      control: 'text',
      description: 'Optional text to display next to the spinner when loading',
    },
    as: {
      control: 'text',
      description: 'Render the button as a different HTML element, e.g., "a" for a link',
    },
    // ReactNode props are not easily controlled in Storybook, so we demonstrate them in stories
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Cheers',
    leftIcon: <FaBeer />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next Step',
    rightIcon: <FaArrowRight />,
  },
};

export const IconOnly: Story = {
  args: {
    shape: 'circle',
    leftIcon: <FaBeer />,
    'aria-label': 'Cheers', // Important for accessibility
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Will be hidden',
  },
};

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: 'Submitting',
  },
};

export const TextButton: Story = {
  args: {
    variant: 'text',
    children: 'Learn More',
  },
};

export const AsLink: Story = {
  args: {
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    children: 'Go to Google',
  },
};