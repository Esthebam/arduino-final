const express = require('express');
const app = express();
const port = 3000;

const server = app.listen(process.env.PORT || port, function() {
  console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/').on('connection', (socket) => {

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
