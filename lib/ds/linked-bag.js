const list = require('./singly-linked-list');

const ds = () => ({
  size: list.size,
  empty: list.empty,
  forEach: list.forEach,
  insert: list.insertHead,
  remove: list.remove,
});

module.exports = ds;
