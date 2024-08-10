const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Когда пользователь перемещает модель
    socket.on('move_model', (data) => {
        socket.broadcast.emit('model_moved', data);
    });

    // Когда пользователь рисует в 3D
    socket.on('draw_line', (data) => {
        socket.broadcast.emit('line_drawn', data);
    });

    // Когда пользователь показывает указку
    socket.on('pointer_moved', (data) => {
        socket.broadcast.emit('pointer_updated', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
