import io from 'socket.io.client'

io.on('connection', socket =>{
    console.log('New user joined')
    socket.emit('chat-message', 'Howdy chatters ')
})