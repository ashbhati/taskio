import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { Scratchpad } from '@/components/notes/Scratchpad';

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <KanbanBoard />
        </main>
        <div className="w-80 flex-shrink-0">
          <Scratchpad />
        </div>
      </div>
    </div>
  );
}
