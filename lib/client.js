module.exports.create = create.bind({});

function create(name, socket) {
  this.name     = name;
  this.socket   = socket;

  this.constants = {};

  this.instance = {
    parseMessage: require('./client/parse-message').bind(this),
    sendCommand: require('./client/send-command').bind(this)
  };

  socket.on('message', this.instance.parseMessage);

  return this.instance;
};