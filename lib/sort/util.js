const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const randomInt = (low, high) => {
  const start = high === undefined ? 0 : low;
  const end = high === undefined ? low : high;
  const random = Math.random();
  const product = random * (end - start);
  const floor = Math.floor(product);
  const result = start + floor;
  return result;
};

const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const more = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) > 0;
};

module.exports.defaultCompare = defaultCompare;
module.exports.randomInt = randomInt;
module.exports.swap = swap;
module.exports.less = less;
module.exports.more = more;
