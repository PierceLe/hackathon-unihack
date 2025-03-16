"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, closestCorners } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import Column from "@/components/column"
import type { Task } from "@/lib/types"

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", content: "Research user requirements", status: "todo" },
    { id: "2", content: "Create wireframes", status: "todo" },
    { id: "3", content: "Design UI components", status: "in-progress" },
    { id: "4", content: "Implement authentication", status: "in-progress" },
    { id: "5", content: "Set up database", status: "testing" },
    { id: "6", content: "Write unit tests", status: "testing" },
    { id: "7", content: "Deploy to staging", status: "done" },
    { id: "8", content: "Fix responsive layout", status: "todo" },
    { id: "9", content: "Optimize performance", status: "in-progress" },
    { id: "10", content: "Add analytics", status: "testing" },
    { id: "11", content: "Document API", status: "done" },
    { id: "12", content: "Refactor code", status: "todo" },
  ])

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "testing", title: "Testing" },
    { id: "done", title: "Done" },
  ]

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the task being dragged
    const activeTask = tasks.find((task) => task.id === activeId)

    if (!activeTask) return

    // Check if dropping onto a column
    const targetColumn = columns.find((col) => col.id === overId)
    if (targetColumn) {
      // Update the task's status to the new column
      setTasks(tasks.map((task) => (task.id === activeId ? { ...task, status: targetColumn.id } : task)))
      return
    }

    // Check if dropping onto another task
    const overTask = tasks.find((task) => task.id === overId)
    if (overTask) {
      // Update the task's status to match the target task's status
      setTasks(tasks.map((task) => (task.id === activeId ? { ...task, status: overTask.status } : task)))

      // Reorder tasks within the same column
      if (activeTask.status === overTask.status) {
        const oldIndex = tasks.findIndex((task) => task.id === activeId)
        const newIndex = tasks.findIndex((task) => task.id === overId)
        setTasks(arrayMove(tasks, oldIndex, newIndex))
      }
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Project Board</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

