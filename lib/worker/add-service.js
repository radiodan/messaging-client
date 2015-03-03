module.exports = function(services) {
  if(!Array.isArray(services)) {
    throw new Error('Services is not array');
  }

  var validServices = services.map(function(s) {
    if(typeof s.serviceType != 'string') {
      throw new Error('Service type not string');
    }

    if(!Array.isArray(s.serviceInstances)) {
      throw new Error('Service Instances not array');
    }

    return {
      serviceType: s.serviceType,
      serviceInstances: s.serviceInstances
    }
  });

  this.services = validServices;
};
