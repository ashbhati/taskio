'use client';

import { useTodoStore } from '@/stores/todoStore';
import { TodoItem as TodoItemType } from '@/types';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  item: TodoItemType;
}

export function TodoItem({ item }: TodoItemProps) {
  const { toggleItem, deleteItem } = useTodoStore();

  return (
    <div className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50">
      <button
        onClick={() => toggleItem(item.id)}
        className={cn(
          'w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center',
          item.completed
            ? 'bg-blue-500 border-blue-500'
            : 'border-gray-600 hover:border-gray-500'
        )}
      >
        {item.completed && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span
        className={cn(
          'flex-1 text-sm truncate',
          item.completed ? 'text-gray-500 line-through' : 'text-gray-200'
        )}
      >
        {item.text}
      </span>
      <button
        onClick={() => deleteItem(item.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
