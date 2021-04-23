const { ds, util, repeat } = require('../../lib');

ds.repeat = repeat;

const structures = ['PriorityQueue'];
let array = [];
let pq = null;
const n = 100;

const init = (low = 0, high = n) => {
  const output = [];
  for (let i = low; i < high; i += 1) {
    output.push(i);
  }
  for (let i = 0; i < output.length; i += 1) {
    const r = util.randomInt(i, output.length);
    util.swap(output, i, r);
  }
  return output;
};

const populate = (p, a) => {
  for (let i = 0; i < a.length; i += 1) {
    p.insert(a[i]);
  }
};

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    pq = ds[name]();
  });

  test('should report size of 0 for an empty priority queue', () => {
    expect(pq.size()).toBe(0);
  });

  test('should report empty for an empty priority queue', () => {
    expect(pq.empty()).toBe(true);
  });

  test('should return null on peek for an empty priority queue', () => {
    expect(pq.peek()).toBe(null);
  });

  test('should return null on extract for an empty priority queue', () => {
    expect(pq.extract()).toBe(null);
  });

  test('should maintain empty state upon extract on an empty priority queue', () => {
    expect(pq.extract()).toBe(null);
    expect(pq.size()).toBe(0);
    expect(pq.empty()).toBe(true);
    expect(pq.peek()).toBe(null);
  });

  test('should report size of 1 after the first insert in an empty priority queue', () => {
    pq.insert(100);
    expect(pq.size()).toBe(1);
  });

  test('should report non-empty after the first insert in an empty priority queue', () => {
    pq.insert(100);
    expect(pq.empty()).toBe(false);
  });

  test('should return inserted value on peek after the first insert in an empty priority queue', () => {
    pq.insert(100);
    expect(pq.peek()).toBe(100);
  });

  test('should return inserted value on extract after the first insert in an empty priority queue', () => {
    pq.insert(100);
    expect(pq.extract()).toBe(100);
  });

  test('should return inserted value and maintain empty state after the first insert in an empty priority queue', () => {
    pq.insert(100);
    expect(pq.extract()).toBe(100);
    expect(pq.size()).toBe(0);
    expect(pq.empty()).toBe(true);
    expect(pq.peek()).toBe(null);
  });
});

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    array = init();
    pq = ds[name]();
  });

  test('should report size of 100 after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.size()).toBe(100);
  });

  test('should report non-empty after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.empty()).toBe(false);
  });

  test('should return 0 on peek after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.peek()).toBe(0);
  });

  test('should return 0 on extract after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.extract()).toBe(0);
  });

  test('should return 0 on extract and mainintain state after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.extract()).toBe(0);
    expect(pq.size()).toBe(99);
    expect(pq.empty()).toBe(false);
    expect(pq.peek()).toBe(1);
  });

  test('should return extracted items in proper order and mainintain state after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    let value = 0;
    while (!pq.empty()) {
      expect(pq.extract()).toBe(value);
      value += 1;
    }
    value = 0;
    while (value < 10) {
      pq.extract();
      value += 1;
    }
    expect(pq.size()).toBe(0);
    expect(pq.empty()).toBe(true);
    expect(pq.peek()).toBe(null);
  });
});

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    array = init();
    const compare = (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    };
    pq = ds[name](compare);
  });

  test('should report size of 100 after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.size()).toBe(100);
  });

  test('should report non-empty after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.empty()).toBe(false);
  });

  test('should return 99 on peek after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.peek()).toBe(99);
  });

  test('should return 99 on extract after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.extract()).toBe(99);
  });

  test('should return 99 on extract and mainintain state after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    expect(pq.extract()).toBe(99);
    expect(pq.size()).toBe(99);
    expect(pq.empty()).toBe(false);
    expect(pq.peek()).toBe(98);
  });

  test('should return extracted items in proper order and mainintain state after inserting 100 items in an empty priority queue', () => {
    populate(pq, array);
    let value = 99;
    while (!pq.empty()) {
      expect(pq.extract()).toBe(value);
      value -= 1;
    }
    while (value < 10) {
      pq.extract();
      value += 1;
    }
    expect(pq.size()).toBe(0);
    expect(pq.empty()).toBe(true);
    expect(pq.peek()).toBe(null);
  });
});
