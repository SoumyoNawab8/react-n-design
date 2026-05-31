import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { Collapsible } from '../src/components/Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'react-n-design/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    unmountOnExit: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    trigger: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A neumorphic collapsible component with smooth animations and full accessibility support. Features include keyboard navigation, ARIA attributes, controlled/uncontrolled modes, and customizable triggers.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

// ========== Basic Stories ==========

export const Default: Story = {
  args: {
    trigger: 'Toggle Content',
    children:
      'This is collapsible content that can be shown or hidden by clicking the trigger above. The animation includes both height and opacity transitions for a smooth neumorphic effect.',
  },
};

export const InitiallyOpen: Story = {
  args: {
    trigger: 'Initially Open',
    defaultOpen: true,
    children: 'This content is visible by default because defaultOpen is set to true.',
  },
};

export const Disabled: Story = {
  args: {
    trigger: 'Disabled Collapsible',
    disabled: true,
    children: 'This content cannot be accessed because the collapsible is disabled.',
  },
};

// ========== Behavior Variants ==========

export const UnmountOnExit: Story = {
  args: {
    trigger: 'Unmount on Exit',
    unmountOnExit: true,
    children:
      'When collapsed, this content is completely removed from the DOM instead of just hidden. Check your browser dev tools to see the element disappear from the DOM tree.',
  },
};

export const WithCustomIcon: Story = {
  args: {
    trigger: 'Custom Arrow Icon',
    icon: <span style={{ fontSize: '14px' }}></span>,
    children: 'This collapsible uses a custom arrow icon instead of the default chevron.',
  },
};

// ========== Controlled Mode Stories ==========

export const Controlled: Story = {
  render: function ControlledCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button size="small" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} via external button
          </Button>
          <span style={{ fontSize: '14px', color: '#666' }}>
            State: {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        <Collapsible trigger="Controlled Collapsible" open={isOpen} onOpenChange={setIsOpen}>
          <div>
            <p>
              This collapsible is controlled externally. You can toggle it using either the trigger
              above or the external button.
            </p>
          </div>
        </Collapsible>
      </div>
    );
  },
};

// ========== Complex Content Stories ==========

export const WithRichContent: Story = {
  args: {
    trigger: 'Click to see details',
    defaultOpen: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#6d5dfc' }}>
          Neumorphic Design Principles
        </h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Neumorphism is all about soft-ui elements. It uses subtle shadow play to create depth
          while maintaining a clean, modern aesthetic.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Soft shadows create depth</li>
          <li>Rounded corners for friendliness</li>
          <li>Subtle color transitions</li>
          <li>Focus on user experience</li>
        </ul>
      </div>
    ),
  },
};

export const Nested: Story = {
  render: function NestedCollapsible() {
    const [outerOpen, setOuterOpen] = useState(true);
    return (
      <Collapsible trigger="Outer Collapsible" open={outerOpen} onOpenChange={setOuterOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p>This is the outer collapsible content. It can contain nested collapsibles.</p>
          <Collapsible trigger="Middle Collapsible" defaultOpen={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p>Middle level content.</p>
              <Collapsible trigger="Inner Collapsible">
                <p>This is deeply nested inside all the collapsibles!</p>
              </Collapsible>
            </div>
          </Collapsible>
        </div>
      </Collapsible>
    );
  },
};

// ========== Custom Trigger Stories ==========

export const WithCustomTrigger: Story = {
  render: function CustomTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Collapsible
          trigger={
            <Button
              variant={isOpen ? 'primary' : 'default'}
              onClick={() => setIsOpen(!isOpen)}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Custom Trigger Button</span>
              <span>{isOpen ? '−' : '+'}</span>
            </Button>
          }
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <p>This collapsible uses a custom Button component as its trigger.</p>
        </Collapsible>
      </div>
    );
  },
};

// ========== Accessibility Stories ==========

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  render: function AccessibilityDemo() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Keyboard Navigation</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Press Tab to focus, then Space or Enter to toggle. The collapsible fully supports screen
            readers with proper ARIA attributes.
          </p>
        </div>
        <Collapsible trigger="Screen Reader Friendly">
          <div>
            <p>This content is properly announced to screen readers:</p>
            <ul>
              <strong>Trigger</strong>: Button with aria-expanded and aria-controls
              <li>
                <strong>Content</strong>: Region with aria-hidden and aria-labelledby
              </li>
            </ul>
          </div>
        </Collapsible>
      </div>
    );
  },
};

// ========== Playground ==========

export const Playground: Story = {
  args: {
    trigger: 'Playground Collapsible',
    defaultOpen: false,
    disabled: false,
    unmountOnExit: false,
    children: (
      <div>
        <p>Use the controls in the toolbar above to customize this collapsible.</p>
        <p>
          Try changing the <code>defaultOpen</code>, <code>disabled</code>, and
          <code>unmountOnExit</code> props to see how they affect the component behavior.
        </p>
      </div>
    ),
  },
};
