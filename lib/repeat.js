const defaultComapre = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defaultComapre) => (compare(a, b) < 0);

const isSorted = (array, compare, start = 0, end = array.length - 1) => {
  for (let i = start + 1; i <= end; i += 1) {
    if (less(array[i], array[i - 1], compare)) return false;
  }
  return true;
};

module.exports = isSorted;
