import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OTPInput } from '../src/components/OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Input / OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A one-time password input component with auto-advance, paste support, keyboard navigation, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 12 } },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    onChange: { action: 'changed' },
    onComplete: { action: 'completed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledOTP = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <OTPInput
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
        args.onChange?.(v);
      }}
      onComplete={(v) => {
        setValue(v);
        args.onComplete?.(v);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 6,
    disabled: false,
    error: false,
  },
};

export const WithValue: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 6,
    value: '4291',
  },
};

export const ErrorState: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 6,
    value: '123456',
    error: true,
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 6,
    value: '987654',
    disabled: true,
  },
};

export const FourDigits: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 4,
  },
};

export const EightDigits: Story = {
  render: (args) => <ControlledOTP {...args} />,
  args: {
    length: 8,
  },
};
