const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const randomInt = (low, high) => {
  const start = typeof high === 'number' ? low : 0;
  const end = typeof high === 'number' ? high : low;
  const variable = Math.random();
  const coefficient = end - start;
  const product = coefficient * variable;
  const floor = Math.floor(product);
  const result = start + floor;
  return result;
};

const shuffle = (array, low = 0, high = array.lenght) => {
  for (let i = low; i < high; i += 1) {
    const r = randomInt(i, high);
    swap(array, i, r);
  }
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

const partition = (array, compare, low, high) => {
  const pivot = array[low];
  let left = low;
  let right = high + 1;
  while (true) {
    while (true) {
      left += 1;
      if (left >= high || less(pivot, array[left], compare)) {
        break;
      }
    }
    while (true) {
      right -= 1;
      if (right <= low || less(array[right], pivot, compare)) {
        break;
      }
    }
    if (right <= left) {
      break;
    }
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

const sort = (array, compare, low = 0, high = array.length) => {
  shuffle(array, low, high);
  quick(array, compare, low, high - 1);
};

module.exports = sort;
