import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../src/components/Button';
import { type TabItem, Tabs } from '../src/components/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'react-n-design/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['line', 'card'] },
    tabPosition: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    centered: { control: 'boolean' },
    overflow: { control: 'radio', options: ['auto', 'scroll', 'wrap'] },
    collapsible: { control: 'boolean' },
  },
};
export default meta;

const sampleItems: TabItem[] = [
  { key: '1', label: 'Overview', children: 'Content for Overview' },
  { key: '2', label: 'Profile', children: 'Content for Profile' },
  { key: '3', label: 'Settings', children: 'Content for Settings' },
  { key: '4', label: 'Disabled', children: 'You should not see this.', disabled: true },
];

const itemsWithBadges: TabItem[] = [
  { key: '1', label: 'Inbox', badge: 12, children: 'Your inbox contains 12 new messages.' },
  { key: '2', label: 'Notifications', badge: 'New', children: 'You have new notifications!' },
  { key: '3', label: 'Tasks', badge: 3, children: '3 tasks are pending.' },
  { key: '4', label: 'Settings', children: 'Configure your preferences here.' },
];

const manyItems: TabItem[] = [
  { key: '1', label: 'Dashboard', children: 'Dashboard Content' },
  { key: '2', label: 'Analytics', children: 'Analytics Content' },
  { key: '3', label: 'Reports', children: 'Reports Content' },
  { key: '4', label: 'Users', children: 'Users Content' },
  { key: '5', label: 'Groups', children: 'Groups Content' },
  { key: '6', label: 'Permissions', children: 'Permissions Content' },
  { key: '7', label: 'Settings', children: 'Settings Content' },
  { key: '8', label: 'Integrations', children: 'Integrations Content' },
  { key: '9', label: 'Billing', children: 'Billing Content' },
  { key: '10', label: 'Support', children: 'Support Content' },
];

export const Default: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
  },
};

export const CardType: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    type: 'card',
  },
};

export const AllPositions: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>Top (Default)</h4>
        <Tabs items={sampleItems} tabPosition="top" />
      </div>
      <div>
        <h4>Bottom</h4>
        <Tabs items={sampleItems} tabPosition="bottom" />
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 1 }}>
          <h4>Left</h4>
          <Tabs items={sampleItems} tabPosition="left" />
        </div>
        <div style={{ flex: 1 }}>
          <h4>Right</h4>
          <Tabs items={sampleItems} tabPosition="right" />
        </div>
      </div>
    </div>
  ),
};

export const WithBadges: StoryObj<typeof Tabs> = {
  args: {
    items: itemsWithBadges,
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs can display badges to show counts or status indicators.',
      },
    },
  },
};

export const OverflowScroll: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ddd', padding: '16px' }}>
      <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        Container width: 400px with overflow="scroll"
      </p>
      <Tabs items={manyItems} overflow="scroll" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When tabs exceed container width, they become scrollable with overflow indicators.',
      },
    },
  },
};

export const OverflowWrap: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ddd', padding: '16px' }}>
      <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        Container width: 400px with overflow="wrap"
      </p>
      <Tabs items={manyItems} overflow="wrap" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs wrap to the next line instead of scrolling, ideal for mobile.',
      },
    },
  },
};

export const CollapsibleTabs: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ width: '500px', border: '1px solid #ddd', padding: '16px' }}>
      <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        Resize window to see collapsible behavior (collapsible prop)
      </p>
      <Tabs items={manyItems} collapsible />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs collapse into a "More" menu when space is limited (resize window to see effect).',
      },
    },
  },
};

export const VerticalWithScroll: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ height: '300px', border: '1px solid #ddd', padding: '16px' }}>
      <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        Vertical tabs with scrolling (height: 300px)
      </p>
      <Tabs items={manyItems} tabPosition="left" />
    </div>
  ),
};

export const WithExtraContent: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    tabBarExtraContent: <Button size="small">Add New</Button>,
  },
};

export const Controlled: StoryObj<typeof Tabs> = {
  render: function ControlledTabs() {
    const [activeKey, setActiveKey] = useState('1');
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <p>Current active tab: {activeKey}</p>
          <Button onClick={() => setActiveKey('2')} size="small" disabled={activeKey === '2'}>
            Switch to Profile
          </Button>
        </div>
        <Tabs items={sampleItems} activeKey={activeKey} onTabChange={setActiveKey} />
      </div>
    );
  },
};

export const SpringAnimations: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
  },
  render: () => (
    <div>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        Tab panels use spring animations (stiffness: 300, damping: 30) for smooth transitions.
        The indicator also uses spring physics for natural movement.
      </p>
      <Tabs items={sampleItems} />
    </div>
  ),
};

export const TouchSwipeDemo: StoryObj<typeof Tabs> = {
  parameters: {
    docs: {
      description: {
        story: 'On touch devices, you can swipe left/right (or up/down for vertical) to switch tabs.',
      },
    },
  },
  render: () => (
    <div>
      <p style={{ marginBottom: '16px', color: '#666' }}>
        👆 On mobile/touch devices: Swipe horizontally on the tabs to navigate.
      </p>
      <Tabs items={sampleItems} />
    </div>
  ),
};

export const Sizes: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>Small</h4>
        <Tabs items={sampleItems} size="small" />
      </div>
      <div>
        <h4>Medium (Default)</h4>
        <Tabs items={sampleItems} size="medium" />
      </div>
      <div>
        <h4>Large</h4>
        <Tabs items={sampleItems} size="large" />
      </div>
    </div>
  ),
};

export const Centered: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    centered: true,
  },
};

export const ComplexExample: StoryObj<typeof Tabs> = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Tabs
        items={itemsWithBadges}
        type="line"
        size="medium"
        tabBarExtraContent={
          <Button size="small" variant="ghost">
            Alerts
          </Button>
        }
        overflow="auto"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete example with badges, extra content, and proper overflow handling.',
      },
    },
  },
};

export const CustomStyled: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs
      items={sampleItems}
      className="my-custom-tabs"
      style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '12px' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs accept className and style props for custom styling.',
      },
    },
  },
};
