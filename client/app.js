import { Server } from 'socket.io';
import express from 'express';
import http from 'http'; // Add this line to import the http module

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Creating a new Socket.io server instance





server.listen(3000, () => {
    console.log('listening on *:3000');
});