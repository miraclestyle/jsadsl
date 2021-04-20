const { Queue, IndexPriorityQueue } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const distance = new Array(graph.V()).fill(Infinity);
  const parent = new Array(graph.V()).fill(null);

  const compare = (a, b) => {
    if (a.weight() < b.weight()) return -1;
    if (a.weight() > b.weight()) return 1;
    return 0;
  };
  const ipq = IndexPriorityQueue(graph.V(), compare);

  const visit = (p) => {
    discovered[p] = true;
    graph.edges(p, (edge) => {
      const q = edge.other(p);
      if (discovered[q]) return;
      if (edge.weight() < distance[q]) {
        distance[q] = edge.weight();
        parent[q] = edge;
        if (ipq.contains(q)) ipq.update(q, edge);
        else ipq.insert(q, edge);
      }
    });
  };

  const run = (v) => {
    visit(v);
    while (!ipq.empty()) {
      const p = ipq.extract();
      visit(p);
    }
  };

  graph.vertices((p) => {
    if (!discovered[p]) run(p);
  });

  const edges = () => {
    const mst = Queue();
    for (let v = 0; v < parent.length; v += 1) {
      const edge = parent[v];
      if (edge !== null) mst.enqueue(edge);
    }
    return mst;
  };

  const weight = () => {
    let w = 0;
    const mst = edges();
    mst.forEach((edge) => {
      w += edge.weight();
    });
    return w;
  };

  return {
    edges,
    weight,
  };
};

module.exports = search;
