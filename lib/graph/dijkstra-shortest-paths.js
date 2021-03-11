const { Stack, IndexPriorityQueue } = require('../ds');

const search = (graph, source) => {
  const parent = new Array(graph.V()).fill(null);
  const distance = new Array(graph.V()).fill(Infinity);
  let w = 0;

  graph.vertices((p) => {
    graph.edges(p, (edge) => {
      if (edge.weight() < 0) {
        throw new Error(`Negative weight edge detected: ${edge.toString()}`);
      }
    });
  });

  const compare = (a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  };
  const ipq = IndexPriorityQueue(graph.V(), compare);

  const relax = (edge) => {
    const p = edge.from();
    const q = edge.to();
    if (distance[q] > distance[p] + edge.weight()) {
      distance[q] = distance[p] + edge.weight();
      parent[q] = edge;
      if (ipq.contains(q)) ipq.update(q, distance[q]);
      else ipq.insert(q, distance[q]);
    }
  };

  distance[source] = 0.0;
  ipq.insert(source, 0.0);
  while (!ipq.empty()) {
    const edgeWeight = ipq.valueOf(ipq.peekIndex());
    const p = ipq.extract();
    w += edgeWeight;
    graph.edges(p, (edge) => {
      relax(edge);
    });
  }

  const distanceTo = (v) => (distance[v]);

  const parentOf = (v) => (parent[v] === null ? null : parent[v].from());

  const weight = () => (w);

  const pathTo = (v) => {
    const edges = Stack();
    for (let edge = parent[v]; edge !== null; edge = parent[edge.from()]) {
      edges.push(edge);
    }
    return edges;
  };

  const pathToString = (v) => {
    const edges = pathTo(v);
    const s = [];
    while (!edges.empty()) {
      s.push(edges.pop().toString());
    }
    return s.join('|');
  };

  return {
    distanceTo,
    parentOf,
    weight,
    pathTo,
    pathToString,
  };
};

module.exports = search;
