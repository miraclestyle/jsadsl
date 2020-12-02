const list = require('./singly-linked-list');

const ds = () => {
  const bag = list();
  return {
    size: bag.size,
    empty: bag.empty,
    forEach: bag.forEach,
    insert: bag.insertHead,
    remove: bag.remove,
  };
};

module.exports = ds;
