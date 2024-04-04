import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  name: String,
  dueDate: Date,
  completed: Boolean,
});

const Task = models.Tasks || model('Tasks', taskSchema);

export default Task;