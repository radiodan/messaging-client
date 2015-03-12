module.exports.create = function(name, socket) {
  this.socket = socket;
  this.instance = {
    name: name,
    publish: require('./publisher/publish').bind(this)
  };

  return this.instance;
}
