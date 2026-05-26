import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { Result } from '../src/components/Result';

const meta: Meta<typeof Result> = {
  title: 'react-n-design/Result',
  component: Result,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Result>;

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Operation Successful',
    subTitle: 'Your changes have been saved successfully.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Submission Failed',
    subTitle: 'Please check and modify the following information before resubmitting.',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Information',
    subTitle: 'Here is some additional information you might find useful.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Attention Needed',
    subTitle: 'Please review the following items before proceeding.',
  },
};

export const NotFound: Story = {
  args: {
    status: '404',
    title: '404',
    subTitle: 'Sorry, the page you visited does not exist.',
  },
};

export const Forbidden: Story = {
  args: {
    status: '403',
    title: '403',
    subTitle: 'Sorry, you are not authorized to access this page.',
  },
};

export const ServerError: Story = {
  args: {
    status: '500',
    title: '500',
    subTitle: 'Sorry, something went wrong on our end.',
  },
};

export const WithActions: Story = {
  args: {
    status: 'success',
    title: 'Task Complete',
    subTitle: 'Your task has been completed successfully.',
    extra: (
      <>
        <Button>Go Home</Button>
        <Button variant="secondary">View Details</Button>
      </>
    ),
  },
};

export const WithCustomIcon: Story = {
  args: {
    status: 'info',
    title: 'Custom Icon',
    subTitle: 'This result uses a custom icon.',
    icon: <img src="https://via.placeholder.com/72" alt="Custom" />,
  },
};
