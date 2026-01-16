'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { useKanbanStore } from '@/stores/kanbanStore';
import { useTodoStore } from '@/stores/todoStore';
import { useNotesStore } from '@/stores/notesStore';

function HydrationGuard({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useKanbanStore.persist.rehydrate();
    useTodoStore.persist.rehydrate();
    useNotesStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <HydrationGuard>{children}</HydrationGuard>
    </ThemeProvider>
  );
}
