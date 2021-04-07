const { search, repeat } = require('../../lib');

search.repeat = repeat;

const searhes = ['binary', 'binaryFloor', 'binaryCeiling'];

let searched = null;
let array = [];
let expected = {};

const init = (start = 105, end = 115) => {
  const output = [];
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(i));
  }
  return output;
};

describe.each(searhes)('%s search', (name) => {
  beforeAll(() => {
    searched = search[name];
    array = init();
    expected = {
      binary: {
        leftEdge: 0,
        rightEdge: 10,
        leftTarget: 2,
        rightTarget: 8,
        leftOut: -1,
        rightOut: -1,
      },
      binaryFloor: {
        leftEdge: -1,
        rightEdge: 9,
        leftTarget: 1,
        rightTarget: 7,
        leftOut: -1,
        rightOut: 10,
      },
      binaryCeiling: {
        leftEdge: 1,
        rightEdge: 11,
        leftTarget: 3,
        rightTarget: 9,
        leftOut: 0,
        rightOut: 11,
      },
      repeat: {
        leftEdge: 0,
        rightEdge: 10,
        leftTarget: 2,
        rightTarget: 8,
        leftOut: -1,
        rightOut: -1,
      },
    };
  });

  test('should return correct index for the left edge item searched', () => {
    const target = 'i';
    const result = expected[name].leftEdge;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct index for the right edge item searched', () => {
    const target = 's';
    const result = expected[name].rightEdge;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct index for the item searched', () => {
    const target = 'k';
    const result = expected[name].leftTarget;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct index for the item searched', () => {
    const target = 'q';
    const result = expected[name].rightTarget;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct index for out of bounds left edge item searched', () => {
    const target = 'a';
    const result = expected[name].leftOut;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });

  test('should return correct index for out of bounds right edge item searched', () => {
    const target = 'z';
    const result = expected[name].rightOut;
    // array = ijklmnopqrs
    expect(searched(array, target)).toBe(result);
  });
});
