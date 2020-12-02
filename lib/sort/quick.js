const { swap, less } = require('../util');
const shuffle = require('./shuffle');

const partition = (array, compare, low, high) => {
  const pivot = array[low];
  let left = low;
  let right = high + 1;
  while (true) {
    while (true) {
      left += 1;
      if (!less(array[left], pivot, compare) || left === high) {
        break;
      }
    }
    while (true) {
      right -= 1;
      if (!less(pivot, array[right], compare) || right === low) {
        break;
      }
    }
    if (left >= right) {
      break;
    }
    swap(array, left, right);
  }
  swap(array, low, right);
  return right;
};

const divide = (array, compare, low, high) => {
  if (high <= low) {
    return;
  }
  const mid = partition(array, compare, low, high);
  divide(array, compare, low, mid - 1);
  divide(array, compare, mid + 1, high);
};

const sort = (array, compare, low = 0, high = array.length) => {
  shuffle(array, low, high);
  divide(array, compare, low, high - 1);
};

module.exports = sort;
