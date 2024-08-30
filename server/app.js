import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import "./database/database.js";
import taskRouter from "./routers/taskRouter.js";
import userRouter from "./routers/userRouter.js";
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from 'url';
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'src')))



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
