const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const defultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defultCompare) => (compare(a, b) < 0);

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = i + Math.floor(Math.random() * (array.length - i));
    swap(array, i, r);
  }
};

const partition = (array, compare, low, high) => {
  const pivot = array[low];
  let left = low;
  let right = high + 1;
  while (true) {
    while (true) {
      left += 1;
      if (left >= high || less(pivot, array[left], compare)) break;
    }
    while (true) {
      right -= 1;
      if (right <= low || less(array[right], pivot, compare)) break;
    }
    if (right <= left) break;
    swap(array, left, right);
  }
  swap(array, low, right);
  return right;
};

const quicksort = (array, compare, low, high) => {
  if (high <= low) return;
  const mid = partition(array, compare, low, high);
  quicksort(array, compare, low, mid - 1);
  quicksort(array, compare, mid + 1, high);
};

const sort = (array, compare) => {
  shuffle(array);
  quicksort(array, compare, 0, array.length - 1);
};

module.exports = sort;
