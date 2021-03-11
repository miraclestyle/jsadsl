const { getType } = require('../../util');

const ds = (v, directed = false) => {
  if (getType(v) !== 'integer') throw new Error('Invalid argument!');
  if (getType(directed) !== 'boolean') throw new Error('Invalid argument!');
  if (v < 1) throw new Error('Graph requires at least one vertex!');
  const g = new Array(v).fill(null);
  let e = 0;

  const Edge = (vertex, next = null) => ({ vertex, next });

  const V = () => (v);

  const E = () => (e);

  const validateVertex = (p) => {
    if (getType(p) !== 'integer') throw new Error('Invalid argument!');
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
    for (let edge = g[p]; edge !== null; edge = edge.next) {
      callback(edge.vertex);
    }
  };

  const edgesIterator = (p) => {
    const iterator = () => {
      validateVertex(p);
      let edge = g[p];

      const next = () => {
        const result = { value: null, done: false };
        if (edge === null) {
          result.done = true;
        } else {
          result.value = edge.vertex;
          edge = edge.next;
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
    const s = [];
    vertices((p) => {
      const vertexEdges = [];
      vertexEdges.push(p.toString());
      edges(p, (q) => {
        vertexEdges.push(q.toString());
      });
      s.push(vertexEdges.join('->'));
    });
    return s.join('\n');
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
