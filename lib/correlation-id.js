var id = 0;

/* correlation IDs are scoped to the worker that requested them
 * so we can get away with auto-incremented itegers
 */
module.exports = function() {
  var next = id+1;

  // id is at max, start again!
  if(next === id) {
    next = 0;
  }

  id = next;

  // correlationId is always a string
  return next.toString();
};
