module.exports.create = function(name, socket) {
  this.name   = name;
  this.socket = socket;
  this.topics = {};

  this.parseMessage = require('./subscriber/parse-message').bind(this);

  this.instance = {
    subscribe: require('./subscriber/subscribe').bind(this)
  };

  this.socket.on('message', this.parseMessage);

  return this.instance;
}
