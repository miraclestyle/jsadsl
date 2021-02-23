const ds = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const id = new Array(graph.V()).fill(-1);
  let counter = 0;

  const dfs = (p) => {
    discovered[p] = true;
    id[p] = counter;
    graph.edges(p, (q) => {
      if (!discovered[q]) {
        dfs(q);
      }
    });
  };

  const run = () => {
    for (let v = 0; v < graph.V(); v += 1) {
      if (!discovered[v]) {
        dfs(v);
        counter += 1;
      }
    }
  };

  run();

  const count = () => (counter);

  const connected = (p, q) => (id[p] === id[q]);

  const component = (p) => (id[p]);

  return {
    count,
    connected,
    component,
  };
};

module.exports = ds;
