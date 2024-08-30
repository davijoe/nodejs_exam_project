import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import path from 'path';
import moment from 'moment';
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import formatMessage from "./src/js/utils/messages.js";
import {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} from './src/js/utils/users.js';


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Creating a new Socket.io server instance

const pubClient = createClient({ url: "redis://127.0.0.1:6380" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const botName = "ChatCord Bot";

// Redis connection and adapter setup
(async () => {
    const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
    await pubClient.connect();
    const subClient = pubClient.duplicate();
    await subClient.connect(); // Ensure subClient is connected
    io.adapter(createAdapter(pubClient, subClient));
})();

// Run when client connects
io.on("connection", (socket) => {
    console.log(io.of("/").adapter);
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});




// Other routes and middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'snak.html'));
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));