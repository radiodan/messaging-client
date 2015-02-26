#!/usr/bin/env node

var Client = require('../lib/messaging-client').Client,
    client = Client.create('tcp://127.0.0.1:7171');

client.sendCommand('player', 'avoider', 'play', {position: 71});
