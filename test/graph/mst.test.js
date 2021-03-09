const {
  describe,
  test,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['KruskalMST', 'LazyPrimMST', 'EagerPrimMST'];

const graphs = [
  ['mediumEWG.txt', false],
  ['1000EWG.txt', false],
];

describe.each(names)('%s', (name) => {
  test('should find mst in a weighted graph', (done) => {
    const expected = new Set([
      '4<-0.35->5',
      '5<-0.28->7',
      '0<-0.16->7',
      '2<-0.17->3',
      '1<-0.19->7',
      '0<-0.26->2',
      '6<-0.4->2',
    ]);
    const notInMST = new Set();
    Graph('tinyEWG.txt', false).then((g) => {
      const mst = graph[name](g);
      const edges = mst.edges();
      while (!edges.empty()) {
        const edge = edges.dequeue();
        const s = edge.toString();
        if (!expected.delete(s)) notInMST.add(s);
      }
      if (expected.size > 0) done(new Error('MST incomplete!'));
      if (notInMST.size > 0) done(new Error('Rogue edges in MST!'));
      else done();
    });
  });

  test.each(graphs)('should find mst in a weighted graph', (file, dir, done) => {
    Graph(file, dir).then((g) => {
      const mst = graph[name](g);
      const edges = mst.edges();
      if (edges.size() === g.V() - 1) done();
      else done(new Error('MST incomplete!'));
    });
  });
});

describe('KruskalMST, LazyPrimMST, EagerPrimMST', () => {
  test('should ensure that the three algorithms produce same MST', (done) => {
    const error = (text) => (new Error(text));
    Graph('1000EWG.txt', false).then((g) => {
      const kruskal = graph.KruskalMST(g);
      const lazyPrim = graph.LazyPrimMST(g);
      const eagerPrim = graph.EagerPrimMST(g);
      const kruskalW = Number.parseFloat(kruskal.weight()).toPrecision(6);
      const lazyPrimW = Number.parseFloat(lazyPrim.weight()).toPrecision(6);
      const eagerPrimW = Number.parseFloat(eagerPrim.weight()).toPrecision(6);
      const kruskalS = kruskal.edges().size();
      const lazyPrimS = lazyPrim.edges().size();
      const eagerPrimS = eagerPrim.edges().size();
      if (kruskalW !== lazyPrimW) done(error('kruskalW !== lazyPrimW'));
      if (kruskalW !== eagerPrimW) done(error('kruskalW !== eagerPrimW'));
      if (lazyPrimW !== eagerPrimW) done(error('lazyPrimW !== eagerPrimW'));
      if (kruskalS !== lazyPrimS) done(error('kruskalS !== lazyPrimS'));
      if (kruskalS !== eagerPrimS) done(error('kruskalS !== eagerPrimS'));
      if (lazyPrimS !== eagerPrimS) done(error('lazyPrimS !== eagerPrimS'));
      done();
    });
  });
});
