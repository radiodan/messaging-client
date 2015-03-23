/*
 * This function ensures that our connection to the broker is good.
 * When we haven't heard from the broker in a while, we decrease the
 * 'liveness' quailty of the connection. If the connection is consistantly bad,
 * we assume that the broker has deserted us, and we must attempt to reconnect.
 */
module.exports = function() {
  var now = new Date(), expiryTime;

  // waiting for an initial connection
  if(this.lastMsg === false) {
    return;
  }

  // is the current time larger than the last message time plus the interval?
  expiryTime = new Date(
    this.lastMsg.getTime() + this.constants.HEARTBEAT_INTERVAL_MS
  );

  if(now > expiryTime) {
    this.events.emit('warn', 'Heartbeat missed, liveness ' + this.liveness);
    this.liveness--;
  } else {
    this.liveness = this.constants.HEARTBEAT_LIVENESS;
  }

  if(this.liveness < 1) {
    this.events.emit('warn', 'Disconnected from broker');
    this.socket.reconnect();
    this.instance.ready();
    this.liveness = this.constants.HEARTBEAT_LIVENESS;
  }
};
