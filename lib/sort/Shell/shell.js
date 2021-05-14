const { swap, less } = require('../util');

const sort = (array, compare) => {
  const n = array.length;
  let h = 1;
  while (h < n / 3) h = 3 * h + 1;
  while (h >= 1) {
    for (let i = h; i < n; i += 1) {
      for (let j = i; j >= h && less(array[j], array[j - h], compare); j -= h) {
        swap(array, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }
  return array;
};

module.exports = sort;
