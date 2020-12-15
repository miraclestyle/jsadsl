const { less } = require('../util');

const combine = (array, aux, compare, low, mid, high) => {
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

const divide = (array, aux, compare, low, high) => {
  const n = high - low;
  for (let range = 1; range <= n; range *= 2) {
    for (let i = low; i <= high - range; i += 2 * range) {
      combine(array, aux, compare, i, i + range - 1, Math.min(i + (2 * range) - 1, high));
    }
  }
};

const sort = (array, compare, low = 0, high = array.length - 1) => {
  const aux = array.slice();
  divide(array, aux, compare, low, high);
};

module.exports = sort;
