const { Queue, PriorityQueue } = require('../ds');

const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const mst = Queue();
  let w = 0;

  const compare = (a, b) => {
    if (a.weight() > b.weight()) return -1;
    if (a.weight() < b.weight()) return 1;
    return 0;
  };
  const pq = PriorityQueue(compare);

  const visit = (p) => {
    discovered[p] = true;
    graph.edges(p, (edge) => {
      if (!discovered[edge.other(p)]) pq.insert(edge);
    });
  };

  const run = (v) => {
    visit(v);
    while (!pq.empty()) {
      const edge = pq.extract();
      const p = edge.either();
      const q = edge.other(p);
      if (discovered[p] && discovered[q]) continue;
      mst.enqueue(edge);
      w += edge.weight();
      if (!discovered[p]) visit(p);
      if (!discovered[q]) visit(q);
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
