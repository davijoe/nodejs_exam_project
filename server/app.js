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

// import multer from "multer";
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     // https://regex101.com/
//     if (file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a Word document"));
//     }

//     // cb(new Error("File must be an image"));
//     // cb(undefined, true);
//     // cb(undefined, false);
//   },
// });

app.post("/upload", upload.single("upload"), (req, res) => {
  res.set();
});
