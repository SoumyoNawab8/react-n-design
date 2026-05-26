import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { Modal, type ModalProps } from '../src/components/Modal';

const meta: Meta<typeof Modal> = {
  title: 'react-n-design/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['center', 'top'] },
    fullScreen: { control: 'boolean' },
    variant: { control: 'select', options: ['modal', 'glass'] },
    mobileVariant: { control: 'select', options: ['modal', 'bottom-sheet'] },
    maximizable: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the modal or use object for responsive sizing',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Modal v1.2.0 - Now with glass variant, mobile bottom-sheet transformation, spring animations, and maximize support.',
      },
    },
  },
};
export default meta;

// Helper component to manage state
const InteractiveModal = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>
          This is the main content area of the modal. You can place any valid React nodes here to
          build out the modal's body.
        </p>
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
        <Button variant="secondary" onClick={() => alert('Declined!')}>
          Decline
        </Button>
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
    footer: <Button onClick={() => alert('Confirmed!')}>You Must Click a Button</Button>,
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

// New v1.2.0 stories
export const GlassVariant: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Glass Modal',
    variant: 'glass',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Glass variant with backdrop blur effect for modern designs.',
      },
    },
  },
};

export const MaximizedModal: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Complex Dashboard',
    maximizable: true,
    defaultMaximized: false,
    footer: <Button onClick={() => alert('Action!')}>Perform Action</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with maximize/minimize support for complex workflows.',
      },
    },
  },
};

export const CustomAnimations: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Custom Animation',
    animationConfig: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom animation configuration with spring physics.',
      },
    },
  },
};

export const ResponsiveSizing: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Responsive Modal',
    // This demonstrates responsive sizing using object notation
    size: { base: 'small', sm: 'medium', lg: 'large' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive sizing that adapts to different screen sizes.',
      },
    },
  },
};

export const BottomSheetMobile: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Bottom Sheet (Mobile)',
    mobileVariant: 'bottom-sheet',
    footer: (
      <>
        <Button variant="secondary" fullWidth>Cancel</Button>
        <Button fullWidth>Confirm</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'On mobile devices (<768px), transforms into a bottom-sheet that slides up. On desktop, behaves as a normal modal.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const CustomStyled: StoryObj<typeof Modal> = {
  render: (args) => <InteractiveModal {...args} />,
  args: {
    title: 'Custom Styled Modal',
    variant: 'glass',
    style: { borderRadius: '24px' },
    backdropStyle: { backgroundColor: 'rgba(20, 20, 50, 0.7)' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with custom styling applied to content and backdrop.',
      },
    },
  },
};
