# Taskio - Product Requirements Document

## Overview
Taskio is a clean, minimal project management app designed for "vibe coders". It features a Kanban board, todo list sidebar, and notes scratchpad with a dark mode interface and local storage persistence.

**Repository:** https://github.com/ashbhati/taskio

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (CSS-first config) |
| Zustand | 5.x | State management with persist middleware |
| @dnd-kit | 6.x/10.x | Drag and drop functionality |
| next-themes | 0.4.x | Theme management |
| clsx + tailwind-merge | - | Class name utilities |

---

## Current Features

### Kanban Board
- Three columns: **Todo**, **In Progress**, **Complete**
- Drag-and-drop cards between columns
- Reorder cards within columns
- Color-coded column headers (blue, yellow, green)

### Task Cards
- Title (required)
- Description (optional)
- Priority levels: P0 (red), P1 (orange), P2 (yellow), P3 (gray)
- Click-to-edit modal for updating all fields
- Delete button on hover

### Quick Tasks Sidebar
- Collapsible left sidebar
- Separate todo list (independent from Kanban)
- Checkbox to mark complete
- Delete on hover
- Completed items grouped at bottom

### Notes Scratchpad
- Right panel with full-height textarea
- Auto-saves on every keystroke
- Persistent across sessions

### Data Persistence
- All data saved to localStorage
- Hydration guard prevents SSR mismatches
- Stores: `kanban-storage`, `todo-storage`, `notes-storage`

---

## File Structure

```
src/
├── app/
│   ├── globals.css         # Tailwind v4 imports + theme
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main app composition
│   └── providers.tsx       # ThemeProvider + HydrationGuard
├── components/
│   ├── Header.tsx          # App header with title
│   ├── Sidebar.tsx         # Collapsible todo sidebar
│   ├── kanban/
│   │   ├── AddTaskForm.tsx    # New task form
│   │   ├── EditTaskModal.tsx  # Edit task modal
│   │   ├── KanbanBoard.tsx    # DndContext wrapper
│   │   ├── KanbanCard.tsx     # Draggable task card
│   │   └── KanbanColumn.tsx   # Column with SortableContext
│   ├── notes/
│   │   └── Scratchpad.tsx     # Notes textarea
│   └── todo/
│       ├── TodoItem.tsx       # Single todo item
│       └── TodoList.tsx       # Todo list container
├── hooks/
│   └── useHydration.ts     # SSR hydration helper
├── lib/
│   └── utils.ts            # cn() helper + priority colors
├── stores/
│   ├── kanbanStore.ts      # Kanban state + actions
│   ├── notesStore.ts       # Notes state
│   └── todoStore.ts        # Todo state + actions
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## Data Models

```typescript
type Priority = 'P0' | 'P1' | 'P2' | 'P3';
type KanbanColumnId = 'todo' | 'in-progress' | 'complete';

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  columnId: KanbanColumnId;
  createdAt: string;
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface NotesState {
  content: string;
  updatedAt: string;
}
```

---

## Future Enhancements

### High Priority
- [ ] Add task due dates with calendar picker
- [ ] Task labels/tags with color coding
- [ ] Search/filter tasks across columns
- [ ] Keyboard shortcuts (Ctrl+K command palette)
- [ ] Mobile responsive layout

### Medium Priority
- [ ] Multiple notes (instead of single scratchpad)
- [ ] Task comments/activity log
- [ ] Subtasks/checklists within cards
- [ ] Archive completed tasks
- [ ] Export/import data (JSON backup)

### Low Priority
- [ ] User authentication (optional cloud sync)
- [ ] Team collaboration features
- [ ] Time tracking on tasks
- [ ] Custom column names
- [ ] Themes beyond dark mode
- [ ] Drag to reorder columns
- [ ] Task templates

### Technical Improvements
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright)
- [ ] PWA support for offline use
- [ ] Optimize bundle size
- [ ] Add loading skeletons

---

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open http://localhost:3000 in your browser.

---

## Design Notes

### Color Palette (Dark Mode)
- Background: `bg-gray-900` (#111827)
- Surface/Cards: `bg-gray-800` (#1f2937)
- Borders: `border-gray-700` (#374151)
- Text Primary: `text-gray-100` (#f3f4f6)
- Text Secondary: `text-gray-400` (#9ca3af)
- Accent: `blue-500` (#3b82f6)

### Priority Colors
- P0 (Critical): Red (`bg-red-500/20 text-red-400`)
- P1 (High): Orange (`bg-orange-500/20 text-orange-400`)
- P2 (Medium): Yellow (`bg-yellow-500/20 text-yellow-400`)
- P3 (Low): Gray (`bg-gray-500/20 text-gray-400`)

---

## Session Notes

**Initial Build Date:** January 2025

**Key Implementation Details:**
1. Used `@dnd-kit` over deprecated `react-beautiful-dnd`
2. Zustand with `skipHydration: true` + manual `rehydrate()` for SSR safety
3. Tailwind CSS v4 uses `@import "tailwindcss"` instead of `@tailwind` directives
4. Edit modal distinguishes click vs drag using `isDragging` state

**Known Considerations:**
- The Kanban store uses `crypto.randomUUID()` for ID generation
- All state mutations are synchronous (optimistic updates)
- No backend - purely client-side with localStorage
