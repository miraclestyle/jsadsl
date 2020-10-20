const sort = require('../../lib/sort');

describe('shuffle', () => {
  test('should randomize an empty array', () => {
    const array = [];
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array with single element', () => {
    const array = [1];
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array', () => {
    const array = [1, 2, 3, 4, 5];
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should randomize a sorted array of 20,000 items', () => {
    const n = 20000;
    const array = [];
    for (let i = 0; i < n; i += 1) {
      array.push(i + 1);
    }
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });
});
