import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import "./database/mongoose.js";
import taskRouter from "./routers/taskRouter.js";
import userRouter from "./routers/userRouter.js";
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
