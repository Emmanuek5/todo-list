"use client";
// TaskForm.jsx
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import createTask from "../lib/actions";
import SubmitBtn from "./submit-btn";

export default function TaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTask, initialState);
  const { pending } = useFormStatus();

  if (state.message && !state.errors.name && !state.errors.dueDate) {
    onTaskAdded();
  }

  return (
    <div className="card max-w-md mx-auto bg-base-100 shadow-xl p-8 mb-4">
      {state.message && !state.errors.name && !state.errors.dueDate && (
        <p className="text-green-500">{state.message}</p>
      )}
      <h2 className="card-title text-xl font-bold mb-4">New Task</h2>
      <form className="mb-4" action={dispatch}>
        <div className="form-control mb-4">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          <label className="label" htmlFor="taskName">
            <span className="label-text text-gray-700 text-sm font-bold">
              Task Name
            </span>
          </label>
          <input
            className="input input-bordered w-full"
            id="taskName"
            type="text"
            placeholder="Enter task name"
            name="name"
            autoFocus
          />
        </div>
        <div className="form-control mb-4">
          {state.errors?.dueDate &&
            state.errors.dueDate.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          <label className="label" htmlFor="dueDate">
            <span className="label-text text-gray-700 text-sm font-bold">
              Due Date
            </span>
          </label>
          <input
            className="input input-bordered w-full"
            id="dueDate"
            type="date"
            name="dueDate"
            required
          />
        </div>
        <SubmitBtn />
      </form>
    </div>
  );
}
