import type { Meta, StoryObj } from '@storybook/react';
import { ChartArea, ChartBar, ChartLine } from '../src/components/Charts';

const sampleData = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 25 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 50 },
  { label: 'Jun', value: 75 },
];

const meta: Meta = {
  title: 'react-n-design/Charts',
  tags: ['autodocs'],
};
export default meta;

export const BarChart: StoryObj = {
  render: () => (
    <ChartBar
      data={sampleData}
      title="Monthly Revenue"
      width={500}
      height={260}
      color="#6d5dfc"
      showGrid
      showLabels
      showValues
    />
  ),
};

export const LineChart: StoryObj = {
  render: () => (
    <ChartLine
      data={sampleData}
      title="User Growth"
      width={500}
      height={260}
      color="#00c9a7"
      showGrid
      showLabels
      showValues
    />
  ),
};

export const AreaChart: StoryObj = {
  render: () => (
    <ChartArea
      data={sampleData}
      title="Server Load"
      width={500}
      height={260}
      color="#ff6b6b"
      showGrid
      showLabels
      showValues
    />
  ),
};

export const NoGrid: StoryObj = {
  render: () => (
    <ChartBar
      data={sampleData}
      title="No Grid"
      width={500}
      height={260}
      showGrid={false}
      showLabels
      showValues
    />
  ),
};

export const NoLabels: StoryObj = {
  render: () => (
    <ChartLine
      data={sampleData}
      title="No Labels"
      width={500}
      height={260}
      showGrid
      showLabels={false}
      showValues
    />
  ),
};

export const NoValues: StoryObj = {
  render: () => (
    <ChartArea
      data={sampleData}
      title="No Values"
      width={500}
      height={260}
      showGrid
      showLabels
      showValues={false}
    />
  ),
};

export const ResponsiveWidth: StoryObj = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 600 }}>
      <ChartBar
        data={sampleData}
        title="Responsive (100% width)"
        height={240}
        showGrid
        showLabels
        showValues
      />
    </div>
  ),
};

export const CustomColor: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <ChartBar
        data={sampleData}
        title="Bar — Orange"
        width={320}
        height={220}
        color="#ff9f43"
        showGrid
        showLabels
      />
      <ChartLine
        data={sampleData}
        title="Line — Pink"
        width={320}
        height={220}
        color="#f368e0"
        showGrid
        showLabels
      />
      <ChartArea
        data={sampleData}
        title="Area — Teal"
        width={320}
        height={220}
        color="#10ac84"
        showGrid
        showLabels
      />
    </div>
  ),
};
