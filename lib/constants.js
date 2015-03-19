module.exports = {
  PROTOCOL_WORKER: "MDPW02",
  PROTOCOL_CLIENT: "MDPC02",
  READY:      "\x01",
  REQUEST:    "\x02",
  REPLY:      "\x03",
  HEARTBEAT:  "\x04",
  DISCONNECT: "\x05",
  HEARTBEAT_INTERVAL_MS: 2500,
  HEARTBEAT_LIVENESS: 3,
  MSG_ATTRS: [
      'type', 'sender', 'correlationId', 'serviceType', 'serviceInstance',
      'command', 'params'
  ]
};
