import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../src/components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Data Display / Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive date calendar with month navigation, event dots, and keyboard accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'date' },
    onChange: { action: 'date selected' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: new Date(),
  },
};

export const WithEvents: Story = {
  args: {
    value: new Date(),
    events: [
      { date: new Date(), color: '#6d5dfc' },
      { date: new Date(Date.now() + 86400000), color: '#28a745' },
      { date: new Date(Date.now() + 172800000), color: '#dc3545' },
    ],
  },
};

export const DisabledDate: Story = {
  args: {
    value: new Date(),
    disabledDate: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date());
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Calendar value={value} onChange={(date) => setValue(date)} />
        <div style={{ fontSize: 14, color: '#666' }}>
          Selected: {value ? value.toDateString() : 'None'}
        </div>
      </div>
    );
  },
};
