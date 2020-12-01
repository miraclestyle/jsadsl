const array = require('./dynamic-array');

const ds = () => ({
  size: array.size,
  empty: array.empty,
  forEach: array.forEach,
  push: array.insert,
  pop: array.removeLast,
  peek: array.getLast,
});

module.exports = ds;
