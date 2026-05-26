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
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'center'],
      description: 'Position of the popover relative to the trigger',
    },
    triggerMode: {
      control: 'radio',
      options: ['click', 'hover', 'focus'],
      description: 'How the popover is triggered',
    },
    hoverDelay: {
      control: 'number',
      description: 'Delay in ms before showing on hover (hover mode only)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state',
    },
    portal: {
      control: 'boolean',
      description: 'Render in portal (body) or inline',
    },
    withArrow: {
      control: 'boolean',
      description: 'Show the arrow pointer',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width in pixels',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width in pixels',
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger in pixels',
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment for center placement',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the popover',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

// Base component wrapper
const PopoverWrapper = (args: any) => (
  <div style={{ padding: '100px', minHeight: '300px' }}>
    <Popover {...args} />
  </div>
);

export const Default: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Click Me</Button>,
    content: <p>This is the default popover content. It appears when you click the trigger button.</p>,
    placement: 'bottom',
    triggerMode: 'click',
  },
};

export const ClickTrigger: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Click Me</Button>,
    content: <p>This popover opens on click. Click the trigger again or click outside to close it.</p>,
    triggerMode: 'click',
  },
};

export const HoverTrigger: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Hover Over Me</Button>,
    content: <p>This popover opens on hover. Move your mouse away to close it.</p>,
    triggerMode: 'hover',
    hoverDelay: 100,
  },
};

export const FocusTrigger: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Input placeholder="Focus on me" />,
    content: <p>This popover opens when the input is focused.</p>,
    triggerMode: 'focus',
  },
};

// Placement stories
export const TopPlacement: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Top Placement</Button>,
    content: <p>Popover positioned above the trigger element.</p>,
    placement: 'top',
  },
};

export const BottomPlacement: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Bottom Placement</Button>,
    content: <p>Popover positioned below the trigger element.</p>,
    placement: 'bottom',
  },
};

export const LeftPlacement: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Left Placement</Button>,
    content: <p>Popover positioned to the left of the trigger element.</p>,
    placement: 'left',
  },
};

export const RightPlacement: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Right Placement</Button>,
    content: <p>Popover positioned to the right of the trigger element.</p>,
    placement: 'right',
  },
};

export const CenterPlacement: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Center Placement</Button>,
    content: <p>Popover centered on the trigger element.</p>,
    placement: 'center',
    withArrow: false,
  },
};

// Content examples
export const RichContent: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>User Profile</Button>,
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          JD
        </div>
        <div>
          <strong>John Doe</strong>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Software Engineer
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#999' }}>
            john.doe@example.com
          </p>
        </div>
      </div>
    ),
    placement: 'bottom',
    minWidth: 300,
  },
};

export const FormContent: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>Edit Settings</Button>,
    content: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '250px' }}
      onSubmit={(e) => e.preventDefault()}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
            Name
          </label>
          <Input placeholder="Enter your name" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
            Email
          </label>
          <Input placeholder="Enter your email" type="email" />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button size="small">Save</Button>
        </div>
      </form>
    ),
    placement: 'bottom',
    triggerMode: 'click',
  },
};

export const ConfirmDelete: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button variant="danger">Delete Item</Button>,
    content: (
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 16px' }}>Are you sure you want to delete this item?</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button variant="danger" size="small">Delete</Button>
        </div>
      </div>
    ),
    placement: 'bottom',
    triggerMode: 'click',
    withArrow: true,
    maxWidth: 280,
  },
};

export const WithoutArrow: Story = {
  render: PopoverWrapper,
  args: {
    trigger: <Button>No Arrow</Button>,
    content: <p>This popover has no arrow pointing to the trigger.</p>,
    withArrow: false,
  },
};

// Controlled story
export const Controlled: Story = {
  render: function ControlledPopover() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '100px', minHeight: '300px' }}>
        <p style={{ marginBottom: '16px' }}>
          State: <strong>{open ? 'Open' : 'Closed'}</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={() => setOpen(!open)}>Toggle Popover</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        </div>
        <Popover
          trigger={<span>Controlled</span>}
          content={<p>This popover is controlled from outside.</p>}
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
        />
      </div>
    );
  },
};

