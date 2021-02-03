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

const partition = (array, compare, low, high) => {
  let left = low;
  let right = high + 1;
  const pivot = array[low];
  while (true) {
    left += 1;
    right -= 1;
    while (left < high && less(array[left], pivot, compare)) left += 1;
    while (right > low && less(pivot, array[right], compare)) right -= 1;
    if (right <= left) break;
    swap(array, left, right);
  }
  swap(array, low, right);
  return right;
};

const random = (low, high) => (low + Math.floor(Math.random() * (high - low)));

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = random(i, array.length);
    swap(array, i, r);
  }
};

const qs = (array, k, compare) => {
  shuffle(array);
  let low = 0;
  let high = array.length - 1;
  while (high > low) {
    const mid = partition(array, compare, low, high);
    if (k < mid) {
      high = mid - 1;
    } else if (k > mid) {
      low = mid + 1;
    } else {
      return array[k];
    }
  }
  return array[k];
};
module.exports = qs;
