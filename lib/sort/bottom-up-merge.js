const { less } = require('../util');

const merge = (array, aux, compare, low, mid, high) => {
  for (let i = low; i <= high; i += 1) {
    aux[i] = array[i];
  }
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

const sort = (array, compare) => {
  const aux = array.slice();
  for (let size = 1; size < array.length; size *= 2) {
    for (let i = 0; i < array.length - size; i += 2 * size) {
      const low = i;
      const mid = i + size - 1;
      const high = Math.min(i + 2 * size - 1, array.length);
      merge(array, aux, compare, low, mid, high);
    }
  }
  return array;
};

module.exports = sort;
