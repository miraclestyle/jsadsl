const { Queue, Stack } = require('../ds');
const { getType } = require('../util');

const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const distance = new Array(graph.V()).fill(0);

  const bfs = (s) => {
    const queue = Queue();
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        queue.enqueue(s[i]);
        discovered[s[i]] = true;
      }
    } else {
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

  const hasPath = (v) => (discovered[v]);

  const getParent = (v) => (parent[v]);

  const getDistance = (p) => (distance[p]);

  const shortestPathTo = (p) => {
    const stack = Stack();
    for (let child = p; child !== -1; child = parent[child]) {
      stack.push(child);
    }
    return stack;
  };

  const shortestPathToString = (p) => {
    const stack = shortestPathTo(p);
    let s = '';
    while (!stack.empty()) {
      s += (stack.pop()).toString();
      if (!stack.empty()) s += '->';
    }
    return s;
  };

  return {
    hasPath,
    getParent,
    getDistance,
    shortestPathTo,
    shortestPathToString,
  };
};

module.exports = search;
