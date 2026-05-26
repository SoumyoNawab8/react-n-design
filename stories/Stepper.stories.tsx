import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaCheckCircle, FaDatabase, FaHome, FaLock, FaUser } from '../src/icons';
import { Input } from '../src/components/Input';
import { Stepper } from '../src/components/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'react-n-design/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A powerful, accessible Stepper component with spring physics animations, glass morphism variant,
vertical orientation, and responsive design.

## Features

- 🎨 **Multiple Variants**: Default and glass morphism styles
- 📱 **Responsive**: Automatically switches to vertical layout on mobile
- 🔄 **Spring Animations**: Smooth step transitions with physics-based animations
- ♿ **Accessible**: Full keyboard navigation and ARIA support
- 🎯 **Customizable**: Custom connector styles, icons, and styling options
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[
          { title: 'Account', description: 'Create your account' },
          { title: 'Profile', description: 'Add your details' },
          { title: 'Confirm', description: 'Review and submit' },
        ]}
        activeStep={step}
        onChange={setStep}
        onComplete={() => alert('Completed!')}
      />
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
      <Stepper
        steps={[
          {
            title: 'Account',
            description: 'Create your account',
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            ),
          },
          {
            title: 'Profile',
            description: 'Add your details',
            content: (
              <div>
                <p>Profile content goes here...</p>
              </div>
            ),
          },
          {
            title: 'Confirm',
            description: 'Review and submit',
            content: (
              <div>
                <p>
                  <strong>Name:</strong> {name || 'Not provided'}
                </p>
                <p>
                  <strong>Email:</strong> {email || 'Not provided'}
                </p>
              </div>
            ),
          },
        ]}
        activeStep={step}
        onChange={setStep}
        onComplete={() => alert('Form submitted!')}
      />
    );
  },
};

export const NonClickable: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
        activeStep={step}
        onChange={setStep}
        allowClickBack={false}
      />
    );
  },
};

export const Completed: Story = {
  render: () => (
    <Stepper
      steps={[{ title: 'Cart' }, { title: 'Shipping' }, { title: 'Payment' }, { title: 'Confirm' }]}
      activeStep={3}
    />
  ),
};

export const GlassVariant: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        variant="glass"
        steps={[
          { title: 'Plan', description: 'Select plan' },
          { title: 'Billing', description: 'Add payment' },
          { title: 'Activate', description: 'Confirm' },
        ]}
        activeStep={step}
        onChange={setStep}
      />
    );
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
    docs: {
      description: {
        story: 'Glass morphism variant with backdrop blur effect. Looks great on colorful backgrounds.',
      },
    },
  },
};

export const VerticalOrientation: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <div style={{ maxWidth: '400px' }}>
        <Stepper
          orientation="vertical"
          steps={[
            { title: 'Step 1', description: 'First step in the process' },
            { title: 'Step 2', description: 'Second step with more details' },
            { title: 'Step 3', description: 'Final step to complete' },
          ]}
          activeStep={step}
          onChange={setStep}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation is useful for sidebars or tight spaces. Steps are stacked vertically.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        iconOnly
        steps={[
          { title: 'Home', icon: <FaHome size={20} /> },
          { title: 'Profile', icon: <FaUser size={20} /> },
          { title: 'Settings', icon: <FaCheckCircle size={20} /> },
          { title: 'Security', icon: <FaLock size={20} /> },
        ]}
        activeStep={step}
        onChange={setStep}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only variant displays just icons without step numbers. Perfect for mobile or compact layouts.',
      },
    },
  },
};

export const WithCustomIcons: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[
          { title: 'Database', description: 'Setup connection', icon: <FaDatabase size={18} /> },
          { title: 'API', description: 'Configure endpoints', icon: <FaCheckCircle size={18} /> },
          { title: 'Deploy', description: 'Launch application', icon: <FaHome size={18} /> },
        ]}
        activeStep={step}
        onChange={setStep}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom icons can be added to any step. They replace step numbers when provided.',
      },
    },
  },
};

export const CustomConnectorStyles: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
        ]}
        activeStep={step}
        onChange={setStep}
        connectorStyles={{
          completedColor: '#10b981', // emerald-500
          pendingColor: '#374151', // gray-700
          height: 3,
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize connector line appearance with custom colors and thickness.',
      },
    },
  },
};

export const NoConnectors: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        showConnectors={false}
        steps={[
          { title: 'Draft' },
          { title: 'Review' },
          { title: 'Publish' },
        ]}
        activeStep={step}
        onChange={setStep}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Hide connectors for a cleaner, more minimal look.',
      },
    },
  },
};

export const VerticalGlass: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <div style={{ maxWidth: '400px' }}>
        <Stepper
          orientation="vertical"
          variant="glass"
          steps={[
            { title: 'Download', description: 'Get the installer' },
            { title: 'Install', description: 'Run setup wizard' },
            { title: 'Update', description: 'Check for updates' },
            { title: 'Done', description: 'Enjoy the app' },
          ]}
          activeStep={step}
          onChange={setStep}
        />
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
    docs: {
      description: {
        story: 'Combine vertical orientation with glass morphism for elegant setup flows.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
        ]}
        activeStep={step}
        onChange={setStep}
        className="my-custom-stepper"
        style={{ padding: '24px', background: '#f3f4f6' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Apply custom CSS classes and inline styles using the `className` and `style` props.',
      },
    },
  },
};

export const DisabledSteps: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <Stepper
        steps={[
          { title: 'Available' },
          { title: 'Blocked', disabled: true },
          { title: 'Skipped', disabled: true },
          { title: 'Final' },
        ]}
        activeStep={step}
        onChange={setStep}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Steps can be individually disabled to prevent navigation to certain steps.',
      },
    },
  },
};

export const AllCombinations: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3>Default</h3>
          <Stepper
            steps={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
            activeStep={step}
            onChange={setStep}
          />
        </div>
        <div>
          <h3>Glass</h3>
          <Stepper
            variant="glass"
            steps={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
            activeStep={step}
            onChange={setStep}
          />
        </div>
        <div>
          <h3>Icon Only</h3>
          <Stepper
            iconOnly
            steps={[
              { title: 'Home', icon: <FaHome size={20} /> },
              { title: 'Profile', icon: <FaUser size={20} /> },
              { title: 'Settings', icon: <FaLock size={20} /> },
            ]}
            activeStep={step}
            onChange={setStep}
          />
        </div>
        <div style={{ maxWidth: '300px' }}>
          <h3>Vertical</h3>
          <Stepper
            orientation="vertical"
            steps={[
              { title: 'Step 1', description: 'First' },
              { title: 'Step 2', description: 'Second' },
            ]}
            activeStep={step}
            onChange={setStep}
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
    docs: {
      description: {
        story: 'Showcase of all variant combinations.',
      },
    },
  },
};
