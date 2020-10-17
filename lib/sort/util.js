const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const randomIntRange = (low, high) => {
  const start = high === undefined ? 0 : low;
  const end = high === undefined ? low : high;
  return start + Math.ceil(Math.random() * (end - start));
};

const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

module.exports.defaultCompare = defaultCompare;
module.exports.randomIntRange = randomIntRange;
module.exports.swap = swap;
