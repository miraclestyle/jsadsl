const { swap, randomInt } = require('../util');

const shuffle = (array, low = 0, high = array.length) => {
  for (let i = low; i < high; i += 1) {
    const r = randomInt(i, high);
    swap(array, i, r);
  }
  return array;
};

module.exports = shuffle;
