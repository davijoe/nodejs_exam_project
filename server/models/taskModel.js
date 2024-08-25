import mongoose from "mongoose";

const Task = mongoose.model("Task", {
  name: {
    type: String,
    default: "Untitled",
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default Task;
