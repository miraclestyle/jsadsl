const { Bag } = require('../closures');

/**
 * The {@code Graph} ADT represents an undirected graph of vertices
 * named 0 through <em>V</em> – 1.
 * It supports the following two primary operations: add an edge to the  graph,
 * iterate over all of the vertices adjacent to a vertex. It also provides
 * methods for returning the degree of a vertex, the number of vertices
 * <em>V</em> in the graph, and the number of edges <em>E</em> in the graph.
 * Parallel edges and self-loops are permitted.
 * By convention, a self-loop <em>v</em>-<em>v</em> appears in the
 * adjacency list of <em>v</em> twice and contributes two to the degree
 * of <em>v</em>.
 * <p>
 * This implementation uses an <em>adjacency-lists representation</em>, which
 * is a vertex-indexed array of {@link Bag} objects.
 * It uses &Theta;(<em>E</em> + <em>V</em>) space, where <em>E</em> is
 * the number of edges and <em>V</em> is the number of vertices.
 * All instance methods take &Theta;(1) time. (Though, iterating over
 * the vertices returned by {@link #adj(int)} takes time proportional
 * to the degree of the vertex.)
 * Constructing an empty graph with <em>V</em> vertices takes
 * &Theta;(<em>V</em>) time; constructing a graph with <em>E</em> edges
 * and <em>V</em> vertices takes &Theta;(<em>E</em> + <em>V</em>) time.
 * <p>
 *
 *  @author Elvin Kosova
 */
const UndirectedGraph = (N) => {
  if (N < 0) throw new Error('Number of vertices must be non-negative!');
  const graph = new Array(N).fill(Bag());
  let e = 0;

  /**
   * Throw an error unless {@code 0 <= v < N}
   *
   * @param v the vertex to validate
   */
  const validateVertex = (v) => {
    if (v < 0 || v >= N) {
      throw new Error(`Vertex ${v} is not between 0 and ${N - 1}!`);
    }
  };

  /**
   * Returns the number of vertices in this graph.
   *
   * @return the number of vertices in this graph
   */
  const V = () => (N);

  /**
   * Returns the number of edges in this graph.
   *
   * @return the number of edges in this graph
   */
  const E = () => (e);

  /**
   * Adds the undirected edge v-w to this graph.
   *
   * @param  v one vertex in the edge
   * @param  w the other vertex in the edge
   * @throws IllegalArgumentException unless both {@code 0 <= v < V} and {@code 0 <= w < V}
   */
  const addEdge = (v, w) => {
    validateVertex(v);
    validateVertex(w);
    graph[v].add(w);
    graph[w].add(v);
    e += 1;
  };

  /**
   * Access the vertices adjacent to vertex {@code v}.
   *
   * @param  v the vertex
   * @param  calalback the callback to be called for each adjacent vertex
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  const edges = (v, callback) => {
    validateVertex(v);
    graph[v].forEach(callback);
  };

  /**
   * Access the vertices of the graph.
   *
   * @param calalback the callback to be called for each graph vertex
   */
  const vertices = (callback) => {
    for (let v = 0; v < N; v += 1) {
      callback(v);
    }
  };

  /**
   * Returns the degree of vertex {@code v}.
   *
   * @param  v the vertex
   * @return the degree of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  const degree = (v) => {
    validateVertex(v);
    return graph[v].size();
  };

  /**
   * Returns a string representation of this graph.
   *
   * @return the number of vertices <em>V</em>,
   * followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists
   */
  const toString = () => {
    const result = [];
    result.push(`${N} vertices, ${e} edges.`);
    vertices((v) => {
      const adjacentVertices = [];
      edges(v, (w) => {
        adjacentVertices.push(w);
      });
      result.push(`${v}: ${adjacentVertices.join(' ')}`);
    });
    return result.join('\n');
  };

  return Object.freeze({
    V,
    E,
    addEdge,
    vertices,
    edges,
    degree,
    toString,
  });
};

module.exports = UndirectedGraph;
