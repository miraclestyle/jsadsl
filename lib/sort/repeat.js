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

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = i + Math.floor((array.length - i) * Math.random());
    swap(array, i, r);
  }
};

const quicksort = (array, compare, low, high) => {
  if (high <= low) return;
  let left = low;
  let right = high;
  let current = low;
  const pivot = array[low];
  while (current <= right) {
    const cmp = compare(array[current], pivot);
    if (cmp < 0) {
      swap(array, current, left);
      left += 1;
      current += 1;
    } else if (cmp > 0) {
      swap(array, current, right);
      right -= 1;
    } else {
      current += 1;
    }
  }
  quicksort(array, compare, low, left - 1);
  quicksort(array, compare, right + 1, high);
};

const sort = (array, compare = defaultCompare) => {
  shuffle(array);
  quicksort(array, compare, 0, array.length - 1);
};

module.exports = sort;
