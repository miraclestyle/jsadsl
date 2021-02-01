const { less } = require('../util');
const insertionSort = require('./insertion');

const combine = (array, aux, compare, low, mid, high) => {
  let left = low;
  let right = mid + 1;
  for (let i = low; i <= high; i += 1) {
    if (left > mid) {
      array[i] = aux[right];
      right += 1;
    } else if (right > high) {
      array[i] = aux[left];
      left += 1;
    } else if (less(aux[right], aux[left], compare)) {
      array[i] = aux[right];
      right += 1;
    } else {
      array[i] = aux[left];
      left += 1;
    }
  }
};

const divide = (array, aux, compare, low, high) => {
  if (high <= low + 10) {
    insertionSort(array, compare, low, high);
    return;
  }
  const mid = low + Math.floor((high - low) / 2);
  divide(aux, array, compare, low, mid);
  divide(aux, array, compare, mid + 1, high);
  // if (!less(array[mid + 1], array[mid], compare)) return;
  combine(array, aux, compare, low, mid, high);
};

const sort = (array, compare) => {
  const aux = array.slice();
  divide(array, aux, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
