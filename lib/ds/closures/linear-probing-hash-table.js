const { hashString, getType } = require('../../util');

const ds = () => {
  let capacity = 4;
  let keys = new Array(capacity).fill(null);
  let vals = new Array(capacity).fill(null);
  let count = 0;

  const hash = (value, limit = capacity) => (
    getType(value) === 'string'
      ? hashString(value) % limit
      : hashString(JSON.stringify(value)) % limit
  );

  const forEach = (callback) => {
    for (let i = 0; i < capacity; i += 1) {
      if (keys[i] !== null) callback(keys[i], vals[i]);
    }
  };

  const resize = (newCapacity) => {
    const keysCopy = new Array(newCapacity).fill(null);
    const valsCopy = new Array(newCapacity).fill(null);
    forEach((key, val) => {
      let i = hash(key, newCapacity);
      while (keysCopy[i] !== null) i = (i + 1) % newCapacity;
      keysCopy[i] = key;
      valsCopy[i] = val;
    });
    capacity = newCapacity;
    keys = keysCopy;
    vals = valsCopy;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const put = (key, val) => {
    if (size() * 2 >= capacity) resize(capacity * 2);
    let i = hash(key);
    while (keys[i] !== null && keys[i] !== key) i = (i + 1) % capacity;
    if (keys[i] === null) count += 1;
    keys[i] = key;
    vals[i] = val;
  };

  const get = (key) => {
    let i = hash(key);
    while (keys[i] !== null && keys[i] !== key) i = (i + 1) % capacity;
    return vals[i];
  };

  const contains = (key) => (get(key) !== null);

  const remove = (key) => {
    let i = hash(key);
    let val = null;
    while (keys[i] !== null && keys[i] !== key) i = (i + 1) % capacity;
    if (keys[i] === key) {
      val = vals[i];
      keys[i] = null;
      vals[i] = null;
      i = (i + 1) % capacity;
      while (keys[i] !== null) {
        const keyToRehash = keys[i];
        const valToRehash = vals[i];
        keys[i] = null;
        vals[i] = null;
        count -= 1;
        put(keyToRehash, valToRehash);
        i = (i + 1) % capacity;
      }
      count -= 1;
      if (size() > 0 && size() * 8 <= capacity) resize(capacity / 2);
    }
    return val;
  };

  return {
    size,
    empty,
    put,
    get,
    remove,
    contains,
    forEach,
  };
};

module.exports = ds;
