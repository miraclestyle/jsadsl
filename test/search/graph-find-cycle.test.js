const {
  describe,
  expect,
  test,
  beforeAll,
  beforeEach,
} = require('@jest/globals');
const { search, repeat } = require('../../lib');
const { Graph } = require('./data');

search.repeat = repeat;

const names = ['GraphFindCycle'];

describe.each(names)('%s', (name) => {
  test('should not detect cycle in a given graph', (done) => {
    Graph('tinyDAG.txt', true).then((graph) => {
      const cycle = search[name](graph);
      expect(cycle).toBe(null);
      done();
    });
  });

  test('should detect cycle in a given graph', (done) => {
    Graph('tinyDigraph.txt', true).then((graph) => {
      const cycle = search[name](graph);
      expect(cycle).not.toBe(null);
      let s = '';
      while (!cycle.empty()) {
        s += (cycle.pop()).toString();
        if (!cycle.empty()) s += '->';
      }
      const ref = '3->5->4->3';
      expect(s).toBe(ref);
      done();
    });
  });
});
