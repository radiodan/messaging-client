var zmqSocket = require('./socket'),
    client    = require('./client'),
    worker    = require('./worker');

module.exports.Client = { create: createClient };
module.exports.Worker = { create: createWorker };

function createClient(endpoint, name) {
  var socket = createSocket('client', endpoint, name);

  return client.create(socket.identity, socket);
}

function createWorker(endpoint, name) {
  var socket = createSocket('worker', endpoint, name);

  return worker.create(socket.identity, socket);
}

function createSocket(type, endpoint, name) {
  var id;

  if(typeof type != 'string') {
    throw new Error('Invalid params');
  }

  if(typeof name === 'string' && name.length > 1) {
    id = name;
  } else {
    id = type;
  }

  return zmqSocket(endpoint, id);
}
