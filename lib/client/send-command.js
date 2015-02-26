var uniqueID = require('../unique-id');

module.exports = function(serviceType, serviceInstance, command, params){
  var correlationId = uniqueID(),
      params = JSON.stringify(params),
      msg = [
        "MDPC02", 0x01, correlationId,
        serviceType, serviceInstance,
        command, params
      ];

  return this.socket.send(msg);
};
