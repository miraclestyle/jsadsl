const { ds } = require('../../lib');

const structures = ['dynamicArray'];
let array = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    array = ds[name]();
  });

  test('should report empty for an empty array', () => {
    expect(array.empty()).toBe(true);
  });

  test('should report size of 0 for an empty array', () => {
    expect(array.size()).toBe(0);
  });

  test('should find nothing in an empty array', () => {
    expect(array.find(100)).toBe(-1);
  });

  test('should add one item to an empty array', () => {
    array.insert(100);
    expect(array.size()).toBe(1);
  });

  test('should add two items to an empty array', () => {
    array.insert(1);
    array.insert(2);
    const copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([1, 2]);
  });

  test('should report non-empty for an array with one item', () => {
    array.insert(100);
    expect(array.empty()).toBe(false);
  });

  test('should report size of 1 for an array with one item', () => {
    array.insert(100);
    expect(array.size()).toBe(1);
  });

  test('should find an index in an array with one item', () => {
    array.insert(100);
    const index = array.find(100);
    expect(index).toBe(0);
  });

  test('should add multiple items to an empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    const copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('should not remove an item from an empty array', () => {
    array.remove(100);
    expect(array.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty list', () => {
    array.insert(100);
    array.removeLast();
    expect(array.empty()).toBe(true);
  });

  test('should get the last item from a non-empty list', () => {
    array.insert(100);
    array.insert(90);
    array.insert(80);
    expect(array.getLast()).toBe(80);
  });

  test('should remove an item from a non-empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    let copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    array.remove(60);
    copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 100, 70, 80, 90]);
  });

  test('should remove multiple items from a non-empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    let copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    array.remove(50);
    array.remove(70);
    array.remove(30);
    array.remove(10);
    array.remove(100);
    copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([90, 20, 80, 40, 60]);
  });

  test('should remove all items from a non-empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    const copy = [];
    array.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    for (let i = 1; i <= 10; i += 1) {
      array.remove(i * 10);
    }
    expect(array.empty()).toBe(true);
  });

  test('should find a value in an array with multiple items', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    const index = array.find(50);
    expect(index).toBe(4);
  });

  test('should iterate over multiple items in a non-empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    let i = 1;
    array.forEach((value) => {
      expect(value).toBe(i * 10);
      i += 1;
    });
  });

  test('should update an item in a non-empty array', () => {
    for (let i = 1; i <= 10; i += 1) {
      array.insert(i * 10);
    }
    array.update(50, 55);
    const index50 = array.find(50);
    const index55 = array.find(55);
    expect(index50).toBe(-1);
    expect(index55).toBe(4);
  });
});
