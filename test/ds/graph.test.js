const {
  describe,
  expect,
  test,
  beforeEach,
} = require('@jest/globals');
const { ds, repeat } = require('../../lib');

ds.repeat = repeat;

const graphs = [
  ['Graph', 13, false],
  ['Graph', 13, true],
];

const weightedGraphs = [
  ['WeightedGraph', 13, false],
  ['WeightedGraph', 13, true],
];

let graph = null;

describe.each(graphs)('%s', (name, v, directed) => {
  beforeEach(() => {
    graph = ds[name](v, directed);
  });

  test('should verify isDirected method on a non-empty graph', () => {
    expect(graph.isDirected()).toBe(directed);
  });

  test('should verify V method on a non-empty graph', () => {
    expect(graph.V()).toBe(13);
  });

  test('should verify E method on a non-empty graph', () => {
    expect(graph.E()).toBe(0);
    graph.addEdge(0, 5);
    expect(graph.E()).toBe(1);
  });

  test('should verify vertices method on a non-empty graph', () => {
    let vertex = 0;
    graph.vertices((p) => {
      expect(p).toBe(vertex);
      vertex += 1;
    });
  });

  test('should verify addEdge and edges methods on a non-empty graph', () => {
    graph.addEdge(0, 5);
    const vertices = new Set([5]);
    graph.edges(0, (q) => {
      expect(vertices.has(q)).toBe(true);
    });
    expect(() => {
      graph.addEdge(-3, 5);
    }).toThrowError('Vertex not in graph!');
    expect(() => {
      graph.addEdge(0, 21);
    }).toThrowError('Vertex not in graph!');
    expect(() => {
      graph.addEdge(-3, 21);
    }).toThrowError('Vertex not in graph!');
  });

  test('should verify vertices and edges method on a non-empty graph', () => {
    const edges = [
      [0, 5], [4, 3],
      [0, 1], [9, 12],
      [6, 4], [5, 4],
      [0, 2], [11, 12],
      [9, 10], [0, 6],
      [7, 8], [9, 11],
      [5, 3],
    ];
    const vertices = Array.from(new Array(13), () => new Set());
    edges.map((e) => {
      const [p, q] = [...e];
      graph.addEdge(p, q);
      vertices[p].add(q);
      if (!directed) vertices[q].add(p);
      return null;
    });
    graph.vertices((p) => {
      graph.edges(p, (q) => {
        expect(vertices[p].has(q)).toBe(true);
      });
    });
  });

  test('should verify reverse method on a non-empty directed graph', () => {
    if (directed) {
      graph.addEdge(0, 5);
      const rg = graph.reverse();
      const vertices = new Set([0]);
      rg.edges(5, (q) => {
        expect(vertices.has(q)).toBe(true);
      });
    }
  });
});

describe.each(graphs)('%s', (name, v, directed) => {
  test('should verify graph constructor', () => {
    expect(() => {
      graph = ds[name](0, directed);
    }).toThrowError('Graph requires at least one vertex!');
  });
});

