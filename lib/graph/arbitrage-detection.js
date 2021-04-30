const { WeightedGraph, WeightedDirectedEdge } = require('../ds');
const { BellmanFord } = require('.');

const search = (matrix) => {
  const name = new Array(matrix.length).fill(null);

  const graph = WeightedGraph(matrix.length, true);
  for (let p = 0; p < matrix.length; p += 1) {
    [name[p]] = matrix[p];
    for (let q = 1; q < matrix[p].length; q += 1) {
      const rate = matrix[p][q];
      const weight = -Math.log(rate);
      // console.log(p, q, matrix[q - 1][0], rate, weight, Math.exp(-weight));
      const edge = WeightedDirectedEdge(p, q - 1, weight);
      graph.addEdge(edge);
    }
  }

  // console.log(graph.toString());

  const spt = BellmanFord(graph, 0);
  let stake = 1000.0;
  if (spt.hasNegativeCycle()) {
    console.log('======================');
    spt.negativeCycle().forEach((edge) => {
      console.log(Math.round(100000 * stake) / 100000, name[edge.from()]);
      stake *= Math.exp(-edge.weight());
      console.log(Math.round(100000 * stake) / 100000, name[edge.to()]);
      console.log('======================');
    });
  }
  return stake;
};

module.exports = search;

const m = [
  ['USD', 1, 0.741, 0.657, 1.061, 1.005],
  ['EUR', 1.349, 1, 0.888, 1.433, 1.366],
  ['GBP', 1.521, 1.126, 1, 1.614, 1.538],
  ['CHF', 0.942, 0.698, 0.619, 1, 0.953],
  ['CAD', 0.995, 0.732, 0.650, 1.049, 1],
];

search(m);
