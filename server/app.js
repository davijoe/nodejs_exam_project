import "dotenv/config";
import express from "express";
import "./database/mongoose.js";
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

import jwt from "jsonwebtoken";

const myfunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "sadasdsadasdasdas", {
    expiresIn: "12 hours",
  });
  console.log(token);

  const data = jwt.verify(token, "sadasdsadasdasdas");
  console.log(data);
};

myfunction();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
