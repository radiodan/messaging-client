module.exports = function(addressee, correlationId, response) {
  var msg, responseJSON;

  response = response || {};

  if(String(addressee).length === 0) {
    return new Error("No known addressee");
  }

  if(String(correlationId).length === 0) {
    return new Error("No known correlationId");
  }

  try {
    responseJSON = JSON.stringify(response);
  } catch(err) {
    return err;
  }

  msg = [
    this.constants.PROTOCOL_WORKER,
    this.constants.REQUEST,
    addressee,
    correlationId,
    responseJSON
  ];

  self.socket.send(msg);
};
