import type { Meta, StoryObj } from '@storybook/react';
import { Resizable } from '../src/components/Resizable';

const meta: Meta<typeof Resizable> = {
  title: 'react-n-design/Resizable',
  component: Resizable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Resizable>;

const Panel1 = () => (
  <div style={{ padding: '20px', height: '300px', background: '#f0f2f5' }}>
    <p><strong>Panel 1</strong></p>
    <p>Drag the handle to resize this panel.</p>
  </div>
);

const Panel2 = () => (
  <div style={{ padding: '20px', height: '300px', background: '#e8eaf0' }}>
    <p><strong>Panel 2</strong></p>
    <p>This panel adjusts automatically.</p>
  </div>
);

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    defaultSize: '50%',
    children: [<Panel1 key="1" />, <Panel2 key="2" />] as [any, any],
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    defaultSize: '40%',
    children: [
      <div key="1" style={{ padding: '20px', background: '#f0f2f5' }}>Top Panel</div>,
      <div key="2" style={{ padding: '20px', background: '#e8eaf0' }}>Bottom Panel</div>,
    ] as [any, any],
  },
};

export const FixedSize: Story = {
  args: {
    direction: 'horizontal',
    defaultSize: 300,
    minSize: 200,
    maxSize: 500,
    children: [<Panel1 key="1" />, <Panel2 key="2" />] as [any, any],
  },
};

export const WithOnSizeChange: Story = {
  args: {
    direction: 'horizontal',
    defaultSize: '50%',
    onSizeChange: (size: number) => console.log('Size changed:', size),
    children: [<Panel1 key="1" />, <Panel2 key="2" />] as [any, any],
  },
  parameters: {
    docs: {
      description: {
        story: 'Check the console to see size change events.',
      },
    },
  },
};