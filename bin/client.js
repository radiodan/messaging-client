#!/usr/bin/env node

var Client = require('../lib/messaging-client').Client,
    client = Client.create('tcp://127.0.0.1:7171');

client.sendCommand('player', 'avoid', 'play', {position: 71})
  .then(
    function(response) { console.log('yes!', response) },
    function(err, response) { console.log('no!', err, response) }
  );
