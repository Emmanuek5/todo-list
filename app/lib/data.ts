"use server";

import { connectMongo } from "@/utils/connectMongo";
import mongoose from "mongoose";
import Task from "@/models/task";
import { unstable_noStore as noStore } from 'next/cache';
import sleep from "@/utils/functions";



export default async function getTasks() {
    noStore();
    const db = await connectMongo();    
    db.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
    const tasks = await Task.find();
    const tasksArray = tasks.map((task) => ({
        _id: task._id.toString(),
        name: task.name,
        dueDate:task.dueDate ? task.dueDate.toISOString().slice(0, 10 ) : null,
        completed: task.completed,
    }))
    return tasksArray
}