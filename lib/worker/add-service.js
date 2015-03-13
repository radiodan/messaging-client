module.exports = function(services) {
  var self = this;

  if(!Array.isArray(services)) {
    throw new Error('Services is not array');
  }

  services.forEach(function(s) {
    if(typeof s.serviceType != 'string') {
      throw new Error('Service type not string');
    }

    if(!Array.isArray(s.serviceInstances)) {
      throw new Error('Service Instances not array');
    }

    s.serviceInstances.forEach(function(serviceInstance) {
      var serviceName = s.serviceType+'.'+serviceInstance;

      if(self.services.indexOf(serviceName) > -1) {
        throw new Error('Service '+serviceName+' already registered');
      }

      self.services.push(serviceName);
    });
  });

  return this.services;
};
