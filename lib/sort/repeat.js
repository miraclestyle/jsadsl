const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
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

const insertion = (array, compare, step, low, high) => {
  for (let i = low + step; i < high; i += step) {
    for (let j = i; j >= low && less(array[j], array[j - step], compare); j -= step) {
      swap(array, j, j - step);
    }
  }
  return Math.floor(step / 3);
};

const sort = (array, compare, low = 0, high = array.length) => {
  const n = high - low;
  let h = 1;
  while (h < n / 3) h = (3 * h) + 1;
  while (h >= 1) h = insertion(array, compare, h, low, high);
};

module.exports = sort;
