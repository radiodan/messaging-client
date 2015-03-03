module.exports = function() {
  self = this;

  var args = ["MDPW02", self.constants.READY];

  self.services.forEach(function(s) {
    var serviceNames = s.serviceInstances.map(function(si) {
      return s.serviceType + '.' + si;
    });

    args = args.concat(serviceNames);
  });

  console.log("Sending args", args);
  self.socket.send(args);
};
