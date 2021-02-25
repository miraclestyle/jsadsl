const ds = (v, directed = false) => {
  if (v < 1) throw new Error('Graph requires at least one vertex!');
  const g = new Array(v).fill(null);
  let e = 0;

  const Edge = (vertex, next = null) => ({ vertex, next });

  const V = () => (v);

  const E = () => (e);

  const validateVertex = (p) => {
    if (p < 0 || p >= v) throw new Error('Vertex not in graph!');
  };

  const isDirected = () => (directed);

  const addEdge = (p, q) => {
    validateVertex(p);
    validateVertex(q);
    g[p] = Edge(q, g[p]);
    if (!directed) g[q] = Edge(p, g[q]);
    e += 1;
  };

  const vertices = (callback) => {
    for (let p = 0; p < v; p += 1) {
      callback(p);
    }
  };

  const vertexIterator = () => {
    const iterator = () => {
      let p = 0;

      const next = () => {
        const result = { value: null, done: false };
        if (p >= v) {
          result.done = true;
        } else {
          result.value = p;
          p += 1;
        }
        return result;
      };

      return { next };
    };

    return { [Symbol.iterator]: iterator };
  };

  const edges = (p, callback) => {
    validateVertex(p);
    for (let node = g[p]; node !== null; node = node.next) {
      callback(node.vertex);
    }
  };

  const edgesIterator = () => {
    const iterator = (p) => {
      validateVertex(p);
      let node = g[p];

      const next = () => {
        const result = { value: null, done: false };
        if (node === null) {
          result.done = true;
        } else {
          result.value = node.vertex;
          node = node.next;
        }
        return result;
      };

      return { next };
    };

    return { [Symbol.iterator]: iterator };
  };

  const reverse = () => {
    if (!directed) return null;
    const rg = ds(v, directed);
    vertices((p) => {
      edges(p, (q) => {
        rg.addEdge(q, p);
      });
    });
    return rg;
  };

  const toString = () => {
    let s = '';
    vertices((p) => {
      s += p.toString();
      edges(p, (q) => {
        s += `->${q}`;
      });
      s += '\n';
    });
    return s;
  };

  return {
    V,
    E,
    isDirected,
    addEdge,
    vertices,
    vertexIterator,
    edges,
    edgesIterator,
    reverse,
    toString,
  };
};

module.exports = ds;
