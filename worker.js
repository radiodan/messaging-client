var zmq = require('zmq'),
    sock = zmq.socket('dealer'),
    endpoint = 'tcp://127.0.0.1:7171',
    msgs = {
      READY: 0x01,
      REQUEST: 0x02,
      PARTIAL: 0x03
    };

sock.identity = 'radiodan-worker(player)';
sock.connect(endpoint);

console.log("connected to "+endpoint);

function sendReady() {
  sock.send(["MDPW02", msgs.READY, "player", "announce", "avoider"]);
}

var msgAttrs = ['sender', 'correlationId', 'device', 'subDevice', 'command', 'params'];

sock.on('message', function() {
  var data = Array.prototype.slice.call(arguments),
      res = ["MDPW02", msgs.REQUEST],
      req = {};

  data.forEach(function(d, i) {
    var attr = msgAttrs[i];

    req[attr] = d.toString();
  });

  try {
    req.params = JSON.parse(req.params);
  } catch(err) {
    console.log('cannot parse', err);
  }

  res.push(req.sender);
  res.push(req.correlationId);
  res.push(JSON.stringify({error: false}));

  console.log('req', req);
  console.log('res', res);

  sock.send(res);
});

sendReady();
