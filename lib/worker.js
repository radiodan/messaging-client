var EventEmitter = require('events').EventEmitter,
    constants    = require('./constants'),
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
  this.name      = name;
  this.socket    = socket;
  this.services  = {};
  this.events    = new EventEmitter();
  this.lastMsg   = false;
  this.constants = constants;

  this.checkActivity = require('./worker/check-activity').bind(this);
  this.parseMessage  = require('./worker/parse-message').bind(this);

  this.liveness = constants.HEARTBEAT_LIVENESS;

  this.instance = {
    addService: require('./worker/add-service').bind(this),
    ready: require('./worker/ready').bind(this),
    respond: require('./worker/respond').bind(this),
    events: this.events
  };

  socket.on('message', this.parseMessage);
  setInterval(
    this.checkActivity,
    this.constants.HEARTBEAT_INTERVAL_MS
  );

  workers.push(this);

  return this.instance;
};
