const { LinkedStack, ResizingArrayStack } = require('.');

const Stack = (type = 'linked') => {
  if (type === 'linked') return LinkedStack();
  if (type === 'array') return ResizingArrayStack();
  return null;
};

module.exports = Stack;
