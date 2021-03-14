const { Stack } = require('../ds');
const { TopologicalSort } = require('.');

const search = (graph, source) => {
  const parent = new Array(graph.V()).fill(null);
  const distance = new Array(graph.V()).fill(Infinity);

  const relax = (edge) => {
    const p = edge.from();
    const q = edge.to();
    if (distance[q] > distance[p] + edge.weight()) {
      distance[q] = distance[p] + edge.weight();
      parent[q] = edge;
    }
  };

  distance[source] = 0.0;

  const topological = TopologicalSort(graph);

  topological.forEach((p) => {
    graph.edges(p, relax);
  });

  const distanceTo = (v) => (distance[v]);

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
    parentOf,
    pathTo,
    weightTo,
    pathToString,
  };
};

module.exports = search;
