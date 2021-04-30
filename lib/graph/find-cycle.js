const {
  FindDirectedCycle,
  FindUndirectedCycle,
  FindWeightedDirectedCycle,
  FindWeightedUndirectedCycle,
} = require('.');

const search = (graph) => {
  if (graph.isWeighted() && graph.isDirected()) {
    return FindWeightedDirectedCycle(graph);
  }
  if (graph.isWeighted()) {
    return FindWeightedUndirectedCycle(graph);
  }
  if (graph.isDirected()) {
    return FindDirectedCycle(graph);
  }
  return FindUndirectedCycle(graph);
};

module.exports = search;
