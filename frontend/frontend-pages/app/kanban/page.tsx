// app/kanban/page.tsx
// No "use client" needed here as it's a Server Component
import KanbanBoard from "@/components/kanban-board";
import { Background } from "@/components/backgroundkb";

export default function KanbanPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Background imagePath="/bg.jpg" />
      <div className="relative z-10 w-full max-w-7xl px-4 py-8">
        <KanbanBoard />
      </div>
    </main>
  );
}
