var zmqSocket  = require('./socket'),
    client     = require('./client'),
    worker     = require('./worker'),
    publisher  = require('./publisher'),
    subscriber = require('./subscriber');

module.exports.Client = { create: createClient };
module.exports.Worker = { create: createWorker };
module.exports.Publisher = { create: createPublisher };
module.exports.Subscriber = { create: createSubscriber };

function createClient(endpoint, name) {
  var socket = zmqSocket('dealer', endpoint, name, 'client');

  return client.create(socket.identity, socket);
}

function createWorker(endpoint, name) {
  var socket = zmqSocket('dealer', endpoint, name, 'worker');

  return worker.create(socket.identity, socket);
}

function createPublisher(endpoint, name) {
  var socket = zmqSocket('pub', endpoint, name, 'publisher');

  return publisher.create(socket.identity, socket);
}

function createSubscriber(endpoint, name) {
  var socket = zmqSocket('sub', endpoint, name, 'subscriber');

  return subscriber.create(socket.identity, socket);
}
