const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const sort = (array, compare, low = 0, high = array.length) => {
  let sorted = false;
  let end = high;
  while (!sorted) {
    sorted = true;
    for (let i = low; i < end - 1; i += 1) {
      if (less(array[i + 1], array[i], compare)) {
        sorted = false;
        swap(array, i, i + 1);
      }
    }
    end -= 1;
  }
};

module.exports = sort;
