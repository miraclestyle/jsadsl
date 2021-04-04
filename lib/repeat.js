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

const random = (low, high) => (low + Math.floor((high - low) * Math.random()));

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = random(i, array.length);
    swap(array, i, r);
  }
};

const partition = (array, compare, low, high) => {
  let left = low;
  let right = high + 1;
  const mid = low;
  while (true) {
    left += 1;
    right -= 1;
    while (left < high && less(array[left], array[mid], compare)) left += 1;
    while (right > low && less(array[mid], array[right], compare)) right -= 1;
    if (left >= right) break;
    swap(array, left, right);
  }
  swap(array, mid, right);
  return right;
};

const quickSort = (array, compare, low, high) => {
  if (high <= low) return;
  const mid = partition(array, compare, low, high);
  quickSort(array, compare, low, mid - 1);
  quickSort(array, compare, mid + 1, high);
};

const sort = (array, compare) => {
  shuffle(array);
  quickSort(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
