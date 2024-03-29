const { swap, less } = require('../util');
const { shuffle } = require('../sort');

const partition = (array, compare, low, high) => {
  let left = low;
  let right = high + 1;
  const pivot = array[low];
  while (true) {
    left += 1;
    right -= 1;
    while (left < high && less(array[left], pivot, compare)) left += 1;
    while (right > low && less(pivot, array[right], compare)) right -= 1;
    if (right <= left) break;
    swap(array, left, right);
  }
  swap(array, low, right);
  return right;
};

const select = (array, k, compare) => {
  shuffle(array);
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = partition(array, compare, low, high);
    if (k < mid) {
      high = mid - 1;
    } else if (k > mid) {
      low = mid + 1;
    } else {
      return array[k];
    }
  }
  return null;
};

module.exports = select;
