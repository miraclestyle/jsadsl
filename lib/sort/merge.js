const { less } = require('./util');

const combine = (array, aux, compare, low, mid, high) => {
  for (let i = low; i <= high; i += 1) {
    aux[i] = array[i];
  }
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

const sort = (array, aux, compare, low, high) => {
  if (high <= low) {
    return;
  }
  const mid = low + Math.floor((high - low) / 2);
  sort(array, aux, compare, low, mid);
  sort(array, aux, compare, mid + 1, high);
  combine(array, aux, compare, low, mid, high);
};

const merge = (array, compare, low = 0, high = array.length) => {
  const aux = array.slice();
  sort(array, aux, compare, low, high - 1);
};

module.exports = merge;
