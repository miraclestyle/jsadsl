const { swap, defaultCompare } = require('./util');

const bubble = (array, compare = defaultCompare) => {
  let isSorted = false;
  let last = array.length - 1;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < last; i += 1) {
      if (compare(array[i], array[i + 1]) > 0) {
        swap(array, i, i + 1);
        isSorted = false;
      }
    }
    last -= 1;
  }
};

module.exports = bubble;
