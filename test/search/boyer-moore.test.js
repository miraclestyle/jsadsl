const {
  search,
  repeat,
  sort,
  util,
} = require('../../lib');

search.repeat = repeat;

const searhes = ['boyerMoore'];

let searched = null;
let array = [];
let sorted = [];

const init = (start = 105, end = 115) => {
  const output = [];
  const majority = util.randomInt(start, end + 1);
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(majority));
  }
  for (let i = start; i <= end; i += 1) {
    output.push(String.fromCharCode(i));
  }
  return output;
};

describe.each(searhes)('%s search', (name) => {
  beforeAll(() => {
    searched = search[name];
    const source = init();
    array = sort.shuffle(source.slice());
    sorted = sort.insertion(source.slice());
  });

  test('should return correct value', () => {
    const result = sorted[Math.ceil(sorted.length / 2)];
    // array = ijklmnopqrs
    expect(searched(array)).toBe(result);
  });

  test('should return correct value', () => {
    array = [];
    const result = null;
    // array = ijklmnopqrs
    expect(searched(array)).toBe(result);
  });
});
