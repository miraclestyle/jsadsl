const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['GraphShortestPaths'];

let algo = null;

describe.each(names)('%s Multiple Sources', (name) => {
  beforeAll(() => (
    Graph('tinyDigraph.txt', true).then((g) => {
      const sources = [1, 7, 10];
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify getParent method', () => {
    expect(algo.getParent(4)).toBe(6);
    expect(algo.getParent(5)).toBe(0);
    expect(algo.getParent(12)).toBe(10);
  });

  test('should verify getDistance method', () => {
    expect(algo.getDistance(4)).toBe(2);
    expect(algo.getDistance(5)).toBe(3);
    expect(algo.getDistance(12)).toBe(1);
  });

  test('should verify shortestPathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value));
    algo.shortestPathTo(4).forEach(push);
    expect(path).toEqual([7, 6, 4]);
    path = [];
    algo.shortestPathTo(5).forEach(push);
    expect(path).toEqual([7, 6, 0, 5]);
    path = [];
    algo.shortestPathTo(12).forEach(push);
    expect(path).toEqual([10, 12]);
    path = [];
  });

  test('should verify shortestPathToString method', () => {
    expect(algo.shortestPathToString(4)).toBe('7->6->4');
    expect(algo.shortestPathToString(5)).toBe('7->6->0->5');
    expect(algo.shortestPathToString(12)).toBe('10->12');
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

  test('should verify getParent method', () => {
    expect(algo.getParent(2)).toBe(4);
    expect(algo.getParent(3)).toBe(4);
  });

  test('should verify getDistance method', () => {
    expect(algo.getDistance(2)).toBe(3);
    expect(algo.getDistance(5)).toBe(1);
  });

  test('should verify shortestPathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value));
    algo.shortestPathTo(2).forEach(push);
    expect(path).toEqual([0, 5, 4, 2]);
    path = [];
    algo.shortestPathTo(5).forEach(push);
    expect(path).toEqual([0, 5]);
    path = [];
  });

  test('should verify shortestPathToString method', () => {
    expect(algo.shortestPathToString(2)).toBe('0->5->4->2');
    expect(algo.shortestPathToString(5)).toBe('0->5');
  });
});
