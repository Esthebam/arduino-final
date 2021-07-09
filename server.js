const express = require('express');
const config = require('./src/config');
const app = express();

const server = app.listen(config.port, function() {
  let port = config.port;
  console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

  console.log('New connection: ' + socket.id);

  socket.on('led:on', function() {
    socket.broadcast.emit('led:on');
    console.log('Broadcasting: led:on');
  });

  socket.on('led:off', function() {
    socket.broadcast.emit('led:off');
    console.log('Broadcasting: led:off');
  });

});
