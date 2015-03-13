#!/usr/bin/env node

var Subscriber = require('../lib/messaging-client').Subscriber,
    sub = Subscriber.create('tcp://127.0.0.1:7172'),
    loop   = parseInt(process.env.LOOP) || 1,
    verbose = process.env.VERBOSE == 'true',
    Q = require('q'),
    promises = [];

sub.subscribe('*.play', function(topic, msg) {
  console.log("match: ", topic, msg);
});

sub.subscribe('#.volume.*', function(topic, msg) {
  console.log("match: ", topic, msg);
});
