import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { KanbanTask, KanbanState, KanbanColumnId, Priority } from '@/types';

interface KanbanActions {
  addTask: (columnId: KanbanColumnId, title: string, priority: Priority, description?: string) => void;
  moveTask: (taskId: string, toColumn: KanbanColumnId, newIndex: number) => void;
  reorderTasks: (columnId: KanbanColumnId, taskIds: string[]) => void;
  updateTask: (taskId: string, updates: Partial<Pick<KanbanTask, 'title' | 'description' | 'priority'>>) => void;
  deleteTask: (taskId: string) => void;
}

type KanbanStore = KanbanState & KanbanActions;

const initialState: KanbanState = {
  tasks: {},
  columns: {
    'todo': { id: 'todo', title: 'Todo', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
    'complete': { id: 'complete', title: 'Complete', taskIds: [] },
  },
  columnOrder: ['todo', 'in-progress', 'complete'],
};

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addTask: (columnId, title, priority, description) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const task: KanbanTask = {
          id,
          title,
          description,
          priority,
          columnId,
          createdAt: now,
        };

        set((state) => ({
          tasks: { ...state.tasks, [id]: task },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, id],
            },
          },
        }));
      },

      moveTask: (taskId, toColumn, newIndex) => {
        const state = get();
        const task = state.tasks[taskId];
        if (!task) return;

        const fromColumn = task.columnId;

        set((state) => {
          // Remove from source column
          const sourceTaskIds = state.columns[fromColumn].taskIds.filter(
            (id) => id !== taskId
          );

          // If moving within same column, calculate new position
          let destTaskIds: string[];
          if (fromColumn === toColumn) {
            destTaskIds = [...sourceTaskIds];
            destTaskIds.splice(newIndex, 0, taskId);
          } else {
            // Moving to different column
            destTaskIds = [...state.columns[toColumn].taskIds];
            destTaskIds.splice(newIndex, 0, taskId);
          }

          return {
            tasks: {
              ...state.tasks,
              [taskId]: { ...task, columnId: toColumn },
            },
            columns: {
              ...state.columns,
              [fromColumn]: {
                ...state.columns[fromColumn],
                taskIds: fromColumn === toColumn ? destTaskIds : sourceTaskIds,
              },
              ...(fromColumn !== toColumn && {
                [toColumn]: {
                  ...state.columns[toColumn],
                  taskIds: destTaskIds,
                },
              }),
            },
          };
        });
      },

      reorderTasks: (columnId, taskIds) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds,
            },
          },
        }));
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              ...updates,
            },
          },
        }));
      },

      deleteTask: (taskId) => {
        set((state) => {
          const task = state.tasks[taskId];
          if (!task) return state;

          const { [taskId]: _, ...remainingTasks } = state.tasks;

          return {
            tasks: remainingTasks,
            columns: {
              ...state.columns,
              [task.columnId]: {
                ...state.columns[task.columnId],
                taskIds: state.columns[task.columnId].taskIds.filter(
                  (id) => id !== taskId
                ),
              },
            },
          };
        });
      },
    }),
    {
      name: 'kanban-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
