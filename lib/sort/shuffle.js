const { swap, randomInt } = require('./util');

const shuffle = (array) => {
  const end = array.length;
  for (let i = 0; i < end; i += 1) {
    const r = randomInt(i, end);
    swap(array, i, r);
  }
};

module.exports = shuffle;
