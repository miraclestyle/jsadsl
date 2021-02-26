const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const id = new Array(graph.V()).fill(-1);
  let counter = 0;

  const dfs = (p) => {
    discovered[p] = true;
    id[p] = counter;
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
  };

  graph.vertices((p) => {
    if (!discovered[p]) {
      dfs(p);
      counter += 1;
    }
  });

  const connected = (p, q) => (id[p] === id[q]);

  const component = (p) => (id[p]);

  const count = () => (counter);

  return { connected, component, count };
};

module.exports = search;
