const { Stack, Queue } = require('../..');

const ds = (graph, start) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const entry = new Array(graph.V()).fill(0);
  const exit = new Array(graph.V()).fill(0);
  let time = 0;

  const entryTime = (v) => (entry[v]);

  const exitTime = (v) => (exit[v]);

  const hasPath = (v) => (discovered[v]);

  const getParent = (v) => (parent[v]);

  const getPath = (v) => {
    const stack = Stack();
    stack.push(v);
    let p = parent[v];
    while (p !== -1) {
      stack.push(p);
      p = parent[p];
    }
    let s = '';
    while (!stack.empty()) {
      s += (stack.pop()).toString();
      if (!stack.empty()) s += '->';
    }
    return s;
  };

  const bfs = (s) => {
    const queue = Queue();
    discovered[s] = true;
    queue.enqueue(s);
    while (!queue.empty()) {
      const p = queue.dequeue();
      time += 1;
      entry[p] = time;
      processed[p] = true;
      graph.edges(p, (q) => {
        if (!discovered[q]) {
          queue.enqueue(q);
          discovered[q] = true;
          parent[q] = p;
        }
      });
      time += 1;
      exit[p] = time;
    }
  };

  bfs(start);

  return {
    entryTime,
    exitTime,
    hasPath,
    getParent,
    getPath,
  };
};

module.exports = ds;
