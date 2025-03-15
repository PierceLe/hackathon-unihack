// components/kanban-board.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  type DragEndEvent,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "@/components/column";
import TaskCard from "@/components/task-card";
import { API_BASE_URL, getAccessToken } from "@/lib/constants";
import type { Task } from "@/lib/types";
import { toast } from "react-hot-toast";

async function fetchMyTasks() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token found");
    return [];
  }
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tasks/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch tasks");
    const data = await response.json();
    return data?.tasks || [];
  } catch (error) {
    toast.error("Error fetching tasks");
    return [];
  }
}

async function updateTaskStatus(taskId: string, newStatus: string) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    toast.error("No access token found");
    return false;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/v1/tasks/${taskId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchMyTasks();
      const mappedTasks = fetchedTasks.map(
        (task: {
          id: any;
          name: any;
          status: any;
          description: any;
          type: any;
        }) => ({
          id: task.id || `task-${Math.random().toString(36).substr(2, 9)}`,
          name: task.name || "Untitled Task",
          status: task.status || "todo",
          description: task.description || "",
          type: task.type || "task",
        })
      );
      setTasks(mappedTasks);
      setLoading(false);
    };

    loadTasks();
  }, []);

  const columns = [
    { id: "todo", title: "To Do", color: "bg-blue-500" },
    { id: "inprogress", title: "In Progress", color: "bg-yellow-500" },
    { id: "testing", title: "Testing", color: "bg-purple-500" },
    { id: "done", title: "Done", color: "bg-green-500" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = useCallback(
    (event: any) => {
      const { active } = event;
      if (!active) return;

      const activeId = active.id;
      const task = tasks.find((t) => t.id === activeId);
      if (task) {
        setActiveTask(task);
      }
    },
    [tasks]
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!active || !over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeTask = tasks.find((task) => task.id === activeId);
      if (!activeTask) return;

      let newStatus: string | undefined;
      let shouldReorder = false;

      const targetColumn = columns.find((col) => col.id === overId);
      if (targetColumn) {
        newStatus = targetColumn.id;
      } else {
        const overTask = tasks.find((task) => task.id === overId);
        if (overTask) {
          newStatus = overTask.status;
          shouldReorder = activeTask.status === overTask.status;
        }
      }

      if (!newStatus || (newStatus === activeTask.status && !shouldReorder)) {
        return;
      }

      setTasks((prevTasks) => {
        let updatedTasks = prevTasks.map((task) =>
          task.id === activeId ? { ...task, status: newStatus } : task
        );

        if (shouldReorder) {
          const oldIndex = updatedTasks.findIndex(
            (task) => task.id === activeId
          );
          const newIndex = updatedTasks.findIndex((task) => task.id === overId);
          if (oldIndex !== -1 && newIndex !== -1) {
            updatedTasks = arrayMove(updatedTasks, oldIndex, newIndex);
          }
        }

        return updatedTasks;
      });

      if (newStatus && newStatus !== activeTask.status) {
        setTimeout(async () => {
          const success = await updateTaskStatus(activeId, newStatus);
          if (!success) {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === activeId
                  ? { ...task, status: activeTask.status }
                  : task
              )
            );
            toast.error("Failed to update task status");
          } else {
            toast.success("Task status updated successfully");
          }
        }, 300);
      }
    },
    [tasks, columns]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full kanban-container">
      <h1 className="text-2xl font-bold mb-6 text-center">Project Board</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              color={column.color}
              title={column.title}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="transform scale-105 shadow-xl opacity-90">
              <TaskCard task={activeTask} overlay={true} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
