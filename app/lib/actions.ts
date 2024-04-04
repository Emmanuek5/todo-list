"use server";
import Task from "@/models/task";
import { connectMongo } from "@/utils/connectMongo";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Task as TaskType } from "./definitions";

const taskSchema = z.object({
  name: z.string({ required_error: "Task name is required" }),
  dueDate: z.string({ required_error: "Due date is required" }),
  completed: z.boolean(),
});

const CreateTask = taskSchema.omit({ completed: true });

export type State = {
  message: string | null;
  errors: Record<string, string[]>;
};

export default async function createTask(prevState: State, formData: FormData): Promise<State> {
    const db = await connectMongo();
  const validatedFields = CreateTask.safeParse({
    name: formData.get("name"),
    dueDate: formData.get("dueDate"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing fields",
      errors: validatedFields.error.formErrors.fieldErrors,
    };
  }

  try {
    const { name, dueDate } = validatedFields.data;
    const task = new Task({ name, dueDate });
    await task.save();
    return { message: "Task created successfully", errors: {} };
  } catch (error) {
    return {
      message: "Error creating task",
      errors: {
        name: ["Error creating task"],
        dueDate: ["Error creating task"],
      },
    };
  }
}



export async function updateTask(task:TaskType) {
  await connectMongo(); // Ensure the database connection is established

  // Fetch the current state of the task to toggle its 'completed' status
  const currentTask = await Task.findById(task._id);
  if (!currentTask) {
    throw new Error("Task not found");
  }

  // Toggle the 'completed' status
  const completed = !currentTask.completed;

  // Update the task with the new 'completed' status
  const updatedTask = await Task.findByIdAndUpdate(
    task._id,
    { completed }, // Only updating the 'completed' field
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Failed to update the task");
  }

  // Return a simplified, serializable object
  return {
    _id: updatedTask._id.toString(), // Ensure _id is a string
    name: updatedTask.name,
    dueDate: updatedTask.dueDate.toISOString(), // Convert Date to ISO string format
    completed: updatedTask.completed,
  };
}


export async function deleteTask(task: TaskType) {
  await connectMongo(); // Ensure the database connection is established
  const TaskToDelete = await Task.findById(task._id);
  if (!TaskToDelete) {
    return { message: "Task not found" , error: true};
  }
  await Task.findOneAndDelete({ _id: task._id });
   revalidatePath("/");
  return { message: "Task deleted successfully" , error: false};
}