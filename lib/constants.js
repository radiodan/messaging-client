module.exports = {
  PROTOCOL_CLIENT: "RDC01",
  PROTOCOL_WORKER: "RDW01",
  PROTOCOL_BROKER: "RDB01",
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
