import KanbanBoard from "@/components/kanban-board"
import { Background } from "@/components/backgroundkb"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Background imagePath="/bg.jpg" />

      {/* Back Button - Positioned to the Top Right */}
      <div className="absolute top-4 right-4">
        <Button asChild>
          <Link href="/homepage">
            BACK
          </Link>
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="relative z-10 w-full max-w-7xl px-4 py-8">
        <KanbanBoard />
      </div>
    </main>
  );
}


