const keyIndexCounting = require('./key-index-counting');

const sort = (array, transform, low = 0, high = array.length) => {
  let keyWidth = 0;
  for (let i = low; i < high; i += 1) {
    if (array[i].length > keyWidth) {
      keyWidth = array[i].length;
    }
  }
  for (let index = keyWidth - 1; index >= 0; index -= 1) {
    keyIndexCounting(array, transform, low, high, index);
  }
};

module.exports = sort;
