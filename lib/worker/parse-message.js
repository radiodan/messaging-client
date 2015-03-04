module.exports = function() {
  var data = Array.prototype.slice.call(arguments),
      req = {},
      self = this;

  data.forEach(function(d, i) {
    var attr = self.constants.MSG_ATTRS[i];

    req[attr] = d.toString();
  });

  switch(req.type) {
    case this.constants.HEARTBEAT:
      console.log("I: HEARTBEAT");
      var heartbeat = [
        this.constants.PROTOCOL_WORKER, this.constants.HEARTBEAT
      ];
      self.socket.send(heartbeat);
      break;
    case this.constants.REQUEST:
      console.log("I: REQUEST", req);
      try {
        if(req.params) {
          req.params = JSON.parse(req.params);
        }
      } catch(err) {
        console.log('Connot parse message', req.correlationId,  err);
      }

      this.events.emit('request', req);
      break;
    case this.constants.DISCONNECT:
      console.log("E: DISCONNECTED");
      this.events.trigger('disconnect');
      break;
    default:
      console.log("?: Unknown request type", req.type)
  }
}
