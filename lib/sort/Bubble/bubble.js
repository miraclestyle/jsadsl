const { swap, less } = require('../util');

const sort = (array, compare) => {
  let isSorted = false;
  let end = array.length - 1;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < end; i += 1) {
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
