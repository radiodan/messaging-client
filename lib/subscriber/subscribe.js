var zmq = require('zmq');

module.exports = function(topic, callback) {
  if(typeof topic != 'string') {
    throw new Error('Topic must be a string');
  }

  if(typeof callback != 'function') {
    throw new Error('Callback must be a function');
  }

  if(this.topics.hasOwnProperty(topic) === false) {
    this.topics[topic] = [];
    this.socket.setsockopt(zmq.ZMQ_SUBSCRIBE, new Buffer(topic));
  }

  this.topics[topic].push(callback);
};
