import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';
import { Popover } from '../src/components/Popover';

const meta: Meta<typeof Popover> = {
  title: 'react-n-design/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    defaultOpen: { control: 'boolean' },
  },
};
export default meta;

const InteractivePopover = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 100 }}>
      <Popover
        {...args}
        trigger={<Button onClick={() => setOpen(!open)}>Open Popover</Button>}
        open={open}
        onOpenChange={setOpen}
      >
        {args.children}
      </Popover>
    </div>
  );
};

export const Default: StoryObj<typeof Popover> = {
  render: (args) => <InteractivePopover {...args} />,
  args: {
    children: <p>This is the default popover content. It appears when you click the trigger.</p>,
    placement: 'bottom',
  },
};

export const Controlled: StoryObj<typeof Popover> = {
  render: function ControlledPopover() {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 100 }}>
        <p style={{ marginBottom: 12 }}>
          Controlled state: <strong>{open ? 'Open' : 'Closed'}</strong>
        </p>
        <Popover trigger={<Button>Toggle</Button>} open={open} onOpenChange={setOpen}>
          <p>This popover is fully controlled from outside.</p>
        </Popover>
      </div>
    );
  },
};

export const TopPlacement: StoryObj<typeof Popover> = {
  render: (args) => <InteractivePopover {...args} />,
  args: {
    children: <p>Popover positioned above the trigger element.</p>,
    placement: 'top',
  },
};

export const WithFormContent: StoryObj<typeof Popover> = {
  render: (args) => <InteractivePopover {...args} />,
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Name</label>
        <Input placeholder="Enter name" />
        <label>Email</label>
        <Input placeholder="Enter email" />
        <Button>Submit</Button>
      </div>
    ),
    placement: 'bottom',
  },
};
