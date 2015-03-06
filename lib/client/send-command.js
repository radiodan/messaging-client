var CorrelationId = require('../correlation-id'),
    promise  = require('../promise'),
    commandTimeout = 5000;

module.exports = function(serviceType, serviceInstance, command, params){
  var correlationId = CorrelationId(),
      params = JSON.stringify(params),
      msg = [
        this.constants.PROTOCOL_CLIENT, this.constants.READY,
        correlationId,
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
