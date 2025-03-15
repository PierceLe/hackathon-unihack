"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./task-card";
import type { Task } from "@/lib/types";

interface ColumnProps {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}

export default function Column({
  id,
  title,
  color = "bg-gray-500",
  tasks = [],
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  // Make sure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Make sure all tasks have an id
  const tasksWithIds = safeTasks.map((task) => ({
    ...task,
    id: task.id || `task-${Math.random().toString(36).substr(2, 9)}`,
  }));

  return (
    <div
      ref={setNodeRef}
      className="bg-card rounded-lg shadow-md flex flex-col h-[70vh] border border-border"
    >
      <div className="p-3 border-b border-border bg-muted/50 rounded-t-lg">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {tasksWithIds.length} {tasksWithIds.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 overflow-x-hidden">
        <SortableContext
          items={tasksWithIds.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {tasksWithIds.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {tasksWithIds.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic p-4 text-center">
            No tasks in this column
          </div>
        )}
      </div>
    </div>
  );
}
