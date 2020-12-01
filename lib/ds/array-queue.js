const q = require('./dynamic-circular-queue');

const ds = () => ({
  size: q.size,
  empty: q.empty,
  forEach: q.forEach,
  enqueue: q.enqueue,
  dequeue: q.dequeue,
  peek: q.peek,
});

module.exports = ds;
