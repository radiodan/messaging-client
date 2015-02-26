#!/usr/bin/env node

var Worker = require('../lib/messaging-client').Worker,
    worker = Worker.create('tcp://127.0.0.1:7171', 'radiodan-player');

worker.addService('player', ['announce', 'avoid']);
worker.ready();
