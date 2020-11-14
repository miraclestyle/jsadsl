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

const sink = (array, compare, low, start, end) => {
  let parent = start;
  let child = ((parent - low) * 2) + 1 + low;
  while (child <= end) {
    if (child + 1 <= end && less(array[child], array[child + 1], compare)) {
      child += 1;
    }
    if (less(array[parent], array[child], compare)) {
      swap(array, parent, child);
      parent = child;
      child = ((parent - low) * 2) + 1 + low;
    } else {
      break;
    }
  }
};

const sort = (array, compare, low = 0, high = array.length) => {
  const m = low + Math.floor((high - low) / 2);
  let end = high - 1;
  for (let i = m; i >= low; i -= 1) {
    sink(array, compare, low, i, end);
  }
  while (end >= low) {
    swap(array, low, end);
    end -= 1;
    sink(array, compare, low, low, end);
  }
};

module.exports = sort;
