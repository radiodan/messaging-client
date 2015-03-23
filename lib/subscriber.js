var EventEmitter = require('events').EventEmitter;

module.exports.create = function(name, socket) {
  var self    = {}

  self.name   = name;
  self.socket = socket;
  self.events = new EventEmitter();

  self.topics = {};

  self.parseMessage = require('./subscriber/parse-message').bind(self);

  self.instance = {
    subscribe: require('./subscriber/subscribe').bind(self)
  };

  self.socket.on('message', self.parseMessage);

  return self.instance;
}
