'use client';

import { useNotesStore } from '@/stores/notesStore';

export function Scratchpad() {
  const { content, setContent } = useNotesStore();

  return (
    <div className="flex flex-col h-full border-l border-gray-800 bg-gray-900/50">
      <div className="h-12 flex items-center px-4 border-b border-gray-800">
        <span className="text-sm font-medium text-gray-400">Notes</span>
      </div>
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-full resize-none bg-transparent text-gray-200 placeholder-gray-600 text-sm leading-relaxed focus:outline-none"
        />
      </div>
    </div>
  );
}
