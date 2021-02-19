const { ds } = require('../../lib');

const structures = ['separateChainingHashTable', 'linearProbingHashTable'];
let ht = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    ht = ds[name]();
  });

  test('should report empty for an empty hash table', () => {
    expect(ht.empty()).toBe(true);
  });

  test('should report size of 0 for an empty hash table', () => {
    expect(ht.size()).toBe(0);
  });

  test('should add one item to an empty hash table', () => {
    ht.put('one hundred', 100);
    expect(ht.size()).toBe(1);
  });

  test('should add two items to an empty hash table', () => {
    ht.put('two', 2);
    ht.put('one', 1);
    expect(ht.contains('one')).toBe(true);
    expect(ht.contains('two')).toBe(true);
  });

  test('should update an added item in a hash table', () => {
    ht.put('one', 3);
    ht.put('one', 2);
    ht.put('one', 1);
    expect(ht.contains('one')).toBe(true);
    expect(ht.get('one')).toBe(1);
    expect(ht.empty()).toBe(false);
    expect(ht.size()).toBe(1);
  });

  test('should report non-empty for a hash table with one item', () => {
    ht.put('one hundred', 100);
    expect(ht.empty()).toBe(false);
  });

  test('should report size of 1 for a hash table with one item', () => {
    ht.put('one hundred', 100);
    expect(ht.size()).toBe(1);
  });

  test('should add multiple items to an empty hash table', () => {
    for (let i = 1; i <= 10; i += 1) {
      ht.put((i * 10).toString(), i * 10);
    }
    for (let i = 10; i <= 100; i += 10) {
      expect(ht.contains(i.toString())).toBe(true);
      expect(ht.get(i.toString())).toBe(i);
    }
  });

  test('should not remove an item from an empty hash table', () => {
    ht.remove('one hundred');
    expect(ht.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty hash table', () => {
    ht.put('one hundred', 100);
    ht.remove('one hundred');
    expect(ht.empty()).toBe(true);
  });

  test('should remove an item from a non-empty hash table', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      ht.put((i * 10).toString(), i * 10);
      refSet.add((i * 10).toString());
    }
    for (let i = 10; i <= 100; i += 10) {
      expect(ht.contains(i.toString())).toBe(true);
    }
    ht.remove('60');
    refSet.delete('60');
    refSet.forEach((value) => {
      expect(ht.contains(value)).toBe(true);
    });
  });

  test('should remove multiple items from a non-empty hash table', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      ht.put((i * 10).toString(), i * 10);
      refSet.add((i * 10).toString());
    }
    for (let i = 10; i <= 100; i += 10) {
      expect(ht.contains(i.toString())).toBe(true);
    }
    ht.remove('50');
    ht.remove('70');
    ht.remove('30');
    ht.remove('10');
    ht.remove('100');
    refSet.delete('50');
    refSet.delete('70');
    refSet.delete('30');
    refSet.delete('10');
    refSet.delete('100');
    refSet.forEach((value) => {
      expect(ht.contains(value)).toBe(true);
    });
  });

  test('should remove all items from a non-empty hash table', () => {
    for (let i = 1; i <= 10; i += 1) {
      ht.put((i * 10).toString(), i * 10);
    }
    for (let i = 10; i <= 100; i += 10) {
      expect(ht.contains(i.toString())).toBe(true);
    }
    for (let i = 1; i <= 10; i += 1) {
      ht.remove((i * 10).toString());
    }
    expect(ht.empty()).toBe(true);
  });

  test('should iterate over multiple items in a non-empty hash table', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      ht.put((i * 10).toString(), i * 10);
      refSet.add((i * 10).toString());
    }
    ht.forEach((key) => {
      expect(refSet.has(key)).toBe(true);
    });
  });
});
