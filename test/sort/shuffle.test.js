const { sort, repeat } = require('../../lib');

sort.shuffle = repeat;

let array = [];

const init = (count = 100) => {
  const output = [];
  for (let i = 0; i < count; i += 1) {
    output.push(i);
  }
  return output;
};

describe('shuffle', () => {
  beforeEach(() => {
    array = init();
  });

  test('should randomize an empty array', () => {
    array = init(0);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array with single element', () => {
    array = init(1);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test('should randomize a sorted array', () => {
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });

  test('should randomize a sorted array of 16,000 items', () => {
    array = init(16000);
    sort.shuffle(array);
    expect(sort.isSorted(array)).toBe(false);
  });
});
