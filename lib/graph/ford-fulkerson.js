const { Queue } = require('../ds');

const search = (graph, s, t) => {
  if (s === t) throw new Error('Source equals target!');
  let discovered = new Array(graph.V()).fill(false);
  let parent = new Array(graph.V()).fill(null);
  let V = 0;

  const validate = (v) => {
    if (v < 0 || v >= graph.V()) {
      throw new Error('Vertex out of bounds!');
    }
  };

  const excess = (v) => {
    let result = 0;
    graph.edges(v, (edge) => {
      if (v === edge.from()) result -= edge.flow();
      else result += edge.flow();
    });
    return result;
  };

  const hasAugmentingPath = () => {
    const newDiscovered = new Array(graph.V()).fill(false);
    const newParent = new Array(graph.V()).fill(null);
    const q = Queue();
    q.enqueue(s);
    newDiscovered[s] = true;
    while (!q.empty() && !newDiscovered[t]) {
      const v = q.dequeue();
      graph.edges(v, (edge) => {
        const w = edge.other(v);
        if (edge.residualCapacityTo(w) > 0) {
          if (!newDiscovered[w]) {
            newParent[w] = edge;
            newDiscovered[w] = true;
            q.enqueue(q);
          }
        }
      });
    }
    discovered = newDiscovered;
    parent = newParent;
  };

  V = excess(t);
  while (hasAugmentingPath()) {
    let bottle = Infinity;
    for (let v = t; v !== s; v = parent[v].other(v)) {
      bottle = Math.min(bottle, parent[v].residualCapacity(v));
    }
    for (let v = t; v !== s; v = parent[v].other(v)) {
      parent[v].addResidualFlowTo(v, bottle);
    }
    V += bottle;
  }

  const value = () => (V);

  const inCut = (v) => {
    validate(v);
    return discovered[v];
  };

  return Object.freeze({
    value,
    inCut,
  });
};

module.exports = search;
