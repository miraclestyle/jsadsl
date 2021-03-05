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
  const n = array.length;
  const aux = array.slice();
  for (let size = 1; size < n; size *= 2) {
    for (let i = 0; i < n - size; i += size + size) {
      const low = i;
      const mid = i + size - 1;
      const high = Math.min(i + size + size - 1, n - 1);
      merge(array, aux, compare, low, mid, high);
    }
  }
  return array;
};

module.exports = sort;
