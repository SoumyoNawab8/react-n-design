import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { KanbanColumn } from '../src/components/KanbanBoard';
import { KanbanBoard } from '../src/components/KanbanBoard';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Layout / KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A lightweight Kanban board for task management with column headers, task cards, tags, and move actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object' },
    onChange: { action: 'columns changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const initialColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 't1', title: 'Design system audit', description: 'Review all components for accessibility', tags: ['design', 'a11y'] },
      { id: 't2', title: 'Update dependencies', description: 'Bump React and Storybook to latest', tags: ['devops'] },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 't3', title: 'Kanban board component', description: 'Build the new KanbanBoard with neumorphic styling', tags: ['frontend', 'v1.2'] },
      { id: 't4', title: 'Heatmap calendar', description: 'GitHub-style contribution calendar', tags: ['frontend', 'data-viz'] },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 't5', title: 'OTP Input accessibility', description: 'Ensure screen reader support and keyboard nav', tags: ['a11y'] },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 't6', title: 'Model selector dropdown', description: 'AI model picker with latency badges', tags: ['frontend', 'AI'] },
    ],
  },
];

const ControlledBoard = (args: any) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(args.columns || initialColumns);
  return (
    <KanbanBoard
      {...args}
      columns={columns}
      onChange={(newColumns) => {
        setColumns(newColumns);
        args.onChange?.(newColumns);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledBoard {...args} />,
  args: {
    columns: initialColumns,
  },
};

export const SingleColumn: Story = {
  render: (args) => <ControlledBoard {...args} />,
  args: {
    columns: [
      {
        id: 'backlog',
        title: 'Backlog',
        tasks: [
          { id: 'b1', title: 'Research competitors' },
          { id: 'b2', title: 'Draft PRD' },
          { id: 'b3', title: 'Wireframe v1' },
        ],
      },
    ],
  },
};

export const ManyTasks: Story = {
  render: (args) => <ControlledBoard {...args} />,
  args: {
    columns: [
      {
        id: 'todo',
        title: 'To Do',
        tasks: Array.from({ length: 8 }, (_, i) => ({
          id: `t${i}`,
          title: `Task ${i + 1}`,
          description: i % 2 === 0 ? 'A short description for this task card.' : undefined,
          tags: i % 3 === 0 ? ['urgent'] : undefined,
        })),
      },
      {
        id: 'done',
        title: 'Done',
        tasks: Array.from({ length: 5 }, (_, i) => ({
          id: `d${i}`,
          title: `Completed ${i + 1}`,
        })),
      },
    ],
  },
};

export const EmptyBoard: Story = {
  render: (args) => <ControlledBoard {...args} />,
  args: {
    columns: [
      { id: 'todo', title: 'To Do', tasks: [] },
      { id: 'in-progress', title: 'In Progress', tasks: [] },
      { id: 'done', title: 'Done', tasks: [] },
    ],
  },
};
