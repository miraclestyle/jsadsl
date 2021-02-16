const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defaultCompare) => (compare(a, b) < 0);

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

const mergeSort = (array, compare) => {
  const aux = array.slice();
  for (let size = 1; size < array.length; size *= 2) {
    for (let range = 0; range < array.length - size; range += 2 * size) {
      const low = range;
      const mid = range + size - 1;
      const high = Math.min(array.length, range + (2 * size) - 1);
      merge(array, aux, compare, low, mid, high);
    }
  }
  return array;
};

module.exports = mergeSort;
