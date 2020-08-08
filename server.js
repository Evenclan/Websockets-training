const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

let messages = [];
let users = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
    console.log(users);
  });

  socket.on('join', (user) => {
    users.push({ name: user, id: socket.id });
    socket.broadcast.emit('newUser', user);
  });

  socket.on('disconnect', (user) => { 

    users.filter(activeUsers => {
      if (activeUsers.id === socket.id) {
        user = activeUsers.name;
      }
    });
    
    socket.broadcast.emit('userLeft', user);

    console.log('Oh, socket ' + socket.id + ' has left') });



    // users = users.filter(activeUsers => activeUsers.id !== socket.id);

  console.log('I\'ve added a listener on message event \n');
});