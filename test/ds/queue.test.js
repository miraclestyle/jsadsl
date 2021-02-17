const { ds, repeat } = require('../../lib');

ds.repeat = repeat;

const structures = ['linkedQueue', 'arrayQueue', 'repeat'];
let queue = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    queue = ds[name]();
  });

  test('should report empty for an empty queue', () => {
    expect(queue.empty()).toBe(true);
  });

  test('should report size of 0 for an empty queue', () => {
    expect(queue.size()).toBe(0);
  });

  test('should peek null on an empty queue', () => {
    expect(queue.peek()).toBe(null);
  });

  test('should add one item to an empty queue', () => {
    queue.enqueue(100);
    expect(queue.size()).toBe(1);
  });

  test('should add two items to an empty queue', () => {
    queue.enqueue(2);
    queue.enqueue(1);
    const set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
  });

  test('should report non-empty for a queue with one item', () => {
    queue.enqueue(100);
    expect(queue.empty()).toBe(false);
  });

  test('should report size of 1 for a queue with one item', () => {
    queue.enqueue(100);
    expect(queue.size()).toBe(1);
  });

  test('should peek at the first enqueued value to the queue', () => {
    queue.enqueue(90);
    queue.enqueue(100);
    expect(queue.peek()).toBe(90);
  });

  test('should add multiple items to an empty queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
    }
    const set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
  });

  test('should not remove an item from an empty queue', () => {
    queue.dequeue();
    expect(queue.empty()).toBe(true);
  });

  test('should remove the first item from a non-empty queue', () => {
    queue.enqueue(100);
    queue.dequeue();
    expect(queue.empty()).toBe(true);
  });

  test('should remove an item from a non-empty queue', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    queue.dequeue();
    refSet.delete(10);
    set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove multiple items from a non-empty queue', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    refSet.delete(10);
    refSet.delete(20);
    refSet.delete(30);
    refSet.delete(40);
    refSet.delete(50);
    set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove all items from a non-empty queue', () => {
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
    }
    const set = new Set();
    for (const value of queue) {
      set.add(value);
    }
    // queue.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    for (let i = 1; i <= 10; i += 1) {
      queue.dequeue();
    }
    expect(queue.empty()).toBe(true);
  });

  test('should iterate over multiple items in a non-empty queue', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
      refSet.add(i * 10);
    }
    for (const value of queue) {
      expect(refSet.has(value)).toBe(true);
    }
    // queue.forEach((value) => {
    //   expect(refSet.has(value)).toBe(true);
    // });
  });

  test('should loop over multiple items in a non-empty queue', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      queue.enqueue(i * 10);
      refSet.add(i * 10);
    }
    queue.forEach((value) => {
      expect(refSet.has(value)).toBe(true);
    });
  });
});
