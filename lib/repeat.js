const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const randomInt = (low, high) => (low + Math.floor((high - low) * Math.random()));

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = randomInt(i, array.length);
    swap(array, i, r);
  }
  return array;
};

const quickSort = (array, compare, low, high) => {
  if (low >= high) return;
  let left = low;
  let right = high;
  let current = low;
  const pivot = array[low];
  while (current <= right) {
    const cmp = compare(array[current], pivot);
    if (cmp < 0) {
      swap(array, left, current);
      left += 1;
      current += 1;
    } else if (cmp > 0) {
      swap(array, right, current);
      right -= 1;
    } else {
      current += 1;
    }
  }
  quickSort(array, compare, low, left - 1);
  quickSort(array, compare, right + 1, high);
};

const sort = (array, compare = defaultCompare) => {
  shuffle(array);
  quickSort(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
