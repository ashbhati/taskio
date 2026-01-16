'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { KanbanTask } from '@/types';
import { useKanbanStore } from '@/stores/kanbanStore';
import { cn, priorityColors } from '@/lib/utils';
import { EditTaskModal } from './EditTaskModal';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging?: boolean;
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only open edit if not dragging
    if (!isSortableDragging && !isDragging) {
      setIsEditing(true);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'bg-gray-800 rounded-lg p-3 border border-gray-700',
          'hover:border-gray-600 cursor-grab active:cursor-grabbing',
          (isDragging || isSortableDragging) && 'opacity-50 shadow-lg ring-2 ring-blue-500/50'
        )}
        onClick={handleClick}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  'text-xs px-1.5 py-0.5 rounded border',
                  priorityColors[task.priority]
                )}
              >
                {task.priority}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-100 truncate">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="p-1 text-gray-600 hover:text-red-400 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {isEditing && (
        <EditTaskModal task={task} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
