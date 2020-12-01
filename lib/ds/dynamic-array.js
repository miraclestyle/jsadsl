const ds = () => {
  let array = new Array(1).fill(null);
  let count = 0;

  const validateValue = (value) => (value === null);

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
    if (validateValue(value)) return null;
    const eq = typeof equal === 'function' ? equal : (a, b) => (a === b);
    for (let i = 0; i < count; i += 1) {
      if (eq(value, array[i])) return i;
    }
    return -1;
  };

  const insert = (value) => {
    if (validateValue(value)) return;
    if (count === array.length) resize(array.length * 2);
    array[count] = value;
    count += 1;
  };

  const update = (oldValue, newValue) => {
    if (validateValue(oldValue)) return;
    const i = find(oldValue);
    array[i] = newValue;
  };

  const remove = (value) => {
    if (validateValue(value)) return null;
    const i = find(value);
    if (i === -1) return null;
    count -= 1;
    const storedValue = array[i];
    array[i] = array[count];
    array[count] = null;
    if (count > 0 && count <= array.length / 4) resize(array.length / 2);
    return storedValue;
  };

  const removeLast = () => {
    if (empty()) return null;
    count -= 1;
    const value = array[count];
    array[count] = null;
    if (count > 0 && count <= array.length / 4) resize(array.length / 2);
    return value;
  };

  const getLast = () => {
    if (empty()) return null;
    return array[count - 1];
  };

  const forEach = (callback) => {
    for (let i = 0; i < count; i += 1) {
      const first = i === 0;
      const last = i === count - 1;
      callback(array[i], i, first, last);
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
    getLast,
    forEach,
  };
};

module.exports = ds;
