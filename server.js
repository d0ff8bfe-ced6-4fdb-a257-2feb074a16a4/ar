const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Когда пользователь перемещает модель
    socket.on('move_model', (data) => {
        console.log('Model moved:', data);
        socket.broadcast.emit('model_moved', data);
    });

    // Когда пользователь рисует в 3D
    socket.on('draw_line', (data) => {
        console.log('Line drawn:', data);
        socket.broadcast.emit('line_drawn', data);
    });

    // Когда пользователь показывает указку
    socket.on('pointer_moved', (data) => {
        console.log('Pointer moved:', data);
        socket.broadcast.emit('pointer_updated', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
