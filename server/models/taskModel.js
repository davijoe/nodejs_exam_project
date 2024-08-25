import mongoose from "mongoose";
import pkg from "validator";

const Task = mongoose.model("Task", {
  name: {
    type: String,
    default: "Untitled",
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default Task;
