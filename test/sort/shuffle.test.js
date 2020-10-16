const sort = require('../../lib/sort');

describe('shuffle', () => {
  test('should randomize a sorted array', () => {
    const sorted = [1, 2, 3, 4, 5];
    sort.shuffle.shuffle(sorted);
    console.log(sorted);
    expect(sort.util.isSorted(sorted)).toBeFalsy();
  });
});
