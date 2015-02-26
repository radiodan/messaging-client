module.exports = function() {
  var data = Array.prototype.slice.call(arguments),
      res = [this.constants.PROTOCOL, this.constants.REQUEST],
      req = {},
      self = this;

  data.forEach(function(d, i) {
    var attr = self.constants.MSG_ATTRS[i];

    req[attr] = d.toString();
  });

  try {
    req.params = JSON.parse(req.params);
  } catch(err) {
    console.log('cannot parse', err);
  }

  res.push(req.sender);
  res.push(req.correlationId);
  res.push(JSON.stringify({error: false}));

  console.log('req', req);
  console.log('res', res);

  self.socket.send(res);
}
