const { swap, less } = require('../util');

const sort = (array, compare, low = 0, high = array.length) => {
  let isSorted = false;
  let end = high - 1;
  while (!isSorted) {
    isSorted = true;
    for (let i = low; i < end; i += 1) {
      if (less(array[i + 1], array[i], compare)) {
        swap(array, i, i + 1);
        isSorted = false;
      }
    }
    end -= 1;
  }
  return array;
};

module.exports = sort;
