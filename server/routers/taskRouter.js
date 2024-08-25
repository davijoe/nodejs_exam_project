import { Router } from "express";
import Task from "../models/taskModel.js";
import auth from "../middleware/authMiddleware.js";
const router = Router();

// CREATE
router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET
// /tasks?completed=true
// /tasks?limit=10&skip=20
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const limit = parseInt(req.query.limit) || 0; // default to 0 if not provided

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    // Populate tasks related to the user with optional matching and limit
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: limit, // Apply the parsed limit
        skip: parseInt(req.query.skip) || 0, // Optional: handle pagination with skip
        sort: {
          createdAt: req.query.sortBy === "desc" ? -1 : 1, // Optional: sort by creation date
        },
      },
    });

    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// UPDATE
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Only name, description, and completion status can be updated",
    });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
