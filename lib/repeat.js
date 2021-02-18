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

const random = (low, high) => (low + Math.floor((high - low) * Math.random()));

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = random(i, array.length);
    swap(array, i, r);
  }
};

const qs = (array, compare, low, high) => {
  if (high <= low) return;
  const pivot = array[low];
  let left = low;
  let right = high;
  let current = low;
  while (current <= right) {
    const cmp = compare(array[current], pivot);
    if (cmp < 0) {
      swap(array, current, left);
      current += 1;
      left += 1;
    } else if (cmp > 0) {
      swap(array, current, right);
      right -= 1;
    } else {
      current += 1;
    }
  }
  qs(array, compare, low, left - 1);
  qs(array, compare, right + 1, high);
};

const sort = (array, compare = defaultCompare) => {
  shuffle(array);
  qs(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
