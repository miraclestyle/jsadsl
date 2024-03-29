const { Stack } = require('../ds');
const { TopologicalSort } = require('.');

const search = (graph, source, shortest = true) => {
  const parent = new Array(graph.V()).fill(null);
  const distance = new Array(graph.V()).fill(shortest ? Infinity : -Infinity);

  const relax = (edge) => {
    const p = edge.from();
    const q = edge.to();
    const shorter = distance[q] > distance[p] + edge.weight();
    const longer = distance[q] < distance[p] + edge.weight();
    const toRelax = shortest ? shorter : longer;
    if (toRelax) {
      distance[q] = distance[p] + edge.weight();
      parent[q] = edge;
    }
  };

  distance[source] = 0.0;

  const topological = TopologicalSort(graph);

  topological.forEach((p) => {
    graph.edges(p, relax);
  });

  const parentOf = (v) => (parent[v] === null ? null : parent[v].from());

  const distanceTo = (v) => (distance[v]);

  const hasPathTo = (v) => (
    shortest ? distance[v] < Infinity : distance[v] > -Infinity
  );

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
    parentOf,
    distanceTo,
    hasPathTo,
    pathTo,
    pathToString,
  };
};

module.exports = search;
