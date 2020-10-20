const sort = require('../../lib/sort');

describe('isSorted', () => {
  test('shoud return true for an empty array', () => {
    const array = [];
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return true for a single element array', () => {
    const array = [1];
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return true for a sorted array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(sort.isSorted(array)).toBe(true);
  });

  test('shoud return false for an unsorted array', () => {
    const array = [5, 2, 3, 1, 4];
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a partially sorted array with custom range', () => {
    const array = [1, 2, 3, 5, 4];
    expect(sort.isSorted(array, undefined, 0, 2)).toBe(true);
  });

  test('should return false for a reverse sorted array', () => {
    const array = [5, 4, 3, 2, 1];
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should return true for a reverse sorted array with custom comparison function', () => {
    const array = [5, 4, 3, 2, 1];
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    expect(sort.isSorted(array, compare)).toBe(true);
  });
});
