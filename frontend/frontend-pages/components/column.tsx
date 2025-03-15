"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import TaskCard from "./task-card"
import type { Task } from "@/lib/types"

interface ColumnProps {
  id: string
  title: string
  tasks: Task[]
}

export default function Column({ id, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="bg-card rounded-lg shadow-md flex flex-col h-[70vh] border border-border">
      <div className="p-3 border-b border-border bg-muted/50 rounded-t-lg">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <div className="text-xs text-muted-foreground mt-1">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2" >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic p-4 text-center">
            No tasks in this column
          </div>
        )}
      </div>
    </div>
  )
}

