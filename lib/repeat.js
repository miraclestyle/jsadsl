const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const components = new Array(graph.V()).fill(-1);
  let counter = 0;

  const dfs = (v) => {
    discovered[v] = true;
    components[v] = counter;
    graph.edges(v, (u) => {
      if (!discovered[u]) dfs(u);
    });
  };

  graph.vertices((v) => {
    if (!discovered[v]) {
      dfs(v);
      counter += 1;
    }
  });

  const component = (v) => (components[v]);

  const connected = (v, u) => (components[v] === components[u]);

  const count = () => (counter);

  return Object.freeze({
    component,
    connected,
    count,
  });
};

module.exports = search;
