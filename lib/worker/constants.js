module.exports = {
  PROTOCOL: "MDPW02",
  READY: 0x01,
  REQUEST: 0x02,
  PARTIAL: 0x03,
  MSG_ATTRS: [
      'sender', 'correlationId', 'device', 'subDevice',
      'command', 'params'
  ]
};
