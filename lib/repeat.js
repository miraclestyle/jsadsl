const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const bs = (array, target, compare = defaultCompare) => {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const cmp = compare(target, array[mid]);
    if (cmp < 0) {
      high = mid - 1;
    } else if (cmp > 0) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};

module.exports = bs;
