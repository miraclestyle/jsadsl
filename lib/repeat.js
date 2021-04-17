const { Queue, Stack } = require('./ds');

const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  const distance = new Array(graph.V()).fill(0);
  const parent = new Array(graph.V()).fill(-1);

  const bfs = (q) => {
    while (!q.empty()) {
      const v = q.dequeue();
      graph.edges(v, (u) => {
        if (!discovered[u]) {
          q.enqueue(u);
          discovered[u] = true;
          parent[u] = v;
          distance[u] = distance[v] + 1;
        }
      });
    }
  };

  const q = Queue();
  if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i += 1) {
      q.enqueue(source[i]);
      discovered[source[i]] = true;
    }
  } else {
    q.enqueue(source);
    discovered[source] = true;
  }
  bfs(q);

  const hasPathTo = (v) => (discovered[v]);

  const pathTo = (v) => {
    const path = Stack();
    for (let u = v; u !== -1; u = parent[u]) {
      path.push(u);
    }
    return path;
  };

  const pathToString = (v) => {
    const path = pathTo(v);
    const results = [];
    while (!path.empty()) {
      results.push((path.pop()).toString());
    }
    return results.join('->');
  };

  const parentOf = (v) => (parent[v]);

  const distanceTo = (v) => (distance[v]);

  return Object.freeze({
    hasPathTo,
    pathTo,
    pathToString,
    parentOf,
    distanceTo,
  });
};

module.exports = search;
