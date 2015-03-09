var constants    = require('./constants');

module.exports.create = create.bind({});

function create(name, socket) {
  this.name     = name;
  this.socket   = socket;

  this.constants = constants;
  this.correlations = {};

  this.parseMessage = require('./client/parse-message').bind(this);
  this.sendCommand = require('./client/send-command').bind(this);
  this.waitForService = require('./client/wait-for-service').bind(this);

  this.instance = {
    parseMessage: this.parseMessage,
    sendCommand: this.sendCommand,
    waitForService: this.waitForService
  };

  socket.on('message', this.parseMessage);

  return this.instance;
};
