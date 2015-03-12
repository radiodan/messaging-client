module.exports = function(mt, t, m) {
  var matchedTopic, topic, message;

  try {
    matchedTopic = mt.toString();
    topic        = t.toString();
    message      = m.toString();
  } catch(err) {
    console.log(err);
    return;
  }

  if(this.topics.hasOwnProperty(matchedTopic) === false) {
    return;
  }

  try {
    message = JSON.parse(message);
  } catch(err) {
    console.log(err);
  }

  this.topics[matchedTopic].forEach(function(callback) {
    callback(topic, message);
  });
};
