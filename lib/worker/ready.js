module.exports = function() {
  self = this;

  var args = [self.constants.PROTOCOL_WORKER, self.constants.READY];

  self.services.forEach(function(s) {
    var serviceNames = s.serviceInstances.map(function(si) {
      return s.serviceType + '.' + si;
    });

    args = args.concat(serviceNames);
  });

  self.socket.send(args);
};
