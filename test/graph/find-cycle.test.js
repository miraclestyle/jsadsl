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
});
