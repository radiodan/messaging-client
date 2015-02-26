module.exports.create = create.bind({});

function create(name, socket) {
  this.name     = name;
  this.socket   = socket;
  this.services = {};

  this.constants = require('./worker/constants');

  this.instance = {
    addService: require('./worker/add-service').bind(this),
    parseMessage: require('./worker/parse-message').bind(this),
    ready: require('./worker/ready').bind(this)
  };

  socket.on('message', this.instance.parseMessage);

  return this.instance;
};
