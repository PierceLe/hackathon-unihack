import KanbanBoard from "@/components/kanban-board"
import { Background } from "@/components/backgroundkb"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Background imagePath="/bg.jpg"/>
      <div className="relative z-10 w-full max-w-7xl px-4 py-8">
        <KanbanBoard />
      </div>
    </main>
  )
}

