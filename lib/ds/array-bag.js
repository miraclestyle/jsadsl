const array = require('./dynamic-array.js');

const ds = () => {
  const bag = array();
  return {
    size: bag.size,
    empty: bag.empty,
    forEach: bag.forEach,
    insert: bag.insert,
    remove: bag.remove,
  };
};

module.exports = ds;
