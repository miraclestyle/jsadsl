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

const names = ['GraphTopologicalSort'];

describe.each(names)('%s', (name) => {
  // test('should not detect cycle in a given graph', (done) => {
  //   Graph('tinyDAG.txt', true).then((graph) => {
  //     const sorted = search[name](graph);
  //     expect(cycle).toBe(null);
  //     done();
  //   });
  // });

  test('should do topological sort on a given graph', (done) => {
    Graph('tinyDAG.txt', true).then((graph) => {
      const sort = search[name](graph);
      expect(sort.empty()).toBe(false);
      let s = '';
      while (!sort.empty()) {
        s += (sort.pop()).toString();
        if (!sort.empty()) s += '->';
      }
      const ref = '8->7->2->3->0->6->9->10->11->12->1->5->4';
      expect(s).toBe(ref);
      console.log(s);
      done();
    });
  });
});
