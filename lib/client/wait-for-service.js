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
        console.log("READY");
        dfd.resolve(res);
      },
      function() {
        retries++;

        if(retries > retryMax) {
          console.log("FAILED");
          dfd.reject();
        } else {
          console.log("RETRY", retries);
          setTimeout(requestService, retryInterval);
        }
      });
  }

  requestService();

  return dfd.promise;
};
