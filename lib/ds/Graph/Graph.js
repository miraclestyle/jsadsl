const {
  UndirectedGraph,
  DirectedGraph,
  EdgeWeightedUndirectedGraph,
  EdgeWeightedDirectedGraph,
  FlowNetwork,
} = require('.');

const Graph = (N, directed = false, weighted = false, flow = false) => {
  if (flow) return FlowNetwork(N);
  if (weighted && directed) return EdgeWeightedDirectedGraph(N);
  if (weighted) return EdgeWeightedUndirectedGraph(N);
  if (directed) return DirectedGraph(N);
  return UndirectedGraph(N);
};

module.exports = Graph;