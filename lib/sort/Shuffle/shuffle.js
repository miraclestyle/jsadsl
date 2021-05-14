const { swap, randomInt } = require('../util');

const shuffle = (array, random = randomInt) => {
  const n = array.length;
  for (let i = 0; i < n; i += 1) {
    const r = random(i, n);
    swap(array, i, r);
  }
  return array;
};

module.exports = shuffle;
