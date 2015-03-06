#!/usr/bin/env node

var Client = require('../lib/messaging-client').Client,
    client = Client.create('tcp://127.0.0.1:7171'),
    loop   = parseInt(process.env.LOOP) || 1,
    verbose = process.env.VERBOSE == 'true',
    Q = require('q'),
    promises = [];

function sendCommand(count) {
  if(verbose) {
    console.log("<-", count)
  }
  var p = client.sendCommand('player', 'avoid', 'play', {position: 71})
    .then(
        function(response) {
          if(verbose) {
            console.log('->', count, 'yes!', response)
          }
        },
        function(err) {
          if(verbose) {
            console.log('->', count, 'no!', err.status, err.msg)
          }
        }
    );

  promises.push(p);

  if(promises.length == loop) {
    function timeEnd() {
      console.timeEnd(loop);
      process.exit();
    }
    Q.all(promises).then(timeEnd, timeEnd);
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
exec();
