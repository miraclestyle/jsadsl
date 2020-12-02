const list = require('./singly-linked-list');

const ds = () => {
  const bag = list();
  return {
    size: bag.size,
    empty: bag.empty,
    forEach: (callback) => (
      bag.forEach((node, first, last) => (callback(node.value, first, last)))
    ),
    insert: bag.insertHead,
    remove: (value) => {
      const node = bag.remove(value);
      return node === null ? null : node.value;
    },
  };
};

module.exports = ds;
