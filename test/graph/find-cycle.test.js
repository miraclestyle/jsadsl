const {
  describe,
  expect,
  test,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['FindCycle'];

describe.each(names)('%s', (name) => {
  test('should detect cycle in an undirected graph', (done) => {
    Graph('tinyGraph.txt', false).then((g) => {
      const cycle = graph[name](g);
      expect(cycle).not.toBe(null);
      let s = '';
      while (!cycle.empty()) {
        s += (cycle.pop()).toString();
        if (!cycle.empty()) s += '->';
      }
      expect(s).toBe('3->4->5->3');
      done();
    });
  });

  test('should not detect cycle in a directed acyclic graph', (done) => {
    Graph('tinyDAG.txt', true).then((g) => {
      const cycle = graph[name](g);
      expect(cycle).toBe(null);
      done();
    });
  });

  test('should detect cycle in a directed graph', (done) => {
    Graph('tinyDigraph.txt', true).then((g) => {
      const cycle = graph[name](g);
      expect(cycle).not.toBe(null);
      let s = '';
      while (!cycle.empty()) {
        s += (cycle.pop()).toString();
        if (!cycle.empty()) s += '->';
      }
      expect(s).toBe('3->5->4->3');
      done();
    });
  });
});
