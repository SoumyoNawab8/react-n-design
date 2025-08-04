import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../src/components/Modal';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Modal> = {
  title: 'react-n-design/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    // ... other argTypes
    position: { control: 'radio', options: ['center', 'top'] },
    fullScreen: { control: 'boolean' },
  },
};
export default meta;

// Helper component to manage state
const InteractiveModal = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the main content area of the modal. You can place any valid React nodes here to build out the modal's body.</p>
      </Modal>
    </>
  );
};

export const Default: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Default Modal',
  },
};

export const LargeWithFooter: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'User Agreement',
    size: 'large',
    footer: (
      <>
        <Button variant="secondary" onClick={() => alert('Declined!')}>Decline</Button>
        <Button onClick={() => alert('Accepted!')}>Accept</Button>
      </>
    ),
  },
};

export const NoBackdropClick: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Important Action',
    preventBackdropClick: true,
    footer: (
        <Button onClick={() => alert('Confirmed!')}>You Must Click a Button</Button>
    ),
  },
};

export const TopPosition: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Notification',
    position: 'top',
    size: 'medium',
  },
};

export const FullScreen: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Dashboard',
    fullScreen: true,
    children: 'This modal takes up the entire screen, ideal for mobile or immersive experiences.',
  },
};