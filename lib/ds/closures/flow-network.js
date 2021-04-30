const ds = (n) => {
  if (n < 0) {
    throw new Error('Number of vertices in a Graph must be non-negative!');
  }
  const graph = new Array(n).fill(null);
  let e = 0;

  const Node = (value, next = null) => ({ value, next });

  const validateVertex = (vertex) => {
    if (vertex < 0 || vertex >= n) {
      throw new Error('Vertex out of bounds:', vertex);
    }
  };

  const V = () => (n);

  const E = () => (e);

  const addEdge = (edge) => {
    const v = edge.from();
    const w = edge.to();
    validateVertex(v);
    validateVertex(w);
    graph[v] = Node(edge, graph[v]);
    graph[w] = Node(edge, graph[w]);
    e += 1;
  };

  const edges = (vertex, callback) => {
    let node = graph[vertex];
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  const vertices = (callback) => {
    for (let v = 0; v < n; v += 1) {
      callback(v);
    }
  };

  const toString = () => {
    const result = [];
    vertices((v) => {
      const vEdges = [];
      edges(v, (edge) => {
        vEdges.push(edge.toString());
      });
      result.push(vEdges.join(' | '));
    });
    return result.join('\n');
  };

  return Object.freeze({
    V,
    E,
    addEdge,
    edges,
    vertices,
    toString,
  });
};

module.exports = ds;
