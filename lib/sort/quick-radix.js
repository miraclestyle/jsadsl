const { swap } = require('../util');

const defaultTransform = (value, index) => (
  index < value.length ? value.charCodeAt(index) : -1
);

const quicksort = (array, transform, low, high, index) => {
  if (high <= low) return;
  let left = low;
  let right = high;
  let current = low + 1;
  const pivot = transform(array[low], index);
  while (current <= right) {
    const char = transform(array[current], index);
    if (char < pivot) {
      swap(array, current, left);
      current += 1;
      left += 1;
    } else if (char > pivot) {
      swap(array, current, right);
      right -= 1;
    } else {
      current += 1;
    }
  }
  quicksort(array, transform, low, left - 1, index);
  if (pivot >= 0) quicksort(array, transform, left, right, index + 1);
  quicksort(array, transform, right + 1, high, index);
};

const sort = (array, transform = defaultTransform) => {
  quicksort(array, transform, 0, array.length - 1, 0);
};

module.exports = sort;
