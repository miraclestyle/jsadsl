const { swap, less } = require('../util');

const sort = (array, compare, low = 0, high = array.length - 1) => {
  for (let i = low + 1; i <= high; i += 1) {
    let j = i;
    while (j > low && less(array[j], array[j - 1], compare)) {
      swap(array, j, j - 1);
      j -= 1;
    }
  }
  return array;
};

module.exports = sort;
