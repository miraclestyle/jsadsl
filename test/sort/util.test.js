const sort = require('../../lib/sort');

describe('isSorted', () => {
  test('shoud return true for a sorted areray', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(sort.util.isSorted(sorted)).toBeTruthy();
  });

  test('shoud return false for an unsorted array', () => {
    const unsorted = [5, 2, 3, 1, 4];
    expect(sort.util.isSorted(unsorted)).toBeFalsy();
  });

  test('should return true for a reverse sorted array with custom comparison function', () => {
    const sortedDesc = [5, 4, 3, 2, 1];
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    expect(sort.util.isSorted(sortedDesc, compare)).toBeTruthy();
  });

  test('should return true for a partially sorted function with custom range', () => {
    const partial = [1, 2, 3, 5, 4];
    expect(sort.util.isSorted(partial, undefined, 0, 2)).toBeTruthy();
  });
});

describe('defaultCompare', () => {
  test('should return less than zero when "a" is less than "b"', () => {
    expect(sort.util.defaultCompare(1, 2) < 0).toBeTruthy();
  });

  test('should return zero when "a" equals to "b"', () => {
    expect(sort.util.defaultCompare(1, 1) === 0).toBeTruthy();
  });

  test('should return greater than zero when "a" is greater than "b"', () => {
    expect(sort.util.defaultCompare(2, 1) > 0).toBeTruthy();
  });
});
