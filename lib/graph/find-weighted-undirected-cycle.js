const { Stack } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(null);
  let cycle = null;

  const dfs = (p) => {
    if (cycle !== null) return;
    discovered[p] = true;
    graph.edges(p, (edge) => {
      if (cycle !== null) return;
      const q = edge.other(p);
      if (!discovered[q]) {
        parent[q] = edge;
        dfs(q);
      } else if (parent[p].other(p) !== q) {
        cycle = Stack();
        cycle.push(edge);
        for (let v = p; v !== q; v = parent[v].other(v)) {
          cycle.push(parent[v]);
        }
      }
    });
  };

  const hasSelfLoop = () => {
    graph.vertices((p) => {
      graph.edges(p, (edge) => {
        if (cycle !== null) return;
        const q = edge.other(p);
        if (p === q) {
          cycle = Stack();
          cycle.push(p);
          cycle.push(p);
        }
      });
    });
  };

  const hasParallelEdges = () => {
    graph.vertices((p) => {
      if (cycle !== null) return;
      graph.edges(p, (edge) => {
        if (cycle !== null) return;
        const q = edge.other(p);
        if (discovered[q]) {
          cycle = Stack();
          cycle.push(p);
          cycle.push(q);
          cycle.push(p);
        }
        discovered[q] = true;
      });
      graph.edges(p, (edge) => {
        const q = edge.other(p);
        discovered[q] = false;
      });
    });
    if (cycle !== null) return true;
    return false;
  };

  if (hasSelfLoop()) return cycle;

  if (hasParallelEdges()) return cycle;

  graph.vertices((p) => {
    if (cycle === null && !discovered[p]) dfs(p);
  });
  return cycle;
};

module.exports = search;
