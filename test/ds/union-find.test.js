const { ds } = require('../../lib');

const structures = ['unionFind'];
let n;
let unionFind;

const random = (low, high) => (
  low + Math.floor(Math.random() * (high - low))
);

describe.each(structures)('%s', (name) => {
  beforeEach(() => {
    n = Math.floor(Math.random() * 1000);
    unionFind = ds[name](n);
  });

  test('should generate connected cluster of random size', () => {
    const size = random(0, Math.floor(n / 4));
    const connections = random(size, size + size);
    const array = Array.from(new Array(connections), (e, i) => (size + i));
    for (let i = 0; i < connections; i += 1) {
      const r = random(i, connections);
      [array[i], array[r]] = [array[r], array[i]];
    }
    for (let i = 0; i < connections - 1; i += 1) {
      const r = random(i + 1, connections);
      const p = array[i];
      const q = array[r];
      expect(unionFind.union(p, q)).toBe(true);
    }
    const p = array[random(0, connections)];
    const q = array[random(0, connections)];
    expect(unionFind.connected(p, q)).toBe(true);
  });

  test('should fail connecting rogue components', () => {
    expect(unionFind.union(n - Math.floor(n / 2), n + n)).toBe(false);
    expect(unionFind.union(-5, n - Math.floor(n / 2))).toBe(false);
    expect(unionFind.connected(n - Math.floor(n / 2), n + n)).toBe(false);
    expect(unionFind.connected(-5, n - Math.floor(n / 2))).toBe(false);
  });

  test('should not connect already connected components', () => {
    expect(unionFind.union(n - Math.floor(n / 4), n - Math.floor(n / 2))).toBe(true);
    expect(unionFind.union(n - Math.floor(n / 4), n - Math.floor(n / 2))).toBe(true);
  });
});
