const { IndexPriorityQueue, Stack } = require('../ds');

const search = (graph, source, destination, h) => {
  const parent = new Array(graph.V()).fill(null);
  const distance = new Array(graph.V()).fill(Infinity);
  const estimate = new Array(graph.V()).fill(Infinity);
  const ipq = IndexPriorityQueue((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  const path = (current) => {
    const stack = Stack();
    let edge = parent[current];
    while (edge !== null) {
      stack.push(edge);
      edge = parent[edge.from()];
    }
    return stack;
  };

  distance[source] = 0.0;
  estimate[source] = h(source, 0.0);
  ipq.insert(source, estimate[source]);
  while (!ipq.empty()) {
    const current = ipq.extract();
    if (current === destination) return path(current);
    graph.edges(current, (edge) => {
      const p = edge.from();
      const q = edge.to();
      const w = edge.weight();
      if (distance[q] > distance[p] + w) {
        parent[q] = edge;
        distance[q] = distance[p] + w;
        estimate[q] = distance[q] + h(q, w);
        if (!ipq.contains(q)) {
          ipq.insert(q, estimate[q]);
        }
      }
    });
  }

  return {
    distanceTo,
    parentOf,
    weight,
    pathTo,
    pathToString,
  };
};

module.exports = search;
