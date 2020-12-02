const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const more = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) > 0;
};

const equal = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) === 0;
};

module.exports.defaultCompare = defaultCompare;
module.exports.less = less;
module.exports.more = more;
module.exports.equal = equal;
