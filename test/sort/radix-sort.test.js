const sort = require('../../lib/sort');
const util = require('../../lib/util');

const sorts = ['keyIndexCounting', 'lsd', 'msd', 'repeat'];
const kic = new Set(['keyIndexCounting']);
let array = [];
const n = 20;
const s = 5;

const init = (low = 0, high = n, w = s) => {
  const output = [];
  for (let i = low; i < high; i += 1) {
    let str = '';
    for (let j = 0; j < w; j += 1) {
      const r = util.randomInt(97, 123);
      str += String.fromCharCode(r);
    }
    output.push(str);
  }
  return output;
};

describe.each(sorts)('%s sort', (name) => {
  beforeEach(() => {
    if (kic.has(name)) {
      array = init(0, n, 1);
    } else {
      array = init();
    }
  });

  test('should sort a single element array', () => {
    if (kic.has(name)) {
      array = init(1, 2, 1);
    } else {
      array = init(1, 2);
    }
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

  test('should sort an array in descending order', () => {
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    const transform = (value, index) => {
      if (index >= value.length) return -1;
      const reference = ('z').charCodeAt(0);
      const code = value.charCodeAt(index);
      return reference - code;
    };
    sort[name](array, transform);
    expect(sort.isSorted(array, compare)).toBe(true);
  });

  test('should sort a randomized array of 16,000 items', () => {
    if (kic.has(name)) {
      array = init(0, 16000, 1);
    } else {
      array = init(0, 16000);
    }
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
