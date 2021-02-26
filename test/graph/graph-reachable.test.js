const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['GraphReachable'];

let algo = null;

describe.each(names)('%s Multiple Sources', (name) => {
  beforeAll(() => (
    Graph('tinyDigraph.txt', true).then((g) => {
      const sources = [1, 7, 10];
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify hasPath method', () => {
    expect(algo.hasPath(3)).toBe(true);
    expect(algo.hasPath(5)).toBe(true);
    expect(algo.hasPath(12)).toBe(true);
  });

  test('should verify count method', () => {
    expect(algo.count()).toBe(13);
  });
});

describe.each(names)('%s Single Source', (name) => {
  beforeAll(() => (
    Graph('tinyDigraph.txt', true).then((g) => {
      const sources = 0;
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify hasPath method', () => {
    expect(algo.hasPath(2)).toBe(true);
    expect(algo.hasPath(12)).toBe(false);
  });

  test('should verify count method', () => {
    expect(algo.count()).toBe(6);
  });
});
