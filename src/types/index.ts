export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export type KanbanColumnId = 'todo' | 'in-progress' | 'complete';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  columnId: KanbanColumnId;
  createdAt: string;
}

export interface KanbanColumn {
  id: KanbanColumnId;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: Record<string, KanbanTask>;
  columns: Record<KanbanColumnId, KanbanColumn>;
  columnOrder: KanbanColumnId[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface NotesState {
  content: string;
  updatedAt: string;
}
