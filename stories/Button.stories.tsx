import type { Meta, StoryObj } from '@storybook/react';
import { FaArrowRight, FaBeer, FaCheck, FaExclamationCircle, FaTrash } from 'react-icons/fa';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'react-n-design/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'danger', 'success', 'ghost'],
      description: 'The visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
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
    fullWidth: {
      control: 'boolean',
      description: 'If `true`, the button takes full width of its container',
    },
    glassMorphism: {
      control: 'boolean',
      description: 'Apply glass morphism effect with backdrop blur',
    },
    gradient: {
      control: 'boolean',
      description: 'Apply subtle gradient background',
    },
    disabled: {
      control: 'boolean',
      description: 'If `true`, the button is disabled',
    },
    as: {
      control: 'text',
      description: 'Render the button as a different HTML element, e.g., "a" for a link',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
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

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const TextButton: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
    leftIcon: <FaTrash />,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
    leftIcon: <FaCheck />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const GlassMorphism: Story = {
  args: {
    children: 'Glass Button',
    glassMorphism: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Glass morphism effect with backdrop blur for modern designs.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Gradient: Story = {
  args: {
    children: 'Gradient Button',
    gradient: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
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
    'aria-label': 'Cheers',
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

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
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

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="text">Text</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button shape="default">Default</Button>
      <Button shape="circle" leftIcon={<FaBeer />} aria-label="Icon Only" />
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'custom-button-class',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Inline Styled',
    style: { borderRadius: '4px', letterSpacing: '2px' },
  },
};
