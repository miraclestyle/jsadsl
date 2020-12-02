const { swap, less } = require('../util');

const sort = (array, compare, low = 0, high = array.length) => {
  let isSorted = false;
  let end = high;
  while (!isSorted) {
    isSorted = true;
    for (let i = low + 1; i < end; i += 1) {
      if (less(array[i], array[i - 1], compare)) {
        swap(array, i, i - 1);
        isSorted = false;
      }
    }
    end -= 1;
  }
};

module.exports = sort;
