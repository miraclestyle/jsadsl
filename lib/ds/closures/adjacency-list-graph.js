const ds = (v, directed = false) => {
  const g = new Array(v).fill(null);
  let e = 0;

  const Edge = (vertex, next = null) => ({ vertex, next });

  const V = () => (v);

  const E = () => (e);

  const addEdge = (p, q) => {
    g[p] = Edge(q, g[p]);
    if (!directed) g[q] = Edge(p, g[q]);
    e += 1;
  };

  const vertices = (callback) => {
    for (let p = 0; p < v; p += 1) {
      callback(p);
    }
  };

  const edges = (p, callback) => {
    for (let node = g[p]; node !== null; node = node.next) {
      callback(node.vertex);
    }
  };

  const degree = (p) => {
    let deg = 0;
    edges(p, () => {
      deg += 1;
    });
    return deg;
  };

  const maxDegree = () => {
    let maxDeg = 0;
    vertices((p) => {
      const deg = degree(p);
      if (deg > maxDeg) maxDeg = deg;
    });
    return maxDeg;
  };

  const averageDegree = () => (2 * (E() / V()));

  const countSelfLoops = () => {
    let count = 0;
    vertices((p) => {
      edges(p, (q) => {
        if (p === q) count += 1;
      });
    });
    return count;
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
    addEdge,
    vertices,
    edges,
    degree,
    maxDegree,
    averageDegree,
    countSelfLoops,
    toString,
  };
};

module.exports = ds;
