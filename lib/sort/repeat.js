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

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const randomInt = (low, high) => {
  const random = Math.random();
  const coefficient = (high - low);
  const result = low + Math.floor(coefficient * random);
  return result;
};

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = randomInt(i, array.length);
    swap(array, i, r);
  }
};

const partition = (array, compare, low, high) => {
  let left = low;
  let right = high + 1;
  while (true) {
    while (true) {
      left += 1;
      if (left >= high || less(array[low], array[left], compare)) break;
    }
    while (true) {
      right -= 1;
      if (right <= low || less(array[right], array[low], compare)) break;
    }
    if (right <= left) break;
    swap(array, left, right);
  }
  swap(array, right, low);
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