// All positions with arrows
export const AllPositions: Story = {
  render: function AllPositionsPopover() {
    return (
      <div style={{ 
        padding: '150px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '80px',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        <Popover
          trigger={<Button>Top</Button>}
          content={<p>Popover on top</p>}
          placement="top"
          triggerMode="hover"
        />
        <Popover
          trigger={<Button>Right</Button>}
          content={<p>Popover on right</p>}
          placement="right"
          triggerMode="hover"
        />
        <Popover
          trigger={<Button>Left</Button>}
          content={<p>Popover on left</p>}
          placement="left"
          triggerMode="hover"
        />
        <Popover
          trigger={<Button>Bottom</Button>}
          content={<p>Popover on bottom</p>}
          placement="bottom"
          triggerMode="hover"
        />
      </div>
    );
  },
};

// Accessibility story
export const AccessibilityDemo: Story = {
  render: function AccessiblePopover() {
    const [notifications, setNotifications] = useState(3);

    return (
      <div style={{ padding: '100px' }}>
        <Popover
          trigger={
            <Button aria-label={`${notifications} notifications`}>
              🔔 Notifications ({notifications})
            </Button>
          }
          content={
            <div role="menu" style={{ minWidth: '240px' }}>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>Notifications ({notifications})</strong>
              </div>
              <button
                role="menuitem"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 0',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setNotifications(n => Math.max(0, n - 1))}
              >
                Mark all as read
              </button>
              <div role="list" style={{ marginTop: '8px' }}>
                <div role="listitem" style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  New message from Alice
                </div>
                <div role="listitem" style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  Task completed
                </div>
                <div role="listitem" style={{ padding: '8px 0' }}>
                  Meeting reminder
                </div>
              </div>
            </div>
          }
          placement="bottom"
          triggerMode="click"
          aria-label="Notifications menu"
          aria-describedby="notifications-desc"
        />
        <p id="notifications-desc" style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Use keyboard: Tab to focus, Enter to open, Escape to close
        </p>
      </div>
    );
  },
};

// Animation demos
export const DifferentAnimations: Story = {
  render: function AnimationDemo() {
    const [activePopover, setActivePopover] = useState<string | null>(null);

    return (
      <div style={{ padding: '100px' }}>
        <h3>Animation Demonstrations</h3>
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          
          <Popover
            trigger={<Button onClick={() => setActivePopover('top')}>Slide from Top</Button>}
            content={<p>Animates from above!</p>}
            placement="top"
            triggerMode="click"
            defaultOpen={activePopover === 'top'}
            open={activePopover === 'top'}
            onOpenChange={(open) => setActivePopover(open ? 'top' : null)}
          />

          <Popover
            trigger={<Button onClick={() => setActivePopover('left')}>Slide from Left</Button>}
            content={<p>Animates from left!</p>}
            placement="left"
            triggerMode="click"
            defaultOpen={activePopover === 'left'}
            open={activePopover === 'left'}
            onOpenChange={(open) => setActivePopover(open ? 'left' : null)}
          />

          <Popover
            trigger={<Button onClick={() => setActivePopover('scale')}>Scale Effect</Button>}
            content={<p>Scales up from center!</p>}
            placement="center"
            triggerMode="click"
            defaultOpen={activePopover === 'scale'}
            open={activePopover === 'scale'}
            onOpenChange={(open) => setActivePopover(open ? 'scale' : null)}
            withArrow={false}
          />
        </div>
      </div>
    );
  },
};

// Themes demo
export const Themes: Story = {
  render: function ThemeDemo() {
    return (
      <div style={{ padding: '100px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap',
          background: '#f0f0f0', 
          padding: '40px',
          borderRadius: '8px'
        }}>
          <Popover
            trigger={<Button>Light Theme</Button>}
            content={<p>Popover with default light theme styling.</p>}
            placement="bottom"
          />

          <Popover
            trigger={<Button variant="secondary">Secondary</Button>}
            content={<>
                <p>Secondary styled popover.</p>
                <Button size="small" variant="text">Action</Button>
              </>
            }
            placement="top"
          />

          <Popover
            trigger={<Button variant="danger">Danger</Button>}
            content={<p>Alert popover content.</p>}
            placement="right"
          />
        </div>
      </div>
    );
  },
};
