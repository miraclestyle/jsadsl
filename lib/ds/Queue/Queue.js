const { LinkedQueue, ResizingArrayQueue } = require('.');

const Queue = (type = 'linked') => {
  if (type === 'linked') return LinkedQueue();
  if (type === 'array') return ResizingArrayQueue();
  return null;
};

module.exports = Queue;
