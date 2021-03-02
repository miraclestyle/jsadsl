const {
  describe,
  test,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['KruskalMST'];

const graphs = [
  ['mediumEWG.txt', false],
  ['1000EWG.txt', false],
];

describe.each(names)('%s', (name) => {
  test('should find mst in a weighted graph', (done) => {
    const edges = new Set([
      '4-0.35->5',
      '5-0.28->7',
      '0-0.16->7',
      '2-0.17->3',
      '1-0.19->7',
      '0-0.26->2',
      '6-0.4->2',
    ]);
    const notInMST = new Set();
    Graph('tinyEWG.txt', false).then((g) => {
      const mst = graph[name](g);
      while (!mst.empty()) {
        const edge = mst.dequeue();
        const s = edge.toString();
        if (!edges.delete(s)) notInMST.add(s);
      }
      if (edges.size > 0) done(new Error('MST incomplete!'));
      if (notInMST.size > 0) done(new Error('Rogue edges in MST!'));
      else done();
    });
  });

  test.each(graphs)('should find mst in a weighted graph', (file, dir, done) => {
    Graph(file, dir).then((g) => {
      const mst = graph[name](g);
      if (mst.size() === g.V() - 1) done();
      else done(new Error('MST incomplete!'));
    });
  });
});
