'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TodoList } from './todo/TodoList';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'border-r border-gray-800 bg-gray-900/50 flex flex-col transition-all duration-200',
        collapsed ? 'w-12' : 'w-72'
      )}
    >
      <div className="h-12 flex items-center justify-between px-3 border-b border-gray-800">
        {!collapsed && (
          <span className="text-sm font-medium text-gray-400">Quick Tasks</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-gray-200"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      {!collapsed && (
        <div className="flex-1 overflow-y-auto">
          <TodoList />
        </div>
      )}
    </aside>
  );
}
