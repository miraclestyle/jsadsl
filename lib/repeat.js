const { Stack } = require('./ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const onStack = new Array(graph.V()).fill(false);
  const sort = Stack();

  const dfs = (v) => {
    discovered[v] = true;
    onStack[v] = true;
    graph.edges(v, (u) => {
      if (!discovered[u]) {
        dfs(u);
      } else if (onStack[u]) {
        throw new Error('Graph contains cycles!');
      }
    });
    sort.push(v);
    onStack[v] = false;
  };

  graph.vertices((v) => {
    if (!discovered[v]) dfs(v);
  });

  return sort;
};

module.exports = search;
