const { swap, less } = require('../util');

const sort = (array, compare, low = 0, high = array.length) => {
  let h = 1;
  const n = (high - low);
  while (h < n / 3) h = 3 * h + 1;
  while (h >= 1) {
    for (let i = low + h; i < high; i += 1) {
      for (let j = i; j >= low + h && less(array[j], array[j - h], compare); j -= h) {
        swap(array, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }
};

module.exports = sort;
