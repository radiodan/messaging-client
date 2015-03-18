module.exports.create = function(name, socket) {
  var self = {};

  self.socket = socket;
  self.instance = {
    name: name,
    publish: require('./publisher/publish').bind(self)
  };

  return self.instance;
}
