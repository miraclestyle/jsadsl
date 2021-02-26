const { Queue, Stack } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const preorder = Queue();
  const postorder = Queue();
  const reversepostorder = Stack();

  const dfs = (p) => {
    discovered[p] = true;
    preorder.enqueue(p);
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
    postorder.enqueue(p);
    reversepostorder.push(p);
  };

  graph.vertices((p) => {
    if (!discovered[p]) dfs(p);
  });

  const preOrder = () => (preorder);

  const postOrder = () => (postorder);

  const reversePostOrder = () => (reversepostorder);

  return {
    preOrder,
    postOrder,
    reversePostOrder,
  };
};

module.exports = search;
