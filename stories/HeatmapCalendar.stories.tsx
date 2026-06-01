import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapCalendar } from '../src/components/HeatmapCalendar';

const meta: Meta<typeof HeatmapCalendar> = {
  title: 'Data Display / HeatmapCalendar',
  component: HeatmapCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A GitHub-style contribution calendar heatmap showing activity intensity over a year. Supports Monday or Sunday week start.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    year: { control: 'number' },
    startWeekOnMonday: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function generateHeatmapData(year: number, density: 'sparse' | 'medium' | 'dense'): { date: string; count: number }[] {
  const data: { date: string; count: number }[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  const maxCount = density === 'sparse' ? 3 : density === 'medium' ? 8 : 15;
  const chance = density === 'sparse' ? 0.15 : density === 'medium' ? 0.4 : 0.75;

  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (Math.random() < chance) {
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      data.push({
        date: `${year}-${month}-${day}`,
        count: Math.floor(Math.random() * maxCount) + 1,
      });
    }
  }
  return data;
}

export const Default: Story = {
  args: {
    data: generateHeatmapData(2026, 'medium'),
    year: 2026,
    startWeekOnMonday: true,
  },
};

export const Sparse: Story = {
  args: {
    data: generateHeatmapData(2026, 'sparse'),
    year: 2026,
    startWeekOnMonday: true,
  },
};

export const Dense: Story = {
  args: {
    data: generateHeatmapData(2026, 'dense'),
    year: 2026,
    startWeekOnMonday: true,
  },
};

export const SundayStart: Story = {
  args: {
    data: generateHeatmapData(2025, 'medium'),
    year: 2025,
    startWeekOnMonday: false,
  },
};

export const EmptyYear: Story = {
  args: {
    data: [],
    year: 2026,
    startWeekOnMonday: true,
  },
};

export const SinglePeak: Story = {
  args: {
    data: [
      { date: '2026-03-15', count: 2 },
      { date: '2026-03-16', count: 5 },
      { date: '2026-03-17', count: 12 },
      { date: '2026-03-18', count: 8 },
      { date: '2026-03-19', count: 3 },
    ],
    year: 2026,
    startWeekOnMonday: true,
  },
};
