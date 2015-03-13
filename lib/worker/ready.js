module.exports = function() {
  var args = [this.constants.PROTOCOL_WORKER, this.constants.READY],
      msg = args.concat(this.services);

  this.socket.send(msg);
};
