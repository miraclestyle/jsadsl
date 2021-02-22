class Graph {
  constructor(v, directed = false) {
    this.g = new Array(v).fill(null);
    this.v = v;
    this.e = 0;
    this.directed = directed;
  }

  Node(value, next = null) {
    const v = this.v;
    return { value, next };
  }

  V() {
    return this.v;
  }

  E() {
    return this.e;
  }

  addEdge(p, q, d = this.directed) {
    this.g[p] = this.Node(q, this.g[p]);
    if (!d) this.addEdge(q, p, true);
    else this.e += 1;
  }

  vertices(callback) {
    for (let p = 0; p < this.v; p += 1) {
      callback(p);
    }
  }

  edges(p, callback) {
    for (let node = this.g[p]; node !== null; node = node.next) {
      callback(node.value);
    }
  }

  toString() {
    let s = '';
    this.vertices((p) => {
      s += p.toString();
      this.edges(p, (q) => {
        s += `->${q}`;
      });
      s += '\n';
    });
    return s;
  }
}

module.exports = Graph;
