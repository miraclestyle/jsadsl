const {
  describe,
  expect,
  test,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['GraphFindCycle'];

describe.each(names)('%s', (name) => {
  test('should not detect cycle in a given graph', (done) => {
    Graph('tinyDAG.txt', true).then((g) => {
      const cycle = graph[name](g);
      expect(cycle).toBe(null);
      done();
    });
  });

  test('should detect cycle in a given graph', (done) => {
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
