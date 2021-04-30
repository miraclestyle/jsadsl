const { WeightedGraph, WeightedDirectedEdge } = require('../ds');
const { BellmanFord } = require('.');

const search = (matrix) => {
  const m = [
    ['USD', 1, 0.741, 0.657, 1.061, 1.005],
    ['EUR', 1.349, 1, 0.888, 1.433, 1.366],
    ['GBP', 1.521, 1.126, 1, 1.614, 1.538],
    ['CHF', 0.942, 0.698, 0.619, 1, 0.953],
    ['CAD', 0.995, 0.732, 0.650, 1.049, 1],
  ];

  const graph = WeightedGraph(matrix.length, true);
  for (let v = 0; v < matrix.length; v += 1) {
    const name = matrix[v][0];
    for (let w = 1; w < matrix.length; w += 1) {
      const rate = matrix[v][w];
      if (v !== w) {
        const edge = WeightedDirectedEdge(v, w, -Math.log(rate));
        graph.addEdge(edge);
      }
    }
  }

  const spt = BellmanFord(graph, 0);
  if (spt.hasNegativeCycle()) {
    const stake = 1000.0;
    spt.negativeCycle().forEach((v) => {
      
    });
  }

};

module.exports = search;
