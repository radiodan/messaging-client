module.exports = {
  PROTOCOL_WORKER: "MDPW02",
  PROTOCOL_CLIENT: "MDPC02",
  READY:      "\x01",
  REQUEST:    "\x02",
  REPLY:      "\x03",
  HEARTBEAT:  "\x04",
  DISCONNECT: "\x05",
  MSG_ATTRS: [
      'type', 'sender', 'correlationId', 'device', 'subDevice',
      'command', 'params'
  ]
};
