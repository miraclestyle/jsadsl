const {
  describe,
  expect,
  test,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['GraphOrder'];

describe.each(names)('%s', (name) => {
  test('should do topological sort on a given graph', (done) => {
    Graph('tinyDAG.txt', true).then((g) => {
      const process = graph[name](g);
      const pre = process.preOrder();
      const post = process.postOrder();
      const reverse = process.reversePostOrder();
      expect(pre.empty()).toBe(false);
      expect(post.empty()).toBe(false);
      expect(reverse.empty()).toBe(false);
      let s = '';
      while (!pre.empty()) {
        s += (pre.dequeue()).toString();
        if (!pre.empty()) s += '->';
      }
      expect(s).toBe('0->5->4->1->6->9->11->12->10->2->3->7->8');

      s = '';
      while (!post.empty()) {
        s += (post.dequeue()).toString();
        if (!post.empty()) s += '->';
      }
      expect(s).toBe('4->5->1->12->11->10->9->6->0->3->2->7->8');

      s = '';
      while (!reverse.empty()) {
        s += (reverse.pop()).toString();
        if (!reverse.empty()) s += '->';
      }
      expect(s).toBe('8->7->2->3->0->6->9->10->11->12->1->5->4');
      done();
    });
  });
});
