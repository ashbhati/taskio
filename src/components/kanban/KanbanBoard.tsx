'use client';

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useKanbanStore } from '@/stores/kanbanStore';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { KanbanColumnId } from '@/types';

export function KanbanBoard() {
  const { columns, columnOrder, tasks, moveTask, reorderTasks } = useKanbanStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks[active.id as string];
    if (!activeTask) return;

    const overId = over.id as string;

    // Check if dropping on a column
    if (overId in columns) {
      const targetColumn = overId as KanbanColumnId;
      if (activeTask.columnId !== targetColumn) {
        moveTask(active.id as string, targetColumn, columns[targetColumn].taskIds.length);
      }
      return;
    }

    // Dropping on another task
    const overTask = tasks[overId];
    if (!overTask) return;

    if (activeTask.columnId !== overTask.columnId) {
      const targetColumn = overTask.columnId;
      const overIndex = columns[targetColumn].taskIds.indexOf(overId);
      moveTask(active.id as string, targetColumn, overIndex);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeTask = tasks[active.id as string];
    if (!activeTask) return;

    const column = columns[activeTask.columnId];
    const overId = over.id as string;

    // Check if dropping on same column (reordering)
    if (overId in columns) return;

    const overTask = tasks[overId];
    if (!overTask || overTask.columnId !== activeTask.columnId) return;

    const oldIndex = column.taskIds.indexOf(active.id as string);
    const newIndex = column.taskIds.indexOf(overId);

    if (oldIndex !== newIndex) {
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(oldIndex, 1);
      newTaskIds.splice(newIndex, 0, active.id as string);
      reorderTasks(activeTask.columnId, newTaskIds);
    }
  };

  const activeTask = activeId ? tasks[activeId] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-6 h-full overflow-x-auto">
        {columnOrder.map((columnId) => (
          <KanbanColumn
            key={columnId}
            column={columns[columnId]}
            tasks={columns[columnId].taskIds.map((id) => tasks[id]).filter(Boolean)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
