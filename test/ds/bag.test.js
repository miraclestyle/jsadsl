const { ds } = require('../../lib');

const structures = ['linkedBag', 'arrayBag'];
let bag = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    bag = ds[name]();
  });

  test('should report empty for an empty bag', () => {
    expect(bag.empty()).toBe(true);
  });

  test('should report size of 0 for an empty bag', () => {
    expect(bag.size()).toBe(0);
  });

  test('should add one item to an empty bag', () => {
    bag.insert(100);
    expect(bag.size()).toBe(1);
  });

  test('should add two items to an empty bag', () => {
    bag.insert(2);
    bag.insert(1);
    const set = new Set();
    bag.forEach((value) => set.add(value));
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
  });

  test('should report non-empty for a bag with one item', () => {
    bag.insert(100);
    expect(bag.empty()).toBe(false);
  });

  test('should report size of 1 for a bag with one item', () => {
    bag.insert(100);
    expect(bag.size()).toBe(1);
  });

  test('should add multiple items to an empty bag', () => {
    for (let i = 1; i <= 10; i += 1) {
      bag.insert(i * 10);
    }
    const set = new Set();
    bag.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
  });

  test('should not remove an item from an empty bag', () => {
    bag.remove(100);
    expect(bag.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty bag', () => {
    bag.insert(100);
    bag.remove(100);
    expect(bag.empty()).toBe(true);
  });

  test('should remove an item from a non-empty bag', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      bag.insert(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    bag.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    bag.remove(60);
    refSet.delete(60);
    set = new Set();
    bag.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove multiple items from a non-empty bag', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      bag.insert(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    bag.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    bag.remove(50);
    bag.remove(70);
    bag.remove(30);
    bag.remove(10);
    bag.remove(100);
    refSet.delete(50);
    refSet.delete(70);
    refSet.delete(30);
    refSet.delete(10);
    refSet.delete(100);
    set = new Set();
    bag.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove all items from a non-empty bag', () => {
    for (let i = 1; i <= 10; i += 1) {
      bag.insert(i * 10);
    }
    const set = new Set();
    bag.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    for (let i = 1; i <= 10; i += 1) {
      bag.remove(i * 10);
    }
    expect(bag.empty()).toBe(true);
  });

  test('should iterate over multiple items in a non-empty bag', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      bag.insert(i * 10);
      refSet.add(i * 10);
    }
    bag.forEach((value) => {
      expect(refSet.has(value)).toBe(true);
    });
  });
});
