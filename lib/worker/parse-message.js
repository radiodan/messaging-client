module.exports = function() {
  var dataBuffer = Array.prototype.slice.call(arguments),
      data,
      self = this;

  data = dataBuffer.map(function(d) {
    return d.toString();
  });

  // update timer for last message recieved
  this.lastMsg = new Date();

  // check protocol of message
  switch(data[0]) {
    case this.constants.PROTOCOL_CLIENT:
    case this.constants.PROTOCOL_BROKER:
      break;
    default:
      console.log('E: Unsupported protocol', data[0]);
      return;
  }

  switch(data[1]) {
    case this.constants.HEARTBEAT:
      console.log('I: HEARTBEAT');
      var heartbeat = [
        this.constants.PROTOCOL_WORKER, this.constants.HEARTBEAT
      ];
      self.socket.send(heartbeat);
      break;
    case this.constants.REQUEST:
      var req = {}, serviceName;

      data.forEach(function(d, i) {
        var attr = self.constants.MSG_ATTRS[i];

        req[attr] = d.toString();
      });

      try {
        self.constants.MSG_ATTRS.slice(0,-1).forEach(function(c) {
          if(!req.hasOwnProperty(c) || req[c] === '') {
            throw new Error('Missing '+c);
          }
        });

        if(req.params) {
          req.params = JSON.parse(req.params);
        }
      } catch(err) {
        console.log('Connot parse message', req.correlationId,  err);
        return;
      }

      console.log('I: REQUEST', req);

      serviceName = req.serviceType+'.'+req.serviceInstance;

      console.log('emit', serviceName);
      this.events.emit(serviceName, req);
      this.events.emit('request', req);
      break;
    case this.constants.DISCONNECT:
      console.log('E: DISCONNECTED', data[2]);

      this.liveness = 0;
      this.events.emit('disconnect', data[3]);
      break;
    default:
      console.log('?: Unknown request type', data[1]);
  }
}
