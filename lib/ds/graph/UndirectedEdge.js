/**
 * The {@code Edge} class represents a weighted edge in an
 * {@link EdgeWeightedGraph}. Each edge consists of two integers
 * (naming the two vertices) and a real-value weight. The data type
 * provides methods for accessing the two endpoints of the edge and
 * the weight. The natural order for this data type is by
 * ascending order of weight.
 * <p>
 *
 *  @author Elvin Kosova
 */
const UndirectedEdge = (v, w, W) => {
  if (v < 0) throw new Error('Vertex index must be a non-negative integer!');
  if (w < 0) throw new Error('Vertex index must be a non-negative integer1');
  if (Number.isNaN(W)) throw new Error('Weight is NaN!');

  /**
   * Returns either endpoint of this edge.
   *
   * @return either endpoint of this edge
   */
  const either = () => (v);

  /**
   * Returns the endpoint of this edge that is different from the given vertex.
   *
   * @param  vertex one endpoint of this edge
   * @return the other endpoint of this edge
   * @throws IllegalArgumentException if the vertex is not
   * one of the endpoints of this edge
   */
  const other = (vertex) => {
    if (vertex === v) return w;
    if (vertex === w) return v;
    throw new Error('Illegal endpoint!');
  };

  /**
   * Returns the weight of this edge.
   *
   * @return the weight of this edge
   */
  const weight = () => (W);

  /**
   * Compares two edges by weight.
   * Note that {@code compareTo()} is not consistent with {@code equals()},
   * which uses the reference equality implementation inherited from {@code Object}.
   *
   * @param  edge the other edge
   * @return a negative integer, zero, or positive integer
   * depending on whether the weight of this is less than,
   * equal to, or greater than the argument edge
   */
  const compareTo = (edge) => {
    if (weight() < edge.weight()) return -1;
    if (weight() > edge.weight()) return 1;
    return 0;
  };

  /**
   * Returns a string representation of this edge.
   *
   * @return a string representation of this edge
   */
  const toString = () => (`${v}-${w} ${weight()}`);

  return Object.freeze({
    either,
    other,
    weight,
    compareTo,
    toString,
  });
};

module.exports = UndirectedEdge;
