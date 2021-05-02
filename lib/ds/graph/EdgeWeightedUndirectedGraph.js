const { Bag } = require('../closures');

/**
 * The {@code EdgeWeightedGraph} class represents an edge-weighted
 * graph of vertices named 0 through <em>V</em> – 1, where each
 * undirected edge is of type {@link Edge} and has a real-valued weight.
 * It supports the following two primary operations: add an edge to the graph,
 * iterate over all of the edges incident to a vertex. It also provides
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
 * the edges returned by {@link #edges()} takes time proportional
 * to the degree of the vertex.)
 * Constructing an empty edge-weighted graph with <em>V</em> vertices takes
 * &Theta;(<em>V</em>) time; constructing a edge-weighted graph with
 * <em>E</em> edges and <em>V</em> vertices takes
 * &Theta;(<em>E</em> + <em>V</em>) time.
 * <p>
 *
 * @author Elvin Kosova
 */
const EdgeWeightedUndirectedGraph = (N) => {
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
      throw new Error(`Vertex ${v} is not between 0 and ${N - 1}`);
    }
  };

  /**
   * Returns the number of vertices in this edge-weighted graph.
   *
   * @return the number of vertices in this edge-weighted graph
   */
  const V = () => (N);

  /**
   * Returns the number of edges in this edge-weighted graph.
   *
   * @return the number of edges in this edge-weighted graph
   */
  const E = () => (e);

  /**
   * Adds the undirected edge {@code e} to this edge-weighted graph.
   *
   * @param  e the edge
   * @throws IllegalArgumentException unless both endpoints are between {@code 0} and {@code V-1}
   */
  const addEdge = (edge) => {
    const v = edge.either();
    const w = edge.other(v);
    validateVertex(v);
    validateVertex(w);
    graph[v].add(edge);
    graph[w].add(edge);
    e += 1;
  };

  /**
   * Returns the edges incident on vertex {@code v}.
   *
   * @param  v the vertex
   * @return the edges incident on vertex {@code v} as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  const edges = (v, callback) => {
    validateVertex(v);
    return graph[v].forEach(callback);
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
   * Returns a string representation of the edge-weighted graph.
   * This method takes time proportional to <em>E</em> + <em>V</em>.
   *
   * @return the number of vertices <em>V</em>,
   * followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists of edges
   */
  const toString = () => {
    const result = [];
    result.push(`${N} vertices, ${e} edges.`);
    vertices((v) => {
      const adjacentEdges = [];
      edges(v, (edge) => {
        adjacentEdges.push(edge.toString());
      });
      result.push(`${v}: ${adjacentEdges.join(' ')}`);
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

module.exports = EdgeWeightedUndirectedGraph;
