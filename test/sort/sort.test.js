const sort = require('../../lib/sort');
const util = require('../../lib/util');

const sorts = ['bubble', 'selection', 'insertion', 'shell', 'heap', 'merge', 'bottomUpMerge', 'quick', 'threeWayQuick', 'repeat'];
let array = [];

const init = (count = 100) => {
  const output = [];
  for (let i = 0; i < count; i += 1) {
    output.push(util.randomInt(i, count));
  }
  return output;
};

describe.each(sorts)('%s sort', (name) => {
  beforeEach(() => {
    array = init();
  });

  test('should sort a single element array', () => {
    array = init(1);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should not unsort a sorted array', () => {
    array = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
      90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ];
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should sort an array', () => {
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should sort an array in descending order', () => {
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    sort[name](array, compare);
    expect(sort.isSorted(array, compare)).toBe(true);
  });

  test('should sort a randomized array of 16,000 items', () => {
    array = init(16000);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
