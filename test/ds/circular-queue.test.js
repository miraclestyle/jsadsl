const ds = require('../../lib/ds/index');

const structures = ['circularQueue'];
let q = null;
const n = 10;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    q = ds[name](n);
  });

  test('should report empty for an empty circular queue', () => {
    expect(q.empty()).toBe(true);
  });

  test('should report size of 0 for an empty circular queue', () => {
    expect(q.size()).toBe(0);
  });

  xtest('should find nothing in an empty circular queue', () => {
    expect(q.find(100)).toBe(-1);
  });

  test('should add one item to an empty circular queue', () => {
    q.enqueue(100);
    expect(q.size()).toBe(1);
  });

  test('should add two items to an empty circular queue', () => {
    q.enqueue(1);
    q.enqueue(2);
    const copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([1, 2]);
  });

  test('should report non-empty for a circular queue with one item', () => {
    q.enqueue(100);
    expect(q.empty()).toBe(false);
  });

  test('should report size of 1 for a circular queue with one item', () => {
    q.enqueue(100);
    expect(q.size()).toBe(1);
  });

  xtest('should find an index in a circular queue with one item', () => {
    q.enqueue(100);
    const index = q.find(100);
    expect(index).toBe(0);
  });

  test('should add multiple items to an empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    const copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('should not remove an item from an empty circular queue', () => {
    q.dequeue(100);
    expect(q.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty circular queue', () => {
    q.enqueue(100);
    q.dequeue();
    expect(q.empty()).toBe(true);
  });

  test('should remove an item from a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    let copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    q.dequeue();
    copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('should remove multiple items from a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    let copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    q.dequeue();
    q.dequeue();
    q.dequeue();
    q.dequeue();
    q.dequeue();
    copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([60, 70, 80, 90, 100]);
  });

  test('should remove all items from a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    const copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    for (let i = 1; i <= 10; i += 1) {
      q.dequeue(i * 10);
    }
    expect(q.empty()).toBe(true);
  });

  xtest('should find a value in a circular queue with multiple items', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    const index = q.find(50);
    expect(index).toBe(4);
  });

  test('should iterate over multiple items in a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    let i = 1;
    q.forEach((value) => {
      expect(value).toBe(i * 10);
      i += 1;
    });
  });

  xtest('should update an item in a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    q.update(50, 55);
    const index50 = q.find(50);
    const index55 = q.find(55);
    expect(index50).toBe(-1);
    expect(index55).toBe(4);
  });
});
