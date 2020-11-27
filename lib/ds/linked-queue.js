const list = require('./singly-linked-list.js');

const ds = () => ({
  size: list.size,
  empty: list.empty,
  forEach: list.forEach,
  enqueue: list.insertTail,
  dequeue: list.removeHead,
});

module.exports = ds;
