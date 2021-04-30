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
    graph.edges(p, (edge) => {
      if (cycle !== null) return;
      const q = edge.to();
      if (!discovered[q]) {
        parent[q] = edge;
        dfs(q);
      } else if (onStack[q]) {
        cycle = Stack();
        // let e = edge;
        // while (e.from() !== q) {
        //   cycle.push(e);
        //   e = parent[e.from()];
        // }
        cycle.push(edge);
        for (let v = p; v !== q; v = parent[v].from()) {
          cycle.push(parent[v]);
        }
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
