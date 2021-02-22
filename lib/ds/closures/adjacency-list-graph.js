const ds = (v, directed = false) => {
  const g = new Array(v).fill(null);
  let e = 0;

  const Node = (value, next = null) => ({ value, next });

  const V = () => (v);

  const E = () => (e);

  const addEdge = (p, q, d = directed) => {
    g[p] = Node(q, g[p]);
    if (!d) addEdge(q, p, true);
    else e += 1;
  };

  const vertices = (callback) => {
    for (let p = 0; p < v; p += 1) {
      callback(p);
    }
  };

  const edges = (p, callback) => {
    for (let node = g[p]; node !== null; node = node.next) {
      callback(node.value);
    }
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
    toString,
  };
};

module.exports = ds;
