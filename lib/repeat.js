const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defaultCompare) => (compare(a, b) < 0);

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const sort = (array, compare) => {
  for (let i = 0; i < array.length; i += 1) {
    let min = i;
    for (let j = min; j < array.length; j += 1) {
      if (less(array[j], array[min], compare)) min = j;
    }
    swap(array, min, i);
  }
  return array;
};

module.exports = sort;
