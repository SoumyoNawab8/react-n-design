import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaAt, FaClock, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { Button } from '../src/components/Button';
import { Input as InputComponent } from '../src/components/Input';

const meta: Meta<typeof InputComponent> = {
  title: 'react-n-design/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['small', 'medium', 'large', { sm: 'small', md: 'medium', lg: 'large' }],
    },
    floatingLabel: {
      control: 'boolean',
    },
    characterCount: {
      control: 'boolean',
    },
    glassMorphism: {
      control: 'boolean',
    },
  },
};
export default meta;

const Input = (args: any) => {
  const [value, setValue] = useState(args.defaultValue || args.value || '');
  return (
    <InputComponent
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: { placeholder: 'Enter text...' },
};

export const WithPrefixAndSuffix: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    prefix: <FaUser />,
    suffix: <FaAt />,
    placeholder: 'Username',
  },
};

export const WithAddons: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    addonBefore: 'https://',
    addonAfter: '.com',
    defaultValue: 'mysite',
  },
};

export const PasswordInput: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
  },
};

export const WithClearButton: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    allowClear: true,
    placeholder: 'Text here will be clearable',
    label: 'Clearable Input',
  },
};

export const WithCustomClearIcon: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    allowClear: true,
    clearIcon: <FaTimes />,
    placeholder: 'Text here will be clearable',
    label: 'Custom Clear Icon',
  },
};

// v1.2.0 Stories

export const FloatingLabel: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    floatingLabel: true,
  },
};

export const FloatingLabelWithValue: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    floatingLabel: true,
    defaultValue: 'john.doe@example.com',
  },
};

export const WithCharacterCount: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    characterCount: true,
    maxLength: 200,
    defaultValue: 'Hello, I am a developer.',
  },
};

export const CharacterCountNearLimit: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Comment',
    placeholder: 'Add a comment...',
    characterCount: true,
    maxLength: 100,
    defaultValue: 'This is near the limit with 90 characters! This is near the limit with',
  },
};

export const CharacterCountAtLimit: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Tweet',
    placeholder: 'What are you thinking?',
    characterCount: true,
    maxLength: 50,
    defaultValue: 'This character count is now at the maximum limit!',
  },
};

export const FloatingLabelWithError: StoryObj<typeof Input> = {
  name: 'Floating Label with Error',
  render: (args) => <Input {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    floatingLabel: true,
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Username can contain letters, numbers, and underscores',
  },
};

export const FullFeatured: StoryObj<typeof Input> = {
  name: 'Full Featured Example',
  render: (args) => <Input {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Search documentation...',
    floatingLabel: true,
    prefix: <FaSearch />,
    allowClear: true,
    characterCount: true,
    maxLength: 100,
    helperText: 'Use keywords to find relevant results',
  },
};

export const SizeSmall: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Small Input',
    inputSize: 'small',
    placeholder: 'Small size',
  },
};

export const SizeMedium: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Medium Input',
    inputSize: 'medium',
    placeholder: 'Medium size',
  },
};

export const SizeLarge: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Large Input',
    inputSize: 'large',
    placeholder: 'Large size',
  },
};

export const GlassMorphism: StoryObj<typeof Input> = {
  render: (args) => (
    <div style={{ 
      padding: '40px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px'
    }}>
      <Input {...args} />
    </div>
  ),
  args: {
    label: 'Glass Input',
    placeholder: 'Enter text...',
    glassMorphism: true,
    floatingLabel: true,
  },
};

export const ResponsiveSizing: StoryObj<typeof Input> = {
  name: 'Responsive Sizing',
  render: (args) => <Input {...args} />,
  args: {
    label: 'Responsive Input',
    placeholder: 'Resize viewport to see changes',
    inputSize: { sm: 'small', md: 'medium', lg: 'large' },
    helperText: 'Input size changes based on screen width: sm < 640px, md 640-1024px, lg > 1024px',
  },
};

export const Disabled: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

export const WithRequired: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const FullWidth: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Full Width Input',
    placeholder: 'Takes full container width',
    fullWidth: true,
    allowClear: true,
    defaultValue: 'This is full width',
  },
};

export const SearchBox: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    addonAfter: <Button shape="circle" leftIcon={<FaSearch />} aria-label="Search" />,
    placeholder: 'Search...',
    allowClear: true,
  },
};

// Comparison story showing old vs new behavior
export const Comparison: StoryObj<typeof Input> = {
  name: 'Old vs New (Comparison)',
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    return (
      <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
        <div>
          <h4>Old Style (Static Label)</h4>
          <InputComponent
            label="Email"
            placeholder="Enter your email"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            allowClear
          />
        </div>
        <div>
          <h4>New Style (Floating Label + Character Count)</h4>
          <InputComponent
            label="Email"
            placeholder="Enter your email"
            floatingLabel
            allowClear
            characterCount
            maxLength={100}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>
      </div>
    );
  },
};
