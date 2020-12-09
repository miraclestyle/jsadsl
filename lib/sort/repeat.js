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
  const n = array.length;
  let h = 1;
  while (h < n / 3) h = h * 3 + 1;
  while (h >= 1) {
    for (let i = h; i < n; i += 1) {
      let j = i;
      while (j >= h && less(array[j], array[j - h], compare)) {
        swap(array, j, j - h);
        j -= h;
      }
    }
    h = Math.floor(h / 3);
  }
};

module.exports = sort;
