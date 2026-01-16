'use client';

import { useState } from 'react';
import { useKanbanStore } from '@/stores/kanbanStore';
import { KanbanColumnId, Priority } from '@/types';
import { cn, priorityColors } from '@/lib/utils';

interface AddTaskFormProps {
  columnId: KanbanColumnId;
}

export function AddTaskForm({ columnId }: AddTaskFormProps) {
  const addTask = useKanbanStore((state) => state.addTask);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('P2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(columnId, title.trim(), priority);
      setTitle('');
      setPriority('P2');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setPriority('P2');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-2 text-sm text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        autoFocus
        className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:border-gray-600"
      />
      <div className="flex items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded text-gray-300 focus:outline-none focus:border-gray-600"
        >
          <option value="P0">P0 - Critical</option>
          <option value="P1">P1 - High</option>
          <option value="P2">P2 - Medium</option>
          <option value="P3">P3 - Low</option>
        </select>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-1 text-sm text-gray-400 hover:text-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
}
