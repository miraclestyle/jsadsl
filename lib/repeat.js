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

const less = (a, b, compare = defaultCompare) => (compare(a, b) < 0);

const sink = (array, start, end, compare) => {
  let parent = start;
  let child = parent * 2 + 1;
  while (child <= end) {
    if (child + 1 <= end && less(array[child], array[child + 1], compare)) {
      child += 1;
    }
    if (less(array[child], array[parent], compare)) break;
    swap(array, parent, child);
    parent = child;
    child = parent * 2 + 1;
  }
};

const sort = (array, compare) => {
  const n = array.length;
  let end = n - 1;
  for (let i = Math.floor(n / 2); i >= 0; i -= 1) {
    sink(array, i, end, compare);
  }
  while (end > 0) {
    swap(array, 0, end);
    end -= 1;
    sink(array, 0, end, compare);
  }
  return array;
};

module.exports = sort;
