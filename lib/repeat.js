const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const quick = (array, compare, low, high) => {
  if (low >= high) return;
  const pivot = array[low];
  let left = low;
  let right = high;
  let current = low;
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
  quick(array, compare, low, left - 1);
  quick(array, compare, right + 1, high);
};

const random = (low, high) => (low + Math.floor(Math.random() * (high - low)));

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = random(i, array.length);
    swap(array, i, r);
  }
};

const sort = (array, compare = defaultCompare) => {
  shuffle(array);
  quick(array, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
