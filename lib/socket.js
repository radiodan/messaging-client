var uniqueID = require('./unique-id'),
    zmq = require('zmq');

module.exports = function(endPoint, name) {
  var sock = zmq.socket('dealer'),
      sockName;

  if(typeof name === 'string') {
    sockName = name + '-' + uniqueID();
  } else {
    sockName = uniqueID();
  }

  sock.identity = sockName;
  sock.connect(endPoint);

  return sock;
}
