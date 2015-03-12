module.exports = function(topic, message) {
  var messageJSON = JSON.stringify(message || {});

  return this.socket.send([topic, messageJSON]);
};
