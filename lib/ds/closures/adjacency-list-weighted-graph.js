const { getType } = require('../../util');
const { WeightedGraphEdge } = require('.');

const ds = (v, directed = false) => {
  if (getType(v) !== 'integer') throw new Error('Invalid argument!');
  if (getType(directed) !== 'boolean') throw new Error('Invalid argument!');
  if (v < 1) throw new Error('Graph requires at least one vertex!');
  const g = new Array(v).fill(null);
  let e = 0;

  const Node = (edge, next = null) => ({ edge, next });

  const V = () => (v);

  const E = () => (e);

  const validateVertex = (vertex, end = Infinity) => {
    if (getType(vertex) !== 'integer') throw new Error('Invalid argument!');
    if (vertex < 0 || vertex >= end) throw new Error('Vertex not in graph!');
  };

  const validateWeight = (weight) => {
    const t = getType(weight);
    if (t !== 'float' && t !== 'null') throw new Error('Invalid argument!');
  };

  const validateEdgeProp = (edge, prop) => {
    if ((prop in edge) && (getType(edge[prop]) === 'function')) return;
    throw new Error('Invalid edge!');
  };

  const validateEdgeProps = (edge) => {
    const props = [
      'either',
      'other',
      'weight',
      'compare',
      'toString',
    ];
    for (let i = 0; i < props.length; i += 1) {
      validateEdgeProp(edge, props[i]);
    }
  };

  const valiadateEdge = (edge) => {
    validateEdgeProps(edge);
    validateVertex(edge.either(), v);
    validateVertex(edge.other(edge.either()), v);
    validateWeight(edge.weight());
  };

  const isDirected = () => (directed);

  const addEdge = (edge) => {
    valiadateEdge(edge);
    const p = edge.either();
    const q = edge.other(p);
    g[p] = Node(edge, g[p]);
    if (!directed) g[q] = Node(edge, g[q]);
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
    validateVertex(p, v);
    for (let node = g[p]; node !== null; node = node.next) {
      callback(node.edge);
    }
  };

  const edgesIterator = (p) => {
    const iterator = () => {
      validateVertex(p, v);
      let node = g[p];

      const next = () => {
        const result = { value: null, done: false };
        if (node === null) {
          result.done = true;
        } else {
          result.value = node.edge;
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
      edges(p, (edge) => {
        const q = edge.other(p);
        const w = edge.weight();
        rg.addEdge(WeightedGraphEdge(q, p, w));
      });
    });
    return rg;
  };

  const toString = () => {
    let s = '';
    vertices((p) => {
      s += p.toString();
      s += '|';
      edges(p, (edge) => {
        s += edge.toString();
        s += '|';
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
