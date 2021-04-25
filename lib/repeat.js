const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => (compare(a, b) < 0);

const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const partition = (array, compare, low, high) => {
  let left = low;
  let right = high + 1;
  const pivot = low;
  while (true) {
    left += 1;
    right -= 1;
    while (left < high && less(array[left], array[pivot], compare)) left += 1;
    while (right > low && less(array[pivot], array[right], compare)) right -= 1;
    if (right <= left) break;
    swap(array, left, right);
  }
  swap(array, pivot, right);
  return right;
};

const search = (array, k, compare = defaultCompare) => {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = partition(array, compare, low, high);
    if (k < mid) {
      high = mid - 1;
    } else if (k > mid) {
      low = mid + 1;
    } else {
      return array[k];
    }
  }
  return null;
};

module.exports = search;
