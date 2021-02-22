class Graph {
  constructor(v, directed = false) {
    this.g = new Array(v).fill(null);
    this.v = v;
    this.e = 0;
    this.directed = directed;
  }

  Edge(vertex, next = null) {
    return { vertex, next };
  }

  V() {
    return this.v;
  }

  E() {
    return this.e;
  }

  addEdge(p, q) {
    this.g[p] = this.Edge(q, this.g[p]);
    if (!this.directed) this.g[q] = this.Edge(p, this.g[q]);
    this.e += 1;
  }

  vertices(callback) {
    for (let p = 0; p < this.v; p += 1) {
      callback(p);
    }
  }

  edges(p, callback) {
    for (let node = this.g[p]; node !== null; node = node.next) {
      callback(node.vertex);
    }
  }

  degree(p) {
    let deg = 0;
    this.edges(p, () => {
      deg += 1;
    });
    return deg;
  }

  maxDegree() {
    let maxDeg = 0;
    this.vertices((p) => {
      const deg = this.degree(p);
      if (deg > maxDeg) maxDeg = deg;
    });
    return maxDeg;
  }

  averageDegree() {
    return 2 * (this.E() / this.V());
  }

  countSelfLoops() {
    let count = 0;
    this.vertices((p) => {
      this.edges(p, (q) => {
        if (p === q) count += 1;
      });
    });
    return count;
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
