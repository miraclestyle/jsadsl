/**
 *  The {@code DirectedEdge} class represents a weighted edge in an
 * {@link EdgeWeightedDigraph}. Each edge consists of two integers
 * (naming the two vertices) and a real-value weight. The data type
 * provides methods for accessing the two endpoints of the directed edge and
 * the weight.
 * <p>
 *
 * @author Elvin Kosova
 */
const DirectedEdge = (v, w, W) => {
  if (v < 0) throw new Error('Vertex index must be a non-negative integer!');
  if (w < 0) throw new Error('Vertex index must be a non-negative integer!');
  if (Number.isNaN(W)) throw new Error('Weight is NaN!');

  /**
   * Returns the tail vertex of the directed edge.
   *
   * @return the tail vertex of the directed edge
   */
  const from = () => (v);

  /**
   * Returns the head vertex of the directed edge.
   *
   * @return the head vertex of the directed edge
   */
  const to = () => (w);

  /**
   * Returns the weight of the directed edge.
   *
   * @return the weight of the directed edge
   */
  const weight = () => (W);

  /**
   * Compares two edges by weight.
   * Note that {@code compareTo()} is not consistent with {@code equals()},
   * which uses the reference equality implementation inherited
   * from {@code Object}.
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
   * Returns a string representation of the directed edge.
   *
   * @return a string representation of the directed edge
   */
  const toString = () => (`${v}->${w} ${weight()}`);

  return Object.freeze({
    from,
    to,
    weight,
    compareTo,
    toString,
  });
};

module.eports = DirectedEdge;
