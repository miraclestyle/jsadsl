const { defaultCompare } = require('../util');

const search = (array, target, compare = defaultCompare) => {
  let low = 0;
  let high = array.length - 1;
  let mid;
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    const cmp = compare(target, array[mid]);
    if (cmp > 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return high;
};

module.exports = search;
