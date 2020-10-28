const sort = require('../../lib/sort');

const sorts = ['keyIndexCounting'];
let array = [];
const n = 10;

const init = (low = 0, high = n) => {
  const output = [];
  for (let i = low; i < high; i += 1) {
    const r = sort.util.randomInt(97, 123);
    const char = String.fromCharCode(r);
    output.push(char);
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
    array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should sort an array', () => {
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should partialy sort an array with custom range', () => {
    sort[name](array, undefined, 0, 3, 8);
    expect(sort.isSorted(array, undefined, 3, 8)).toBe(true);
  });

  test('should sort an array in descending order', () => {
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    const transform = (value, index) => {
      const reference = ('z').charCodeAt(0);
      const code = value.charCodeAt(index);
      return reference - code;
    };
    sort[name](array, transform);
    expect(sort.isSorted(array, compare)).toBe(true);
  });

  test('should sort a randomized array of 10,000 items', () => {
    array = init(0, 10000);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
