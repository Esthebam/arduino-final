const express = require('express');
const config = require('./src/config');
const path = require('path');
const app = express();
//const port = 4000; 

app.use(express.static(path.resolve(__dirname, 'build')));

//app.get('*', (req, res) => {
//  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//});

const server = app.listen(process.env.PORT || config.port, function() {
  let port = process.env.PORT || config.port;
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