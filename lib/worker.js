var EventEmitter = require('events').EventEmitter,
    constants    = require('./constants'),
    workers      = [];

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
  var self       = {};

  self.name      = name;
  self.socket    = socket;
  self.services  = [];
  self.events    = new EventEmitter();
  self.lastMsg   = false;
  self.constants = constants;

  self.checkActivity = require('./worker/check-activity').bind(self);
  self.parseMessage  = require('./worker/parse-message').bind(self);

  self.liveness = constants.HEARTBEAT_LIVENESS;

  self.instance = {
    addService: require('./worker/add-service').bind(self),
    ready: require('./worker/ready').bind(self),
    respond: require('./worker/respond').bind(self),
    events: self.events
  };

  socket.on('message', self.parseMessage);
  setInterval(
    self.checkActivity,
    self.constants.HEARTBEAT_INTERVAL_MS
  );

  workers.push(self);

  return self.instance;
};
