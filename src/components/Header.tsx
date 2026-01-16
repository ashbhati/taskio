'use client';

export function Header() {
  return (
    <header className="h-14 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-100">Taskio</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Press Ctrl+K for shortcuts</span>
      </div>
    </header>
  );
}
