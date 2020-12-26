const ds = require('../../lib/ds');

const structures = ['linkedStack', 'arrayStack', 'repeat'];
let stack = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    stack = ds[name]();
  });

  test('should report empty for an empty stack', () => {
    expect(stack.empty()).toBe(true);
  });

  test('should report size of 0 for an empty stack', () => {
    expect(stack.size()).toBe(0);
  });

  test('should peek null on an empty stack', () => {
    expect(stack.peek()).toBe(null);
  });

  test('should add one item to an empty stack', () => {
    stack.push(100);
    expect(stack.size()).toBe(1);
  });

  test('should add two items to an empty stack', () => {
    stack.push(2);
    stack.push(1);
    const set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
  });

  test('should report non-empty for a stack with one item', () => {
    stack.push(100);
    expect(stack.empty()).toBe(false);
  });

  test('should report size of 1 for a stack with one item', () => {
    stack.push(100);
    expect(stack.size()).toBe(1);
  });

  test('should peek at the last pushed value on the stack', () => {
    stack.push(90);
    stack.push(100);
    expect(stack.peek()).toBe(100);
  });

  test('should add multiple items to an empty stack', () => {
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
    }
    const set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
  });

  test('should not remove an item from an empty stack', () => {
    stack.pop();
    expect(stack.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty stack', () => {
    stack.push(100);
    stack.pop();
    expect(stack.empty()).toBe(true);
  });

  test('should remove an item from a non-empty stack', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    stack.pop();
    refSet.delete(100);
    set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove multiple items from a non-empty stack', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
      refSet.add(i * 10);
    }
    let set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    refSet.delete(100);
    refSet.delete(90);
    refSet.delete(80);
    refSet.delete(70);
    refSet.delete(60);
    set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    refSet.forEach((value) => {
      expect(set.has(value)).toBe(true);
    });
  });

  test('should remove all items from a non-empty stack', () => {
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
    }
    const set = new Set();
    for (const value of stack) {
      set.add(value);
    }
    // stack.forEach((value) => set.add(value));
    for (let i = 10; i <= 100; i += 10) {
      expect(set.has(i)).toBe(true);
    }
    for (let i = 1; i <= 10; i += 1) {
      stack.pop();
    }
    expect(stack.empty()).toBe(true);
  });

  test('should iterate over multiple items in a non-empty stack', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
      refSet.add(i * 10);
    }
    for (const value of stack) {
      expect(refSet.has(value)).toBe(true);
    }
    // stack.forEach((value) => {
    //   expect(refSet.has(value)).toBe(true);
    // });
  });

  test('should loop over multiple items in a non-empty stack', () => {
    const refSet = new Set();
    for (let i = 1; i <= 10; i += 1) {
      stack.push(i * 10);
      refSet.add(i * 10);
    }
    stack.forEach((value) => {
      expect(refSet.has(value)).toBe(true);
    });
  });
});
