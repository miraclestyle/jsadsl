const {
  UndirectedGraph,
  DirectedGraph,
  EdgeWeightedUndirectedGraph,
  EdgeWeightedDirectedGraph,
} = require('.');

const Graph = (N, directed = false, weighted = false) => {
  if (weighted && directed) return EdgeWeightedDirectedGraph(N);
  if (weighted) return EdgeWeightedUndirectedGraph(N);
  if (directed) return DirectedGraph(N);
  return UndirectedGraph(N);
};

module.exports = Graph;
