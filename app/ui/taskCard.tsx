import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"; // Import faTrash for delete button
import { updateTask, deleteTask } from "../lib/actions"; // Assuming deleteTask function exists
import { Task } from "@/app/lib/definitions";

export default function TaskCard({
  task: initialTask,
  onDelete,
}: {
  task: Task;
  onDelete: () => void;
}) {
  const [task, setTask] = useState(initialTask);

  const handleToggleCompletion = async () => {
    const expectedTask = { ...task, completed: !task.completed };
    setTask(expectedTask);
    const updatedTask = await updateTask(task); // Assuming updateTask accepts the entire task object and toggles its completion status
  };

  const handleDeleteTask = async () => {
    await deleteTask(task); // Assuming deleteTask function accepts the task ID
    onDelete();
  };

  return (
    <div
      className={`max-w-md mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 cursor-pointer flex justify-between items-center ${
        task.completed ? "bg-gray-200" : "accent-inherit"
      }`}
    >
      <div onClick={handleToggleCompletion}>
        <h2
          className={`text-xl font-bold mb-4 ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.name}
        </h2>
        <p className="text-gray-700">
          Due Date:{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={task.completed ? faCheckCircle : faCircle}
          className={task.completed ? "text-green-500" : "text-gray-500"}
          size="2x"
          onClick={handleToggleCompletion}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 ml-2 cursor-pointer"
          size="2x"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
}
