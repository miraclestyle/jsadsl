const { swap, less } = require('../util');

const sort = (array, compare, low = 0, high = array.length) => {
  for (let i = low; i < high - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < high; j += 1) {
      if (less(array[j], array[min], compare)) min = j;
    }
    if (i !== min) swap(array, i, min);
  }
  return array;
};

module.exports = sort;
