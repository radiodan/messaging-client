module.exports = function(correlationId, resStatus, response) {
  var messageCorrelation;

  correlationId = correlationId.toString();
  resStatus = resStatus.toString();

  try {
    if(response) {
      response = JSON.parse(response.toString());
    } else {
      response = {};
    }
  } catch(err) {
    console.log("Error parsing JSON", err);
  }

  messageCorrelation = this.correlations[correlationId];

  if(!messageCorrelation) {
    console.log("Couldn't find correlationID", correlationId);
    return;
  }

  if(resStatus === 'SUCCESS') {
    messageCorrelation.promise.resolve(response);
  } else {
    messageCorrelation.promise.reject(resStatus, response);
  }

  // message has been handled, remove rejection timeout
  clearTimeout(messageCorrelation.rejectTimeout);

  delete this.correlations[correlationId];
};
