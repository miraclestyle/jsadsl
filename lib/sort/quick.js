const { swap, less } = require('../util');
const shuffle = require('./shuffle');
const insertionSort = require('./insertion');

const medianOf3 = (array, compare, low, high) => {
  const mid = low + Math.ceil((high - low) / 2);
  if (less(array[low], array[mid], compare)) {
    if (less(array[mid], array[high], compare)) return mid;
    if (less(array[low], array[high], compare)) return high;
    return low;
  }
  if (less(array[high], array[mid], compare)) return mid;
  if (less(array[high], array[low], compare)) return high;
  return low;
};

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
  if (high <= low + 10) {
    insertionSort(array, compare, low, high);
    return;
  }
  const median = medianOf3(array, compare, low, high);
  swap(array, low, median);
  const mid = partition(array, compare, low, high);
  divide(array, compare, low, mid - 1);
  divide(array, compare, mid + 1, high);
};

const sort = (array, compare) => {
  shuffle(array);
  divide(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
