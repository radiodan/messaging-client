module.exports = function(correlationId, resStatus, response) {
  correlationId = correlationId.toString();
  resStatus = resStatus.toString();

  try {
    response = JSON.parse(response.toString());
  } catch(err) {
    console.log("Error parsing JSON", err);
  }

  console.log("correlationId", correlationId);
  console.log("resStatus", resStatus);
  console.log("response", response);
};
