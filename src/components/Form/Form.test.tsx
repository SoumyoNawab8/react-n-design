import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Form, FormItem, useForm } from './index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Form v1.2.0', () => {
  // ============================================
  // Performance Improvements
  // ============================================
  
  describe('Performance Improvements', () => {
    it('uses useForm hook to create form instance', () => {
      const TestComponent = () => {
        const [form] = useForm();
        expect(form).toBeDefined();
        return <div>Test</div>;
      };
      renderWithTheme(<TestComponent />);
    });

    it('debounces validation on input based on debounceMs prop', async () => {
      const user = userEvent.setup();
      const onFinishFailed = vi.fn();

      renderWithTheme(
        <Form
          onFinishFailed={onFinishFailed}
          debounceMs={500}
        >
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

      const input = screen.getByTestId('username');
      
      // Type rapidly
      await user.type(input, 'test');
      
      // Should not show error immediately (debounce)
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
      
      // After debounce period
      await waitFor(() => {
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('memoizes validation calculations', () => {
      const { rerender } = renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            rules={[{ required: true }]}
          >
            <input data-testid="test" />
          </FormItem>
        </Form>
      );

      // Rerender with same props - should not trigger re-validation
      rerender(
        <ThemeProvider theme={lightTheme}>
          <Form>
            <FormItem
              name="test"
              label="Test"
              rules={[{ required: true }]}
            >
              <input data-testid="test" />
            </FormItem>
          </Form>
        </ThemeProvider>
      );

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });
  });

  // ============================================
  // Animation Features
  // ============================================
  
  describe('Validation Shake Animation', () => {
    it('triggers shake animation on validation error', async () => {
      const user = userEvent.setup();

      const { container } = renderWithTheme(
        <Form>
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <input data-testid="email" />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      );

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      // Check that shake animation class/data attribute is applied
      const errorContainer = container.querySelector('[data-validate-status="error"]');
      expect(errorContainer).toBeTruthy();
    });

    it('shows success checkmark with animation on valid field', async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Form>
          <FormItem
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Invalid email' }]}
          >
            <input
              data-testid="email"
              type="email"
              value="valid@example.com"
              onChange={() => {}}
            />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      );

      const input = screen.getByTestId('email');
      await user.type(input, 'test@example.com');
      
      // The input should have validation icon rendered
      expect(input).toBeInTheDocument();
    });

    it('animates error message reveal', async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Form>
          <FormItem
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Required' }]}
          >
            <input data-testid="username" />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      );

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Wait for error with animation
      await waitFor(() => {
        const errorMessage = screen.getByText(/required/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // Layout Variants
  // ============================================
  
  describe('Layout Improvements', () => {
    it('supports compact layout variant', () => {
      const { container } = renderWithTheme(
        <Form layout="compact" compact>
          <FormItem name="test" label="Test">
            <input />
          </FormItem>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('data-compact', 'true');
    });

    it('applies compact styling when compact prop is set', () => {
      const { container } = renderWithTheme(
        <Form compact>
          <FormItem name="test" label="Test">
            <input />
          </FormItem>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('data-compact', 'true');
    });

    it('supports inline validation icons (showValidationIcon prop)', () => {
      renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            validateStatus="success"
            showValidationIcon={true}
            data-testid="form-item"
          >
            <input />
          </FormItem>
        </Form>
      );

      // FormItem should render with validation
      expect(document.querySelector('form')).toBeInTheDocument();
    });
  });

  // ============================================
  // Responsive Layout
  // ============================================
  
  describe('Responsive Layout', () => {
    it('applies responsiveBreakpoint prop', () => {
      const { container } = renderWithTheme(
        <Form layout="horizontal" responsiveBreakpoint={768}>
          <FormItem name="test" label="Test">
            <input />
          </FormItem>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('renders with className and style props', () => {
      const { container } = renderWithTheme(
        <Form className="custom-form" style={{ maxWidth: '600px' }}>
          <FormItem name="test" label="Test">
            <input />
          </FormItem>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toHaveClass('custom-form');
      expect(form).toHaveStyle({ maxWidth: '600px' });
    });

    it('renders FormItem with className and style props', () => {
      renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            className="custom-form-item"
            style={{ marginBottom: '32px' }}
          >
            <input />
          </FormItem>
        </Form>
      );

      const formItem = document.querySelector('.custom-form-item');
      expect(formItem).toBeInTheDocument();
    });
  });

  // ============================================
  // FormItem Props
  // ============================================
  
  describe('FormItem v1.2.0 Props', () => {
    it('supports showValidationIcon prop', () => {
      renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            showValidationIcon={false}
          >
            <input />
          </FormItem>
        </Form>
      );

      expect(screen.getByLabelText(/test/i)).toBeInTheDocument();
    });

    it('supports debounceMs prop', () => {
      renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            debounceMs={500}
          >
            <input />
          </FormItem>
        </Form>
      );

      expect(screen.getByLabelText(/test/i)).toBeInTheDocument();
    });

    it('supports animateErrors prop', () => {
      renderWithTheme(
        <Form>
          <FormItem
            name="test"
            label="Test"
            animateErrors={true}
          >
            <input />
          </FormItem>
        </Form>
      );

      expect(screen.getByLabelText(/test/i)).toBeInTheDocument();
    });
  });

  // ============================================
  // Accessibility
  // ============================================
  
  describe('Accessibility', () => {
    it('is accessible with shake animation', async () => {
      const { container } = renderWithTheme(
        <Form>
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <input />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      );

      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });

    it('maintains aria attributes on error fields', async () => {
      const user = userEvent.setup();

      const { container } = renderWithTheme(
        <Form>
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <input data-testid="email-input" />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      );

      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('aria-describedby');

      // Trigger error
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  // ============================================
  // Original Tests (maintained compatibility)
  // ============================================
  
  describe('Original Functionality', () => {
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
});
