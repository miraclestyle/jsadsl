const ds = () => {
  let root = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

  const size = () => (count);

  const empty = () => (count === 0);

  const push = (value) => {
    root = Node(value, root);
    count += 1;
  };

  const pop = () => {
    if (empty()) return null;
    const { value } = root;
    root = root.next;
    count -= 1;
    return value;
  };

  const peek = () => (empty() ? null : root.value);

  const forEach = (callback) => {
    let node = root;
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  const iterator = () => {
    let node = root;
    const next = () => {
      const result = { value: null, done: false };
      if (node === null) {
        result.done = true;
      } else {
        result.value = node.value;
        node = node.next;
      }
      return result;
    };
    return { next };
  };

  return {
    size,
    empty,
    push,
    pop,
    peek,
    forEach,
    [Symbol.iterator]: iterator,
  };
};

module.exports = ds;
