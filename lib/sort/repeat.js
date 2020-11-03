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
  for (let i = low; i < high; i += 1) {
    let min = i;
    for (let j = i + 1; j < high; j += 1) {
      if (less(array[j], array[min], compare)) {
        min = j;
      }
    }
    swap(array, i, min);
  }
};

module.exports = sort;
