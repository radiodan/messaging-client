var EventEmitter = require('events').EventEmitter,
    workers = [];

module.exports.create = create;

process.on('SIGINT', function() {
  workers.forEach(function(w) {
    w.socket.send(
      [w.constants.PROTOCOL_WORKER, w.constants.DISCONNECT]
    );
  });

  process.exit();
});

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

  workers.push(this);

  return this.instance;
};
