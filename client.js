var uuid = require('uuid'),
    zmq = require('zmq'),
    sock = zmq.socket('dealer'),
    endpoint = 'tcp://127.0.0.1:7171';

sock.identity = 'radiodan-client-'+uuid.v1();
sock.connect(endpoint);

console.log("connected to "+endpoint);

sock.on('message', function(correlationId, resStatus, response) {
  correlationId = correlationId.toString();
  resStatus = resStatus.toString();

  try {
    response = JSON.parse(response.toString());
  } catch(err) {
    console.log("Error parsing JSON", err);
  }

  console.log("correlationId", correlationId);
  console.log("resStatus", resStatus);
  console.log("response", response);
});

function sendCommand(){
  var params = JSON.stringify(
    {position: 71}
  ),
     correlationId = uuid.v1();

  sock.send(["MDPC02", 0x01, correlationId, "player", "avoider", "play", params]);
}

//setInterval(sendCommand, 1000);
sendCommand();
