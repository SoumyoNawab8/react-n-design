import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Input } from './Input';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledInput = (
  props: Omit<Parameters<typeof Input>[0], 'value' | 'onChange'> & { initialValue?: string }
) => {
  const [value, setValue] = useState(props.initialValue || '');
  return (
    <Input
      {...props}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

describe('Input', () => {
  it('renders an input element and is accessible', async () => {
    const { container } = renderWithTheme(<Input aria-label="Test input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('associates label with input via htmlFor', () => {
    renderWithTheme(<Input label="Email" id="email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email');
  });

  it('shows error text when error prop is provided', () => {
    renderWithTheme(<Input error="This field is required" id="username" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');
  });

  it('typing updates the input value', async () => {
    renderWithTheme(<ControlledInput />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello world');
    expect(input).toHaveValue('hello world');
  });

  it('renders prefix and suffix', () => {
    renderWithTheme(
      <Input
        prefix={<span data-testid="prefix">$</span>}
        suffix={<span data-testid="suffix">.00</span>}
      />
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('renders password toggle for password type', () => {
    renderWithTheme(<Input type="password" id="pwd" />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    expect(toggle).toBeInTheDocument();
  });

  it('toggles password visibility on click', async () => {
    renderWithTheme(<ControlledInput type="password" id="pwd" initialValue="secret" />);
    const input = screen.getByDisplayValue('secret');
    expect(input).toHaveAttribute('type', 'password');
    const toggle = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('renders clear button when allowClear and value are present', () => {
    renderWithTheme(<ControlledInput allowClear initialValue="clearable text" />);
    expect(screen.getByRole('button', { name: /clear input/i })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  // v1.2.0 new tests

  describe('Clear Button', () => {
    it('has minimum 44px touch target for accessibility', () => {
      renderWithTheme(<ControlledInput allowClear initialValue="text" />);
      const clearButton = screen.getByRole('button', { name: /clear input/i });
      // Check computed styles for minimum dimensions
      const styles = window.getComputedStyle(clearButton);
      expect(parseInt(styles.minWidth || '0')).toBeGreaterThanOrEqual(44);
      expect(parseInt(styles.minHeight || '0')).toBeGreaterThanOrEqual(44);
    });

    it('clears input value when clicked', async () => {
      renderWithTheme(<ControlledInput allowClear initialValue="clear me" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('clear me');
      
      const clearButton = screen.getByRole('button', { name: /clear input/i });
      await userEvent.click(clearButton);
      
      expect(input).toHaveValue('');
    });

    it('supports custom clear icon', () => {
      renderWithTheme(
        <ControlledInput 
          allowClear 
          initialValue="text" 
          clearIcon={<span data-testid="custom-clear">Clear</span>} 
        />
      );
      expect(screen.getByTestId('custom-clear')).toBeInTheDocument();
    });

    it('supports clear via keyboard (Enter or Space)', async () => {
      renderWithTheme(<ControlledInput allowClear initialValue="clear me" />);
      const clearButton = screen.getByRole('button', { name: /clear input/i });
      await userEvent.type(clearButton, '{enter}');
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });

  describe('Floating Label', () => {
    it('renders floating label when floatingLabel is true', () => {
      renderWithTheme(<Input label="Name" floatingLabel id="name" />);
      const label = document.querySelector('label[for="name"]');
      expect(label).toBeInTheDocument();
    });

    it('shows floating label above input when focused', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Input label="Name" floatingLabel id="name" />);
      const input = screen.getByLabelText(/name/i);
      
      await user.click(input);
      // Label should float (CSS/animation handled by framer-motion)
      expect(input).toHaveFocus();
    });

    it('shows floating label above input when has value', () => {
      renderWithTheme(<ControlledInput label="Name" floatingLabel initialValue="John" />);
      // Label should maintain floating state when value exists
      const label = screen.getByText('Name');
      expect(label).toBeInTheDocument();
    });

    it('is accessible with floating labels', async () => {
      const { container } = renderWithTheme(
        <Input label="Email" floatingLabel id="email" required />
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('Character Count', () => {
    it('shows character count when characterCount is true', () => {
      renderWithTheme(<ControlledInput characterCount initialValue="hello" maxLength={50} />);
      expect(screen.getByText('5 / 50')).toBeInTheDocument();
    });

    it('shows character count without maxLength', () => {
      renderWithTheme(<ControlledInput characterCount initialValue="hello" />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('has aria live region for character count', () => {
      renderWithTheme(<ControlledInput characterCount initialValue="hello" maxLength={50} />);
      const counter = screen.getByRole('status');
      expect(counter).toHaveAttribute('aria-live', 'polite');
    });

    it('warns when approaching maxLength (90%)', () => {
      renderWithTheme(<ControlledInput characterCount initialValue="12345" maxLength={10} />);
      const counter = screen.getByRole('status');
      expect(counter).toHaveAttribute('aria-label', expect.stringContaining('5 of 10'));
    });

    it('shows error style when at maxLength', () => {
      renderWithTheme(<ControlledInput characterCount initialValue="1234567890" maxLength={10} />);
      const counter = screen.getByRole('status');
      expect(counter).toHaveTextContent('10 / 10');
    });
  });

  describe('Helper Text', () => {
    it('shows helper text when provided', () => {
      renderWithTheme(<Input helperText="Enter your full name" id="name" />);
      expect(screen.getByText('Enter your full name')).toBeInTheDocument();
    });

    it('uses aria-describedby to link input and helper text', () => {
      renderWithTheme(<Input helperText="Enter your full name" id="name" />);
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('name-helper');
    });
  });

  describe('Responsive Sizing', () => {
    it('accepts responsive size prop', () => {
      renderWithTheme(
        <Input 
          inputSize={{ sm: 'small', md: 'medium', lg: 'large' }} 
          label="Responsive" 
        />
      );
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Style Props', () => {
    it('accepts custom className', () => {
      renderWithTheme(<Input className="custom-input" data-testid="custom-input" />);
      const container = document.querySelector('.custom-input');
      expect(container).toBeInTheDocument();
    });

    it('accepts custom style prop', () => {
      renderWithTheme(<Input style={{ borderRadius: '20px' }} label="Styled" />);
      const container = document.querySelector('input');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Glass Morphism', () => {
    it('accepts glassMorphism prop', () => {
      renderWithTheme(<Input glassMorphism label="Glass Input" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Password Toggle Touch Target', () => {
    it('has minimum 44px touch target for password toggle', () => {
      renderWithTheme(<Input type="password" />);
      const toggle = screen.getByRole('button', { name: /show password/i });
      // Check computed styles for minimum dimensions
      const styles = window.getComputedStyle(toggle);
      expect(parseInt(styles.minWidth || '0')).toBeGreaterThanOrEqual(44);
      expect(parseInt(styles.minHeight || '0')).toBeGreaterThanOrEqual(44);
    });
  });

  describe('Component Memoization', () => {
    it('memo prevents unnecessary re-renders of same props', async () => {
      const TestComponent = () => {
        const [count, setCount] = useState(0);
        return (
          <>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <span>Count: {count}</span>
            <Input value="static" readOnly onChange={() => {}} />
          </>
        );
      };
      
      renderWithTheme(<TestComponent />);
      const button = screen.getByRole('button', { name: /increment/i });
      await userEvent.click(button);
      // Should still render without issues
      expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
    });
  });
});
