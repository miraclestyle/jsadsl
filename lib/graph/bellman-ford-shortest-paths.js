const { Queue, Stack, WeightedGraph } = require('../ds');
const { FindCycle } = require('.');

const search = (graph, source) => {
  const EPSILON = 1E-14;
  const distance = new Array(graph.V()).fill(Infinity);
  const parent = new Array(graph.V()).fill(null);
  const onQueue = new Array(graph.V()).fill(false);
  const queue = Queue();
  let cycle = null;
  let cost = 0;

  const hasNegativeCycle = () => (cycle !== null);

  const negativeCycle = () => (cycle);

  const valid = () => {
    if (hasNegativeCycle()) throw new Error('Negative cost cycle exists!');
    else return true;
  };

  const findNegativeCycle = () => {
    const cycleGraph = WeightedGraph(graph.V(), true);
    for (let i = 0; i < graph.V(); i += 1) {
      if (parent[i] !== null) {
        cycleGraph.addEdge(parent[i]);
      }
    }
    cycle = FindCycle(cycleGraph);
  };

  const relax = (p) => {
    graph.edges(p, (edge) => {
      if (hasNegativeCycle()) return;
      const q = edge.to();
      if (distance[q] > distance[p] + edge.weight() + EPSILON) {
        distance[q] = distance[p] + edge.weight();
        parent[q] = edge;
        if (!onQueue[q]) {
          queue.enqueue(q);
          onQueue[q] = true;
        }
      }
      cost += 1;
      if (cost % graph.V() === 0) findNegativeCycle();
    });
  };

  queue.enqueue(source);
  onQueue[source] = true;
  distance[source] = 0;
  while (!queue.empty() && !hasNegativeCycle()) {
    const p = queue.dequeue();
    onQueue[p] = false;
    relax(p);
  }

  const parentOf = (v) => (
    (valid() && parent[v] === null) ? null : parent[v].from()
  );

  const distanceTo = (v) => (valid() ? distance[v] : null);

  const hasPathTo = (v) => (valid() && distance[v] < Infinity);

  const pathTo = (v) => {
    if (!valid()) return null;
    const edges = Stack();
    for (let edge = parent[v]; edge !== null; edge = parent[edge.from()]) {
      edges.push(edge);
    }
    return edges;
  };

  const pathToString = (v) => {
    if (!valid()) return null;
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
    hasNegativeCycle,
    negativeCycle,
  };
};

module.exports = search;
