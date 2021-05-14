const { swap, defaultCompare } = require('../util');
const shuffle = require('./shuffle');

const divide = (array, compare, low, high) => {
  if (low >= high) return;
  const pivot = array[low];
  let current = low;
  let left = low;
  let right = high;
  while (current <= right) {
    const cp = compare(array[current], pivot);
    if (cp < 0) {
      swap(array, current, left);
      current += 1;
      left += 1;
    } else if (cp > 0) {
      swap(array, current, right);
      right -= 1;
    } else {
      current += 1;
    }
  }
  divide(array, compare, low, left - 1);
  divide(array, compare, right + 1, high);
};

const sort = (array, compare = defaultCompare) => {
  shuffle(array);
  divide(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
