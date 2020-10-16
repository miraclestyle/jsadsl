const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const isSorted = (array, compare = undefined, start = 0, end = undefined) => {
  const len = array.length;
  const last = end === undefined ? len - 1 : end;
  const comp = compare === undefined ? defaultCompare : compare;
  for (let i = start; i < last; i += 1) {
    if (comp(array[i], array[i + 1]) > 0) return false;
  }
  return true;
};

module.exports.isSorted = isSorted;
module.exports.defaultCompare = defaultCompare;
