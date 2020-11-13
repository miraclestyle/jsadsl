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

const sort = (array, compare, low = 0, high = array.length) => {
  for (let i = low + 1; i < high; i += 1) {
    for (let j = i; j > low && less(array[j], array[j - 1], compare); j -= 1) {
      swap(array, j, j - 1);
    }
  }
};

module.exports = sort;
