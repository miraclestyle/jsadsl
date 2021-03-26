const { Queue, Stack } = require('../ds');

const search = (graph, source) => {
  const distance = new Array(graph.V()).fill(Infinity);
  const parent = new Array(graph.V()).fill(null);
  const onQueue = new Array(graph.V()).fill(false);
  let cycle = null;
  let cost = 0;

  const hasNegativeCycle = () => (cycle !== null);

  const findNegativeCycle = () => {
    const V = parent.length;
  };

  const relax = (p) => {
    graph.edges(p, (edge) => {
      if (hasNegativeCycle()) return;
      const q = edge.to();
      if (distance[q] > distance[p] + edge.weight()) {
        distance[q] = distance[p] + edge.weight();
        parent[q] = edge;
        if (!onQueue[q]) {
          q.enqueue(q);
          onQueue[q] = true;
        }
      }
      cost += 1;
      if (cost % graph.V() === 0) {
        findNegativeCycle();
      }
    });
  };

  const q = Queue();
  q.enqueue(source);
  onQueue[source] = true;
  while (!q.empty() && !hasNegativeCycle()) {
    const p = q.dequeue();
    onQueue[p] = false;
    relax(p);
  }

  const parentOf = (v) => (parent[v] === null ? null : parent[v].from());

  const distanceTo = (v) => (distance[v]);

  const hasPathTo = (v) => (distance[v] < Infinity);

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
