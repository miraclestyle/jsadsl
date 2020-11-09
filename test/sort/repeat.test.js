const sort = require('../../lib/sort');

let array = [];
const n = 10;

const init = (low = 0, high = n) => {
  const output = [];
  for (let i = low; i < high; i += 1) {
    output.push(i);
  }
  return output;
};

describe('repeat', () => {
  beforeEach(() => {
    array = init();
  });

  test('should randomize an empty array', () => {
    array = init(0, 0);
    sort.repeat(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array with single element', () => {
    array = init(1, 2);
    sort.repeat(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array', () => {
    sort.repeat(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should partialy randomize a sorted array with custom range', () => {
    sort.repeat(array, 3, 8);
    expect(sort.isSorted(array, undefined, 3, 8)).toBe(false);
  });

  test('should randomize a sorted array of 10,000 items', () => {
    array = init(0, 10000);
    sort.repeat(array);
    expect(sort.isSorted(array)).toBe(false);
  });
});
