const { swap, defaultCompare } = require('./util');

const insertion = (array, compare) => {
  const comp = compare === undefined ? defaultCompare : compare;
  for (let i = 1; i < array.length; i += 1) {
    for (let j = i; j > 0 && comp(array[j - 1], array[j]) > 0; j -= 1) {
      swap(array, j - 1, j);
    }
  }
};

module.exports = insertion;
