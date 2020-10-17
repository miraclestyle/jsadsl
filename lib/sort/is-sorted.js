const { defaultCompare } = require('./util');

const isSorted = (array, compare, start = 0, end = undefined) => {
  const len = array.length;
  const last = end === undefined ? len - 1 : end;
  const comp = compare === undefined ? defaultCompare : compare;
  for (let i = start; i < last; i += 1) {
    if (comp(array[i], array[i + 1]) > 0) return false;
  }
  return true;
};

module.exports = isSorted;
