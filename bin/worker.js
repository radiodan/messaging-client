#!/usr/bin/env node

var Worker = require('../lib/messaging-client').Worker,
    worker = Worker.create('tcp://127.0.0.1:7171', 'radiodan-player');

worker.addService([
  {serviceType: 'player', serviceInstances: ['announce', 'avoid']},
  {serviceType: 'player', serviceInstances: ['main']},
  {serviceType: 'button', serviceInstances: ['power', 'nextstation']}
]);

worker.ready();

worker.events.on('request', function(req) {
  worker.respond(req.sender, req.correlationId, {error: false});
});

worker.events.on('disconnect', function(msg) {
  // we could reconnect with ready, or:
  // process.exit();
  worker.ready();
});
