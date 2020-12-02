const sort = require('../../lib/sort');
const util = require('../../lib/util');

const sorts = ['repeat'];
let array = [];
const n = 10;

const init = (low = 0, high = n) => {
  const output = [];
  for (let i = low; i < high; i += 1) {
    output.push(util.randomInt(i, n));
  }
  return output;
};

describe.each(sorts)('%s sort', (name) => {
  beforeEach(() => {
    array = init();
  });

  test('should sort a single element array', () => {
    array = init(1, 2);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should not unsort a sorted array', () => {
    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should sort an array', () => {
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should partialy sort an array with custom range', () => {
    sort[name](array, undefined, 3, 8);
    expect(sort.isSorted(array, undefined, 3, 8)).toBe(true);
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
    array = init(0, 16000);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
