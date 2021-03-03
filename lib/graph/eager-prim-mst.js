const { Queue, IndexPriorityQueue } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const mst = Queue();
  let w = 0;

  const compare = (a, b) => {
    if (a.weight() > b.weight()) return -1;
    if (a.weight() < b.weight()) return 1;
    return 0;
  };
  const ipq = IndexPriorityQueue(graph.V(), compare);

  const visit = (p) => {
    discovered[p] = true;
    graph.edges(p, (edge) => {
      const q = edge.other(p);
      if (discovered[q]) return;
      if (!ipq.contains(q)) ipq.insert(q, edge);
      else if (edge.weight() < ipq.valueOf(q).weight()) ipq.update(q, edge);
    });
  };

  const run = (v) => {
    visit(v);
    while (!ipq.empty()) {
      const edge = ipq.valueOf(ipq.peekIndex());
      const p = ipq.extract();
      mst.enqueue(edge);
      w += edge.weight();
      visit(p);
    }
  };

  graph.vertices((p) => {
    if (!discovered[p]) run(p);
  });

  const edges = () => (mst);

  const weight = () => (w);

  return {
    edges,
    weight,
  };
};

module.exports = search;
