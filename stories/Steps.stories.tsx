import type { Meta, StoryObj } from '@storybook/react';
import { FaUser, FaIdCard, FaCheckCircle, FaCreditCard, FaTruck, FaBox, FaEdit, FaSave, FaUpload, FaCog, FaStar, FaFlag } from 'react-icons/fa';
import { Steps } from '../src/components/Steps';

const meta: Meta<typeof Steps> = {
  title: 'react-n-design/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Current active step index',
    },
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the steps',
    },
    size: {
      control: 'radio',
      options: ['small', 'default', 'large'],
      description: 'Size of the step indicators',
    },
    onChange: {
      description: 'Callback when a step is clicked',
      action: 'onChange',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Steps>;

const basicItems = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Confirm', description: 'Review and confirm' },
];

const extendedItems = [
  { title: 'Personal Info', description: 'Enter your details' },
  { title: 'Contact Info', description: 'Add contact methods' },
  { title: 'Preferences', description: 'Set your preferences' },
  { title: 'Confirmation', description: 'Review everything' },
];

// Basic steps
export const Basic: Story = {
  args: {
    items: basicItems,
    current: 1,
    direction: 'horizontal',
    size: 'default',
  },
};

// Steps with icons
export const WithIcons: Story = {
  args: {
    items: [
      { title: 'Account', description: 'Create your account', icon: <FaUser /> },
      { title: 'Profile', description: 'Set up your profile', icon: <FaIdCard /> },
      { title: 'Confirm', description: 'Review and confirm', icon: <FaCheckCircle /> },
    ],
    current: 1,
    direction: 'horizontal',
    size: 'default',
  },
};

// Steps with different sizes
export const Small: Story = {
  args: {
    items: basicItems,
    current: 1,
    direction: 'horizontal',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    items: basicItems,
    current: 1,
    direction: 'horizontal',
    size: 'large',
  },
};

// Completed steps
export const CompletedSteps: Story = {
  args: {
    items: basicItems,
    current: 3,
    direction: 'horizontal',
    size: 'default',
  },
};

// Pending/Not started
export const Pending: Story = {
  args: {
    items: basicItems,
    current: 0,
    direction: 'horizontal',
    size: 'default',
  },
};

// Horizontal layout
export const Horizontal: Story = {
  args: {
    items: extendedItems,
    current: 2,
    direction: 'horizontal',
    size: 'default',
  },
};

// Vertical layout
export const Vertical: Story = {
  args: {
    items: extendedItems,
    current: 1,
    direction: 'vertical',
    size: 'default',
  },
};

// Vertical with icons
export const VerticalWithIcons: Story = {
  args: {
    items: [
      { title: 'Create Account', description: 'Sign up with email', icon: <FaUser /> },
      { title: 'Verify Email', description: 'Check your inbox', icon: <FaEdit /> },
      { title: 'Setup Profile', description: 'Add your information', icon: <FaCog /> },
      { title: 'Complete', description: 'You are all set!', icon: <FaFlag /> },
    ],
    current: 1,
    direction: 'vertical',
    size: 'default',
  },
};

// E-commerce checkout example
export const CheckoutExample: Story = {
  args: {
    items: [
      { title: 'Cart', description: 'Review items', icon: <FaBox /> },
      { title: 'Shipping', description: 'Enter address', icon: <FaTruck /> },
      { title: 'Payment', description: 'Add card info', icon: <FaCreditCard /> },
      { title: 'Confirm', description: 'Place order', icon: <FaCheckCircle /> },
    ],
    current: 1,
    direction: 'horizontal',
    size: 'large',
  },
};

// Multi-step process example
export const UploadProcess: Story = {
  args: {
    items: [
      { title: 'Select Files', description: 'Choose documents', icon: <FaUpload /> },
      { title: 'Edit Details', description: 'Add metadata', icon: <FaEdit /> },
      { title: 'Review', description: 'Preview files', icon: <FaIdCard /> },
      { title: 'Save', description: 'Store in cloud', icon: <FaSave /> },
      { title: 'Share', description: 'Send to team', icon: <FaStar /> },
    ],
    current: 2,
    direction: 'horizontal',
    size: 'default',
  },
};

// Clickable navigation
const ClickableSteps = (args: any) => {
  const [current, setCurrent] = React.useState(args.current || 0);
  return <Steps {...args} current={current} onChange={setCurrent} />;
};

export const ClickableNavigation: Story = {
  render: (args) => ClickableSteps(args),
  args: {
    items: basicItems,
    current: 0,
    direction: 'horizontal',
    size: 'default',
    onChange: undefined,
  },
};

// Clickable vertical
export const ClickableVertical: Story = {
  render: (args) => ClickableSteps(args),
  args: {
    items: extendedItems,
    current: 1,
    direction: 'vertical',
    size: 'large',
    onChange: undefined,
  },
};
