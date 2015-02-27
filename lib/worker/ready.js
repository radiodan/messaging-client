module.exports = function() {
  self = this;

  Object.keys(self.services).forEach(function(k) {
    var args = ["MDPW02", self.constants.READY, k];

    args = args.concat(self.services[k]);

    self.socket.send(args);
  });
};
