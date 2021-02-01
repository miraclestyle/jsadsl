const { sort, util, repeat } = require('../../lib');

sort.repeat = repeat;

const sorts = ['keyIndexCounting', 'lsd', 'msd', 'quickRadix'];
const single = new Set(['keyIndexCounting']);
const fixed = new Set(['lsd']);
const variable = new Set(['msd', 'quickRadix', 'repeat']);
let array = [];

const init = (count = 100, w = 5) => {
  const output = [];
  for (let i = 0; i < count; i += 1) {
    let str = '';
    let width = w;
    width = w === -1 ? util.randomInt(1, 10) : w;
    for (let j = 0; j < width; j += 1) {
      const r = util.randomInt(97, 123);
      str += String.fromCharCode(r);
    }
    output.push(str);
  }
  return output;
};

describe.each(sorts)('%s sort', (name) => {
  beforeEach(() => {
    if (single.has(name)) array = init(100, 1);
    if (variable.has(name)) array = init(100, -1);
    if (fixed.has(name)) array = init();
  });

  test('should sort a single element array', () => {
    if (single.has(name)) array = init(1, 1);
    if (variable.has(name)) array = init(1, -1);
    if (fixed.has(name)) array = init(1);
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

  xtest('should sort an array in descending order', () => {
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    const singleTransform = (value, index) => {
      if (index >= value.length) return -1;
      const reference = ('z').charCodeAt(0);
      const code = value.charCodeAt(index);
      return reference - code;
    };
    const msdTransform = (value, index) => {
      const reference = ('z').charCodeAt(0);
      const min = ('a').charCodeAt(0);
      const overflow = reference - min;
      if (index >= value.length) return overflow + 1;
      const code = value.charCodeAt(index);
      return reference - code;
    };
    const quickRadixTransform = (value, index) => {
      const reference = ('z').charCodeAt(0);
      if (index >= value.length) return reference + 1;
      const code = value.charCodeAt(index);
      return reference - code;
    };
    let transform;
    if (single.has(name)) transform = singleTransform;
    if (fixed.has(name)) transform = singleTransform;
    if (variable.has(name)) transform = msdTransform;
    if (name === 'quickRadix') transform = quickRadixTransform;
    sort[name](array, transform);
    expect(sort.isSorted(array, compare)).toBe(true);
  });

  test('should sort a randomized array of 16,000 items', () => {
    if (single.has(name)) array = init(16000, 1);
    if (variable.has(name)) array = init(16000, -1);
    if (fixed.has(name)) array = init(16000);
    sort[name](array);
    expect(sort.isSorted(array)).toBe(true);
  });
});
