import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TodoItem } from '@/types';

interface TodoState {
  items: TodoItem[];
}

interface TodoActions {
  addItem: (text: string) => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, text: string) => void;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (text) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        set((state) => ({
          items: [
            ...state.items,
            { id, text, completed: false, createdAt: now },
          ],
        }));
      },

      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateItem: (id, text) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, text } : item
          ),
        }));
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
