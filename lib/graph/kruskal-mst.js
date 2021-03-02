const { Queue, UnionFind, PriorityQueue } = require('../ds');

const search = (graph) => {
  const mst = Queue();

  const compare = (a, b) => {
    if (a.weight() > b.weight()) return -1;
    if (a.weight() < b.weight()) return 1;
    return 0;
  };

  const pq = PriorityQueue(compare);
  const uf = UnionFind(graph.V());

  graph.vertices((p) => {
    graph.edges(p, (edge) => {
      pq.insert(edge);
    });
  });

  while (!pq.empty() && mst.size() < graph.V() - 1) {
    const edge = pq.extract();
    const p = edge.either();
    const q = edge.other(p);
    if (!uf.connected(p, q)) {
      uf.union(p, q);
      mst.enqueue(edge);
    }
  }

  return mst;
};

module.exports = search;
