const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => (compare(a, b) < 0);

const isSorted = (array, compare = defaultCompare) => {
  for (let i = 1; i < array.length; i += 1) {
    if (less(array[i], array[i - 1], compare)) return false;
  }
  return true;
};

module.exports = isSorted;
