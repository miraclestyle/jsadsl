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

const sort = (array, compare) => {
  const n = array.length;
  const aux = new Array(n);
  for (let chunk = 1; chunk < n; chunk *= 2) {
    for (let i = 0; i < n - chunk; i += 2 * chunk) {
      const low = i;
      const mid = i + chunk - 1;
      const high = Math.min(n - 1, i + chunk + chunk - 1);
      merge(array, aux, compare, low, mid, high);
    }
  }
  return array;
};

module.exports = sort;
