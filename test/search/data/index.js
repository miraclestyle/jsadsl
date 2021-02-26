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
      const tuple = line.toString().replace(/\s+/g, ' ').trim().split(' ')
        .map((e) => (Number(e)));
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

const BuildGraphs = () => (
  new Promise((resolve, reject) => {
    const cases = {
      tinyGraph: {
        file: 'tinyGraph.txt',
        directed: false,
        graph: null,
      },
      tinyDigraph: {
        file: 'tinyDigraph.txt',
        directed: true,
        graph: null,
      },
    };
    const keys = Object.keys(cases);
    const promises = keys.map((key) => (
      GraphFromFile(cases[key].file, cases[key].directed)
    ));
    Promise.all(promises)
      .then((results) => {
        keys.forEach((key, index) => {
          const cfg = cases[key];
          cfg.graph = results[index];
          cases[key] = cfg;
        });
        resolve(cases);
      })
      .catch((error) => (reject(error)));
  })
);

module.exports.Graphs = BuildGraphs;
