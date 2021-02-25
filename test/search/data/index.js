const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { ds } = require('../../../lib');

const getFilePath = (fileName) => (
  path.resolve('.', 'test', 'search', 'data', fileName)
);

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
      const tuple = line.toString().split(' ').map((e) => (Number(e)));
      if (row === 0) [v] = [...tuple];
      else if (row > 1) edges.push(tuple);
      row += 1;
    });
    lines.on('close', () => {
      const graph = ds.Graph(v, directed);
      edges.forEach((e) => {
        graph.addEdge(...e);
      });
      if (v === 0) reject(new Error('Build failed!'));
      else resolve(graph);
    });
  })
);

module.exports.Graph = GraphFromFile;
