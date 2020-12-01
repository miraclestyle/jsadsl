const array = require('./dynamic-array.js');

const ds = () => ({
  size: array.size,
  empty: array.empty,
  forEach: array.forEach,
  insert: array.insert,
  remove: array.remove,
});

module.exports = ds;
