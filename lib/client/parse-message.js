module.exports = function(protocol, correlationId, resStatus, response) {
  var messageCorrelation;

  protocol = protocol || '';
  correlationId = correlationId || '';
  resStatus = resStatus || '';
  response = response || '';

  protocol = protocol.toString();
  correlationId = correlationId.toString();
  resStatus = resStatus.toString();
  response = response.toString();

  switch(protocol) {
    case this.constants.PROTOCOL_WORKER:
    case this.constants.PROTOCOL_BROKER:
      break;
    default:
      console.log('Unsupported protocol', protocol);
      return;
  }

  messageCorrelation = this.correlations[correlationId];

  if(!messageCorrelation) {
    console.log('Couldn\'t find correlationID', correlationId);
    return;
  }

  if(resStatus === 'SUCCESS') {
    try {
      if(response.length > 0) {
        response = JSON.parse(response);
      }
    } catch(err) {
      console.log('Error parsing JSON', err);
    }

    messageCorrelation.promise.resolve(response);
  } else {
    var err = {status: resStatus, msg: response};

    messageCorrelation.promise.reject(err);
  }

  // message has been handled, remove rejection timeout
  clearTimeout(messageCorrelation.rejectTimeout);

  delete this.correlations[correlationId];
};
