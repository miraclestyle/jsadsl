const {
  describe,
  expect,
  test,
  beforeEach,
} = require('@jest/globals');

const { ds } = require('../../lib');

const structures = ['linked', 'array'];
let bag = null;

describe.each(structures)('%s', (type) => {
  beforeEach(()=> {
    bag = ds.Bag(type);
  });

  test('should report empty for an empty bag', () => {
    expect(bag.isEmpty()).toBe(true);
  });

  test('should report size of 0 for an empty bag', () => {
    expect(bag.size()).toBe(0);
  });

  test('should not iterate over items in an empty bag', () => {
    const items = [];
    bag.forEach((value) => {
      items.push(value);
    });
    expect(items.length).toBe(0);
  });

  test('should report non-empty for a bag with one item', () => {
    bag.add(100);
    expect(bag.isEmpty()).toBe(false);
  });

  test('should report size of 1 for a bag with one item', () => {
    bag.add(100);
    expect(bag.size()).toBe(1);
  });

  test('should iterate over multiple items in a bag', () => {
    for (let i = 1; i <= 10; i += 1) {
      bag.add(i * 10);
    }
    let i = 100;
    bag.forEach((value) => {
      expect(value).toBe(i);
      i -= 10;
    });
  });
});
