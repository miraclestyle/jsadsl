const { swap, less } = require('../util');

const sink = (array, compare, low, start, end) => {
  let parent = start;
  let child = ((parent - low) * 2) + 1 + low;
  while (child <= end) {
    if (child + 1 <= end && less(array[child], array[child + 1], compare)) {
      child += 1;
    }
    if (less(array[child], array[parent], compare)) break;
    swap(array, parent, child);
    parent = child;
    child = ((parent - low) * 2) + 1 + low;
  }
};

const sort = (array, compare, low = 0, high = array.length) => {
  const limit = high - low;
  let end = high - 1;
  for (let i = low + Math.ceil(limit / 2); i >= low; i -= 1) {
    sink(array, compare, low, i, end);
  }
  while (end >= low) {
    swap(array, low, end);
    end -= 1;
    sink(array, compare, low, low, end);
  }
  return array;
};

module.exports = sort;
