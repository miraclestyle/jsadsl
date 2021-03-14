const { FindCycle, Order } = require('.');

const search = (graph) => {
  if (!graph.isDirected()) throw new Error('Graph is undirected!');
  if (FindCycle(graph) !== null) throw new Error('Graph contains cycles!');
  const order = Order(graph);
  return order.reversePostOrder();
};

module.exports = search;
