const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {

  console.log('New connection: ' + socket.id);

  socket.on('notification:on', data => {
    socket.broadcast.emit('notification:on', data);
    console.log('Broadcasting: notification:on');
  });

  socket.on('notification:off', function() {
    socket.broadcast.emit('notification:off');
    console.log('Broadcasting: notification:off');
  });

});