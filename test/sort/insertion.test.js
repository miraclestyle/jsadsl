const sort = require('../../lib/sort');

describe('insertion sort', () => {
  test('should sort a single element array', () => {
    const array = [1];
    sort.insertion(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should not unsort a sorted array', () => {
    const array = [1, 2, 3, 4, 5];
    sort.insertion(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should sort an array', () => {
    const array = [5, 3, 1, 4, 2];
    sort.insertion(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should partialy sort an array with custom range', () => {
    const array = [5, 3, 1, 4, 2];
    sort.insertion(array, undefined, 0, 2);
    expect(sort.isSorted(array, undefined, 0, 2)).toBe(true);
  });

  test('should sort an array in descending order', () => {
    const array = [5, 3, 1, 4, 2];
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    sort.insertion(array, compare);
    expect(sort.isSorted(array, compare)).toBe(true);
  });

  test('should sort a randomized array of 20,000 items', () => {
    const n = 20000;
    const array = [];
    for (let i = 0; i < n; i += 1) {
      array.push(sort.util.randomInt(i, n));
    }
    sort.insertion(array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
