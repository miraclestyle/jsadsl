const ds = () => {
  let array = new Array(1).fill(null);
  let count = 0;

  const size = () => (count);

  const empty = () => (count === 0);

  const resize = (n) => {
    const copy = new Array(n).fill(null);
    for (let i = 0; i < array.length; i += 1) {
      copy[i] = array[i];
    }
    array = copy;
  };

  const find = (value, equal) => {
    const eq = typeof equal === 'function' ? equal : (a, b) => (a === b);
    for (let i = 0; i < count; i += 1) {
      if (eq(value, array[i])) return i;
    }
    return -1;
  };

  const insert = (value) => {
    if (count === array.length) resize(array.length * 2);
    array[count] = value;
    count += 1;
  };

  const update = (oldValue, newValue) => {
    const i = find(oldValue);
    array[i] = newValue;
  };

  const remove = (value) => {
    const i = find(value);
    if (i === -1) return;
    count -= 1;
    array[i] = array[count];
    array[count] = null;
    if (count <= array.length / 4) resize(array.length / 2);
  };

  const removeLast = () => {
    if (empty()) return;
    count -= 1;
    array[count] = null;
    if (count > 0 && count <= array.length / 4) resize(array.length / 2);
  };

  const forEach = (callback) => {
    for (let i = 0; i < count; i += 1) {
      callback(array[i], i);
    }
  };

  return {
    size,
    empty,
    find,
    insert,
    update,
    remove,
    removeLast,
    forEach,
  };
};

module.exports = ds;
