const sort = require('../../lib/sort');

describe('bubble sort', () => {
  test('should sort a single element array', () => {
    const array = [1];
    sort.bubble(array);
    expect(sort.isSorted(array)).toBeTruthy();
  });

  test('should not unsort a sorted array', () => {
    const array = [1, 2, 3, 4, 5];
    sort.bubble(array);
    expect(sort.isSorted(array)).toBeTruthy();
  });

  test('should sort an array', () => {
    const array = [5, 3, 1, 4, 2];
    sort.bubble(array);
    expect(sort.isSorted(array)).toBeTruthy();
  });

  test('should sort an array in descending order', () => {
    const array = [5, 3, 1, 4, 2];
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    sort.bubble(array, compare);
    expect(sort.isSorted(array, compare)).toBeTruthy();
  });
});
