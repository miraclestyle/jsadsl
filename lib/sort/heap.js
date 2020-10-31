const { swap, less } = require('./util');

const sink = (array, compare, low, parent, end) => {
  let child = ((parent - low) * 2) + 1 + low;
  if (child > end) {
    return;
  }
  if (child + 1 <= end && less(array[child], array[child + 1], compare)) {
    child += 1;
  }
  if (less(array[parent], array[child], compare)) {
    swap(array, parent, child);
    sink(array, compare, low, child, end);
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
};

module.exports = sort;
