var uniqueID = require('../unique-id');
    promise  = require('../promise'),
    commandTimeout = 1000;

module.exports = function(serviceType, serviceInstance, command, params){
  var correlationId = uniqueID(),
      params = JSON.stringify(params),
      msg = [
        "MDPC02", "\x01", correlationId,
        serviceType, serviceInstance,
        command, params
      ],
      dfd = promise.defer()
      correlation = {promise: dfd},
      self = this;

  //set timeout to reject promise if there is no response
  correlation.rejectTimeout = setTimeout(function() {
    if(dfd.promise.isPending()) {
      dfd.reject("TIMEOUT");
    }

    if(self.correlations[correlationId]) {
      delete self.correlations[correlationId];
    }
  }, commandTimeout);

  this.correlations[correlationId] = correlation;

  this.socket.send(msg);

  return dfd.promise;
};
