module.exports = function() {
  var args = [this.constants.PROTOCOL_WORKER, this.constants.READY],
      msg = args.concat(this.services);

  if(this.services.length == 0) {
    throw new Error("No services to register for worker "+this.name);
  }

  this.socket.send(msg);
};
