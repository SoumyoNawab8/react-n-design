import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ErrorMessage, Form, FormItem, useForm } from '../src/components/Form';
import { Input } from '../src/components/Input';

const meta: Meta<typeof Form> = {
  title: 'react-n-design/Form v1.2.0',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'inline', 'compact'],
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
    compact: {
      control: 'boolean',
      description: 'Compact layout variant (v1.2.0)',
    },
    responsiveBreakpoint: {
      control: 'number',
      description: 'Responsive breakpoint for mobile layout (v1.2.0)',
      defaultValue: 768,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `Form v1.2.0 introduces shake animations on validation errors, responsive layout switching for mobile, compact layout variant, debounced validation, and performance optimizations through React.memo().`,
      },
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

// ============================================
// Basic Form with Validation v1.2.0
// ============================================

const ValidationFormExample = () => {
  const [form] = useForm();
  const [shakeDemo, setShakeDemo] = useState(false);

  const handleFinish = (values: FormValues) => {
    alert(`Form submitted:\n${JSON.stringify(values, null, 2)}`);
  };

  const handleFinishFailed = (errorInfo: unknown) => {
    console.log('Validation failed:', errorInfo);
  };

  const triggerShake = () => {
    setShakeDemo(true);
    // Trigger validation to show shake
    form.validateFields().catch(() => {
      // Expected to fail
    });
    setTimeout(() => setShakeDemo(false), 1000);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        style={{ maxWidth: '600px' }}
        scrollToFirstError
        debounceMs={300}
      >
        <FormItem
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </FormItem>
        <FormItem
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Password is required' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input type="password" placeholder="Enter your password" />
        </FormItem>
        <FormItem
          label="Phone Number"
          name="phone"
          rules={[
            { pattern: /^\d{10}$/, message: 'Phone must be 10 digits (optional)' },
          ]}
        >
          <Input placeholder="Optional phone number" />
        </FormItem>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
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
            Submit (with Shake)
          </button>
          <button
            type="button"
            onClick={triggerShake}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '2px solid #6d5dfc',
              background: 'white',
              color: '#6d5dfc',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Trigger Shake
          </button>
          <button
            type="button"
            onClick={() => form.resetFields()}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#f7fafc',
              color: '#4a5568',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Reset
          </button>
        </div>
      </Form>
    </div>
  );
};

export const WithValidation: Story = {
  render: () => <ValidationFormExample />,
  parameters: {
    docs: {
      description: {
        story: `v1.2.0 Features Demonstrated:
        
**Animation Features:**
- **Shake Animation**: Fields with errors shake when validation fails
- **Success Checkmark**: Green checkmark appears on valid fields with scale animation
- **Error Message Reveal**: Smooth fade + slide animation for error messages

**Performance Features:**
- **Debounced Validation**: 300ms debounce on input (configurable via debounceMs prop)
- **React.memo**: FormItem is wrapped with React.memo for optimized re-renders
- **Memoized Validation**: Validation status and required checks are memoized

Try submitting with empty fields or invalid email to see the shake animation!`,
      },
    },
  },
};

// ============================================
// Responsive Layout
// ============================================

const ResponsiveLayoutExample = () => {
  return (
    <div>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        <strong>Responsive Layout Demo:</strong> Resize the browser window to see layout changes.
        Below 768px, horizontal layout switches to vertical with mobile-optimized spacing.
      </p>
      
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: '800px' }}
        responsiveBreakpoint={768}
      >
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter username" />
        </FormItem>
        <FormItem
          label="Email Address"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input type="email" placeholder="Enter email" />
        </FormItem>
        <FormItem
          label="Department"
          name="dept"
        >
          <Input placeholder="Your department" />
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
      </Form>
    </div>
  );
};

