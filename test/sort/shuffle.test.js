const sort = require('../../lib/sort');

describe('shuffle', () => {
  test('should randomize an empty array', () => {
    const empty = [];
    sort.shuffle(empty);
    expect(sort.isSorted(empty)).toBe(true);
  });

  test('should randomize a sorted array with single element', () => {
    const single = [1];
    sort.shuffle(single);
    expect(sort.isSorted(single)).toBe(true);
  });

  test('should randomize a sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    sort.shuffle(sorted);
    expect(sort.isSorted(sorted)).toBe(false);
  });
});
