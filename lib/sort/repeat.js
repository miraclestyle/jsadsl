const randomInt = (low, high) => (low + Math.floor(Math.random() * (high - low)));

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = randomInt(i, array.length);
    swap(array, i, r);
  }
};

const defaultComapre = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultComapre;
  return comp(a, b) < 0;
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

const quick = (array, compare, low, high) => {
  if (high <= low) return;
  const mid = partition(array, compare, low, high);
  quick(array, compare, low, mid - 1);
  quick(array, compare, mid + 1, high);
};

const sort = (array, compare) => {
  shuffle(array);
  quick(array, compare, 0, array.length - 1);
};

module.exports = sort;
