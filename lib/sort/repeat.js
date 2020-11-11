const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
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
  let end = high - 1;
  while (!sorted) {
    sorted = true;
    for (let i = low; i < end; i += 1) {
      if (less(array[i + 1], array[i], compare)) {
        swap(array, i, i + 1);
        sorted = false;
      }
    }
    end -= 1;
  }
};

module.exports = sort;
