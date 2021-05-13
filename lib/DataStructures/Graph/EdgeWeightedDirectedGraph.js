const { Bag } = require('../Bag');
const { DirectedEdge } = require('./DirectedEdge');

/**
 * The {@code EdgeWeightedDirectedGraph} class represents a edge-weighted
 * directed graph of vertices named 0 through <em>V</em> - 1, where each
 * directed edge is of type {@link DirectedEdge} and has a real-valued weight.
 * It supports the following two primary operations: add a directed edge
 * to the digraph and iterate over all of edges incident from a given vertex.
 * It also provides methods for returning the indegree or outdegree of a
 * vertex, the number of vertices <em>V</em> in the digraph, and
 * the number of edges <em>E</em> in the digraph.
 * Parallel edges and self-loops are permitted.
 * <p>
 * This implementation uses an <em>adjacency-lists representation</em>, which
 * is a vertex-indexed array of {@link Bag} objects.
 * It uses &Theta;(<em>E</em> + <em>V</em>) space, where <em>E</em> is
 * the number of edges and <em>V</em> is the number of vertices.
 * All instance methods take &Theta;(1) time. (Though, iterating over
 * the edges returned by {@link #edges()} takes time proportional
 * to the outdegree of the vertex.)
 * Constructing an empty edge-weighted digraph with <em>V</em> vertices
 * takes &Theta;(<em>V</em>) time; constructing an edge-weighted digraph
 * with <em>E</em> edges and <em>V</em> vertices takes
 * &Theta;(<em>E</em> + <em>V</em>) time.
 * <p>
 *
 * @author Elvin Kosova
 */
const EdgeWeightedDirectedGraph = (N) => {
  if (N < 0) throw new Error('Number of vertices must be non-negative!');
  const graph = Array.from(new Array(N), () => (Bag()));
  const inDegree = new Array(N).fill(0);
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
   * Returns the number of vertices in this edge-weighted digraph.
   *
   * @return the number of vertices in this edge-weighted digraph
   */
  const V = () => (N);

  /**
   * Returns the number of edges in this edge-weighted digraph.
   *
   * @return the number of edges in this edge-weighted digraph
   */
  const E = () => (e);

  /**
  * Adds the directed edge {@code e} to this edge-weighted digraph.
  *
  * @param  e the edge
  * @throws IllegalArgumentException unless endpoints of edge are
  * between {@code 0} and {@code V-1}
  */
  const addEdge = (edge) => {
    const v = edge.from();
    const w = edge.to();
    validateVertex(v);
    validateVertex(w);
    graph[v].add(edge);
    inDegree[v] += 1;
    e += 1;
  };

  /**
   * Returns the directed edges incident from vertex {@code v}.
   *
   * @param  v the vertex
   * @return the directed edges incident from vertex {@code v} as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  const edges = (v, callback) => {
    validateVertex(v);
    return graph[v].forEach(callback);
  };

  /**
   * Access the vertices of the digraph.
   *
   * @param calalback the callback to be called for each digraph vertex
   */
  const vertices = (callback) => {
    for (let v = 0; v < N; v += 1) {
      callback(v);
    }
  };

  /**
  * Returns the number of directed edges incident from vertex {@code v}.
  * This is known as the <em>outdegree</em> of vertex {@code v}.
  *
  * @param  v the vertex
  * @return the outdegree of vertex {@code v}
  * @throws IllegalArgumentException unless {@code 0 <= v < V}
  */
  const outdegree = (v) => {
    validateVertex(v);
    return graph[v].size();
  };

  /**
  * Returns the number of directed edges incident to vertex {@code v}.
  * This is known as the <em>indegree</em> of vertex {@code v}.
  *
  * @param  v the vertex
  * @return the indegree of vertex {@code v}
  * @throws IllegalArgumentException unless {@code 0 <= v < V}
  */
  const indegree = (v) => {
    validateVertex(v);
    return inDegree[v];
  };

  /**
   * Returns the reverse of the digraph.
   *
   * @return the reverse of the digraph
   */
  const reverse = () => {
    const result = EdgeWeightedDirectedGraph(N);
    vertices((v) => {
      edges(v, (edge) => {
        const newEdge = DirectedEdge(edge.to(), edge.from(), edge.weight());
        result.addEdge(newEdge);
      });
    });
    return result;
  };

  /**
  * Returns a string representation of this edge-weighted digraph.
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
    outdegree,
    indegree,
    reverse,
    toString,
  });
};

module.exports = EdgeWeightedDirectedGraph;
