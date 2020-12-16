const { less } = require('../util');
const insertionSort = require('./insertion');

const combine = (array, aux, compare, low, mid, high) => {
  let first = low;
  let second = mid + 1;
  for (let i = low; i <= high; i += 1) {
    if (first > mid) {
      array[i] = aux[second];
      second += 1;
    } else if (second > high) {
      array[i] = aux[first];
      first += 1;
    } else if (less(aux[second], aux[first], compare)) {
      array[i] = aux[second];
      second += 1;
    } else {
      array[i] = aux[first];
      first += 1;
    }
  }
};

const divide = (array, aux, compare, low, high) => {
  if (high <= low + 10) {
    insertionSort(array, compare, low, high + 1);
    return;
  }
  const mid = low + Math.floor((high - low) / 2);
  divide(aux, array, compare, low, mid);
  divide(aux, array, compare, mid + 1, high);
  // if (!less(array[mid + 1], array[mid], compare)) return;
  combine(array, aux, compare, low, mid, high);
};

const sort = (array, compare, low = 0, high = array.length) => {
  const aux = array.slice();
  divide(array, aux, compare, low, high - 1);
  return array;
};

module.exports = sort;
