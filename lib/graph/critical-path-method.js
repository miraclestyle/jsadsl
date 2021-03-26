const { WeightedGraph, WeightedDirectedEdge } = require('../ds');
const { EWDAGShortestLongestPaths } = require('.');

const search = (n, durations, precedents) => {
  const source = 2 * n;
  const sink = 2 * n + 1;
  const graph = WeightedGraph(2 * n + 2, true);
  for (let i = 0; i < n; i += 1) {
    const duration = durations[i];
    graph.addEdge(WeightedDirectedEdge(source, i, 0.0));
    graph.addEdge(WeightedDirectedEdge(i + n, sink, 0.0));
    graph.addEdge(WeightedDirectedEdge(i, i + n, duration));
    const prec = precedents[i];
    if (prec === null) continue;
    for (let j = 0; j < prec.length; j += 1) {
      const precedent = prec[j];
      graph.addEdge(WeightedDirectedEdge(i + n, precedent, 0.0));
    }
  }

  const lp = EWDAGShortestLongestPaths(graph, source, false);

  const order = new Array(n).fill(null);
  for (let i = 0; i < n; i += 1) {
    order[i] = {
      index: i,
      start: lp.distanceTo(i),
      end: lp.distanceTo(i + n),
    };
  }

  return { order, total: lp.distanceTo(sink) };
};

module.exports = search;
