const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const unweighted = ['UnweightedShortestPaths', 'repeat'];

const weightedDirected = ['DijkstraShortestPaths', 'BellmanFord'];

const weightedDirectedNC = ['BellmanFord'];

const weightedDAG = ['EWDAGShortestLongestPaths'];

let algo = null;

describe.each(unweighted)('%s Multiple Sources', (name) => {
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

  test('should verify hasPathTo method', () => {
    expect(algo.hasPathTo(4)).toBe(true);
    expect(algo.hasPathTo(5)).toBe(true);
    expect(algo.hasPathTo(12)).toBe(true);
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

describe.each(unweighted)('%s Single Source', (name) => {
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

  test('should verify hasPathTo method', () => {
    expect(algo.hasPathTo(4)).toBe(true);
    expect(algo.hasPathTo(12)).toBe(false);
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

describe.each(weightedDirected)('%s', (name) => {
  beforeAll(() => (
    Graph('tinyEWD.txt', true).then((g) => {
      const sources = 0;
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify parentOf method', () => {
    expect(algo.parentOf(2)).toBe(0);
    expect(algo.parentOf(3)).toBe(7);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(2)).toBe(0.26);
    expect(algo.distanceTo(5)).toBe(0.73);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value.toString()));
    algo.pathTo(6).forEach(push);
    expect(path).toEqual(['0-0.26->2', '2-0.34->7', '7-0.39->3', '3-0.52->6']);
    path = [];
    algo.pathTo(5).forEach(push);
    expect(path).toEqual(['0-0.38->4', '4-0.35->5']);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(2)).toBe('0-0.26->2');
    expect(algo.pathToString(5)).toBe('0-0.38->4|4-0.35->5');
  });
});

xdescribe.each(weightedDirectedNC)('%s', (name) => {
  beforeAll(() => (
    Graph('tinyEWDnc.txt', true).then((g) => {
      const sources = 0;
      algo = graph[name](g, sources);
      return algo;
    })
  ));

  test('should verify parentOf method', () => {
    expect(algo.parentOf(2)).toBe(0);
    expect(algo.parentOf(3)).toBe(7);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(2)).toBe(0.26);
    expect(algo.distanceTo(5)).toBe(0.73);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value.toString()));
    algo.pathTo(6).forEach(push);
    expect(path).toEqual(['0-0.26->2', '2-0.34->7', '7-0.39->3', '3-0.52->6']);
    path = [];
    algo.pathTo(5).forEach(push);
    expect(path).toEqual(['0-0.38->4', '4-0.35->5']);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(2)).toBe('0-0.26->2');
    expect(algo.pathToString(5)).toBe('0-0.38->4|4-0.35->5');
  });
});

describe.each(weightedDAG)('%s Shortest Paths', (name) => {
  beforeAll(() => (
    Graph('tinyEWDAG.txt', true).then((g) => {
      const sources = 0;
      algo = graph[name](g, sources, true);
      return algo;
    })
  ));

  test('should verify parentOf method', () => {
    expect(algo.parentOf(2)).toBe(5);
    expect(algo.parentOf(3)).toBe(2);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(2)).toBe(14.0);
    expect(algo.distanceTo(5)).toBe(13.0);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value.toString()));
    algo.pathTo(6).forEach(push);
    expect(path).toEqual(['0-9->4', '4-4->5', '5-1->2', '2-11->6']);
    path = [];
    algo.pathTo(5).forEach(push);
    expect(path).toEqual(['0-9->4', '4-4->5']);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(2)).toBe('0-9->4|4-4->5|5-1->2');
    expect(algo.pathToString(5)).toBe('0-9->4|4-4->5');
  });
});

describe.each(weightedDAG)('%s Longest Paths', (name) => {
  beforeAll(() => (
    Graph('tinyEWDAG.txt', true).then((g) => {
      const sources = 0;
      algo = graph[name](g, sources, false);
      return algo;
    })
  ));

  test('should verify parentOf method', () => {
    expect(algo.parentOf(2)).toBe(7);
    expect(algo.parentOf(3)).toBe(2);
  });

  test('should verify distanceTo method', () => {
    expect(algo.distanceTo(2)).toBe(21.0);
    expect(algo.distanceTo(5)).toBe(20.0);
  });

  test('should verify pathTo method', () => {
    let path = [];
    const push = (value) => (path.push(value.toString()));
    algo.pathTo(6).forEach(push);
    expect(path).toEqual([
      '0-9->4', '4-5->7', '7-6->5', '5-13->6',
    ]);
    path = [];
    algo.pathTo(3).forEach(push);
    expect(path).toEqual(['0-9->4', '4-5->7', '7-7->2', '2-3->3']);
    path = [];
  });

  test('should verify pathToString method', () => {
    expect(algo.pathToString(2)).toBe('0-9->4|4-5->7|7-7->2');
    expect(algo.pathToString(5)).toBe('0-9->4|4-5->7|7-6->5');
  });
});
