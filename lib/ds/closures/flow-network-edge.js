const ds = (v, w, c) => {
  const FLOATING_POINT_EPSILON = 1E-10;
  let f = 0;

  const from = () => (v);

  const to = () => (w);

  const capacity = () => (c);

  const flow = () => (f);

  const other = (vertex) => {
    if (vertex === v) return w;
    if (vertex === w) return v;
    throw new Error('Invalid endpoint!');
  };

  const residualCapacity = (vertex) => {
    if (vertex === v) return f;
    if (vertex === w) return c - f;
    throw new Error('Invalid endpoint!');
  };

  const addResidualFlowTo = (vertex, delta) => {
    if (delta < 0) throw new Error('Delta must be non-negative!');
    if (vertex === v) f -= delta;
    else if (vertex === w) f += delta;
    else throw new Error('Invalid endpoint!');
    if (Math.abs(f) <= FLOATING_POINT_EPSILON) f = 0;
    if (Math.abs(c - f) <= FLOATING_POINT_EPSILON) f = c;
    if (f < 0) throw new Error('Flow is negative!');
    if (f > c) throw new Error('Flow exceeds capacity!');
  };

  const toString = () => (`${v}-(${f}/${c})->${w}`);

  return Object.freeze({
    from,
    to,
    capacity,
    flow,
    other,
    residualCapacity,
    addResidualFlowTo,
    toString,
  });
};

module.exports = ds;
