'use client';

import { useState } from 'react';
import { useTodoStore } from '@/stores/todoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { items, addItem } = useTodoStore();
  const [newText, setNewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newText.trim()) {
      addItem(newText.trim());
      setNewText('');
    }
  };

  const incomplete = items.filter((item) => !item.completed);
  const completed = items.filter((item) => item.completed);

  return (
    <div className="p-3 space-y-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a task..."
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:border-gray-600"
        />
      </form>

      {incomplete.length === 0 && completed.length === 0 && (
        <p className="text-sm text-gray-600 text-center py-4">
          No tasks yet
        </p>
      )}

      <div className="space-y-1">
        {incomplete.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>

      {completed.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs text-gray-600 uppercase tracking-wide pt-2">
            Completed
          </div>
          {completed.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
