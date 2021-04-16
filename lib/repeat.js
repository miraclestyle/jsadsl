const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  let counter = 0;

  const dfs = (v) => {
    counter += 1;
    discovered[v] = true;
    graph.edges(v, (u) => {
      if (!discovered[u]) dfs(u);
    });
  };

  if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i += 1) {
      if (!discovered[source[i]]) dfs(source[i]);
    }
  } else {
    dfs(source);
  }

  const count = () => (counter);

  const hasPath = (v) => (discovered[v]);

  return Object.freeze({
    count,
    hasPath,
  });
};

module.exports = search;
