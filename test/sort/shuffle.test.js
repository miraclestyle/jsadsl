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

describe('shuffle', () => {
  beforeEach(() => {
    array = init();
  });

  test('should randomize an empty array', () => {
    array = init(0, 0);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array with single element', () => {
    array = init(1, 2);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array', () => {
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should partialy randomize a sorted array with custom range', () => {
    sort.shuffle(array, 3, 8);
    expect(sort.isSorted(array, undefined, 3, 8)).toBe(false);
  });

  test('should randomize a sorted array of 20,000 items', () => {
    array = init(0, 20000);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });
});
