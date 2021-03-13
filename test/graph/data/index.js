const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { ds } = require('../../../lib');

const getFilePath = (fileName) => (
  path.resolve('.', 'test', 'graph', 'data', fileName)
);

const generateGraph = (v, directed, edges) => {
  const graph = ds.Graph(v, directed);
  edges.forEach((e) => {
    graph.addEdge(...e);
  });
  return graph;
};

const generateWeightedGraph = (v, directed, edges) => {
  const graph = ds.WeightedGraph(v, directed);
  edges.forEach((e) => {
    const edge = directed ? ds.WeightedDirectedEdge(...e) : ds.WeightedEdge(...e);
    graph.addEdge(edge);
  });
  return graph;
};

const GraphFromFile = (fileName, directed) => (
  new Promise((resolve, reject) => {
    const filePath = getFilePath(fileName);
    const lines = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });
    let v = 0;
    let row = 0;
    const edges = [];
    lines.on('line', (line) => {
      const tuple = line.toString().replace(/\s+/g, ' ').trim().split(' ')
        .map((e) => (Number(e)));
      if (row === 0) [v] = [...tuple];
      else if (row > 1) edges.push(tuple);
      row += 1;
    });
    lines.on('close', () => {
      if (v === 0) {
        reject(new Error('Build failed!'));
        return;
      }
      let graph;
      if (edges[0].length === 2) {
        graph = generateGraph(v, directed, edges);
      }
      if (edges[0].length === 3) {
        graph = generateWeightedGraph(v, directed, edges);
      }
      resolve(graph);
    });
  })
);

module.exports.Graph = GraphFromFile;
