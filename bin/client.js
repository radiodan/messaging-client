#!/usr/bin/env node

var Client = require('../lib/messaging-client').Client,
    client = Client.create('tcp://127.0.0.1:7171'),
    loop   = parseInt(process.env.LOOP) || 1,
    Q = require('q'),
    promises = [];

function sendCommand(count) {
  console.log(count, "<-")
  var p = client.sendCommand('player', 'avoid', 'play', {position: 71})
    .then(
      function(response) { console.log(count, '-> yes!', response) },
      function(err, response) { console.log(count, '-> no!', err, response) }
    );

  promises.push(p);
  if(promises.length == loop) {
    Q.all(promises).then(function() {
      console.timeEnd(loop);
    });
  }
}

var i =1;

function exec() {
  sendCommand(i++);

  if(i < loop+1) {
    setTimeout(exec, 0);
  }
}

console.time(loop);
exec()
