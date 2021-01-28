const { ds } = require('../../lib');

const structures = ['circularQueue', 'dynamicCircularQueue'];
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

  test('should add multiple items to an empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    const copy = [];
    q.forEach((value) => copy.push(value));
    expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('should not add more items than the set capacity of the circular queue', () => {
    if (name === 'circularQueue') {
      for (let i = 1; i <= 12; i += 1) {
        q.enqueue(i * 10);
      }
      const copy = [];
      q.forEach((value) => copy.push(value));
      expect(copy).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    }
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

  test('should get the first item from a non-empty circular queue', () => {
    q.enqueue(100);
    q.enqueue(90);
    q.enqueue(80);
    expect(q.peek()).toBe(100);
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

  test('should print multiple items in a non-empty circular queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      q.enqueue(i * 10);
    }
    const queue = '[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]';
    expect(q.print()).toBe(queue);
  });
});
