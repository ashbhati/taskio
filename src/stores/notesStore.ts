import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NotesState } from '@/types';

interface NotesActions {
  setContent: (content: string) => void;
}

type NotesStore = NotesState & NotesActions;

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      content: '',
      updatedAt: new Date().toISOString(),

      setContent: (content) => {
        set({
          content,
          updatedAt: new Date().toISOString(),
        });
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
