import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from '../src/components/Input';
import { Form, FormItem, ErrorMessage } from '../src/components/Form';

const meta: Meta<typeof Form> = {
  title: 'react-n-design/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'inline'],
      description: 'Form layout',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all fields',
    },
    size: {
      control: 'radio',
      options: ['small', 'middle', 'large'],
      description: 'Size of form elements',
    },
    colon: {
      control: 'boolean',
      description: 'Show colon after label',
    },
    requiredMark: {
      control: 'boolean',
      description: 'Show required mark',
    },
    labelAlign: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Label alignment (horizontal layout)',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

interface FormValues {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Helper component for form state management
const BasicFormExample = () => {
  const [formValues, setFormValues] = useState<FormValues>({ name: '', email: '', password: '' });

  const handleFinish = (values: FormValues) => {
    alert('Form submitted:\n' + JSON.stringify(values, null, 2));
  };

  return (
    <Form onFinish={handleFinish} style={{ maxWidth: '600px' }}>
      <FormItem label="Full Name" name="name">
        <Input placeholder="Enter your name" />
      </FormItem>
      <FormItem label="Email Address" name="email">
        <Input type="email" placeholder="Enter your email" />
      </FormItem>
      <FormItem label="Password" name="password">
        <Input type="password" placeholder="Enter your password" />
      </FormItem>
      <div style={{ marginTop: '24px' }}>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export const Basic: Story = {
  render: () => <BasicFormExample />,
};

// Form with validation
const ValidationFormExample = () => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleFinish = (values: FormValues) => {
    alert('Form submitted successfully!');
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Validation failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      style={{ maxWidth: '600px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          Email Address <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <Input
          type="email"
          placeholder="Enter your email"
          onBlur={(e) => setEmailError(validateEmail(e.target.value))}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          Password <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </div>
      <div style={{ marginTop: '24px' }}>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export const WithValidation: Story = {
  render: () => <ValidationFormExample />,
};

// Horizontal layout
export const HorizontalLayout: Story = {
  args: {
    layout: 'horizontal',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    children: (
      <>
        <FormItem label="Username" name="username">
          <Input placeholder="Enter username" />
        </FormItem>
        <FormItem label="Email" name="email">
          <Input type="email" placeholder="Enter email" />
        </FormItem>
        <FormItem label="Password" name="password">
          <Input type="password" placeholder="Enter password" />
        </FormItem>
        <div style={{ marginLeft: '25%', marginTop: '24px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Submit
          </button>
        </div>
      </>
    ),
  },
};

// Vertical layout
export const VerticalLayout: Story = {
  args: {
    layout: 'vertical',
    children: (
      <>
        <FormItem label="Username" name="username">
          <Input placeholder="Enter username" />
        </FormItem>
        <FormItem label="Email" name="email">
          <Input type="email" placeholder="Enter email" />
        </FormItem>
        <FormItem label="Password" name="password">
          <Input type="password" placeholder="Enter password" />
        </FormItem>
        <div style={{ marginTop: '24px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Submit
          </button>
        </div>
      </>
    ),
  },
};

// Inline layout
export const InlineLayout: Story = {
  args: {
    layout: 'inline',
    children: (
      <>
        <FormItem label="Username" name="username">
          <Input placeholder="Username" />
        </FormItem>
        <FormItem label="Password" name="password">
          <Input type="password" placeholder="Password" />
        </FormItem>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Login
        </button>
      </>
    ),
  },
};

// Disabled form
export const Disabled: Story = {
  args: {
    layout: 'vertical',
    disabled: true,
    children: (
      <>
        <FormItem label="Name" name="name">
          <Input placeholder="John Doe" />
        </FormItem>
        <FormItem label="Email" name="email">
          <Input type="email" placeholder="john@example.com" />
        </FormItem>
      </>
    ),
  },
};
