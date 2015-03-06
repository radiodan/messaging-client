var uniqueID = require('./unique-id'),
    zmq = require('zmq');

module.exports = function(endPoint, name, defaultName) {
  var socket     = zmq.socket('dealer'),
      socketName = createIdentity(name, defaultName);


  socket.identity = socketName;
  socket.connect(endPoint);

  socket.reconnect = function() {
    socket.disconnect(endPoint);
    socket.connect(endPoint);
  };

  return socket;
}

function createIdentity(name, defaultName) {
  switch(true) {
    case (typeof name === 'string' && name.length > 1):
      return name + '-' + uniqueID();
    case (typeof defaultName === 'string' && defaultName.length > 1):
      return defaultName + '-' + uniqueID();
    default:
      return uniqueID();
  }
}
