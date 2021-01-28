const { ds, sort, util } = require('../../lib');

const structures = ['BST'];
let bst = null;
let arrays = {};

const generate = () => {
  const random = [];
  const sorted = [];
  const start = util.randomInt(0, 13);
  const end = util.randomInt(13, 26);
  const jump = util.randomInt(1, end - start);
  for (let i = 65 + start; i <= 65 + end; i += jump) {
    random.push(String.fromCharCode(i));
    sorted.push(String.fromCharCode(i));
  }
  sort.shuffle(random);
  return { random, sorted };
};

const populate = (tree, array) => {
  for (let i = 0; i < array.length; i += 1) {
    tree.put(array[i], array[i]);
  }
};

const printTree = (tree) => {
  const array = [];
  tree.forEach((node) => { array.push(node.key); });
  console.log(array);
};

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    bst = ds[name]();
  });

  test('should report 0 for the size method of an empty bst', () => {
    expect(bst.size()).toBe(0);
  });

  test('should report null for the get method of an empty bst', () => {
    expect(bst.get('A')).toBeNull();
  });

  test('should report null for the min method of an empty bst', () => {
    expect(bst.min()).toBeNull();
  });

  test('should report null for the max method of an empty bst', () => {
    expect(bst.max()).toBeNull();
  });

  test('should report null for the floor method of an empty bst', () => {
    expect(bst.floor('M')).toBeNull();
  });

  test('should report null for the ceiling method of an empty bst', () => {
    expect(bst.ceiling('M')).toBeNull();
  });

  test('should report 0 for the rank method of an empty bst', () => {
    expect(bst.rank('M')).toBe(0);
  });

  test('should report null for the select method of an empty bst', () => {
    expect(bst.select(13)).toBeNull();
  });

  test('should report 0 for the forEach method of an empty bst', () => {
    const array = [];
    const callback = jest.fn((node) => {
      array.push(node.key);
    });
    bst.forEach(callback);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('should correctly invoke the put method on an empty bst', () => {
    bst.put('A', 'some value');
    expect(bst.get('A')).toBe('some value');
  });

  test('should test the removeMin method on an empty bst', () => {
    bst.removeMin();
    expect(bst.min()).toBeNull();
  });

  test('should test the removeMax method on an empty bst', () => {
    bst.removeMax();
    expect(bst.max()).toBeNull();
  });

  test('should test the remove method on an empty bst', () => {
    const key = 'A';
    expect(bst.get(key)).toBeNull();
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });
});

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    bst = ds[name]();
    arrays = generate();
    populate(bst, arrays.random);
  });

  test('should test the size method of a non-empty bst', () => {
    const { length } = arrays.random;
    expect(bst.size()).toBe(length);
  });

  test('should test the get method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.get(key)).toBe(key);
  });

  test('should test the min method of a non-empty bst', () => {
    const index = 0;
    const key = arrays.sorted[index];
    expect(bst.min()).toBe(key);
  });

  test('should test the max method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = length - 1;
    const key = arrays.sorted[index];
    expect(bst.max()).toBe(key);
  });

  test('should test the floor method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.floor(key)).toBe(key);
  });

  test('should test the ceiling method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.ceiling(key)).toBe(key);
  });

  test('should test the floor method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const expectedKey = arrays.sorted[index];
    const searchKey = String.fromCharCode(expectedKey.charCodeAt(0) + 1);
    expect([expectedKey, searchKey]).toContain(bst.floor(searchKey));
  });

  test('should test the ceiling method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const expectedKey = arrays.sorted[index];
    const searchKey = String.fromCharCode(expectedKey.charCodeAt(0) - 1);
    expect([expectedKey, searchKey]).toContain(bst.ceiling(searchKey));
  });

  test('should test the rank method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.rank(key)).toBe(index);
  });

  test('should test the select method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.select(index)).toBe(key);
  });

  test('should put an existing key in a non-empty bst', () => {
    const index = 0;
    const key = arrays.sorted[index];
    bst.put(key, 'new value');
    expect(bst.get(key)).toBe('new value');
  });

  test('should test the removeMin method of a non-empty bst', () => {
    const index = 1;
    const min = arrays.sorted[index - 1];
    const key = arrays.sorted[index];
    bst.removeMin();
    if (bst.size() > 0) {
      expect(bst.get(min)).toBeNull();
      expect(bst.min()).toBe(key);
    } else {
      expect(bst.min()).toBeNull();
    }
  });

  test('should test the removeMax method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = length - 2;
    const max = arrays.sorted[index + 1];
    const key = arrays.sorted[index];
    bst.removeMax();
    if (bst.size() > 0) {
      expect(bst.get(max)).toBeNull();
      expect(bst.max()).toBe(key);
    } else {
      expect(bst.max()).toBeNull();
    }
  });

  test('should test the remove method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = Math.floor(length / 2);
    const key = arrays.sorted[index];
    expect(bst.get(key)).toBe(key);
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });

  test('should test the remove method of a non-empty bst', () => {
    const { length } = arrays.random;
    const index = 0;
    const key = arrays.random[index];
    expect(bst.get(key)).toBe(key);
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });

  test('should test the forEach method of a non-empty bst', () => {
    const array = [];
    bst.forEach((node) => {
      array.push(node.key);
    });
    expect(array).toEqual(arrays.sorted);
  });
});

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    bst = ds[name]();
    arrays = {
      random: ['S', 'E', 'X', 'A', 'R', 'U', 'C', 'H', 'M'],
      sorted: ['A', 'C', 'E', 'H', 'M', 'R', 'S', 'U', 'X'],
    };
    populate(bst, arrays.random);
  });

  test('should test the removeMin method of a non-empty bst', () => {
    const index = 1;
    const min = arrays.sorted[index - 1];
    const key = arrays.sorted[index];
    bst.removeMin();
    if (bst.size() > 0) {
      expect(bst.get(min)).toBeNull();
      expect(bst.min()).toBe(key);
    } else {
      expect(bst.min()).toBeNull();
    }
  });

  test('should test the removeMax method of a non-empty bst', () => {
    const { length } = arrays.sorted;
    const index = length - 2;
    const max = arrays.sorted[index + 1];
    const key = arrays.sorted[index];
    bst.removeMax();
    if (bst.size() > 0) {
      expect(bst.get(max)).toBeNull();
      expect(bst.max()).toBe(key);
    } else {
      expect(bst.max()).toBeNull();
    }
  });

  test('should test the remove method of a non-empty bst', () => {
    const key = 'C';
    expect(bst.get(key)).toBe(key);
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });

  test('should test the remove method of a non-empty bst', () => {
    const key = 'R';
    expect(bst.get(key)).toBe(key);
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });

  test('should test the remove method of a non-empty bst', () => {
    const key = 'E';
    expect(bst.get(key)).toBe(key);
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });

  test('should test the remove method of a non-empty bst', () => {
    const key = 'Z';
    expect(bst.get(key)).toBeNull();
    bst.remove(key);
    expect(bst.get(key)).toBeNull();
  });
});