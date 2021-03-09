const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['ShortestPaths'];

let algo = null;

describe.each(names)('%s Multiple Sources', (name) => {
  beforeAll(() => (
    Graph('tinyDigraph.txt', true).then((g) => {
      const sources = [1, 7, 10];
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify parentOf method', () => {
    expect(algo.parentOf(4)).toBe(6);
    expect(algo.parentOf(5)).toBe(0);
    expect(algo.parentOf(12)).toBe(10);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(4)).toBe(2);
    expect(algo.distanceTo(5)).toBe(3);
    expect(algo.distanceTo(12)).toBe(1);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value));
    algo.pathTo(4).forEach(push);
    expect(path).toEqual([7, 6, 4]);
    path = [];
    algo.pathTo(5).forEach(push);
    expect(path).toEqual([7, 6, 0, 5]);
    path = [];
    algo.pathTo(12).forEach(push);
    expect(path).toEqual([10, 12]);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(4)).toBe('7->6->4');
    expect(algo.pathToString(5)).toBe('7->6->0->5');
    expect(algo.pathToString(12)).toBe('10->12');
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

  test('should verify parentOf method', () => {
    expect(algo.parentOf(2)).toBe(4);
    expect(algo.parentOf(3)).toBe(4);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(2)).toBe(3);
    expect(algo.distanceTo(5)).toBe(1);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value));
    algo.pathTo(2).forEach(push);
    expect(path).toEqual([0, 5, 4, 2]);
    path = [];
    algo.pathTo(5).forEach(push);
    expect(path).toEqual([0, 5]);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(2)).toBe('0->5->4->2');
    expect(algo.pathToString(5)).toBe('0->5');
  });
});
