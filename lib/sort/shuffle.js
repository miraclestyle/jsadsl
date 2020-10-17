const { swap, randomIntRange } = require('./util');

const shuffle = (array) => {
  const last = array.length - 1;
  for (let i = 0; i < last; i += 1) {
    const r = randomIntRange(i, last);
    swap(array, i, r);
  }
};

module.exports = shuffle;
