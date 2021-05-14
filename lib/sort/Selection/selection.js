const { swap, less } = require('../util');

const sort = (array, compare) => {
  const n = array.length;
  for (let i = 0; i < n - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < n; j += 1) {
      if (less(array[j], array[min], compare)) min = j;
    }
    if (i !== min) swap(array, i, min);
  }
  return array;
};

module.exports = sort;
