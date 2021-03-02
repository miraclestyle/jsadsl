const { getType } = require('../../util');

const ds = (p, q, w = null) => {
  const validateVertex = (vertex) => {
    if (getType(vertex) !== 'integer') throw new Error('Invalid argument!');
    if (vertex < 0) throw new Error('Invalid argument!');
  };

  const validateWeight = (weight) => {
    const t = getType(weight);
    if (t !== 'float' && t !== 'null') throw new Error('Invalid argument!');
  };

  validateVertex(p);
  validateVertex(q);
  validateWeight(w);

  const either = () => (p);

  const other = (v) => (v === p ? q : p);

  const weight = () => (w);

  const compare = (a, b) => {
    if (a.weight() < b.weight()) return -1;
    if (a.weight() > b.weight()) return 1;
    return 0;
  };

  const toString = () => (`${p}-${w}->${q}`);

  return {
    either,
    other,
    weight,
    compare,
    toString,
  };
};

module.exports = ds;
