const { Stack } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const reversePostOrder = Stack();

  const dfs = (p) => {
    discovered[p] = true;
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
    reversePostOrder.push(p);
  };

  graph.vertices((p) => {
    if (!discovered[p]) dfs(p);
  });

  return reversePostOrder;
};

module.exports = search;
