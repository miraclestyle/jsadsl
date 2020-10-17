const sort = require('../../lib/sort');

describe('isSorted', () => {
  test('shoud return true for an empty array', () => {
    const empty = [];
    expect(sort.isSorted(empty)).toBeTruthy();
  });

  test('shoud return true for a single element array', () => {
    const single = [1];
    expect(sort.isSorted(single)).toBeTruthy();
  });

  test('shoud return true for a sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    expect(sort.isSorted(sorted)).toBeTruthy();
  });

  test('shoud return false for an unsorted array', () => {
    const unsorted = [5, 2, 3, 1, 4];
    expect(sort.isSorted(unsorted)).toBeFalsy();
  });

  test('should return true for a partially sorted array with custom range', () => {
    const partial = [1, 2, 3, 5, 4];
    expect(sort.isSorted(partial, undefined, 0, 2)).toBeTruthy();
  });

  test('should return false for a reverse sorted array', () => {
    const sortedDesc = [5, 4, 3, 2, 1];
    expect(sort.isSorted(sortedDesc)).toBeFalsy();
  });
  
  test('should return true for a reverse sorted array with custom comparison function', () => {
    const sortedDesc = [5, 4, 3, 2, 1];
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    expect(sort.isSorted(sortedDesc, compare)).toBeTruthy();
  });
});
