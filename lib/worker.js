var EventEmitter = require('events').EventEmitter;
module.exports.create = create.bind({});

function create(name, socket) {
  this.name     = name;
  this.socket   = socket;
  this.services = {};
  this.events   = new EventEmitter();

  this.parseMessage = require('./worker/parse-message').bind(this);
  this.constants    = require('./worker/constants');

  this.instance = {
    addService: require('./worker/add-service').bind(this),
    ready: require('./worker/ready').bind(this),
    respond: require('./worker/respond').bind(this),
    events: this.events
  };

  socket.on('message', this.parseMessage);

  return this.instance;
};
