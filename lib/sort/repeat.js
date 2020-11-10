const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const merge = (array, aux, compare, low, mid, high) => {
  for (let i = low; i <= high; i += 1) aux[i] = array[i];
  let left = low;
  let right = mid + 1;
  for (let i = low; i <= high; i += 1) {
    if (left > mid) array[i] = aux[right++];
    else if (right > high) array[i] = aux[left++];
    else if (less(aux[right], aux[left], compare)) array[i] = aux[right++];
    else array[i] = aux[left++];
  }
};

const mergesort = (array, aux, compare, low, high) => {
  if (high <= low) return;
  const mid = low + Math.floor((high - low) / 2);
  mergesort(array, aux, compare, low, mid);
  mergesort(array, aux, compare, mid + 1, high);
  merge(array, aux, compare, low, mid, high);
};

const sort = (array, compare, low = 0, high = array.length) => {
  const aux = array.slice(low, high);
  mergesort(array, aux, compare, low, high - 1);
};

module.exports = sort;
