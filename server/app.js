import express from "express";
import './database/mongoose.js';

import User from "./models/user.js";
import Task from "./models/task.js";


const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Database connected");
// }).catch((error) => {
//     console.log("Error connecting to database: ", error);
// });

// const kanbanRouter = require("./routers/kanbanRouter");
// app.use("/api/kanban", kanbanRouter);

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.post('/users', (req, res) => {
    const user = new User(req.body);  // Use 'new' to instantiate the User model

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});




const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT));
