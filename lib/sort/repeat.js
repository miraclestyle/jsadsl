const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const issorted = (array, compare, low = 0, high = array.length) => {
  for (let i = low; i < high - 1; i += 1) {
    if (less(array[i + 1], array[i], compare)) return false;
  }
  return true;
};

module.exports = issorted;
