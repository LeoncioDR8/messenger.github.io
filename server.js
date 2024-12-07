const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A client has connected.');

    socket.on('message', (message) => {
        console.log(`Message received: ${message}`);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A client has disconnected.');
    });

    socket.on('typing', (msg) => {
        console.log(`Typing notification: ${msg}`);
        socket.broadcast.emit('typing', msg);
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
