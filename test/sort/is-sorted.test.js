const sort = require('../../lib/sort');

let array = [];
const n = 10;

const init = (low = 0, high = n, reverse = false) => {
  const output = [];
  if (reverse) {
    for (let i = high - 1; i >= low; i -= 1) {
      output.push(i);
    }
  } else {
    for (let i = low; i < high; i += 1) {
      output.push(i);
    }
  }
  return output;
};

describe('isSorted', () => {
  beforeEach(() => {
    array = init();
  });

  test('shoud return true for an empty array', () => {
    array = init(0, 0);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return true for a single element array', () => {
    array = init(1, 2);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return true for a sorted array', () => {
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return false for an unsorted array', () => {
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a partially sorted array with custom range', () => {
    expect(sort.isSorted(array, undefined, 0, 5)).toBe(true);
  });

  test('should return false for a reverse sorted array', () => {
    array = init(0, n, true);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a reverse sorted array with custom comparison function', () => {
    array = init(0, n, true);
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    expect(sort.isSorted(array, compare)).toBe(true);
  });
});
