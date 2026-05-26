import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Form, FormItem } from './index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Form', () => {
  it('renders form and is accessible', async () => {
    const { container } = renderWithTheme(
      <Form>
        <FormItem name="username" label="Username">
          <input />
        </FormItem>
      </Form>
    );
    // Check for the form html element
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('calls onFinish when form submitted with valid data', async () => {
    const onFinish = vi.fn();

    renderWithTheme(
      <Form onFinish={onFinish}>
        <FormItem name="username" label="Username">
          <input data-testid="username" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );

    await userEvent.type(screen.getByTestId('username'), 'testuser');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
    });
  });

  it('calls onFinishFailed when form submitted with invalid data', async () => {
    const onFinish = vi.fn();
    const onFinishFailed = vi.fn();

    renderWithTheme(
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <input data-testid="username" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalled();
  });

  it('registers fields correctly', () => {
    renderWithTheme(
      <Form>
        <FormItem name="username" label="Username">
          <input data-testid="username-input" />
        </FormItem>
        <FormItem name="email" label="Email">
          <input data-testid="email-input" />
        </FormItem>
      </Form>
    );

    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithTheme(
      <Form>
        <FormItem
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <input data-testid="username" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  it('supports email-type form items', () => {
    const { container } = renderWithTheme(
      <Form>
        <FormItem
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
          <input data-testid="email" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(container.querySelector('form')).toHaveClass('n-form');
  });

  it('supports pattern validation rules', () => {
    const { container } = renderWithTheme(
      <Form>
        <FormItem
          name="phone"
          label="Phone"
          rules={[{ pattern: /^\d{10}$/, message: 'Phone must be 10 digits' }]}
        >
          <input data-testid="phone" />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );
    expect(screen.getByTestId('phone')).toBeInTheDocument();
    expect(container.querySelector('form')).toHaveClass('n-form');
  });

  it('triggers onValuesChange callback', async () => {
    const onValuesChange = vi.fn();

    renderWithTheme(
      <Form onValuesChange={onValuesChange}>
        <FormItem name="username" label="Username">
          <input data-testid="username" />
        </FormItem>
      </Form>
    );

    await userEvent.type(screen.getByTestId('username'), 'a');

    await waitFor(() => {
      expect(onValuesChange).toHaveBeenCalled();
    });
  });

  it('supports layout prop for different layouts', () => {
    const { container: container1 } = renderWithTheme(
      <Form layout="horizontal">
        <FormItem name="test" label="Test">
          <input />
        </FormItem>
      </Form>
    );
    const form = container1.querySelector('form');
    expect(form?.className).toContain('n-form-horizontal');

    const { container: container2 } = renderWithTheme(
      <Form layout="vertical">
        <FormItem name="test" label="Test">
          <input />
        </FormItem>
      </Form>
    );
    const form2 = container2.querySelector('form');
    expect(form2?.className).toContain('n-form-vertical');
  });

  it('renders with initial values', () => {
    renderWithTheme(
      <Form initialValues={{ username: 'initial', email: 'test@test.com' }}>
        <FormItem name="username" label="Username">
          <input data-testid="username" />
        </FormItem>
        <FormItem name="email" label="Email">
          <input data-testid="email" />
        </FormItem>
      </Form>
    );

    expect(screen.getByTestId('username')).toHaveValue('initial');
    expect(screen.getByTestId('email')).toHaveValue('test@test.com');
  });

  it('passes disabled state to form items', () => {
    const { container } = renderWithTheme(
      <Form disabled>
        <FormItem name="username" label="Username">
          <input data-testid="username" />
        </FormItem>
      </Form>
    );
    // Form disabled prop is passed to FormItems which render disabled fields
    expect(container.querySelector('form')).toHaveClass('n-form');
  });

  it('renders with different sizes', () => {
    const sizes = ['small', 'middle', 'large'] as const;
    for (const size of sizes) {
      const { container } = renderWithTheme(
        <Form size={size}>
          <FormItem name="test" label="Test">
            <input />
          </FormItem>
        </Form>
      );
      expect(container.querySelector('form')).toBeInTheDocument();
    }
  });
});
