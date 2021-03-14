const { Stack } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const onStack = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let cycle = null;

  const otherEdgeVertex = (p, x) => {
    if (!graph.isWeighted()) return x;
    if (graph.isDirected()) return x.to();
    return x.other(p);
  };

  const isCycle = (p, q) => (
    graph.isDirected() ? onStack[q] : parent[p] !== q
  );

  const findCycle = (p, q) => {
    if (!isCycle(p, q)) return;
    cycle = Stack();
    for (let v = p; v !== q; v = parent[v]) {
      cycle.push(v);
    }
    cycle.push(q);
    cycle.push(p);
  };

  const dfs = (p) => {
    if (cycle !== null) return;
    discovered[p] = true;
    onStack[p] = true;
    graph.edges(p, (x) => {
      if (cycle !== null) return;
      const q = otherEdgeVertex(p, x);
      if (!discovered[q]) {
        parent[q] = p;
        dfs(q);
      } else {
        findCycle(p, q);
      }
    });
    onStack[p] = false;
  };

  const hasParallelEdges = () => {
    graph.vertices((p) => {
      if (cycle !== null) return;
      graph.edges(p, (x) => {
        if (cycle !== null) return;
        const q = otherEdgeVertex(p, x);
        if (discovered[q]) {
          cycle = Stack();
          cycle.push(p);
          cycle.push(q);
          cycle.push(p);
        }
        discovered[q] = true;
      });
      graph.edges(p, (x) => {
        const q = otherEdgeVertex(p, x);
        discovered[q] = false;
      });
    });
    if (cycle !== null) return true;
    return false;
  };

  if (hasParallelEdges()) return cycle;

  graph.vertices((p) => {
    if (cycle === null && !discovered[p]) dfs(p);
  });
  return cycle;
};

module.exports = search;
