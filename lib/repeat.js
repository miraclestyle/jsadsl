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
  const n = array.length;
  let h = 1;
  while (h < n / 3) h = h * 3 + 1;
  while (h > 0) {
    for (let i = h; i < n; i += 1) {
      for (let j = i; j >= h && less(array[j], array[j - h], compare); j -= h) {
        swap(array, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }
  return array;
};

module.exports = sort;
