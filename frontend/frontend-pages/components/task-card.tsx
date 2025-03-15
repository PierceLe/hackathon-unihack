"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  overlay?: boolean;
}

export default function TaskCard({ task, overlay = false }: TaskCardProps) {
  // Add safety checks for task and id
  if (!task) {
    return null;
  }

  // Ensure task has an id
  const safeTask = {
    ...task,
    id: task.id || `task-${Math.random().toString(36).substr(2, 9)}`,
    name: task.name || "Untitled Task",
    type: task.type || "task",
    description: task.description || "",
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = !overlay
    ? useSortable({ id: safeTask.id })
    : {
        attributes: {},
        listeners: {},
        setNodeRef: null,
        transform: null,
        transition: null,
        isDragging: false,
      };

  const style = !overlay
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }
    : {};

  const taskTypeStyles: Record<string, string> = {
    feature: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    bug: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    task: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    improvement:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  const typeStyle =
    taskTypeStyles[safeTask.type?.toLowerCase()] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
      className={`
        bg-background 
        p-3 
        rounded-md 
        border 
        border-border 
        shadow-sm 
        cursor-grab 
        active:cursor-grabbing
        hover:shadow-md 
        transition-shadow
        ${overlay ? "pointer-events-none" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-foreground line-clamp-2">
          {safeTask.name}
        </span>
        {safeTask.type && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${typeStyle} ml-1`}
          >
            {safeTask.type}
          </span>
        )}
      </div>
      {safeTask.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {safeTask.description}
        </p>
      )}
    </div>
  );
}
