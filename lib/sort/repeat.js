const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare !== 'function' ? defaultCompare : compare;
  return comp(a, b) < 0;
};

const sort = (array, compare, low = 0, high = array.length) => {
  for (let i = low + 1; i < high; i += 1) {
    let j = i;
    while (j >= low && less(array[j], array[j - 1], compare)) {
      swap(array, j, j - 1);
      j -= 1;
    }
  }
};

module.exports = sort;
