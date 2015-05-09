var socketio = require('socket.io');

module.exports = function(server) {
  var io = socketio(server);

  // TODO: migrate on Redis
  var socket_manager = {};

  io.on('connect', function(socket) {
    socket.emit('connection', { data: 'Welcome to fatman' });

    socket.on('register', function(data) {
      var room_id = parseInt(data.room_id);
      if (typeof socket_manager[room_id] === 'undefined') {
        socket_manager[room_id] = []
      }
      socket_manager[room_id].push(socket);
    });

    socket.on('new message', function(data) {
      console.log(data);
      Message.create(data, function(err, msg) {
        if (err) {
        } else {
          var m = msg.serialize();
          console.log(m.session_id);
          socket_manager[parseInt(m.session_id)].forEach(function(s) {
            s.emit('messages', m);
          });
        }
      });
    });
  });
};
