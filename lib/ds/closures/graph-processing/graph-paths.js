const { Stack } = require('../..');

const ds = (graph, start) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const entry = new Array(graph.V()).fill(0);
  const exit = new Array(graph.V()).fill(0);
  let time = 0;

  const entryDistance = (v) => (entry[v]);

  const exitDistance = (v) => (exit[v]);

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

  const dfs = (p) => {
    time += 1;
    entry[p] = time;
    discovered[p] = true;
    graph.edges(p, (q) => {
      if (!discovered[q]) {
        parent[q] = p;
        dfs(q);
      }
    });
    time += 1;
    exit[p] = time;
    processed[p] = true;
  };

  dfs(start);

  return {
    entryDistance,
    exitDistance,
    hasPath,
    getParent,
    getPath,
  };
};

module.exports = ds;
