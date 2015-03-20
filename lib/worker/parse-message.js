module.exports = function() {
  var dataBuffer = Array.prototype.slice.call(arguments),
      data,
      self = this;

  data = dataBuffer.map(function(d) {
    return d.toString();
  });

  // update timer for last message recieved
  self.lastMsg = new Date();

  // check protocol of message
  switch(data[0]) {
    case self.constants.PROTOCOL_CLIENT:
    case self.constants.PROTOCOL_BROKER:
      break;
    default:
      console.log('E: Unsupported protocol', data[0]);
      return;
  }

  switch(data[1]) {
    case self.constants.HEARTBEAT:
      console.log('I: HEARTBEAT');
      var heartbeat = [
        self.constants.PROTOCOL_WORKER, self.constants.HEARTBEAT
      ];
      self.socket.send(heartbeat);
      break;
    case self.constants.REQUEST:
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

      self.events.emit(serviceName, req);
      self.events.emit('request', req);
      break;
    case self.constants.DISCONNECT:
      console.log('E: DISCONNECTED', data[2]);

      self.liveness = 0;
      self.events.emit('disconnect', data[3]);
      break;
    default:
      console.log('?: Unknown request type', data[1]);
  }
}
