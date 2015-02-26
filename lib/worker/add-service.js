module.exports = function(type, instances) {
  if(typeof type != 'string') {
    throw new Error('Type is not string');
  }

  if(!Array.isArray(instances)) {
    console.log('i', instances);
    throw new Error('Instances not array');
  }

  this.services[type] = instances;
};
