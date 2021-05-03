/**
 * The {@code FlowEdge} class represents a capacitated edge with a
 * flow in a {@link FlowNetwork}. Each edge consists of two integers
 * (naming the two vertices), a real-valued capacity, and a real-valued
 * flow. The data type provides methods for accessing the two endpoints
 * of the directed edge and the weight. It also provides methods for
 * changing the amount of flow on the edge and determining the residual
 * capacity of the edge.
 * <p>
 *
 *  @author Elvin Kosova
 */
const FlowEdge = (v, w, c, f = 0) => {
  if (v < 0) throw new Error('Vertex index must be a non-negative integer!');
  if (w < 0) throw new Error('Vertex index must be a non-negative integer!');
  if (c < 0) throw new Error('Edge capacity must be non-negative!');
  if (f < 0) throw new Error('Edge flow must be non-negative!');
  if (f > c) throw new Error('Edge flow exceeds capacity!');
  const FLOATING_POINT_EPSILON = 1E-10;

  /**
   * Returns the tail vertex of the edge.
   *
   * @return the tail vertex of the edge
   */
  const from = () => (v);

  /**
   * Returns the head vertex of the edge.
   *
   * @return the head vertex of the edge
   */
  const to = () => (w);

  /**
   * Returns the capacity of the edge.
   *
   * @return the capacity of the edge
   */
  const capacity = () => (c);

  /**
   * Returns the flow on the edge.
   *
   * @return the flow on the edge
   */
  const flow = () => (f);

  /**
   * Returns the endpoint of the edge that is different from the given vertex
   * (unless the edge represents a self-loop in which case
   * it returns the same vertex).
   *
   * @param vertex one endpoint of the edge
   * @return the endpoint of the edge that is different from the given vertex
   * (unless the edge represents a self-loop in which case
   * it returns the same vertex)
   * @throws IllegalArgumentException if {@code vertex} is not
   * one of the endpoints of the edge
   */
  const other = (vertex) => {
    if (vertex === v) return w;
    if (vertex === w) return v;
    throw new Error('Invalid endpoint!');
  };

  /**
   * Returns the residual capacity of the edge in the direction
   * to the given {@code vertex}.
   *
   * @param vertex one endpoint of the edge
   * @return the residual capacity of the edge in
   * the direction to the given vertex
   * If {@code vertex} is the tail vertex, the residual capacity equals
   * {@code capacity() - flow()}; if {@code vertex} is the head vertex, the
   * residual capacity equals {@code flow()}.
   * @throws IllegalArgumentException if {@code vertex} is not one of the endpoints of the edge
   */
  const residualCapacityTo = (vertex) => {
    if (vertex === v) return f; // backward edge
    if (vertex === w) return c - f; // forward edge
    throw new Error('Invalid endpoint!');
  };

  /**
   * Increases the flow on the edge in the direction to the given vertex.
   * If {@code vertex} is the tail vertex,
   * this increases the flow on the edge by {@code delta};
   * if {@code vertex} is the head vertex,
   * this decreases the flow on the edge by {@code delta}.
   *
   * @param vertex one endpoint of the edge
   * @param delta amount by which to increase flow
   * @throws IllegalArgumentException if {@code vertex} is
   * not one of the endpoints of the edge
   * @throws IllegalArgumentException if {@code delta} makes the flow on
   * on the edge either negative or larger than its capacity
   * @throws IllegalArgumentException if {@code delta} is {@code NaN}
   */
  const addResidualFlowTo = (vertex, delta) => {
    if (delta < 0) throw new Error('Delta must be non-negative!');
    if (vertex === v) f -= delta; // backward edge
    else if (vertex === w) f += delta; // forward edge
    else throw new Error('Invalid endpoint!');

    // round flow to 0 or capacity if within floating-point precision
    if (Math.abs(f) <= FLOATING_POINT_EPSILON) f = 0;
    if (Math.abs(f - c) <= FLOATING_POINT_EPSILON) f = c;
    if (f < 0) throw new Error('Edge flow is negative!');
    if (f > c) throw new Error('Edge flow exceeds capacity!');
  };

  /**
   * Returns a string representation of the edge.
   *
   * @return a string representation of the edge
   */
  const toString = () => (`${v}->${w} ${f}/${c}`);

  return Object.freeze({
    from,
    to,
    capacity,
    flow,
    other,
    residualCapacityTo,
    addResidualFlowTo,
    toString,
  });
};

module.exports = FlowEdge;
