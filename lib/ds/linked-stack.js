const list = require('./singly-linked-list.js');

const ds = () => ({
  size: list.size,
  empty: list.empty,
  forEach: list.forEach,
  push: list.insertHead,
  pop: list.removeHead,
});

module.exports = ds;