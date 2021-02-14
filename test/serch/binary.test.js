const { search } = require('../../lib');

let array = [];

const init = (start = 105, end = 115) => {
  const output = [];
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(i));
  }
  return output;
};

describe('binary', () => {
  beforeEach(() => {
    array = init();
  });

  test('should return correct index for the left edge item searched', () => {
    const target = 'i';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(0);
  });

  test('should return correct index for the right edge item searched', () => {
    const target = 's';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(10);
  });

  test('should return correct index for the item searched', () => {
    const target = 'k';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(2);
  });

  test('should return correct index for the item searched', () => {
    const target = 'q';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(8);
  });

  test('should return correct index for out of bounds left edge item searched', () => {
    const target = 'a';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(-1);
  });

  test('should return correct index for out of bounds right edge item searched', () => {
    const target = 'z';
    // array = ijklmnopqrs
    expect(search.binary(array, target)).toBe(-1);
  });
});
