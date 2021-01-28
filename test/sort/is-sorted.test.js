const { sort } = require('../../lib');

let array = [];

const init = (count = 100, reverse = false) => {
  const output = [];
  if (reverse) {
    for (let i = count - 1; i >= 0; i -= 1) {
      output.push(i);
    }
  } else {
    for (let i = 0; i < count; i += 1) {
      output.push(i);
    }
  }
  return output;
};

describe('isSorted', () => {
  beforeEach(() => {
    array = init();
  });

  test('should return true for an empty array', () => {
    array = init(0);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should return true for a single element array', () => {
    array = init(1);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should return true for a sorted array', () => {
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should return false for an unsorted array', () => {
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a partially sorted array with custom range', () => {
    expect(sort.isSorted(array, undefined, 3, 8)).toBe(true);
  });

  test('should return false for a reverse sorted array', () => {
    array = init(100, true);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a reverse sorted array with custom comparison function', () => {
    array = init(100, true);
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    expect(sort.isSorted(array, compare)).toBe(true);
  });
});
