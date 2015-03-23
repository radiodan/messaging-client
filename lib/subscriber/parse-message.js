module.exports = function(mt, t, m) {
  var matchedTopic, topic, message;

  try {
    matchedTopic = mt.toString();
    topic        = t.toString();
    message      = m.toString();
  } catch(err) {
    this.events.emit('warn', 'Could not parse message ' + String(err));
    return;
  }

  if(this.topics.hasOwnProperty(matchedTopic) === false) {
    return;
  }

  try {
    message = JSON.parse(message);
  } catch(err) {
    this.events.emit('warn', String(err));
  }

  this.topics[matchedTopic].forEach(function(callback) {
    callback(topic, message);
  });
};
