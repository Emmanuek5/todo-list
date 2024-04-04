// TaskContainer.jsx
import React, { useEffect, useState } from "react";
import getTasks from "@/app/lib/data";
import TaskCard from "./taskCard";
import { Task } from "@/app/lib/definitions";
import TasksSkeleton from "@/app/ui/tasks-skeleton";
import TaskForm from "@/app/ui/task-form"; // Import TaskForm

export default function TaskContainer() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks(); // Fetch tasks only once when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  const handleDeleteTask = async (taskId: string | undefined | null) => {
    // Filter out the deleted task from the tasks array
    if (!tasks) return;
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
    // Perform deletion action using API or other means
  };

  const handleTaskAdded = async () => {
    const fetchedTasks = await getTasks(); // Fetch updated tasks after a new task is added
    setTasks(fetchedTasks);
  };

  if (tasks === null) {
    return <TasksSkeleton />;
  }

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />{" "}
      {/* Pass handleTaskAdded to TaskForm */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mb-4">
        <h2 className="text-xl text-gray-900 font-bold mb-4">Tasks</h2>
        {tasks.length === 0 ? (
          <div className="alert alert-warning shadow-lg">
            <div>
              {/* Icon and No tasks found message */}
              <span>No tasks found.</span>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id?.toString()}
              task={{
                _id: task._id ?? null,
                name: task.name ?? "Unnamed Task",
                dueDate: task.dueDate ?? null,
                completed: task.completed ?? false,
              }}
              onDelete={() => handleDeleteTask(task._id)} // Pass onDelete function to TaskCard
            />
          ))
        )}
      </div>
    </div>
  );
}
