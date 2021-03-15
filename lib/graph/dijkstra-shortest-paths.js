const { Stack, IndexPriorityQueue } = require('../ds');

const search = (graph, source) => {
  const parent = new Array(graph.V()).fill(null);
  const distance = new Array(graph.V()).fill(Infinity);

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
    const p = ipq.extract();
    graph.edges(p, (edge) => {
      relax(edge);
    });
  }

  const distanceTo = (v) => (distance[v]);

  const hasPathTo = (v) => (distance[v] < Infinity);

  const parentOf = (v) => (parent[v] === null ? null : parent[v].from());

  const pathTo = (v) => {
    const edges = Stack();
    for (let edge = parent[v]; edge !== null; edge = parent[edge.from()]) {
      edges.push(edge);
    }
    return edges;
  };

  const weightTo = (v) => {
    const path = pathTo(v);
    let w = 0;
    while (!path.empty()) {
      w += path.pop().weight();
    }
    return w;
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
    hasPathTo,
    parentOf,
    pathTo,
    weightTo,
    pathToString,
  };
};

module.exports = search;