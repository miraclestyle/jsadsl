const { swap, defaultCompare } = require('../util');
const shuffle = require('./shuffle');

const divide = (array, compare, low, high) => {
  if (low >= high) return;
  const pivot = array[low];
  let i = low;
  let lt = low;
  let gt = high;
  while (i <= gt) {
    const cp = compare(array[i], pivot);
    if (cp < 0) {
      swap(array, i, lt);
      i += 1;
      lt += 1;
    } else if (cp > 0) {
      swap(array, i, gt);
      gt -= 1;
    } else {
      i += 1;
    }
  }
  divide(array, compare, low, lt - 1);
  divide(array, compare, gt + 1, high);
};

const sort = (array, compare = defaultCompare, low = 0, high = array.length) => {
  shuffle(array, low, high);
  divide(array, compare, low, high - 1);
  return array;
};

module.exports = sort;
