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

const more = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) > 0;
};

const sink = (array, compare, start, end) => {
  let parent = start;
  let child = parent * 2 + 1;
  while (child <= end) {
    if (child + 1 <= end && more(array[child + 1], array[child], compare)) {
      child += 1;
    }
    if (more(array[parent], array[child], compare)) break;
    swap(array, parent, child);
    parent = child;
    child = parent * 2 + 1;
  }
};

const sort = (array, compare) => {
  let end = array.length - 1;
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    sink(array, compare, i, end);
  }
  while (end > 0) {
    swap(array, 0, end);
    end -= 1;
    sink(array, compare, 0, end);
  }
};

module.exports = sort;
