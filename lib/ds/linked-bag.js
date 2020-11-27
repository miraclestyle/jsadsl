const list = require('./singly-linked-list');

const ds = () => ({
  empty: list.empty,
  size: list.size,
  forEach: list.forEach,
  insert: list.insertHead,
  remove: list.removeHead,
});

module.exports = ds;
