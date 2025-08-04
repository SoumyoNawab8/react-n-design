import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabItem } from '../src/components/Tabs';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Tabs> = {
  title: 'react-n-design/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['line', 'card'] },
    tabPosition: { control: 'radio', options: ['top', 'left'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    centered: { control: 'boolean' },
  },
};
export default meta;

const sampleItems: TabItem[] = [
  { key: '1', label: 'Overview', children: 'Content for Overview' },
  { key: '2', label: 'Profile', children: 'Content for Profile' },
  { key: '3', label: 'Settings', children: 'Content for Settings' },
  { key: '4', label: 'Disabled', children: 'You should not see this.', disabled: true },
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

export const LeftPosition: StoryObj<typeof Tabs> = {
  args: {
    items: sampleItems,
    tabPosition: 'left',
  },
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