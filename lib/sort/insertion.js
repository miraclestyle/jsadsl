const { swap, less } = require('./util');

const sort = (array, compare, low = 0, high = array.length) => {
  for (let i = low + 1; i < high; i += 1) {
    for (let j = i; j > low && less(array[j], array[j - 1], compare); j -= 1) {
      swap(array, j, j - 1);
    }
  }
};

module.exports = sort;
