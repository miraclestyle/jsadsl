const {
  describe,
  expect,
  test,
  beforeAll,
  beforeEach,
} = require('@jest/globals');
const { search, repeat } = require('../../lib');
const { Graphs } = require('./data');

search.repeat = repeat;

let graphs;

beforeAll(() => (
  Graphs().then((options) => {
    graphs = options;
    return graphs;
  })
));

let algo = null;
describe('GraphConnectedComponents', () => {
  beforeEach(() => {
    const { graph } = graphs.tinyGraph;
    algo = search.GraphConnectedComponents(graph);
  });

  test('should verify count method on GraphConnectedComponents', () => {
    expect(algo.count()).toBe(3);
  });

  test('should verify component method on GraphConnectedComponents', () => {
    expect(algo.component(5)).toBe(0);
    expect(algo.component(7)).toBe(1);
    expect(algo.component(11)).toBe(2);
  });

  test('should verify connected method on GraphConnectedComponents', () => {
    expect(algo.connected(0, 1)).toBe(true);
    expect(algo.connected(3, 6)).toBe(true);
    expect(algo.connected(7, 8)).toBe(true);
    expect(algo.connected(10, 12)).toBe(true);
    expect(algo.connected(5, 10)).toBe(false);
  });
});

describe('GraphShortestPaths Multiple Sources', () => {
  beforeAll(() => {
    const sources = [1, 7, 10];
    const { graph } = graphs.tinyDigraph;
    algo = search.GraphShortestPaths(graph, sources);
  });

  test('should verify hasPath method on GraphShortestPaths', () => {
    expect(algo.hasPath(4)).toBe(true);
    expect(algo.hasPath(5)).toBe(true);
    expect(algo.hasPath(12)).toBe(true);
  });

  test('should verify getParent method on GraphShortestPaths', () => {
    expect(algo.getParent(4)).toBe(6);
    expect(algo.getParent(5)).toBe(0);
    expect(algo.getParent(12)).toBe(10);
  });

  test('should verify getDistance method on GraphShortestPaths', () => {
    expect(algo.getDistance(4)).toBe(2);
    expect(algo.getDistance(5)).toBe(3);
    expect(algo.getDistance(12)).toBe(1);
  });

  test('should verify shortestPathTo method on GraphShortestPaths', () => {
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

  test('should verify shortestPathToString method on GraphShortestPaths', () => {
    expect(algo.shortestPathToString(4)).toBe('7->6->4');
    expect(algo.shortestPathToString(5)).toBe('7->6->0->5');
    expect(algo.shortestPathToString(12)).toBe('10->12');
  });
});

describe('GraphShortestPaths Single Source', () => {
  beforeAll(() => {
    const sources = 0;
    const { graph } = graphs.tinyDigraph;
    algo = search.GraphShortestPaths(graph, sources);
  });

  test('should verify hasPath method on GraphShortestPaths', () => {
    expect(algo.hasPath(2)).toBe(true);
    expect(algo.hasPath(12)).toBe(false);
  });

  test('should verify getParent method on GraphShortestPaths', () => {
    expect(algo.getParent(2)).toBe(4);
    expect(algo.getParent(3)).toBe(4);
  });

  test('should verify getDistance method on GraphShortestPaths', () => {
    expect(algo.getDistance(2)).toBe(3);
    expect(algo.getDistance(5)).toBe(1);
  });

  test('should verify shortestPathTo method on GraphShortestPaths', () => {
    let path = [];
    const push = (value) => (path.push(value));
    algo.shortestPathTo(2).forEach(push);
    expect(path).toEqual([0, 5, 4, 2]);
    path = [];
    algo.shortestPathTo(5).forEach(push);
    expect(path).toEqual([0, 5]);
    path = [];
  });

  test('should verify shortestPathToString method on GraphShortestPaths', () => {
    expect(algo.shortestPathToString(2)).toBe('0->5->4->2');
    expect(algo.shortestPathToString(5)).toBe('0->5');
  });
});
