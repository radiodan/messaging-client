var zmqSocket = require('./socket'),
    client    = require('./client'),
    worker    = require('./worker');

module.exports.Client = { create: createClient };
module.exports.Worker = { create: createWorker };

function createClient(endpoint, name) {
  var socket = zmqSocket(endpoint, name, 'client');

  return client.create(socket.identity, socket);
}

function createWorker(endpoint, name) {
  var socket = zmqSocket(endpoint, name, 'worker');

  return worker.create(socket.identity, socket);
}
