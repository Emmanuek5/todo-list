"use client";

import Image from "next/image";
import TaskForm from "./ui/task-form";
import TaskContainer from "./ui/task-conainer";

export default function Home() {
  const handleTaskAdded = () => {
    //replace task container with new tasks
  };
  return (
    <div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">Todo List</h1>
      </div>
      <div>
        {" "}
        <TaskContainer />
      </div>
    </div>
  );
}
