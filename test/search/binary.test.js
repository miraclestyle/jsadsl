const { search, repeat } = require('../../lib');

search.repeat = repeat;

const searhes = ['binary', 'repeat'];

let array = [];

const init = (start = 105, end = 115) => {
  const output = [];
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(i));
  }
  return output;
};

describe.each(searhes)('%s search', (name) => {
  beforeEach(() => {
    searched = search[name];
    array = init();
  });

  test('should return correct index for the left edge item searched', () => {
    const target = 'i';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(0);
  });

  test('should return correct index for the right edge item searched', () => {
    const target = 's';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(10);
  });

  test('should return correct index for the item searched', () => {
    const target = 'k';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(2);
  });

  test('should return correct index for the item searched', () => {
    const target = 'q';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(8);
  });

  test('should return correct index for out of bounds left edge item searched', () => {
    const target = 'a';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(-1);
  });

  test('should return correct index for out of bounds right edge item searched', () => {
    const target = 'z';
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(-1);
  });
});
