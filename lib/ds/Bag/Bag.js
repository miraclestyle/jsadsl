const { LinkedBag, ResizingArrayBag } = require('.');

const Bag = (type = 'linked') => {
  if (type === 'linked') return LinkedBag();
  if (type === 'array') return ResizingArrayBag();
  return null;
};

module.exports = Bag;
