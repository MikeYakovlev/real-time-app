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

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hello bitch!',
    createdAt: 123
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});


// server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
