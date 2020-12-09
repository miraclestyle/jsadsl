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
  for (let i = 0; i < array.length; i += 1) {
    let min = i;
    for (let j = i; j < array.length; j += 1) {
      if (less(array[j], array[min], compare)) min = j;
    }
    swap(array, i, min);
  }
};

module.exports = sort;
