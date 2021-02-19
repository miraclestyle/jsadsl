const { hashString, getType } = require('../util');

const ds = () => {
  let st = new Array(1).fill(null);
  let count = 0;

  const capacity = () => (st.length);

  const Node = (key, val, next = null) => (
    {
      key,
      val,
      next,
    }
  );

  const hash = (value, limit = capacity()) => (
    getType(value) === 'string'
      ? hashString(value) % limit
      : hashString(JSON.stringify(value)) % limit
  );

  const forEach = (callback) => {
    for (let i = 0; i < capacity(); i += 1) {
      for (let node = st[i]; node !== null; node = node.next) {
        callback(node.key, node.val);
      }
    }
  };

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity).fill(null);
    forEach((key, val) => {
      const index = hash(key, newCapacity);
      const head = copy[index];
      copy[index] = Node(key, val, head);
    });
    st = copy;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const set = (key, val) => {
    for (let node = st[hash(key)]; node !== null; node = node.next) {
      if (key === node.key) {
        node.val = val;
        return;
      }
    }
    if (size() === capacity()) resize(capacity() * 2);
    const index = hash(key);
    st[index] = Node(key, val, st[index]);
    count += 1;
  };

  const get = (key) => {
    for (let node = st[hash(key)]; node !== null; node = node.next) {
      if (key === node.key) {
        return node.val;
      }
    }
    return null;
  };

  const remove = (key) => {
    const index = hash(key);
    let node = st[index];
    let val = null;
    if (node !== null && node.key === key) {
      val = node.val;
      st[index] = node.next;
      count -= 1;
    } else if (node !== null) {
      while (node.next !== null) {
        if (node.next.key === key) {
          val = node.next.val;
          node.next = node.next.next;
          count -= 1;
          break;
        }
        node = node.next;
      }
    }
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
    return val;
  };

  const contains = (key) => (get(key) !== null);

  return {
    size,
    empty,
    set,
    get,
    remove,
    contains,
    forEach,
  };
};

module.exports = ds;
