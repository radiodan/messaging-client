#!/usr/bin/env node

var Publisher = require('../lib/messaging-client').Publisher,
    pub = Publisher.create('tcp://127.0.0.1:7173'),
    loop   = parseInt(process.env.LOOP) || 1,
    verbose = process.env.VERBOSE == 'true',
    Q = require('q'),
    promises = [];

setInterval(function() {
  var pubbed = pub.publish('player.play', {payload: true});
  console.log("SENT", pubbed);

}, 1000);
