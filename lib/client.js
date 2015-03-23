var EventEmitter = require('events').EventEmitter,
    constants    = require('./constants');

module.exports.create = create;

function create(name, socket) {
  var self      = {};
  self.name     = name;
  self.socket   = socket;

  self.events    = new EventEmitter();
  self.constants = constants;
  self.correlations = {};

  self.parseMessage = require('./client/parse-message').bind(self);
  self.sendCommand = require('./client/send-command').bind(self);
  self.waitForService = require('./client/wait-for-service').bind(self);

  self.instance = {
    parseMessage: self.parseMessage,
    sendCommand: self.sendCommand,
    waitForService: self.waitForService
  };

  socket.on('message', self.parseMessage);

  return self.instance;
};
