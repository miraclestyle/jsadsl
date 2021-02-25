const {
  describe,
  expect,
  test,
  beforeEach,
} = require('@jest/globals');
const { ds, repeat } = require('../../lib');

ds.repeat = repeat;

const cases = [
  ['Graph', 13, false],
  ['Graph', 13, true],
];

let graph = null;

describe.each(cases)('%s', (name, v, directed) => {
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

describe.each(cases)('%s', (name, v, directed) => {
  test('should verify graph constructor', () => {
    expect(() => {
      graph = ds[name](0, directed);
    }).toThrowError('Graph requires at least one vertex!');
  });
});
