'use client';
import React, { memo, useCallback, useMemo } from 'react';
import { ChevronUp, ChevronDown, ArrowRight } from '../../icons';
import {
  BoardContainer,
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  ColumnCount,
  TaskCard,
  TaskTitle,
  TaskDescription,
  TaskTags,
  Tag,
  TaskActions,
  ActionButton,
  TaskList,
} from './KanbanBoard.styles';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onChange: (columns: KanbanColumn[]) => void;
  className?: string;
}

const KanbanBoardComponent: React.FC<KanbanBoardProps> = ({
  columns,
  onChange,
  className,
}) => {
  const handleMoveTask = useCallback(
    (columnIndex: number, taskIndex: number, direction: 'up' | 'down') => {
      const newColumns = columns.map((col) => ({ ...col, tasks: [...col.tasks] }));
      const tasks = newColumns[columnIndex].tasks;
      if (direction === 'up' && taskIndex > 0) {
        [tasks[taskIndex - 1], tasks[taskIndex]] = [tasks[taskIndex], tasks[taskIndex - 1]];
      } else if (direction === 'down' && taskIndex < tasks.length - 1) {
        [tasks[taskIndex + 1], tasks[taskIndex]] = [tasks[taskIndex], tasks[taskIndex + 1]];
      }
      onChange(newColumns);
    },
    [columns, onChange]
  );

  const handleMoveToNextColumn = useCallback(
    (columnIndex: number, taskIndex: number) => {
      const newColumns = columns.map((col) => ({ ...col, tasks: [...col.tasks] }));
      const task = newColumns[columnIndex].tasks[taskIndex];
      newColumns[columnIndex].tasks.splice(taskIndex, 1);
      const nextColumnIndex = (columnIndex + 1) % newColumns.length;
      newColumns[nextColumnIndex].tasks.push(task);
      onChange(newColumns);
    },
    [columns, onChange]
  );

  const boardContent = useMemo(() => {
    return columns.map((column, columnIndex) => (
      <ColumnContainer key={column.id} role="listitem">
        <ColumnHeader>
          <ColumnTitle>{column.title}</ColumnTitle>
          <ColumnCount aria-label={`${column.tasks.length} tasks`}>
            {column.tasks.length}
          </ColumnCount>
        </ColumnHeader>
        <TaskList role="list" aria-label={`${column.title} tasks`}>
          {column.tasks.map((task, taskIndex) => (
            <TaskCard key={task.id} role="listitem">
              <TaskTitle>{task.title}</TaskTitle>
              {task.description && (
                <TaskDescription>{task.description}</TaskDescription>
              )}
              {task.tags && task.tags.length > 0 && (
                <TaskTags>
                  {task.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TaskTags>
              )}
              <TaskActions>
                <ActionButton
                  aria-label={`Move ${task.title} up`}
                  onClick={() => handleMoveTask(columnIndex, taskIndex, 'up')}
                  disabled={taskIndex === 0}
                >
                  <ChevronUp size={14} aria-hidden="true" />
                </ActionButton>
                <ActionButton
                  aria-label={`Move ${task.title} down`}
                  onClick={() => handleMoveTask(columnIndex, taskIndex, 'down')}
                  disabled={taskIndex === column.tasks.length - 1}
                >
                  <ChevronDown size={14} aria-hidden="true" />
                </ActionButton>
                <ActionButton
                  aria-label={`Move ${task.title} to next column`}
                  onClick={() => handleMoveToNextColumn(columnIndex, taskIndex)}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </ActionButton>
              </TaskActions>
            </TaskCard>
          ))}
        </TaskList>
      </ColumnContainer>
    ));
  }, [columns, handleMoveTask, handleMoveToNextColumn]);

  return (
    <BoardContainer className={className} role="list" aria-label="Kanban board">
      {boardContent}
    </BoardContainer>
  );
};

KanbanBoardComponent.displayName = 'KanbanBoard';

export const KanbanBoard = memo(KanbanBoardComponent);
