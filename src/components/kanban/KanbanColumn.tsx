'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanColumn as KanbanColumnType, KanbanTask } from '@/types';
import { KanbanCard } from './KanbanCard';
import { AddTaskForm } from './AddTaskForm';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
}

const columnStyles: Record<string, string> = {
  'todo': 'border-t-blue-500',
  'in-progress': 'border-t-yellow-500',
  'complete': 'border-t-green-500',
};

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={cn(
        'flex flex-col w-80 flex-shrink-0 bg-gray-800/30 rounded-lg border-t-2',
        columnStyles[column.id],
        isOver && 'bg-gray-800/50'
      )}
    >
      <div className="p-3 flex items-center justify-between">
        <h3 className="font-medium text-gray-200">{column.title}</h3>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>

      {column.id === 'todo' && (
        <div className="px-3 pb-2">
          <AddTaskForm columnId={column.id} />
        </div>
      )}

      <div
        ref={setNodeRef}
        className="flex-1 p-3 pt-0 space-y-2 overflow-y-auto min-h-[100px]"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center text-gray-600 text-sm py-8">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
