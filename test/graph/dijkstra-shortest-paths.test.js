const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['DijkstraShortestPaths'];

let algo = null;

describe.each(names)('%s Single Source', (name) => {
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
