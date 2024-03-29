const { Stack } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const onStack = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let cycle = null;

  const dfs = (p) => {
    if (cycle !== null) return;
    discovered[p] = true;
    onStack[p] = true;
    graph.edges(p, (q) => {
      if (cycle !== null) return;
      if (!discovered[q]) {
        parent[q] = p;
        dfs(q);
      } else if (onStack[q]) {
        cycle = Stack();
        for (let v = p; v !== q; v = parent[v]) {
          cycle.push(v);
        }
        cycle.push(q);
        cycle.push(p);
      }
    });
    onStack[p] = false;
  };

  graph.vertices((p) => {
    if (cycle === null && !discovered[p]) dfs(p);
  });
  return cycle;
};

module.exports = search;
