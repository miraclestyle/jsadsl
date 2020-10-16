const { swap } = require('./util');

const randomIntRange = (end, start = 0) => start + Math.ceil(Math.random() * (end - start));

const shuffle = (array) => {
  const last = array.length - 1;
  for (let i = 0; i < last - 1; i += 1) {
    const r = randomIntRange(last, i + 1);
    swap(array, i, r);
  }
};

module.exports.randomIntRange = randomIntRange;
module.exports.shuffle = shuffle;
