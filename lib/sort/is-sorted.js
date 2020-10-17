const { defaultCompare } = require('./util');

const isSorted = (array, compare = defaultCompare, start = 0, end = undefined) => {
  const len = array.length;
  const last = end === undefined ? len - 1 : end;
  for (let i = start; i < last; i += 1) {
    if (compare(array[i], array[i + 1]) > 0) return false;
  }
  return true;
};

module.exports = isSorted;
