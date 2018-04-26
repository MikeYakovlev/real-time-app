const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));


// socket.io
io.on('connection', (socket) => {
  console.log('User connected!');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});


// server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
