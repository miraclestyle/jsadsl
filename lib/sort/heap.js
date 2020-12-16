const { swap, less } = require('../util');

const sink = (array, compare, start, end) => {
  let parent = start;
  let child = parent * 2 + 1;
  while (child <= end) {
    if (child + 1 <= end && less(array[child], array[child + 1], compare)) {
      child += 1;
    }
    if (less(array[child], array[parent], compare)) break;
    swap(array, parent, child);
    parent = child;
    child = parent * 2 + 1;
  }
};

const sort = (array, compare) => {
  const n = array.length;
  let end = n - 1;
  for (let i = Math.ceil(n / 2); i >= 0; i -= 1) {
    sink(array, compare, i, end);
  }
  while (end > 0) {
    swap(array, 0, end);
    end -= 1;
    sink(array, compare, 0, end);
  }
  return array;
};

module.exports = sort;
