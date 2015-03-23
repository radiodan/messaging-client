var promise = require('../promise'),
    retryMax = 3,
    retryInterval = 3000;

module.exports = function(serviceType, serviceInstance) {
  var dfd = promise.defer(),
      retries = 0,
      self = this;

  function requestService() {
    self.sendCommand('broker', 'service', serviceType, serviceInstance)
      .then(function(res) {
        self.events.emit('info', 'Service ready');
        dfd.resolve(res);
      },
      function() {
        retries++;

        if(retries > retryMax) {
          self.events.emit('warn', 'Service failed');
          dfd.reject();
        } else {
          self.events.emit(
            'warn', 'Could not connect to service, retrying...'
          );
          setTimeout(requestService, retryInterval);
        }
      });
  }

  requestService();

  return dfd.promise;
};
