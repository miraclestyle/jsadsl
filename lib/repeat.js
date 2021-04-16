const ds = (size, directed = false) => {
  if (size < 1) {
    throw new Error('Graph requires at least one vertex!');
  }
  const graph = new Array(size).fill(null);
  let e = 0;

  const Node = (value, next = null) => ({ value, next });

  const validateVertex = (v) => {
    if (v < 0 || v > size - 1) {
      throw new Error('Vertex not in graph!');
    }
  };

  const isDirected = () => (directed);

  const V = () => (size);

  const E = () => (e);

  const addEdge = (v, u) => {
    validateVertex(v);
    validateVertex(u);
    graph[v] = Node(u, graph[v]);
    if (directed) graph[u] = Node(v, graph[u]);
    e += 1;
  };

  const vertices = (callback) => {
    for (let i = 0; i < size; i += 1) {
      callback(i);
    }
  };

  const edges = (v, callback) => {
    for (let node = graph[v]; node !== null; node = node.next) {
      callback(node.value);
    }
  };

  const reverse = () => {
    if (!directed) return null;
    const rGraph = ds(size, directed);
    vertices((v) => {
      edges(v, (u) => {
        rGraph.addEdge(u, v);
      });
    });
    return rGraph;
  };

  return Object.freeze({
    V,
    E,
    isDirected,
    addEdge,
    vertices,
    edges,
    reverse,
  });
};

module.exports = ds;
