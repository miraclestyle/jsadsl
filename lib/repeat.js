const search = (graph, s) => {
  const discovered = new Array(graph.V()).fill(false);
  let counter = 0;

  const dfs = (p) => {
    discovered[p] = true;
    counter += 1;
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
  };

  if (typeof s === 'number') dfs(s);
  else if (Array.isArray(s)) {
    for (let i = 0; i < s.length; i += 1) {
      if (!discovered[s[i]]) dfs(s[i]);
    }
  }

  const hasPath = (v) => (discovered[v]);

  const count = () => (counter);

  return { hasPath, count };
};

module.exports = search;
