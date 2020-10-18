const { less } = require('./util');

const isSorted = (array, compare, low = 0, high = array.length) => {
  for (let i = low; i < high; i += 1) {
    if (less(array[i + 1], array[i], compare)) return false;
  }
  return true;
};

module.exports = isSorted;
