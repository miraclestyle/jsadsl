const { Queue, Stack } = require('../ds');
const { getType } = require('../util');

const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const distance = new Array(graph.V()).fill(0);

  const validateVertex = (v) => {
    if (getType(v) !== 'integer') {
      throw new Error('Invalid vertex type! The vertex is:', getType(v));
    }
  };

  const validateInput = (s) => {
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        validateVertex(s[i]);
      }
    } else {
      validateVertex(s);
    }
  };

  const bfs = (s) => {
    validateInput(s);
    const queue = Queue();
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        queue.enqueue(s[i]);
        discovered[s[i]] = true;
      }
    } else if (getType(s) === 'integer') {
      queue.enqueue(s);
      discovered[s] = true;
    }
    while (!queue.empty()) {
      const p = queue.dequeue();
      graph.edges(p, (q) => {
        if (!discovered[q]) {
          queue.enqueue(q);
          discovered[q] = true;
          parent[q] = p;
          distance[q] = distance[p] + 1;
        }
      });
    }
  };

  bfs(source);

  const parentOf = (v) => (parent[v]);

  const distanceTo = (p) => (distance[p]);

  const hasPathTo = (v) => (discovered[v]);

  const pathTo = (p) => {
    const stack = Stack();
    for (let child = p; child !== -1; child = parent[child]) {
      stack.push(child);
    }
    return stack;
  };

  const pathToString = (p) => {
    const stack = pathTo(p);
    const s = [];
    while (!stack.empty()) {
      s.push((stack.pop()).toString());
    }
    return s.join('->');
  };

  return {
    parentOf,
    distanceTo,
    hasPathTo,
    pathTo,
    pathToString,
  };
};

module.exports = search;
