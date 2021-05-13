const { Bag } = require('../Bag');

/**
 * The {@code FlowNetwork} class represents a capacitated network
 * with vertices named 0 through <em>V</em> - 1, where each directed
 * edge is of type {@link FlowEdge} and has a real-valued capacity
 * and flow.
 * It supports the following two primary operations: add an edge to the network,
 * iterate over all of the edges incident to or from a vertex. It also provides
 * methods for returning the number of vertices <em>V</em> and the number
 * of edges <em>E</em>. Parallel edges and self-loops are permitted.
 * <p>
 * This implementation uses an adjacency-lists representation, which
 * is a vertex-indexed array of {@link Bag} objects.
 * All operations take constant time (in the worst case) except
 * iterating over the edges incident to a given vertex, which takes
 * time proportional to the number of such edges.
 * <p>
 *
 * @author Elvin Kosova
 */
const FlowNetwork = (N) => {
  if (N < 0) throw new Error('Number of vertices must be non-negative!');
  const graph = Array.from(new Array(N), () => (Bag()));
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
   * Returns the number of vertices in the edge-weighted graph.
   *
   * @return the number of vertices in the edge-weighted graph
   */
  const V = () => (N);

  /**
   * Returns the number of edges in the edge-weighted graph.
   *
   * @return the number of edges in the edge-weighted graph
   */
  const E = () => (e);

  /**
   * Adds the edge {@code e} to the network.
   *
   * @param e the edge
   * @throws IllegalArgumentException unless endpoints
   * of edge are between {@code 0} and {@code V-1}
   */
  const addEdge = (edge) => {
    const v = edge.from();
    const w = edge.to();
    validateVertex(v);
    validateVertex(w);
    graph[v].add(edge);
    graph[w].add(edge);
    e += 1;
  };

  /**
   * Returns the edges incident on vertex {@code v}
   * (includes both edges pointing to and from {@code v}).
   *
   * @param v the vertex
   * @return the edges incident on vertex {@code v} as an Iterable
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
   * Returns a string representation of the flow network.
   * This method takes time proportional to <em>E</em> + <em>V</em>.
   *
   * @return the number of vertices <em>V</em>,
   * followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists
   */
  const toString = () => {
    const result = [];
    result.push(`${N} vertices, ${e} edges.`);
    vertices((v) => {
      const adjacentEdges = [];
      edges(v, (edge) => {
        if (edge.to() !== v) adjacentEdges.push(edge.toString());
      });
      result.push(`${v}: ${adjacentEdges.join(' ')}`);
    });
    return result.join('\n');
  };

  return Object.freeze({
    V,
    E,
    addEdge,
    edges,
    vertices,
    toString,
  });
};

module.exports = FlowNetwork;
