import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '../src/components/Form/Form';
import { FormField } from '../src/components/Form/FormField';
import { Button } from '../src/components/Button';

const meta: Meta = {
  title: 'react-n-design/Form Validation',
  tags: ['autodocs'],
};
export default meta;

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'editor', 'viewer'], { message: 'Role is required' }),
  newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export const ZodValidation: StoryObj = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        username: '',
        email: '',
        role: 'editor',
        newsletter: false,
      },
    });

    const onSubmit = (data: FormData) => {
      console.log('Validated data:', data);
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField
          name="username"
          control={control}
          component="Input"
          label="Username"
          componentProps={{ placeholder: 'Enter username', allowClear: true }}
          rules={{ required: true }}
        />
        {errors.username && <span style={{ color: 'crimson', fontSize: 14 }}>{errors.username.message}</span>}

        <FormField
          name="email"
          control={control}
          component="Input"
          label="Email Address"
          componentProps={{ placeholder: 'you@example.com', type: 'email' }}
        />
        {errors.email && <span style={{ color: 'crimson', fontSize: 14 }}>{errors.email.message}</span>}

        <FormField
          name="role"
          control={control}
          component="Select"
          label="Role"
          componentProps={{
            options: [
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ],
            placeholder: 'Select a role',
          }}
        />
        {errors.role && <span style={{ color: 'crimson', fontSize: 14 }}>{errors.role.message}</span>}

        <FormField
          name="newsletter"
          control={control}
          component="Switch"
          label="Subscribe to newsletter"
        />

        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Form>
    );
  },
};