export const Responsive: Story = {
  render: () => <ResponsiveLayoutExample />,
  parameters: {
    docs: {
      description: {
        story: `**Responsive Layout (v1.2.0)**:
        
- Above breakpoint: Horizontal layout with labels on the left
- Below breakpoint: Automatically switches to vertical layout
- Mobile-optimized spacing and font sizes
- Touch-friendly error messages with larger tap targets

Try resizing your browser to see the responsive behavior.`,
      },
    },
  },
};

// ============================================
// Compact Layout
// ============================================

const CompactLayoutExample = () => {
  return (
    <div>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        <strong>Compact Layout:</strong> Smaller padding, condensed spacing, and smaller icons.
      </p>
      
      <Form
        layout="compact"
        compact={true}
        style={{ maxWidth: '400px' }}
      >
        <FormItem
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Name" />
        </FormItem>
        <FormItem
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input type="email" placeholder="Email" />
        </FormItem>
        <FormItem
          label="Website"
          name="website"
          rules={[{ type: 'url', message: 'Invalid URL' }]}
          extra="Optional"
        >
          <Input placeholder="https://example.com" />
        </FormItem>
        
        <div style={{ marginTop: '16px' }}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #6d5dfc, #5b5dfc)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '13px',
            }}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export const Compact: Story = {
  render: () => <CompactLayoutExample />,
  parameters: {
    docs: {
      description: {
        story: `**Compact Layout (v1.2.0)**:
        
- Reduced padding (16px instead of 24px)
- Smaller icons (14px instead of 16px)
- Tighter margins (20px instead of 24px)
- Smaller label font size
- Condensed error messages

Perfect for dense forms like settings panels, filters, or modal dialogs.`,
      },
    },
  },
};

// ============================================
// All Layouts Comparison
// ============================================

const LayoutsComparisonExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3>Horizontal Layout</h3>
        <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <FormItem label="Name" name="h-name">
            <Input placeholder="Horizontal" />
          </FormItem>
          <FormItem label="Email" name="h-email">
            <Input placeholder="Horizontal" />
          </FormItem>
        </Form>
      </div>

      <div>
        <h3>Vertical Layout</h3>
        <Form layout="vertical">
          <FormItem label="Name" name="v-name">
            <Input placeholder="Vertical" />
          </FormItem>
          <FormItem label="Email" name="v-email">
            <Input placeholder="Vertical" />
          </FormItem>
        </Form>
      </div>

      <div>
        <h3>Inline Layout</h3>
        <Form layout="inline">
          <FormItem label="Username" name="i-username">
            <Input placeholder="Inline" />
          </FormItem>
          <FormItem label="Password" name="i-password">
            <Input type="password" placeholder="Inline" />
          </FormItem>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#6d5dfc',
              color: 'white',
              cursor: 'pointer',
              height: 'fit-content',
            }}
          >
            Login
          </button>
        </Form>
      </div>

      <div>
        <h3>Compact Layout (v1.2.0)</h3>
        <Form layout="compact" compact>
          <FormItem label="Name" name="c-name">
            <Input placeholder="Compact" />
          </FormItem>
          <FormItem label="Email" name="c-email">
            <Input placeholder="Compact" />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export const LayoutsComparison: Story = {
  render: () => <LayoutsComparisonExample />,
  parameters: {
    docs: {
      description: {
        story: `**All Layout Types**:
        
Compare all four layout options: Horizontal, Vertical, Inline, and the new Compact layout.`,
      },
    },
    layout: 'padded',
  },
};

// ============================================
// Horizontal Layout (Original)
// ============================================

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

// ============================================
// Vertical Layout
// ============================================

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

// ============================================
// Inline Layout
// ============================================

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

// ============================================
// Disabled State
// ============================================

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

// ============================================
// Basic Form
// ============================================

const BasicFormExample = () => {
  const [_formValues, _setFormValues] = useState<FormValues>({ name: '', email: '', password: '' });

  const handleFinish = (values: FormValues) => {
    alert(`Form submitted:\n${JSON.stringify(values, null, 2)}`);
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
