const { sort, util, repeat } = require('../../lib');

sort.repeat = repeat;

const init = (count = 100, ordered = false) => {
  const output = [];
  if (ordered) {
    for (let i = 0; i < count; i += 1) {
      output.push(i);
    }
  } else {
    for (let i = 0; i < count; i += 1) {
      output.push(util.randomInt(i, count));
    }
  }
  return output;
};

const composeCases = (names, arrayConfigs) => {
  const output = [];
  for (let i = 0; i < names.length; i += 1) {
    for (let j = 0; j < arrayConfigs.length; j += 1) {
      output.push([names[i], ...arrayConfigs[j]]);
    }
  }
  return output;
};

const buildConfigs = () => {
  const names = ['bubble', 'selection', 'insertion', 'shell', 'heap', 'merge', 'bottomUpMerge', 'quick', 'threeWayQuick'];
  const configs = [
    ['should sort an empty array', 0, false],
    ['should sort an array of 1 item', 1, false],
    ['should sort a sorted array of 100 items', 100, true],
    ['should sort an unsorted array of 100 items', 100, false],
    ['should sort an unsorted array of 16,000 items', 16000, false],
  ];
  return composeCases(names, configs);
};

const configs = buildConfigs();
let sorted = null;
let array = [];

describe.each(configs)('%s sort', (name, description, size, ordered) => {
  beforeEach(() => {
    sorted = sort[name];
    array = init(size, ordered);
  });

  test(description, () => {
    sorted(array);
    expect(sort.isSorted(array)).toBe(true);
  });

  test(`${description} in descending order`, () => {
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    sorted(array, compare);
    expect(sort.isSorted(array, compare)).toBe(true);
  });
});
