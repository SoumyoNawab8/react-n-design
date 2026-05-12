import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from '../src/components/Form/Form';
import { FormField } from '../src/components/Form/FormField';
import { ErrorMessage } from '../src/components/Form/ErrorMessage';
import { useForm } from '../src/hooks/useForm';
import { useOptimisticForm } from '../src/hooks/useOptimisticForm';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Switch } from '../src/components/Switch';

const meta: Meta<typeof Form> = {
  title: 'react-n-design/Form',
  component: Form,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const form = useForm({
      initialValues: { name: '', email: '' },
      validate: (values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.email) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Invalid email';
        return errors;
      },
    });

    return (
      <Form form={form} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField name="name" label="Full Name" />
        <FormField name="email" label="Email Address" />
        <ErrorMessage name="email" />
        <Button type="submit" loading={form.isSubmitting}>Submit</Button>
      </Form>
    );
  },
};

export const WithCustomInput: Story = {
  render: () => {
    const form = useForm({
      initialValues: { username: '', bio: '' },
      validate: (values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};
        if (!values.username) errors.username = 'Username is required';
        return errors;
      },
    });

    return (
      <Form form={form} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField name="username" label="Username">
          <Input placeholder="Enter username" allowClear />
        </FormField>
        <FormField name="bio" label="Bio">
          <Input placeholder="Tell us about yourself" />
        </FormField>
        <Button type="submit" loading={form.isSubmitting}>Save</Button>
      </Form>
    );
  },
};

export const AsyncSubmit: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const form = useForm({
      initialValues: { email: '' },
      validate: (values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};
        if (!values.email) errors.email = 'Email is required';
        return errors;
      },
      onSubmit: async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitted(true);
        console.log('Submitted:', values);
      },
    });

    return (
      <Form form={form} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField name="email" label="Email" />
        <ErrorMessage name="email" />
        <Button type="submit" loading={form.isSubmitting}>
          {submitted ? 'Submitted!' : 'Submit'}
        </Button>
      </Form>
    );
  },
};

export const OptimisticFormDemo: Story = {
  render: () => {
    const form = useOptimisticForm({
      initialValues: { username: '', newsletter: false },
      validate: (values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};
        if (!values.username) errors.username = 'Username is required';
        return errors;
      },
      onSubmit: async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Optimistic submit:', values);
      },
    });

    return (
      <Form form={form} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField name="username" label="Username" />
        <FormField name="newsletter" label="Subscribe to newsletter">
          <Switch label="Subscribe" />
        </FormField>
        <Button type="submit" loading={form.isSubmitting}>Save</Button>
      </Form>
    );
  },
};
