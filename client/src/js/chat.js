const socket = io('http://localhost:3000')
// const messageForm = document.getElementById('send-container')

socket.on('chat-message', data => {
    console.log(data);
})

const cors = require('cors');
app.use(cors());
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.emit('chat-message', 'Hej');
// });

// messageForm.addEventListener('submit', e => {
    
// })