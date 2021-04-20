const { Stack } = require('./ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const onStack = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let cycle = null;

  const isCycle = (v, u) => (
    graph.isDirected() ? onStack[u] : parent[v] !== u
  );

  const getCycle = (v, u) => {
    if (!isCycle(v, u)) return;
    cycle = Stack();
    for (let vertex = v; vertex !== u; vertex = parent[vertex]) {
      cycle.push(vertex);
    }
    cycle.push(u);
    cycle.push(v);
  };

  const dfs = (v) => {
    if (cycle !== null) return;
    discovered[v] = true;
    onStack[v] = true;
    graph.edges(v, (u) => {
      if (!discovered[u]) {
        parent[u] = v;
        dfs(u);
      } else {
        getCycle(v, u);
      }
    });
    onStack[v] = false;
  };

  graph.vertices((v) => {
    if (cycle === null && !discovered[v]) dfs(v);
  });

  return cycle;
};

module.exports = search;
