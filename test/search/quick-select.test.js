const { search, repeat, sort } = require('../../lib');

search.repeat = repeat;

const searhes = ['quickSelect', 'repeat'];

let searched = null;
let array = [];
let sorted = [];

const init = (random = true, start = 105, end = 115) => {
  const output = [];
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(i));
  }
  if (random) sort.shuffle(output);
  return output;
};

describe.each(searhes)('%s search', (name) => {
  beforeAll(() => {
    searched = search[name];
    array = init();
    sorted = init(false);
  });

  test('should return correct value for the left edge index searched', () => {
    const target = 0;
    const result = sorted[0];
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct value for the right edge index searched', () => {
    const target = 10;
    const result = sorted[10];
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct value for the kth item searched', () => {
    const target = 2;
    const result = sorted[2];
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct value for the kth item searched', () => {
    const target = 8;
    const result = sorted[8];
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return null for out of bounds left edge index searched', () => {
    const target = -8;
    const result = null;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return null for out of bounds right edge index searched', () => {
    const target = 17;
    const result = null;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });
});
