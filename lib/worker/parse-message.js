module.exports = function() {
  var dataBuffer = Array.prototype.slice.call(arguments),
      data,
      self = this;

  data = dataBuffer.map(function(d) {
    return d.toString();
  });

  // update timer for last message recieved
  this.lastMsg = new Date();

  switch(data[0]) {
    case this.constants.HEARTBEAT:
      console.log("I: HEARTBEAT");
      var heartbeat = [
        this.constants.PROTOCOL_WORKER, this.constants.HEARTBEAT
      ];
      self.socket.send(heartbeat);
      break;
    case this.constants.REQUEST:
      var req = {};

      data.forEach(function(d, i) {
        var attr = self.constants.MSG_ATTRS[i];

        req[attr] = d.toString();
      });

      try {
        if(!req.hasOwnProperty('sender') || req.sender == '') {
          throw new Error("Missing sender");
        }

        if(!req.hasOwnProperty('correlationId') || req.correlationId == '') {
          throw new Error("Missing correlationId");
        }

        if(req.params) {
          req.params = JSON.parse(req.params);
        }
      } catch(err) {
        console.log('Connot parse message', req.correlationId,  err);
        return;
      }

      console.log("I: REQUEST", req);
      this.events.emit('request', req);
      break;
    case this.constants.DISCONNECT:
      console.log("E: DISCONNECTED", data[1]);

      this.liveness = 0;
      this.events.emit('disconnect', data[2]);
      break;
    default:
      console.log("?: Unknown request type", data[0]);
  }
}
