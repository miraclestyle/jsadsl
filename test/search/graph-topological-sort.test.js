const {
  describe,
  expect,
  test,
} = require('@jest/globals');
const { search, repeat } = require('../../lib');
const { Graph } = require('./data');

search.repeat = repeat;

const names = ['GraphTopologicalSort'];

describe.each(names)('%s', (name) => {
  test('should do topological sort on a given graph', (done) => {
    Graph('tinyDAG.txt', true).then((graph) => {
      const sort = search[name](graph);
      expect(sort.empty()).toBe(false);
      let s = '';
      while (!sort.empty()) {
        s += (sort.pop()).toString();
        if (!sort.empty()) s += '->';
      }
      expect(s).toBe('8->7->2->3->0->6->9->10->11->12->1->5->4');
      done();
    });
  });
});
