import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextArea as TextAreaCompo } from '../src/components/TextArea';

const meta: Meta<typeof TextAreaCompo> = {
  title: 'react-n-design/TextArea',
  component: TextAreaCompo,
  tags: ['autodocs'],
};
export default meta;

const TextArea = (args: any) => {
  const [value, setValue] = useState(args.defaultValue || '');
  return <TextAreaCompo {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithLabel: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    id: 'description',
    rows: 4,
  },
};

export const WithHelperText: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Bio',
    helperText: 'Tell us a little about yourself',
    placeholder: 'I am...',
    id: 'bio',
    rows: 4,
  },
};

export const WithCharacterCount: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Comment',
    placeholder: 'Write your comment here...',
    maxLength: 200,
    showCount: true,
    id: 'comment',
    rows: 4,
  },
};

export const NearLimit: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Near Limit Example',
    placeholder: 'Max 100 characters...',
    maxLength: 100,
    showCount: true,
    defaultValue:
      'This text is approaching the maximum character limit and you can see the counter change color as you type more text here',
    id: 'near-limit',
    rows: 3,
  },
};

export const WithError: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Feedback',
    error: 'Please provide feedback before submitting',
    placeholder: 'Your feedback...',
    defaultValue: '',
    id: 'feedback-error',
    rows: 4,
  },
};

export const Disabled: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Disabled TextArea',
    disabled: true,
    defaultValue: 'This textarea is disabled',
    rows: 4,
  },
};

export const ReadOnly: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Read-Only TextArea',
    readOnly: true,
    defaultValue: 'This content cannot be edited. It is read-only.',
    rows: 4,
  },
};

export const AutoResize: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Auto-Resize TextArea',
    placeholder: 'Type here... the textarea will grow as you add more lines',
    autoResize: true,
    minRows: 2,
    maxRows: 6,
    id: 'auto-resize',
  },
};

export const AutoResizeWithContent: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Auto-Resize with Content',
    autoResize: true,
    minRows: 2,
    maxRows: 5,
    defaultValue: `Line 1
Line 2
Line 3
Line 4
Line 5`,
    id: 'auto-resize-content',
  },
};

export const Required: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required...',
    id: 'required-field',
    rows: 4,
  },
};

export const SmallSize: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Small Size',
    inputSize: 'small',
    placeholder: 'Small textarea...',
    rows: 3,
  },
};

export const LargeSize: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: {
    label: 'Large Size',
    inputSize: 'large',
    placeholder: 'Large textarea...',
    rows: 4,
  },
};

export const FullWidth: StoryObj<typeof TextArea> = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <TextArea {...args} />
    </div>
  ),
  args: {
    fullWidth: true,
    label: 'Full Width TextArea',
    placeholder: 'This textarea takes full width...',
    rows: 4,
  },
};

export const ContactFormExample: StoryObj<typeof TextArea> = {
  render: () => {
    const [message, setMessage] = useState('');
    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextAreaCompo
          label="Your Message"
          placeholder="How can we help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          showCount
          autoResize
          minRows={3}
          maxRows={8}
          helperText="We typically respond within 24 hours"
          required
        />
      </div>
    );
  },
};
