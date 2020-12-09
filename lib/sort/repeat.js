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

const sort = (array, compare) => {
  let end = array.length - 1;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < end; i += 1) {
      if (less(array[i + 1], array[i], compare)) {
        swap(array, i, i + 1);
        sorted = false;
      }
    }
    end -= 1;
  }
};

module.exports = sort;
