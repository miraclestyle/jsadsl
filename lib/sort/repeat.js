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

const sort = (array, compare) => {
  for (let i = 1; i < array.length; i += 1) {
    let j = i;
    while (j > 0 && less(array[j], array[j - 1], compare)) {
      swap(array, j, j - 1);
      j -= 1;
    }
  }
};

module.exports = sort;