describe('Weighted Graph Edge', () => {
  test('should verify edge constructor', () => {
    expect(() => {
      ds.WeightedEdge('0', 5);
    }).toThrowError('Invalid argument!');
    expect(() => {
      ds.WeightedEdge(0, '5');
    }).toThrowError('Invalid argument!');
    expect(() => {
      ds.WeightedEdge(-1, 5);
    }).toThrowError('Invalid argument!');
    expect(() => {
      ds.WeightedEdge(1, -5);
    }).toThrowError('Invalid argument!');
    expect(() => {
      ds.WeightedEdge(-1, -5);
    }).toThrowError('Invalid argument!');
    expect(() => {
      ds.WeightedEdge(1, 5, 1);
    }).toThrowError('Invalid argument!');
  });

  test('should verify either method', () => {
    const edge = ds.WeightedEdge(1, 5, 1.1);
    expect(edge.either()).toBe(1);
  });

  test('should verify other method', () => {
    const edge = ds.WeightedEdge(1, 5, 1.1);
    const p = edge.either();
    expect(edge.other(p)).toBe(5);
  });

  test('should verify weight method', () => {
    const edge = ds.WeightedEdge(1, 5, 1.1);
    const w = edge.weight();
    expect(w).toBe(1.1);
  });

  test('should verify toString method', () => {
    const edge = ds.WeightedEdge(1, 5, 1.1);
    const s = edge.toString();
    expect(s).toBe('1-1.1->5');
  });

  test('should verify compare method', () => {
    const a = ds.WeightedEdge(1, 5, 0.9);
    const b = ds.WeightedEdge(1, 7, 1.1);
    const c = ds.WeightedEdge(1, 5, 1.3);
    const d = ds.WeightedEdge(1, 5, 1.1);
    expect(a.compare(a, b)).toBeLessThan(0);
    expect(a.compare(c, b)).toBeGreaterThan(0);
    expect(a.compare(d, b)).toBe(0);
  });
});

describe.each(weightedGraphs)('%s', (name, v, directed) => {
  beforeEach(() => {
    graph = ds[name](v, directed);
  });

  test('should verify isDirected method on a non-empty graph', () => {
    expect(graph.isDirected()).toBe(directed);
  });

  test('should verify V method on a non-empty graph', () => {
    expect(graph.V()).toBe(13);
  });

  test('should verify E method on a non-empty graph', () => {
    expect(graph.E()).toBe(0);
    graph.addEdge(ds.WeightedEdge(0, 5));
    expect(graph.E()).toBe(1);
  });

  test('should verify vertices method on a non-empty graph', () => {
    let vertex = 0;
    graph.vertices((p) => {
      expect(p).toBe(vertex);
      vertex += 1;
    });
  });

  test('should verify addEdge and edges methods on a non-empty graph', () => {
    graph.addEdge(ds.WeightedEdge(0, 5));
    const vertices = new Set([5]);
    graph.edges(0, (edge) => {
      expect(vertices.has(edge.other(0))).toBe(true);
    });
    expect(() => {
      graph.addEdge(ds.WeightedEdge(-3, 5));
    }).toThrowError('Invalid argument!');
    expect(() => {
      graph.addEdge(ds.WeightedEdge(0, 21));
    }).toThrowError('Vertex not in graph!');
    expect(() => {
      graph.addEdge(ds.WeightedEdge(-3, 21));
    }).toThrowError('Invalid argument!');
  });

  test('should verify vertices and edges method on a non-empty graph', () => {
    const edges = [
      [0, 5], [4, 3],
      [0, 1], [9, 12],
      [6, 4], [5, 4],
      [0, 2], [11, 12],
      [9, 10], [0, 6],
      [7, 8], [9, 11],
      [5, 3],
    ];
    const vertices = Array.from(new Array(13), () => new Set());
    edges.map((e) => {
      const [p, q] = [...e];
      const edge = ds.WeightedEdge(p, q);
      graph.addEdge(edge);
      vertices[p].add(q);
      if (!directed) vertices[q].add(p);
      return null;
    });
    graph.vertices((p) => {
      graph.edges(p, (edge) => {
        const q = edge.other(p);
        expect(vertices[p].has(q)).toBe(true);
      });
    });
  });

  test('should verify reverse method on a non-empty directed graph', () => {
    if (directed) {
      graph.addEdge(ds.WeightedEdge(0, 5));
      const rg = graph.reverse();
      const vertices = new Set([0]);
      rg.edges(5, (edge) => {
        const q = edge.other(5);
        expect(vertices.has(q)).toBe(true);
      });
    }
  });
});

describe.each(weightedGraphs)('%s', (name, v, directed) => {
  test('should verify graph constructor', () => {
    expect(() => {
      graph = ds[name](0, directed);
    }).toThrowError('Graph requires at least one vertex!');
  });
});
