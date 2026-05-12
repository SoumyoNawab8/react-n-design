import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../src/components/Stepper';
import { Input } from '../src/components/Input';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Stepper> = {
  title: 'react-n-design/Stepper',
  component: Stepper,
  tags: ['autodocs'],
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
                <p><strong>Name:</strong> {name || 'Not provided'}</p>
                <p><strong>Email:</strong> {email || 'Not provided'}</p>
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
        steps={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
        ]}
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
      steps={[
        { title: 'Cart' },
        { title: 'Shipping' },
        { title: 'Payment' },
        { title: 'Confirm' },
      ]}
      activeStep={3}
    />
  ),
};
